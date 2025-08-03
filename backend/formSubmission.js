/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */

// import wixData from "wix-data";
// import { triggeredEmails, contacts } from "wix-crm-backend";
// import { fetch } from "wix-fetch";

let TEST_MODE = true;

const qmsStoreCollections = [
  "CladdingQuotes",
  "ConcreteSlabQuotes",
  "DismantleQuotes",
  "DoorsQuotes",
  "GutteringQuotes",
  "MezzanineFloorForm",
  "MonoPitchQuotes",
  "PolytunnelQuotes",
  "PortalFrameQuotes",
  "RainwaterHarvestingQuotes",
  "reroofQuotes",
  "RoundHouseForm",
  "SolarPanelsQuotes",
  "WallQuotes",
  "MyTestCollection",
];

const monoPitchFormFields = {
  formDetails: {
    quoteForInstallation: undefined,
    quoteForLevelling: undefined,
    steelOptions: undefined,
    buildingType: undefined,
    usage: undefined,
    usageInternalsStable: undefined,
    usageInternalsHorseCow: undefined,
    usageCustom: undefined,
    internalsCustom: undefined,
    measurementUnits: undefined,
    buildingLength: undefined,
    buildingWidth: undefined,
    buildingHeight: undefined,
    bayWidth: undefined,
    postDimensionA: undefined,
    postDimensionB: undefined,
    postDimensionC: undefined,
    roofPitch: undefined,
    additionalNotes: undefined,
    siteVisuals: undefined,
    areaMapDetails: undefined,
    MySplat: undefined,
  },
  formWalls: {
    willTheBuildingHaveWalls: undefined,
    howManySidesHaveWalls: undefined,
    wallMaterial: undefined,
    wallPanelHeight: undefined,
    wallPanelHeightCustom: undefined,
    wallHowManyPanelsHigh: undefined,
    wallPanelThickness: undefined,
    wallPanelThicknessCustom: undefined,
  },
  formRoof: {
    roofPurlins: undefined,
    roofMaterial: undefined,
    roofColour: undefined,
    compositeThickness: undefined,
    boxProfileOption: undefined,
    corrugatedSheetFinish: undefined,
    roofLights: undefined,
    roofLightsPerBay: undefined,
    roofLightsPerBayCustom: undefined,
    hasCantilever: undefined,
    cantileverSide: undefined,
    ridgeCaps: undefined,
    solarPanels: undefined,
    solarPanelsInTheFuture: undefined,
    solarPanelCoverage: undefined,
    solarPanelCoverageCustom: undefined,
    solarPanelQuoteFromProvider: undefined,
  },
  formCladding: {
    buildingHasCladding: undefined,
    claddingType: undefined,
    claddingColour: undefined,
    claddingCompositeThickness: undefined,
    claddingTimberBoardType: undefined,
    claddingBoxProfileType: undefined,
    claddingCorrugatedSheetType: undefined,
    claddingHeight: undefined,
    claddingTecsFixings: undefined,
    guttering: undefined,
    gutteringOutlets: undefined,
  },
  formDoors: {
    rollerDoors: undefined,
    rollerDoorLocation: undefined,
    numberOfRollerDoors: undefined,
    numberOfRollerDoorsCustom: undefined,
    rollerDoorWidth: undefined,
    rollerDoorHeight: undefined,
    rollerDoorBirdBrush: undefined,
    rollerDoorRubberFloorSeal: undefined,
    rollerDoorPowerFeed: undefined,
    personnelDoors: undefined,
    numberOfPersonnelDoors: undefined,
    personnelDoorWidth: undefined,
    personnelDoorsAreFireDoors: undefined,
    numberOfFireEscapeDoors: undefined,
  },
  formFloor: {
    concretedFloor: undefined,
    quoteForConcretingFloor: undefined,
    additionalNotesFloor: undefined,
    floorVisuals: undefined,
  },
  formMezzanineFloor: {
    buildingHasMezzanineFloor: undefined,
  },
  formContact: {
    firstName: undefined,
    lastName: undefined,
    companyName: undefined,
    email: undefined,
    phoneNumber: undefined,
    address: undefined,
  },
};

const concreteSlabFormFields = {
  formDetails: {
    formGuid: undefined,
    sitePrepared: undefined,
    concreteThickness: undefined,
    concreteThicknessCustom: undefined,
    InteriorExteriorPlacement: undefined,
    concreteAreaM2: undefined,
    siteVisualsImageVideo: undefined,
    finishedAreaUsage: undefined,
    finishedAreaUsageOther: undefined,
    concreteReinforcementOptions: undefined,
    concreteSlabAdditionalNotes: undefined,
    concreteSlabFinishOptions: undefined,
    patternFinish: undefined,
    patternFinishCustom: undefined,
    powerFloatFinish: undefined,
    areaMapformDetails: undefined,
  },
  formContact: {
    firstName: undefined,
    lastName: undefined,
    company: undefined,
    email: undefined,
    phoneNumber: undefined,
    address: undefined,
  },
};

let portalFrameFormFields = {
  formDetails: {
    quoteForLevellingSite: undefined,
    quoteForInstallation: undefined,
    shedUsage: undefined,
    shedUsageInternals: undefined,
    shedUsageOther: undefined,
    measurementUnits: undefined,
    buildingLength: undefined,
    buildingWidth: undefined,
    buildingHeight: undefined,
    buildingBayWidth: undefined,
    steelOptions: undefined,
    roofPitch: undefined,
    roofPitchCustom: undefined,
    additionalNotes: undefined,
  },
  formWalls: {
    buildingHasWalls: undefined,
    howManySidesHaveWalls: undefined,
    wallMaterial: undefined,
    wallPanelHeight: undefined,
    wallPanelHeightCustom: undefined,
    wallPanelThickness: undefined,
    wallPanelThicknessCustom: undefined,
    wallHeightNumberOfPanels: undefined,
  },
  formRoof: {
    purlins: undefined,
    roofMaterial: undefined,
    fiberCementColour: undefined,
    roofColour: undefined,
    roofCompositeThickness: undefined,
    roofBoxProfileFinish: undefined,
    roofBoxProfileOption: undefined,
    roofCorrugatedSheetFinish: undefined,
    roofCorrugatedSheetOption: undefined,
    roofLights: undefined,
    roofLightsPerBay: undefined,
    roofLightsPerBayCustom: undefined,
    ridgeCaps: undefined,
    solarPanels: undefined,
    solarPanelsInTheFuture: undefined,
    solarPanelsCoverage: undefined,
    solarPanelCoverageCustom: undefined,
    solarPanelQuoteFromProvider: undefined,
  },
  formDoors: {
    rollerDoors: undefined,
    rollerDoorLocation: undefined,
    numberOfRollerDoors: undefined,
    numberOfRollerDoorsCustom: undefined,
    rollerDoorwayWidth: undefined,
    rollerDoorwayHeight: undefined,
    rollerDoorBirdBrush: undefined,
    rollerDoorRubberFloorSeal: undefined,
    rollerDoorPowerFeed: undefined,
    personnelDoors: undefined,
    numberOfPersonnelDoors: undefined,
    personnelDoorWidth: undefined,
    fireDoors: undefined,
    numberOfFireDoors: undefined,
  },
  formCladding: {
    claddingMaterial: undefined,
    claddingColour: undefined,
    claddingCompositeThickness: undefined,
    claddingTimberBoardconsts: undefined,
    claddingBoxProfileconst: undefined,
    claddingBoxProfileType: undefined,
    claddingCorrugatedSheetFinish: undefined,
    cladding_claddingHeight: undefined,
    claddingTecsFixings: undefined,
    guttering: undefined,
    gutteringOutlets: undefined,
  },
  formFloor: {
    concreteFloor: undefined,
    quoteForConcreteFloor: undefined,
    additionalNotesFloor: undefined,
  },
  formContact: {
    firstName: undefined,
    lastName: undefined,
    companyName: undefined,
    email: undefined,
    phoneNumber: undefined,
    address: undefined,
  },
};

const roundHouseFormFields = {
  formDetails: {
    roundHouseSize: undefined,
    animalHandlingInternals: undefined,
    siteRequiresLevelling: undefined,
    quoteForLevellingSite: undefined,
  },
  formContact: {
    firstName: undefined,
    lastName: undefined,
    companyName: undefined,
    email: undefined,
    phoneNumber: undefined,
    address: undefined,
  },
};

const mezzanineFloorFormFields = {
  formDetails: {
    quoteForInstallation: undefined,
    mezzanineOption: undefined,
    mainPostDimensionA: undefined,
    mainPostDimensionB: undefined,
    mainPostDimensionC: undefined,
    gableIntermediatePostsPresent: undefined,
    gablePostDimensionA: undefined,
    gablePostDimensionB: undefined,
    gablePostDimensionC: undefined,
    measurementUnits: undefined,
    buildingLength: undefined,
    buildingWidth: undefined,
    buildingHeight: undefined,
    bayWidth: undefined,
    bayWidthOther: undefined,
    mezzanineSpanOptions: undefined,
    mezzanineFloorHeightSupportPosts: undefined,
    steelOptions: undefined,
    mezzaninePurlins: undefined,
    mezzanineFloorOptions: undefined,
    handRails: undefined,
    floorAccess: undefined,
    forkliftBay: undefined,
    additionalNotes: undefined,
    floorImageVideoUpload: undefined,
  },
  formContact: {
    firstName: undefined,
    lastName: undefined,
    companyName: undefined,
    email: undefined,
    phoneNumber: undefined,
    address: undefined,
  },
};

const getFormDetailsFromCollection = async (collection, guid) => {
  const fieldsToIgnore = [
    "howManyQuotesWouldYouLikeToReceive",
    "formId",
    "formGuid",
    "howManyQuotes",
    "_id",
    "_owner",
    "_createdDate",
    "_updatedDate",
  ];

  const formGuid = guid ?? "test";
  const queryCollection = await getCollectionData(collection, "formGuid", formGuid);

  if (!queryCollection.length) {
    handleErrors(`Could not locate form ${guid} in collection ${collection}`);
  }

  const filteredCollectionData = Object.fromEntries(
    Object.entries(queryCollection[0]).filter(([k, v]) => v !== null && v !== "" && !fieldsToIgnore.includes(k))
  );
  return filteredCollectionData;
};

async function getNearestSuppliers(quoteTypeOption, quoteLatLng, numberOfQuotes) {
  const cn = "SupplierList";
  const lat = quoteLatLng.lat;
  const lng = quoteLatLng.lng;

  // Use to filter by quote type - i.e 'Solar Panels'
  const quoteOption = quoteTypeOption;

  try {
    let suppliers;
    if (quoteOption) {
      suppliers = await wixData
        .query(cn)
        .eq("isActive", true)
        .hasSome("quoteTypesProvided", [quoteOption])
        .limit(1000)
        .find()
        .then((results) => results.items);
    } else {
      suppliers = await getCollectionData(cn, "isActive", true, 1000);
    }

    const distanceInMetres = (lng1, lat1, lng2, lat2) => {
      const er = 6371e3;
      const l1 = (lat1 * Math.PI) / 180;
      const l2 = (lat2 * Math.PI) / 180;
      const clat = ((lat2 - lat1) * Math.PI) / 180;
      const clng = ((lng2 - lng1) * Math.PI) / 180;

      const a =
        Math.sin(clat / 2) * Math.sin(clat / 2) + Math.cos(l1) * Math.cos(l2) * Math.sin(clng / 2) * Math.sin(clng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      // distance in metres
      const d = er * c;
      return d;
    };

    // Return x nearest suppliers
    return suppliers
      .map((s) => ({
        dist: distanceInMetres(lat, lng, s.latitude, s.longitude),
        supplier: s,
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, numberOfQuotes);
  } catch (error) {
    console.log(`Error could not find collection ${cn}, details-\n${error}`);
  }
}

const stringifyForm = (form, name) => {
  const formatField = (f) => (typeof f === "string" ? f.replace(/([a-z])([A-Z])/g, `$1 $2`) : f);

  const formDetails = [];
  const formWalls = [];
  const formRoof = [];
  const formCladding = [];
  const formDoors = [];
  const formFloor = [];
  const formContact = [];

  const formTypeObj =
    name === "Mono Pitch"
      ? monoPitchFormFields
      : name === "Concrete"
      ? concreteSlabFormFields
      : name === "Mezzanine Floor"
      ? mezzanineFloorFormFields
      : name === "Round House"
      ? roundHouseFormFields
      : name === "Portal Frame"
      ? portalFrameFormFields
      : {};

  TEST_MODE && console.log(`Used ${name} to select form template ${JSON.stringify(formTypeObj)}`);

  let measurementUnits = form.measurementUnits === "metric" ? "mm" : "ft";

  console.log("Measure units:", measurementUnits);

  // Iterate over form fields and populate template form objects
  Object.entries(form).map((field) => {
    const key = field[0].replace(/.+_/gi, "");
    let value;

    if (key.toLowerCase() === "address") {
      value = field[1].formatted ?? JSON.stringify(field[1]);
    } else if (key.toLowerCase() === "concreteaream2") {
      value =
        formatField(field[1] + "m²")
          .slice(0, 1)
          .toUpperCase() + field[1].slice(1);
    } else if (typeof field[1] === "string") {
      value = formatField(field[1]).slice(0, 1).toUpperCase() + field[1].slice(1);
    } else {
      value = field[1];
    }

    if (formTypeObj.formDetails && Object.keys(formTypeObj.formDetails).includes(key)) {
      formTypeObj.formDetails[`${key}`] = value;
    } else if (formTypeObj.formWalls && Object.keys(formTypeObj.formWalls).includes(key)) {
      formTypeObj.formWalls[`${key}`] = value;
    } else if (formTypeObj.formRoof && Object.keys(formTypeObj.formRoof).includes(key)) {
      formTypeObj.formRoof[`${key}`] = value;
    } else if (formTypeObj.formCladding && Object.keys(formTypeObj.formCladding).includes(key)) {
      formTypeObj.formCladding[`${key}`] = value;
    } else if (formTypeObj.formDoors && Object.keys(formTypeObj.formDoors).includes(key)) {
      formTypeObj.formDoors[`${key}`] = value;
    } else if (formTypeObj.formFloor && Object.keys(formTypeObj.formFloor).includes(key)) {
      formTypeObj.formFloor[`${key}`] = value;
    } else if (formTypeObj.formContact && Object.keys(formTypeObj.formContact).includes(key)) {
      formTypeObj.formContact[`${key}`] = value;
    } else {
      TEST_MODE && console.log(`Missing form template field for ${key} - ${value}`);
    }
  });

  [
    [formTypeObj.formDetails, formDetails],
    [formTypeObj.formWalls, formWalls],
    [formTypeObj.formRoof, formRoof],
    [formTypeObj.formCladding, formCladding],
    [formTypeObj.formDoors, formDoors],
    [formTypeObj.formFloor, formFloor],
    [formTypeObj.formContact, formContact],
  ].forEach((obj) => {
    if (obj[0]) {
      Object.entries(obj[0]).forEach(([key, value]) => {
        if (value) {
          obj[1].push(`\n\n${formatField(key.slice(0, 1).toUpperCase() + key.slice(1))} -\n${value}`);
        }
      });
    }
  });
  return {
    formDetails: formDetails.length > 0 ? formDetails.join("") : "No details provided",
    formWalls: formWalls.length > 0 ? formWalls.join("") : "No wall details provided",
    formRoof: formRoof.length > 0 ? formRoof.join("") : "No roof details provided",
    formCladding: formCladding.length > 0 ? formCladding.join("") : "No cladding details provided",
    formDoors: formDoors.length > 0 ? formDoors.join("") : "No door details provided",
    formFloor: formFloor.length > 0 ? formFloor.join("") : "No floor details provided",
    formContact: formContact.length > 0 ? formContact.join("") : "No contact details given",
  };
};

const getCollectionData = async (collection, filterField, filter, limit) => {
  TEST_MODE && console.log(`Getting data from ${collection} with filter ${filterField}=${filter}`);
  const queryCollection = await wixData
    .query(collection)
    .eq(filterField, filter)
    .limit(limit ?? 100)
    .find()
    .then((results) => results.items);

  if (!queryCollection.length) {
    handleErrors(`Could not locate collection ${collection}`);
    console.log("No data found in collection", collection);
    return;
  }
  TEST_MODE &&
    console.log(
      `Returning ${queryCollection.length} ${
        queryCollection.length > 0 ? "items" : "item"
      } from collection ${collection}`
    );
  return queryCollection;
};

const handleErrors = async (msg) => {
  if (TEST_MODE) return;
  const getAdminDetails = await getCollectionData("QMSTeam", "role", "DEVELOPER", 100);

  console.log("Sending error notification - ", msg);

  for (const admin of getAdminDetails) {
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

  throw new Error(msg);
};

async function sendSupplierEmail(supplier, options, collection) {
  const emailOptions = {
    variables: {
      supplierName: supplier.supplierName,
      ...options,
    },
  };
  const emailId = "new_form_submission";
  const contactId = supplier.contactId;

  // Send email to supplier
  try {
    triggeredEmails.emailContact(emailId, contactId, emailOptions);

    console.log(`Email was sent to contact ${supplier.supplierName}`);
    // update supplier CMS with id of quotes sent
    const collectionData = await getCollectionData("SupplierList", "_id", supplier._id);
    if (collectionData.length > 0) {
      let supplier = collectionData[0];
      if (Array.isArray(supplier.quotesSent) && supplier.quotesSent.length > 0) {
        let supplierQuotes = supplier.quotesSent ?? [];
        supplierQuotes.push(collection.formGuid);
        supplier.quotesSent = supplierQuotes;
        wixData.update(collection, supplier);
        console.log(`Contact ${supplier.supplierName} quote list updated with form ${collection.formGuid}`);
      }
    }
  } catch (error) {
    handleErrors(
      `Error sending email to supplier ${supplier.supplierName}: ${supplier.emailAddress}, details-\n${error}`
    );
  }
}

const getLatLng = (addressField, guid) => {
  if (addressField.location.latitude && addressField.location.longitude) {
    return {
      lat: addressField.location.latitude,
      lng: addressField.location.longitude,
    };
  } else if (addressField.postcode) {
    const url = `https://api.postcodes.io/postcodes/${addressField.postcode}`;
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
  } else {
    handleErrors(`No location or postcode provided for form ${guid} - ${JSON.stringify(addressField)}`);
  }
};

export const prepareFormData = (rawFormData) => {
  let formObject = {};
  console.log("PREPARING FORM DATA", rawFormData);

  // strip out everything but field names
  const fieldId = rawFormData.formId ?? null;
  for (let [key, value] of Object.entries(rawFormData)) {
    const regex = new RegExp(fieldId ? `.*${fieldId}\:{1}` : /(.*:)/, "g");
    formObject[key.replace(regex, "")] = value;
  }

  // Format form name
  const formName = formObject.formName
    ? formObject.formName
        .replace("Home - submit into ", "")
        .replace(" Quotes collection", "")
        .replace(" Form collection", "")
    : "Unknown form name";

  const formGuid = formObject.formGuid;
  const address = formObject.address && formObject.address.formatted;

  if (!address || !formName || !formGuid) {
    handleErrors(`Form incomplete or missing fields:${" " + address}${" " + formName}${" " + formGuid}`);
  }

  return { ...formObject, formName, formGuid, address };
};

export const getCollection = (formName) => {
  let typeString = formName.replace(/\s/g, "");
  let typeRegExp = new RegExp(typeString, "gi");
  return qmsStoreCollections.find((i) => {
    return !!i.match(typeRegExp);
  });
};

export const getSuppliers = async (formGuid) => {
  let suppliers = [];
  // identify suppliers for this form
  // ensure that the IDs are the same for each form

  // quoteForQuantitySurveyor === "yes"
  // "details_quoteForInstallation": "quoteFromOtherSteelErector",
  // "field:comp-m709keah:details_quoteForLevellingSite": "",
  // "solarPanelQuoteFromProvider": "yes",
  // "floor_concretedFloorQuote": "yes",
  // "mezzanineFloor_quoteFromSupplier": "quoteFromOtherSteelErector",

  // get all suppliers within 50miles for this suppliers

  // if none then expand the net.

  // return array of suppliers

  // identify the specific form answers for the specific suppliers

  // getNearestSuppliers;
  return suppliers;
};

export const invoke = async ({ payload }) => {
  if (payload.TEST_COMPLETION) TEST_MODE = true;
  console.log("TESTMODE", TEST_MODE, "\n", "PAYLOAD", payload);

  const formObject = prepareFormData(payload);
  const { formName, formGuid } = formObject;
  const collection = getCollection(formName);

  console.log("FORMOBJECT", formObject, "\n", `formName: ${formName}`, "\n", `formGuid: ${formGuid}`);

  if (formGuid && formName) {
    const completedForm = await getFormDetailsFromCollection(collection, formGuid);

    console.log("COMP FORM", completedForm);

    const suppliers2 = await getSuppliers();

    if (suppliers2.length <= 10) return;

    const numberOfQuotes = Object.entries(formObject).find((keyVal) =>
      keyVal[0].toLowerCase().startsWith("howmanyquotes")
    )[1];

    const quoteLatLng = getLatLng(completedForm.address, formGuid);

    console.log("NUMBER OF QUOTES", numberOfQuotes);

    // Suppliers needed - always building, then pass in solar panels, concrete, erection etc etc
    // IF only a concrete supplier etc - only send them relative fields

    const suppliers = TEST_MODE
      ? await getNearestSuppliers("test", quoteLatLng, numberOfQuotes)
      : await getNearestSuppliers(formName, quoteLatLng, numberOfQuotes);

    const solarSuppliers = await getNearestSuppliers("Solar Panels", quoteLatLng, numberOfQuotes);

    console.log("SUPPLIERS", suppliers);
    console.log("Solar SUPPLIERS", solarSuppliers);

    const quoteTypesPresentInForm = (completedForm) => {
      let quoteTypes = [completedForm.formName];

      // solar panel quote
      if (completedForm.solarPanelQuoteFromProvider) {
        quoteTypes.push("Solar Panels");
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
        quoteTypes.push("Concrete Internal");
      }
    };

    // Filter suppliers by active status and same quotation type
    const getBuildingSuppliers = suppliers.filter(
      (supp) => supp.supplier.isActive && supp.supplier.quoteTypesProvided.includes(quoteTypesPresentInForm)
    );

    // Email suppliers for main buildings
    const emailMainSupplier = () => {};

    // Email suppliers for groundworks, concrete and/or solar panels
    const emailMinorSupplier = () => {};

    // get form details from collection

    // send to suppliers - whole form and groundworkers etc.
    // if xyz is filled, send to groundworkers etc.

    // Send email to each supplier with quote details
    //   for (let i = 0; i <= (qn >= ssl.length ? ssl.length : qn) - 1; i++) {

    const stringifiedForm = stringifyForm(completedForm, formName);

    TEST_MODE && console.log("Stringified Form", stringifiedForm);

    const emailOptions = {
      submittedName: completedForm.firstName + " " + completedForm.lastName,
      submittedType: `New ${formName}`,
      //   submittedDistance: Math.trunc(ssl[i].dist / 1000),
      submittedDistance: 40,
      formDetails: stringifiedForm.formDetails,
      formWalls: stringifiedForm.formWalls,
      formRoof: stringifiedForm.formRoof,
      formCladding: stringifiedForm.formCladding,
      formDoors: stringifiedForm.formDoors,
      formFloor: stringifiedForm.formFloor,
      formContact: stringifiedForm.formContact,
    };

    suppliers.forEach((ssl) => {
      console.log("SSL", ssl);
      try {
        // sendSupplierEmail(ssl.supplier, emailOptions, { formGuid: formGuid, formCollection: collection });
        console.log("Emails mock - test mode");
      } catch (error) {
        handleErrors(error);
        console.log(`Error sending email to supplier: ${ssl.supplier.supplierName}\n`, error.message);
      }
    });
  } else {
    handleErrors(`Missing formGuid for form ${formName}`);
  }

  // The function must return an empty object, do not delete
  return {};
};
