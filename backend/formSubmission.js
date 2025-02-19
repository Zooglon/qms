/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */
import wixData from "wix-data";
import { triggeredEmails, contacts } from "wix-crm-backend";

const TEST_MODE = true;

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

const portalFrameFormFields = {
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
    claddingCorrugatedSheetFinish: undefined,
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
    company: undefined,
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

const getFormDetailsFromCollection = async (type, guid) => {
  const collectionList = [
    "MezzanineFloorForm",
    "ConcreteSlabQuotes",
    "MonoPitchQuotes",
    "PortalFrameQuotes",
    "RoundHouseForm",
  ];

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

  let typeString = type.replace(" ", "");
  let typeRegExp = new RegExp(typeString, "gi");
  let collection = collectionList.find((i) => {
    return !!i.match(typeRegExp);
  });
  const formGuid = guid ?? "test";
  const queryCollection = await wixData
    .query(collection)
    .eq("formGuid", formGuid)
    .find()
    .then((results) => results.items);

  if (!queryCollection.length) {
    handleErrors(`Could not locate form ${guid} in collection ${collection}`);
    console.log("No data found in collection", collection);
  }

  const filteredCollectionData = Object.fromEntries(
    Object.entries(queryCollection[0]).filter(([k, v]) => v !== null && v !== "" && !fieldsToIgnore.includes(k))
  );
  return filteredCollectionData;
};

async function getSuppliers(quoteTypeOption) {
  const cn = "SupplierList";

  // Use to filter by quote type - i.e 'Solar Panels'
  const quoteOption = quoteTypeOption;

  try {
    let retrievedCollection;
    if (quoteOption) {
      retrievedCollection = await wixData
        .query(cn)
        .eq("isActive", true)
        .hasSome("quoteTypesProvided", [quoteOption])
        .limit(1000)
        .find()
        .then((results) => results.items);
    } else {
      retrievedCollection = await wixData
        .query(cn)
        .eq("isActive", true)
        .limit(1000)
        .find()
        .then((results) => results.items);
    }

    // Filter suppliers by active status and same quotation type
    // const fsl = sl.filter((s) => s.isActive && s.quoteTypesProvided.includes(ffn));

    // Sort suppliers by distance
    // const ssl = fsl
    //   .map((s) => ({
    //     dist: distanceInMetres(pcc.lat, pcc.lng, s.latitude, s.longitude),
    //     supplier: s,
    //   }))
    //   .sort((a, b) => a.dist - b.dist);

    return retrievedCollection;
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
      : name === "Concrete Slab"
      ? concreteSlabFormFields
      : name === "Mezzanine Floor"
      ? mezzanineFloorFormFields
      : name === "Round House"
      ? roundHouseFormFields
      : name === "Portal Frame"
      ? portalFrameFormFields
      : {};

  TEST_MODE && console.log("FormTypeObj - PRE", formTypeObj);

  // Iterate over form fields and populate template form objects
  Object.entries(form).forEach((field) => {
    const key = field[0].replace(/.+_/gi, "");
    let value;

    if (key.toLowerCase() === "address") {
      value = field[1].formatted ?? JSON.stringify(field[1]);
    } else if (key.toLowerCase() === "concreteaream2") {
      value = formatField(field[1] + "m²");
    } else {
      value = formatField(field[1]);
    }

    // If cant find form template - send email to developer and also use generic form template.
    if (formTypeObj.formDetails && Object.keys(formTypeObj.formDetails).includes(key)) {
      formTypeObj.formDetails[key] = value;
    } else if (formTypeObj.formWalls && Object.keys(formTypeObj.formWalls).includes(key)) {
      formTypeObj.formWalls[key] = value;
    } else if (formTypeObj.formRoof && Object.keys(formTypeObj.formRoof).includes(key)) {
      formTypeObj.formRoof[key] = value;
    } else if (formTypeObj.formCladding && Object.keys(formTypeObj.formCladding).includes(key)) {
      formTypeObj.formCladding[key] = value;
    } else if (formTypeObj.formDoors && Object.keys(formTypeObj.formDoors).includes(key)) {
      formTypeObj.formDoors[key] = value;
    } else if (formTypeObj.formFloor && Object.keys(formTypeObj.formFloor).includes(key)) {
      formTypeObj.formFloor[key] = value;
    } else if (formTypeObj.formContact && Object.keys(formTypeObj.formContact).includes(key)) {
      formTypeObj.formContact[key] = value;
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
    formDetails: formDetails.join(""),
    formWalls: formWalls.join(""),
    formRoof: formRoof.join(""),
    formCladding: formCladding.join(""),
    formDoors: formDoors.join(""),
    formFloor: formFloor.join(""),
    formContact: formContact.join(""),
  };
};

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

async function sendSupplierEmail(supplier, options) {
  const emailOptions = {
    variables: {
      supplierName: supplier.supplierName,
      ...options,
    },
  };
  const emailId = "new_form_submission";
  const contactId = supplier.contactId;

  console.log("Emails options", emailOptions);

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

export const invoke = async ({ payload }) => {
  // Get postcode of quote site
  console.log("PAYLOAD", payload);
  let formObject = {};

  // strip out everything but field names
  for (let [key, value] of Object.entries(payload)) {
    formObject[key.replace(/(.*:)/gi, "")] = value;
  }

  // Format form name
  formObject.formName = formObject.formName
    .replace("Home - submit into ", "")
    .replace(" Quotes collection", "")
    .replace(" Form collection", "");

  console.log(
    "FORMOBJECT",
    formObject,
    "\n",
    `formName: ${formObject.formName}`,
    "\n",
    `formGuid: ${formObject.formGuid}`
  );

  if (formObject.formGuid) {
    const completedForm = await getFormDetailsFromCollection(formObject.formName, formObject.formGuid);

    console.log("COMP FORM", completedForm);

    const numberOfQuotes = Object.keys(formObject).find((key) => key.toLowerCase().startsWith("howmanyquotes"));

    console.log("NUMBER OF QUOTES", numberOfQuotes);

    // Suppliers needed - always building, then pass in solar panels, concrete, erection etc etc
    // IF only a concrete supplier etc - only send them relative fields

    const suppliers = TEST_MODE ? await getSuppliers("test") : await getSuppliers();
    const solarSuppliers = await getSuppliers("Solar Panels");

    console.log("SUPPLIERS", suppliers);
    console.log("Solar SUPPLIERS", solarSuppliers);

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

    // Send email to each supplier with quote details
    //   for (let i = 0; i <= (qn >= ssl.length ? ssl.length : qn) - 1; i++) {

    const stringifiedForm = stringifyForm(completedForm, formObject.formName);

    TEST_MODE && console.log("Stringified Form", stringifiedForm);

    const emailOptions = {
      submittedName: completedForm.firstName + " " + completedForm.lastName,
      submittedType: `New ${formObject.formName}`,
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
      try {
        sendSupplierEmail(ssl, emailOptions);
      } catch (error) {
        handleErrors(error);
        console.log(`Error sending email to supplier: ${ssl.supplierName}\n`, error.message);
      }
    });
  } else {
    handleErrors(`Missing formGuid for form ${formObject.formName}`);
  }

  // The function must return an empty object, do not delete
  return {};
};
