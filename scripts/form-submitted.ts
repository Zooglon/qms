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

const removeEmptyOrUnusedFormFields = (obj: any): any => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== ""));
};

const getFormDetailsFromCollection = async (guid) => {
  const collection = "MonoPitchQuotes";
  const formGuid = "test";

  const queryCollection = await wixData
    .query(collection)
    .eq("formGuid", formGuid)
    .find()
    .then((results) => results.items);

  console.log("QUERY COLLECTION", queryCollection);
  return removeEmptyOrUnusedFormFields(queryCollection[0]);
};

const getNearestSuppliers = async (suppliers, postCode) => {
  const quoteSiteCoords = await getPostcodeData(postCode);

  const sortedSuppliers = suppliers.sort((a, b) => {
    const distA = distanceInMetres(
      quoteSiteCoords.lng,
      quoteSiteCoords.lat,
      a.longitude,
      a.latitude
    );
    const distB = distanceInMetres(
      quoteSiteCoords.lng,
      quoteSiteCoords.lat,
      b.longitude,
      b.latitude
    );
    return distA - distB;
  });

  return sortedSuppliers.slice(0, qn);
};

export const invoke = async ({ payload }) => {
  // Get postcode of quote site
  const form = payload;
  console.log("PAYLOAD", payload);
  let formObject = {};

  // strip out everything but field names
  for (let [key, value] of Object.entries(payload)) {
    console.log(key, value);
    formObject[key.slice(Math.abs(key.lastIndexOf(":")) * -1)] = value;
  }

  const completedForm = await getFormDetailsFromCollection(formObject.formGuid);

  console.log("COMP FORM", completedForm);

  const suppliers = await getSuppliersCollection();

  const quoteTypesPresentInForm = (completedForm) => {
    let quoteTypes = [completedForm.formName];

    // solar panel quote
    if (completedForm.solarPanelQuoteFromProvider) {
      quoteTypes.push("Solar_Panels");
    }
    // installation quote
    if (completedForm.quoteForInstallation) {
      quoteTypes.push("Installation");
    }
    // levelling quote
    if (completedForm.quoteForInstallation) {
      quoteTypes.push("Groundworks");
    }
    // concrete floor quote
    if (completedForm.quoteForInstallation) {
      quoteTypes.push("Concrete_Internal");
    }
  };

  // Filter suppliers by active status and same quotation type
  const getBuildingSuppliers = suppliers.filter(
    (supplier) => supplier.isActive && supplier.quoteTypesProvided.includes(quoteTypesPresentInForm)
  );

  // Email suppliers for main buildings
  const emailMainSupplier = () => {};

  // Email suppliers for groundworks, concrete and/or solar panels
  const emailMinorSupplier = () => {};

  // get form details from collection

  // send to suppliers - whole form and groundworkers etc.
  // if xyz is filled, send to groundworkers etc.

  // Old func...

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
