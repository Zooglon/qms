/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */

import { triggeredEmails } from "wix-crm-backend";
import { fetch } from "wix-fetch";
import wixData from "wix-data";

const distanceInMetres = (lng1, lat1, lng2, lat2) => {
  const er = 6371e3;
  const l1 = (lat1 * Math.PI) / 180;
  const l2 = (lat2 * Math.PI) / 180;
  const clat = ((lat2 - lat1) * Math.PI) / 180;
  const clng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(clat / 2) * Math.sin(clat / 2) +
    Math.cos(l1) * Math.cos(l2) * Math.sin(clng / 2) * Math.sin(clng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // distance in metres
  const d = er * c;
  return d;
};

async function getSuppliersCollection() {
  const cn = "SupplierList";
  try {
    // const retrievedCollection = await collections.getDataCollection(cn);
    const retrievedCollection = await wixData
      .query(cn)
      .eq("isActive", true)
      .limit(1000)
      .find()
      .then((results) => results.items);
    return retrievedCollection;
  } catch (error) {
    console.log(`Error could not find collection ${cn}, details-\n${error}`);
  }
}

async function handleErrors(msg) {
  const getAdminDetails = await wixData
    .query("QMSTeam")
    .eq("role", "DEVELOPER")
    .limit(100)
    .find()
    .then((results) => results.items);

  for (const admin of getAdminDetails) {
    console.log("Attempting to email admin", admin.email);
    try {
      triggeredEmails.emailMember("adminErrorAlert", admin._id, {
        variables: {
          errorMessage: JSON.stringify(msg),
        },
      });
    } catch (error) {
      console.log(`Error could not find QMS Team collection`);
    }
  }
}

async function getPostcodeData(postcode) {
  const url = `https://api.postcodes.io/postcodes/${postcode}`;
  const res = fetch(url, { method: "get" })
    .then((httpResponse) => {
      if (httpResponse.ok) {
        return httpResponse.json();
      } else {
        return Promise.reject("Error, failed to fetched valid postcode");
      }
    })
    .then((json) => ({ lat: json.result.latitude, lng: json.result.longitude }))
    .catch((err) => console.log(err));

  return res;
}

async function sendSupplierEmail(supplier, options) {
  const emailOptions = {
    variables: {
      supplierName: supplier.supplierName,
      ...options,
    },
  };
  const emailId = "new_form_submission";
  const contactId = supplier.contactId;

  // Send email to supplier
  triggeredEmails
    .emailContact(emailId, contactId, emailOptions)
    .then(() => {
      console.log(`Email was sent to contact ${supplier.supplierName}: ${supplier.emailAddress}`);
    })
    .catch((error) => {
      console.log(
        `Error sending email to contact ${supplier.supplierName}: ${supplier.emailAddress}, details-\n${error}`
      );
    });
}

const stringifyForm = (form) => {
  const fieldsToIgnore = ["How many quotes would you like to receive?"];
  return form.submissions
    .filter((s) => !fieldsToIgnore.includes(s.label))
    .map((field) => `\n\n${field.label} -\n${field.value}`)
    .join("");
};

const isValid = (i) =>
  /[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]{0,1} ?[0-9][a-zA-Z]{2}/i.test(i.replace(/\s/g, ""));

export const invoke = async ({ payload }) => {
  // Get postcode of quote site
  const form = payload;

  const sa = form["field:site_address_multi"];
  let pc = sa.match(/[a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]{0,1} ?[0-9][a-zA-Z]{2}/g)[0];
  const qn = form.formName.toLowerCase().includes("round house")
    ? 1
    : form["field:number_of_quotes"];

  // Get coords of postcode
  const pcc = await getPostcodeData(pc);
  // Test postcode is valid
  if (!pc || !isValid(pc) || !pcc) {
    return {};
  }
  // Get supplier collection
  const sl = await getSuppliersCollection();
  // Format form name
  let ffn = form.formName.includes("Shed Quote Form - ")
    ? form.formName.replace("Shed Quote Form - ", "")
    : form.formName;

  const fnt =
    !ffn.toLowerCase().includes("solar") && !ffn.toLowerCase().includes("roller") ? "Building" : "";

  // Filter suppliers by active status and same quotation type
  const fsl = sl.filter((s) => s.isActive && s.quoteTypesProvided.includes(ffn));

  // Sort suppliers by distance
  const ssl = fsl
    .map((s) => ({
      dist: distanceInMetres(pcc.lat, pcc.lng, s.latitude, s.longitude),
      supplier: s,
    }))
    .sort((a, b) => a.dist - b.dist);

  // Send email to each supplier with quote details
  for (let i = 0; i <= (qn >= ssl.length ? ssl.length : qn) - 1; i++) {
    const emailOptions = {
      submittedName:
        form.submissions.filter((f) => f.label.toLowerCase() === "first name")[0].value +
        " " +
        form.submissions.filter((f) => f.label.toLowerCase() === "last name")[0].value,
      submittedType: `New ${ffn} ${fnt}`,
      submittedDistance: Math.trunc(ssl[i].dist / 1000),
      formDetails: stringifyForm(form),
    };

    try {
      sendSupplierEmail(ssl[i].supplier, emailOptions);
    } catch (error) {
      handleErrors(error);
      console.log(
        `Error sending email to supplier: ${ssl[i].supplier.supplierName}\n`,
        error.message
      );
    }
  }

  // The function must return an empty object, do not delete
  return {};
};

// Get postcodes from supplier collection
// Calc distance from each one
// Return x nearest suppliers

// Field key form number of quotes - number_of_quotes
// If no number of quotes field AND form is round house return 3 (should only be one supplier)

// Field key for multi-line address - site_address_multi

// gonna need email address in supplier list

// Mono Pitch form payload
// {
//   "formName": "Shed Quote Form - Mono Pitch",
//   "submissions": [
//     {
//       "label": "Would you like a quote for installation",
//       "value": "Quote from other steel erector"
//     },
//     { "label": "Would you like a quote for levelling the site", "value": "Yes" },
//     { "label": "Building type", "value": "Freestanding" },
//     { "label": "What is the building going to be used for?", "value": "Muck store" },
//     { "label": "Measurement units", "value": "Metric (mm)" },
//     { "label": "Building length", "value": "50000" },
//     { "label": "Building width", "value": "20000" },
//     { "label": "Height", "value": "20000" },
//     { "label": "Bay width", "value": "2000" },
//     { "label": "Steel options", "value": "Painted" },
//     { "label": "Roof pitch", "value": "15°" },
//     { "label": "Will the building have walls ", "value": "No" },
//     { "label": "Purlins", "value": "Timber" },
//     { "label": "Roof material", "value": "Corrugated sheet" },
//     { "label": "Roof colour", "value": "Slate Blue" },
//     { "label": "Corrugated sheet finish", "value": "Plastic coated" },
//     { "label": "Roof lights", "value": "No" },
//     { "label": "Will this shed have a cantilever", "value": "No" },
//     { "label": "Solar panels", "value": "No" },
//     { "label": "Solar Panels in the future?", "value": "No" },
//     { "label": "Roller door", "value": "No" },
//     { "label": "Personnel doors", "value": "No" },
//     { "label": "Will this building have cladding", "value": "No" },
//     { "label": "Tecs/Fixings", "value": "Molded" },
//     { "label": "Guttering", "value": "Galvanised Folded (Plain)" },
//     { "label": "Guttering outlets", "value": "2" },
//     { "label": "Will you be concreting the floor", "value": "No" },
//     { "label": "First name", "value": "Test" },
//     { "label": "Last name", "value": "McTesterson" },
//     { "label": "Email", "value": "thisistheemailforquotes@test.com" },
//     {
//       "label": "Multi-line address",
//       "value": "123 test street Stafford, ENG st16 1ld United Kingdom"
//     },
//     { "label": "How many quotes would you like to receive?", "value": "5" }
//   ],
//   "field:roof_type_mono": "Corrugated sheet",
//   "field:steel_options_mono": "Painted",
//   "field:height_high_side": "20000",
//   "field:will_this_building_have_cladding": "No",
//   "submissionTime": "2025-01-02T12:28:16.750Z",
//   "field:would_you_like_a_quote_for_installation": "Quote from other steel erector",
//   "field:is_metricimperial_mono": "Metric (mm)",
//   "field:bay_size_mono": "2000",
//   "field:personnel_doors_mono": "No",
//   "field:building_use_mono": "Muck store",
//   "field:roof_solarpanels_mono": "No",
//   "field:roof_lights_mono": "No",
//   "context": {
//     "metaSiteId": "44e400a2-80db-47ef-b7c5-cd101c8abe97",
//     "activationId": "f52d552c-fd11-4521-a596-a060810439eb"
//   },
//   "field:roof_solarpanelfuture_mono": "No",
//   "field:last_name_c91e": "McTesterson",
//   "_context": {
//     "app": { "_id": "225dd912-7dea-4738-8688-4b8c6955ffc2" },
//     "trigger": { "key": "wix_form_app-form_submitted" },
//     "configuration": { "_id": "9dca2f07-3b60-466d-a5cc-ec9bc4050c0b" },
//     "activation": { "_id": "f52d552c-fd11-4521-a596-a060810439eb" }
//   },
//   "field:has_walls_mono": "No",
//   "formFieldMask": [
//     "field:would_you_like_a_quote_for_installation",
//     "field:site_level_mono",
//     "field:building_type",
//     "field:building_use_mono",
//     "field:internals_stable",
//     "field:internals_loose_cattle",
//     "field:is_metricimperial_mono",
//     "field:building_length",
//     "field:building_width",
//     "field:height_high_side",
//     "field:bay_size_mono",
//     "field:steel_options_mono",
//     "field:dimensions_guide",
//     "field:post_dimension_a",
//     "field:post_dimension_b",
//     "field:post_thickness_c_mm",
//     "field:roof_pitch",
//     "field:additional_notes_mono",
//     "field:photo_upload",
//     "field:has_walls_mono",
//     "field:how_many_sides_1",
//     "field:wall_material_mono",
//     "field:panel_width_mono",
//     "field:panel_thickness_mono",
//     "field:panel_height_mono",
//     "field:has_purlins_mono",
//     "field:roof_type_mono",
//     "field:fiber_cement_mono",
//     "field:roof_colour",
//     "field:composite_thickness_mono",
//     "field:box_profile_finish",
//     "field:box_profile_mono",
//     "field:wriggly_tin_mono",
//     "field:wriggly_tin_mono_1",
//     "field:roof_lights_mono",
//     "field:num_lights_mono",
//     "field:roof_cantilever",
//     "field:ridge_caps_mono",
//     "field:roof_solarpanels_mono",
//     "field:roof_solarpanelfuture_mono",
//     "field:solarpanel_coverage_mono",
//     "field:would_you_like_a_quote_from_a_solar_panel_provider",
//     "field:has_doors_mono",
//     "field:personnel_doors_mono",
//     "field:door_style_1",
//     "field:door_number_mono",
//     "field:door_width",
//     "field:door_height_mono",
//     "field:has_birdbrush_mono",
//     "field:rubber_floor_seal",
//     "field:power_feed",
//     "field:personneldoors_number_mono",
//     "field:personnel_door_width",
//     "field:has_firedoors_mono",
//     "field:number_firedoors_mono",
//     "field:will_this_building_have_cladding",
//     "field:has_cladding_mono",
//     "field:cladding_colour",
//     "field:cladding_compositethickness_mono",
//     "field:timber_board_type",
//     "field:wriggly_tin_type_1",
//     "field:cladding_tinfinish_mono",
//     "field:tecs_fixings_mono",
//     "field:has_guttering_mono",
//     "field:guttering_outlets",
//     "field:is_concreted_mono",
//     "field:include_concretequote_mono",
//     "field:additional_notes",
//     "field:floor_image_upload",
//     "field:first_name_d74c",
//     "field:last_name_c91e",
//     "field:email_9a1b",
//     "field:phone_2b79",
//     "field:site_address_multi",
//     "field:number_of_quotes",
//     "metaSiteId"
//   ],
//   "field:roof_cantilever": "No",
//   "field:building_width": "20000",
//   "contact": {
//     "name": { "first": "Test", "last": "McTesterson" },
//     "email": "thisistheemailforquotes@test.com",
//     "locale": "en",
//     "address": {
//       "subdivisions": [
//         {
//           "code": "ENG",
//           "name": "England",
//           "type": "ADMINISTRATIVE_AREA_LEVEL_1",
//           "typeInfo": "region"
//         }
//       ],
//       "city": "Stafford",
//       "countryFullname": "United Kingdom",
//       "addressLine": "123 test street",
//       "formattedAddress": "123 test street\nStafford, England\nst16 1ld\nUnited Kingdom",
//       "country": "GB",
//       "postalCode": "st16 1ld",
//       "subdivision": "GB-ENG"
//     },
//     "emails": [
//       {
//         "tag": "UNTAGGED",
//         "email": "thisistheemailforquotes@test.com",
//         "primary": true,
//         "_id": "f271dae3-1793-4641-8880-a2ef5c166e28"
//       }
//     ],
//     "phone": "",
//     "addresses": [
//       {
//         "tag": "UNTAGGED",
//         "address": {
//           "subdivisions": [
//             {
//               "code": "ENG",
//               "name": "England",
//               "type": "ADMINISTRATIVE_AREA_LEVEL_1",
//               "typeInfo": "region"
//             }
//           ],
//           "city": "Stafford",
//           "countryFullname": "United Kingdom",
//           "addressLine": "123 test street",
//           "formattedAddress": "123 test street\nStafford, England\nst16 1ld\nUnited Kingdom",
//           "country": "GB",
//           "postalCode": "st16 1ld",
//           "subdivision": "GB-ENG"
//         },
//         "_id": "0b6b638d-7acb-4801-8f79-6bd7a5016e8a"
//       }
//     ],
//     "_updatedDate": "2025-01-02T12:28:22.941Z",
//     "_createdDate": "2025-01-02T12:28:18.791Z"
//   },
//   "field:number_of_quotes": "5",
//   "submissionId": "3bb431c8-668a-4fe3-b707-87bd6ed44852",
//   "field:site_level_mono": "Yes",
//   "field:has_guttering_mono": "Galvanised Folded (Plain)",
//   "field:is_concreted_mono": "No",
//   "field:site_address_multi": "123 test street Stafford, ENG st16 1ld United Kingdom",
//   "field:building_type": "Freestanding",
//   "field:email_9a1b": "thisistheemailforquotes@test.com",
//   "field:has_doors_mono": "No",
//   "field:has_purlins_mono": "Timber",
//   "contactId": "f36ba948-7c7e-42e6-8e10-be564698369a",
//   "field:building_length": "50000",
//   "field:first_name_d74c": "Test",
//   "field:roof_pitch": "15°",
//   "submissionsLink": "https://manage.wix.app/forms/submissions/44e400a2-80db-47ef-b7c5-cd101c8abe97/93553a26-2cd3-46d0-9833-8f5e59bd36fc?d=https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F44e400a2-80db-47ef-b7c5-cd101c8abe97%2Fwix-forms%2Fform%2F93553a26-2cd3-46d0-9833-8f5e59bd36fc%2Fsubmissions&s=true",
//   "field:guttering_outlets": "2",
//   "field:tecs_fixings_mono": "Molded",
//   "field:wriggly_tin_mono": "Plastic coated",
//   "field:roof_colour": "Slate Blue",
//   "formId": "93553a26-2cd3-46d0-9833-8f5e59bd36fc"
// }

// SupplierList paylod
// [
//     {
//         "subscriptionEndDate": "12/10/2021",
//         "latitude": 52.826453,
//         "_id": "e93363e1-324e-473b-a91c-ef335ff55991",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T14:29:37.589Z",
//         "postcode": "st16 1ld",
//         "emailAddress": "thisistheemailforquotes@test.com",
//         "quoteTypesProvided": [
//             "monoPitch",
//             "concreteSlab",
//             "mezzanineFloor",
//             "roundHouse",
//             "portalFrame",
//             "solarPanels",
//             "rollerDoors"
//         ],
//         "_updatedDate": "2025-01-02T08:09:51.383Z",
//         "longitude": -2.12949,
//         "subscriptionDate": "12/10/2020",
//         "isActive": true,
//         "supplierName": "ACME Inc.",
//         "address": {
//             "city": "San Francisco",
//             "addressLine": "123 Main Street",
//             "formattedAddress": "123 Main Street, San Francisco, United States",
//             "country": "US",
//             "postalCode": "94158",
//             "addressLine2": "Building 6, 3rd floor",
//             "subdivision": "US-CA"
//         },
//         "planId": "02be614d-dd1e-49bd-b08a-a37a2fe2e0b1"
//     },
//     {
//         "subscriptionEndDate": "2022-05-15",
//         "_id": "ebb9f9a5-5d0f-4eb5-b620-f3ea0801714a",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.829Z",
//         "emailAddress": "thisistheemailforquotes@test.com",
//         "quoteTypesProvided": [
//             "monoPitch",
//             "concreteSlab",
//             "mezzanineFloor",
//             "roundHouse",
//             "portalFrame"
//         ],
//         "_updatedDate": "2025-01-02T08:10:11.336Z",
//         "subscriptionDate": "2021-05-15",
//         "isActive": true,
//         "supplierName": "ABC Company"
//     },
//     {
//         "subscriptionEndDate": "2022-08-20",
//         "_id": "6b1a26fa-56d7-429e-a6da-f12211db6a73",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.828Z",
//         "emailAddress": "thisistheemailforquotes@test.com",
//         "quoteTypesProvided": [
//             "monoPitch",
//             "concreteSlab",
//             "mezzanineFloor",
//             "roundHouse",
//             "portalFrame"
//         ],
//         "_updatedDate": "2025-01-02T08:10:19.267Z",
//         "subscriptionDate": "2021-08-20",
//         "isActive": true,
//         "supplierName": "XYZ Corporation"
//     },
//     {
//         "subscriptionEndDate": "2022-06-10",
//         "_id": "8f4a0b9a-85af-4d3d-8637-ecf8c286bdbd",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.827Z",
//         "emailAddress": "thisistheemailforquotes@test.com",
//         "quoteTypesProvided": [
//             "solarPanels",
//             "rollerDoors"
//         ],
//         "_updatedDate": "2025-01-02T08:10:26.746Z",
//         "subscriptionDate": "2021-06-10",
//         "isActive": false,
//         "supplierName": "DEF Enterprises"
//     },
//     {
//         "subscriptionEndDate": "2022-04-30",
//         "_id": "c87d7673-5a4b-4746-8431-9de93c11557d",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.826Z",
//         "emailAddress": "thisistheemailforquotes@test.com",
//         "quoteTypesProvided": [
//             "solarPanels",
//             "rollerDoors"
//         ],
//         "_updatedDate": "2025-01-02T08:10:30.311Z",
//         "subscriptionDate": "2021-04-30",
//         "isActive": true,
//         "supplierName": "123 Suppliers"
//     },
//     {
//         "subscriptionEndDate": "2022-07-25",
//         "_id": "379e8f74-f36a-4986-9e23-4d8d3238e04f",
//         "_owner": "85839425-0cfe-471f-94da-e4086b1dc961",
//         "_createdDate": "2025-01-01T13:40:30.825Z",
//         "emailAddress": "thisistheemailforquotes@test.com",
//         "quoteTypesProvided": [
//             "monoPitch",
//             "concreteSlab",
//             "mezzanineFloor",
//             "roundHouse",
//             "portalFrame",
//             "solarPanels",
//             "rollerDoors"
//         ],
//         "_updatedDate": "2025-01-02T08:10:34.800Z",
//         "subscriptionDate": "2021-07-25",
//         "isActive": true,
//         "supplierName": "LMN Partners"
//     }
// ]
