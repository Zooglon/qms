/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */

import wixData from "wix-data";
import { triggeredEmails, contacts } from "wix-crm-backend";
import { fetch } from "wix-fetch";
import { Permissions, webMethod } from "wix-web-module";
import { collections } from "wix-data.v2";

let TEST_MODE = false;

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
    internalsStable: undefined,
    internalsHorseCow: undefined,
    internalsCustom: undefined,
    measurementUnits: undefined,
    buildingLength: undefined,
    buildingWidth: undefined,
    buildingHeight: undefined,
    buildingHeightHighSideToEaves: undefined,
    buildingHeightLowSideToEaves: undefined,
    bayWidth: undefined,
    postDimensionA: undefined,
    postDimensionB: undefined,
    postDimensionC: undefined,
    roofPitch: undefined,
    additionalNotes: undefined,
    siteVisuals: undefined,
    alternativeDesign: undefined,
  },
  formWalls: {
    willTheBuildingHaveWalls: undefined,
    howManySidesHaveWalls: undefined,
    wallMaterial: undefined,
    wallPanelHeight: undefined,
    wallPanelHeightCustom: undefined,
    wallHowManyPanelsHigh: undefined,
    wallBrickBlockHeightM: undefined,
    wallPanelThickness: undefined,
    wallPanelThicknessCustom: undefined,
  },
  formRoof: {
    roofPurlins: undefined,
    roofMaterial: undefined,
    roofColour: undefined,
    compositeThickness: undefined,
    boxProfileOption: undefined,
    boxProfileFinishTop: undefined,
    boxProfileFinishUnderneath: undefined,
    corrugatedSheetOption: undefined,
    corrugatedSheetFinish: undefined,
    roofColourFibreCement: undefined,
    roofLights: undefined,
    roofLightsPerBay: undefined,
    roofLightsPerBayCustom: undefined,
    roofHasCantilever: undefined,
    cantileverSize: undefined,
    cantileverSide: undefined,
    roofRidgeCaps: undefined,
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
    claddingWidthWindbreaker: undefined,
    claddingHeightWindbreaker: undefined,
    claddingWallWidthWindbreaker: undefined,
    claddingColourWindbreaker: undefined,
    claddingCompositeThickness: undefined,
    claddingTimberBoardType: undefined,
    claddingBoxProfileType: undefined,
    claddingCorrugatedSheetType: undefined,
    claddingHeight: undefined,
    claddingTecsFixings: undefined,
    guttering: undefined,
    matchExistingGuttering: undefined,
    gutteringTypeShape: undefined,
    gutteringSideAmm: undefined,
    gutteringSideBmm: undefined,
    gutteringSideCmm: undefined,
    gutteringSideDmm: undefined,
    gutteringSideEmm: undefined,
    gutteringSideFmm: undefined,
    gutteringSideGmm: undefined,
    gutteringAngle2degrees: undefined,
    gutteringAngle1degrees: undefined,
    gutteringColour: undefined,
    gutteringDownpipeSize: undefined,
    gutteringRainwaterCatchment: undefined,
    gutteringRainwaterCatchmentTankSize: undefined,
  },
  formDoors: {
    rollerDoors: undefined,
    rollerDoorLocation: undefined,
    numberOfRollerDoorsGableEnd: undefined,
    numberOfRollerDoorsUnderEaves: undefined,
    rollerDoorWidthUnderEavesM: undefined,
    rollerDoorWidthGableEndM: undefined,
    rollerDoorHeightGableEndM: undefined,
    rollerDoorHeightUnderEavesM: undefined,
    rollerDoorBirdBrush: undefined,
    rollerDoorRubberFloorSeal: undefined,
    rollerDoorPowerFeed: undefined,
    personnelDoors: undefined,
    numberOfPersonnelDoors: undefined,
    personnelDoorWidth: undefined,
    personnelDoorsAreFireDoors: undefined,
    numberOfFireEscapeDoors: undefined,
    flatSheetDoor: undefined,
    flatSheetDoorPlacement: undefined,
    flatSheetDoorUnderEavesPosition: undefined,
    numberOfFlatSheetDoorsUnderEaves: undefined,
    numberOfFlatSheetDoorsGableEnd: undefined,
    flatSheetDoorUnderEavesWidth: undefined,
    flatSheetDoorGableEndWidth: undefined,
    flatSheetDoorUnderEavesHeight: undefined,
    flatSheetDoorGableEndHeight: undefined,
    flatSheetDoorOption: undefined,
    flatSheetDoorColour: undefined,
  },
  formFloor: {
    concretedFloor: undefined,
    concretedFloorQuote: undefined,
    floorUsage: undefined,
    floorUsageCustom: undefined,
    floorReinforcement: undefined,
    floorFinish: undefined,
    floorFinishPattern: undefined,
    floorFinishPowerFloat: undefined,
    floorPatternCustom: undefined,
    quoteForConcretingFloor: undefined,
    additionalNotesFloor: undefined,
    floorVisuals: undefined,
  },
  formMezzanineFloor: {
    buildingHasMezzanineFloor: undefined,
    quoteFromSupplier: undefined,
    mezzanineFloorCoverage: undefined,
    freestanding: undefined,
    bayWidth: undefined,
    mezzanineFloorNumberOfBaysCovered: undefined,
    bayWidthOther: undefined,
    spanOptions: undefined,
    height: undefined,
    steelOptions: undefined,
    purlins: undefined,
    options: undefined,
    mezzanineFloorUsage: undefined,
    usageOther: undefined,
    handRails: undefined,
    access: undefined,
    forkliftBay: undefined,
    additionalNotes: undefined,
  },
  formContact: {
    // howManyQuotes: undefined,
    // details_quoteRadiusKm: undefined,
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
    Thickness: undefined,
    Reinforcement: undefined,
    "Dig Out": undefined,
    "Photo/Video": undefined,
    "Map of Area": undefined,
    Placement: undefined,
    Usage: undefined,
    Finish: undefined,
    // formGuid: undefined,
    // sitePrepared: undefined,
    // quoteForQuantitySurveyor: undefined,
    // concreteThickness: undefined,
    // concreteThicknessCustom: undefined,
    // interiorExteriorPlacement: undefined,
    // concreteAreaM2: undefined,
    // siteVisualsImageVideo: undefined,
    // finishedAreaUsage: undefined,
    // finishedAreaUsageOther: undefined,
    // concreteReinforcementOptions: undefined,
    // concreteSlabAdditionalNotes: undefined,
    // concreteSlabFinishOptions: undefined,
    // patternFinish: undefined,
    // patternFinishCustom: undefined,
    // powerFloatFinish: undefined,
    // areaMapformDetails: undefined,
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
    siteImagesVideos: undefined,
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
    buildingType: undefined,
    existingPostDimensionA: undefined,
    existingPostDimensionB: undefined,
    existingPostDimensionC: undefined,
    roofPitch: undefined,
    roofPitchCustom: undefined,
    additionalNotes: undefined,
    alternativeDesign: undefined,
  },
  formWalls: {
    buildingHasWalls: undefined,
    howManySidesHaveWalls: undefined,
    wallMaterial: undefined,
    wallBrickBlockHeightM: undefined,
    wallPanelHeight: undefined,
    wallPanelHeightCustom: undefined,
    wallPanelThickness: undefined,
    wallPanelThicknessCustom: undefined,
    wallHeightNumberOfPanels: undefined,
  },
  formRoof: {
    purlins: undefined,
    cantilever: undefined,
    cantileverSize: undefined,
    roofMaterial: undefined,
    fiberCementColour: undefined,
    roofColour: undefined,
    roofCompositeThickness: undefined,
    roofBoxProfileFinish: undefined,
    roofBoxProfileFinishUnderneath: undefined,
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
    numberOfRollerDoorsGableEnd: undefined,
    numberOfRollerDoorsUnderEaves: undefined,
    rollerDoorwayWidthUnderEavesMm: undefined,
    rollerDoorwayWidthGableEndMm: undefined,
    rollerDoorwayHeightUnderEavesMm: undefined,
    rollerDoorwayHeightUnderEavesM: undefined,
    rollerDoorBirdBrush: undefined,
    rollerDoorRubberFloorSeal: undefined,
    rollerDoorPowerFeed: undefined,
    flatSheetDoor: undefined,
    flatSheetDoorPlacement: undefined,
    flatSheetDoorUnderEavesPostition: undefined,
    numberOfDoorsUnderEavesFlatSheet: undefined,
    numberOfDoorsGableEndFlatSheet: undefined,
    eavesDoorWidthFlatSheet: undefined,
    flatSheetEavesDoorHeight: undefined,
    gableEndDoorWidthFlatSheet: undefined,
    flatSheetGableDoorHeight: undefined,
    flatSheetDoorOption: undefined,
    doorColourFlatSheet: undefined,
    personnelDoors: undefined,
    personnelDoorWidth: undefined,
    numberOfPersonnelDoors: undefined,
    numberOfPersonnelDoorsDouble: undefined,
    fireDoors: undefined,
    numberOfFireDoors: undefined,
  },
  formCladding: {
    buildingHasCladding: undefined,
    claddingMaterial: undefined,
    claddingColour: undefined,
    claddingCompositeThickness: undefined,
    claddingTimberBoardTypes: undefined,
    claddingBoxProfileType: undefined,
    claddingCorrugatedSheetFinish: undefined,
    claddingHeight: undefined,
    claddingWidthWindbreaker: undefined,
    claddingHeightWindbreaker: undefined,
    claddingWallWindbreaker: undefined,
    claddingTecsFixings: undefined,
    guttering: undefined,
    gutteringOutlets: undefined,
    matchExistingGuttering: undefined,
    gutteringTypeShape: undefined,
    gutteringSideAmm: undefined,
    gutteringSideBmm: undefined,
    gutteringSideCmm: undefined,
    gutteringSideDmm: undefined,
    gutteringSideEmm: undefined,
    gutteringSideFmm: undefined,
    gutteringSideGmm: undefined,
    gutteringAngle2degrees: undefined,
    gutteringAngle1degrees: undefined,
    gutteringColour: undefined,
    gutteringDownpipe: undefined,
    gutteringRainwaterCatchment: undefined,
    gutteringRainwaterCatchmentTank: undefined,
  },
  formFloor: {
    concreteFloor: undefined,
    quoteForConcreteFloor: undefined,
    floorUsage: undefined,
    floorUsageOther: undefined,
    floorReinforcementOptions: undefined,
    floorFinish: undefined,
    floorFinishPattern: undefined,
    floorFinishPatternCustom: undefined,
    floorPowerFloat: undefined,
    additionalNotesFloor: undefined,
  },
  formMezzanineFloor: {
    buildingHasMezzanineFloor: undefined,
    quoteFromSupplier: undefined,
    freestanding: undefined,
    bayWidth: undefined,
    mezzanineFloorCoverage: undefined,
    spanOptions: undefined,
    height: undefined,
    steelOptions: undefined,
    purlins: undefined,
    options: undefined,
    usage: undefined,
    handRails: undefined,
    access: undefined,
    forkliftBay: undefined,
    additionalNotes: undefined,
  },
  formContact: {
    quoteRadiusKm: undefined,
    howManyQuotes: undefined,
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
    usage: undefined,
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
    quoteForLevellingSite: undefined,
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
    quoteRadiusKm: undefined,
  },
  formContact: {
    howManyQuotes: undefined,
    firstName: undefined,
    lastName: undefined,
    companyName: undefined,
    email: undefined,
    phoneNumber: undefined,
    address: undefined,
  },
};

const polytunnelFormFields = {
  formDetails: {
    siteNeedsLevelling: undefined,
    quoteForLevelling: undefined,
    polytunnelWidth: undefined,
    polytunnelLength: undefined,
    polytunnelCovering: undefined,
    doors: undefined,
    doorPlacement: undefined,
    guttering: undefined,
    gutteringBothSides: undefined,
    anchoring: undefined,
    quoteRadiusKm: undefined,
    polytunnelUsage: undefined,
  },
  formContact: {
    howManyQuotes: undefined,
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

  console.log("Form details from collection:", queryCollection);

  if (!queryCollection) {
    handleErrors(`Could not locate form ${guid} in collection ${collection}`);
  }

  const filteredCollectionData = Object.fromEntries(
    Object.entries(queryCollection[0]).filter(([k, v]) => v !== null && v !== "" && !fieldsToIgnore.includes(k))
  );
  return filteredCollectionData;
};

export const sortSuppliersByDistance = (suppliers, quoteLatLng) => {
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
    .map((s) => ({ ...s, distance: distanceInMetres(quoteLatLng.lat, quoteLatLng.lng, s.latitude, s.longitude) }))
    .sort((a, b) => a.distance - b.distance);
};

const formatField = (field) => {
  return typeof field === "string" ? field.replace(/([a-z])([A-Z])/g, (_, lower, upper) => `${lower} ${upper}`) : field;
};

const formatSection = (formSection, dot) => {
  return Object.entries(formSection)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      let val = key.toLowerCase() === "address" ? value.formatted ?? JSON.stringify(value) : value;
      let formattedVal = `${formatField(val)}`;

      return `${dot ? "• " : ""}${formatField(
        key.replace(/.+_/gi, "").slice(0, 1).toUpperCase() + key.replace(/.+_/gi, "").slice(1)
      )} - ${formattedVal.slice(0, 1).toUpperCase() + formattedVal.slice(1)}`;
    })
    .join("\n");
};

export const stringifyForm = (form, name) => {
  const { firstName, lastName, companyName, company, email, emailAddress, phoneNumber, address, ...otherFields } = form;

  let additionalFields = otherFields;

  if (form.formResponse && form.formResponse.fields !== null) {
    console.log("Form response fields found", typeof form.formResponse.fields);

    const parsedFields = JSON.parse(form.formResponse.fields);

    // Define contact fields to exclude
    const contactFields = [
      "First Name",
      "Last Name",
      "Company Name",
      "Company",
      "Email",
      "Email Address",
      "Phone Number",
      "Address",
    ];

    // Convert array to key-value pairs and filter out contact fields
    const keyVals = parsedFields.reduce((acc, field) => {
      // Only add if the label is not in the contactFields array
      if (!contactFields.includes(field.label)) {
        acc[field.label] = field.value;
      }
      return acc;
    }, {});

    additionalFields = keyVals;
  }

  const formTypeObj = {
    MonoPitch: monoPitchFormFields,
    Concrete: concreteSlabFormFields,
    ConcreteSlab: concreteSlabFormFields,
    MezzanineFloor: mezzanineFloorFormFields,
    RoundHouse: roundHouseFormFields,
    PortalFrame: portalFrameFormFields,
    Polytunnel: polytunnelFormFields,
  }[name];

  const { formDetails, formWalls, formRoof, formCladding, formDoors, formFloor, formMezzanineFloor, formContact } =
    formTypeObj || {};

  // const formatField = (f) => (typeof f === "string" ? f.replace(/([a-z])([A-Z])/g, `$1 $2`) : f);
  // let key = lowerFirst(field[0].replace(/.+_/gi, ""));

  let formString;

  // if (formTypeObj) {
  //   formString = {
  //     "Form Details": formDetails && formatSection(form, false),
  //     "Form Walls": formWalls && formatSection(form, false),
  //     "Form Roof": formRoof && formatSection(form, false),
  //     "Form Cladding": formCladding && formatSection(form, false),
  //     "Form Doors": formDoors && formatSection(form, false),
  //     "Form Floor": formFloor && formatSection(form, false),
  //     "Form Mezzanine Floor": formMezzanineFloor && formatSection(form, false),
  //     "Form Contact": formatSection(form, false) || "No contact details given",
  //   };
  // } else {
  formString = {
    "Form Contact":
      formatSection(
        {
          firstName,
          lastName,
          companyName,
          company,
          email,
          emailAddress,
          phoneNumber,
          address,
        },
        false
      ) || "No contact details given",
    Fields: formatSection(additionalFields, true),
    // };
  };

  console.log("ADD str", additionalFields, "formatted: ", formatSection(additionalFields, true));

  // Remove sections with no data
  const filteredFormString = Object.fromEntries(Object.entries(formString).filter(([, value]) => value));

  TEST_MODE && console.log("Form stringified:", filteredFormString);
  return filteredFormString;
};

const getCollectionData = async (collection, filterField, filter, lmt) => {
  TEST_MODE &&
    console.log(
      `Getting ${!filterField && !filter ? "all" : ""} ${
        filterField && filter ? "with filter " + filterField + "=" + filter : ""
      }`
    );

  let limit = lmt ?? 100;

  // const queryResponse = await wixData
  //   .query(collection)
  //   .isNotEmpty("supplierType")
  //   .limit(limit)
  //   .find()
  //   .then((results) => {
  // const items = results.items;
  //     return items.map(i => i.supplierType);
  //   });

  try {
    const queryResponse = await wixData
      .query(collection)
      .eq(filterField, filter)
      .limit(limit)
      .find()
      .then((results) => results.items);

    if (!queryResponse.length) {
      handleErrors(`Could not locate collection ${collection}`);
      console.log("No data found in collection", collection);
      return;
    }
    TEST_MODE &&
      console.log(
        `Returning ${queryResponse.length} ${queryResponse.length > 0 ? "items" : "item"} from collection ${collection}`
      );
    return queryResponse;
  } catch (error) {
    handleErrors(`Error querying data from ${collection}: ${error}`);
  }
};

const handleErrors = async (msg) => {
  if (TEST_MODE) {
    throw new Error(msg);
  } else {
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
  }
};

const saveToDb = async (formName, formGuid, suppliers) => {
  console.log("Check vals - ", formName, formGuid, suppliers);
  const updatedDataCollection = {
    _id: "QuotationDB",
    fields: [
      {
        key: "formName",
        displayName: formName,
        type: "TEXT",
      },
      {
        key: "formGuid",
        displayName: formGuid,
        type: "TEXT",
      },
      // {
      //   key: "sentSuppliersList",
      //   displayName: suppliers,
      //   type: "ARRAY_STRING",
      // },
    ],
    revision: "2",
    permissions: {
      read: "SITE_MEMBER",
      insert: "SITE_MEMBER_AUTHOR",
      update: "SITE_MEMBER_AUTHOR",
      remove: "SITE_MEMBER_AUTHOR",
    },
  };

  console.log("SavetoDB fired... sending...");

  const updateCollection = webMethod(Permissions.Anyone, async (updatedDataCollection) => {
    try {
      const updateDataCollectionResponse = await collections.updateDataCollection(updatedDataCollection);
      console.log("fetch made...");
      return updateDataCollectionResponse;
    } catch (error) {
      handleErrors(`Failed to update quote collection: ${error}`);
    }
  });

  const res = await updateCollection(updatedDataCollection);

  console.log("RES...", res);
  return res;
};

async function sendSupplierEmail(supplier, options, collection) {
  const emailOptions = {
    variables: {
      supplierName: supplier.supplierName,
      ...options,
    },
  };
  const emailId = "new_form_submission";

  const concreteEmailId = "concreteEmail";
  const concreteVariables = {
    submittedDistance: "Distance: ",
    buildingSize: "Size: ",
    thickness: "Thickness: ",
    reinforcement: "Reinforcement: ",
    dig_out: "Dig Out: ",
    photo_video: "Photo/Video: ",
    area_map: "Map of Area: ",
    placement: "Placement: ",
    usage: "Usage: ",
    finish: "Finish: ",
    submittedName: "Name: ",
    submittedEmail: "Email: ",
    submittedPhone: "Phone: ",
  };

  const contactId = supplier.contactId;

  console.log("Email sent to:", emailId, contactId, "with: ", emailOptions);
  // Send email to supplier
  try {
    if (TEST_MODE) {
    } else {
      await triggeredEmails.emailContact(emailId, contactId, emailOptions);

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

export const matchFormName = (formNameString, formNamesList) => {
  if (!formNameString || typeof formNameString !== "string") {
    return "unknown";
  }

  // Normalize the input string for comparison
  let normalisedInput = formNameString.toLowerCase().replace(/\s+/g, "");

  const matchedForm = formNamesList.find((formName) => {
    const normalisedFormName = formName.toLowerCase().replace(/\s+/g, "");
    return normalisedInput.includes(normalisedFormName) || normalisedFormName.includes(normalisedInput);
  });

  // qmsStoreCollections;
  return matchedForm || "unknown";
};

export const prepareFormData = (rawFormData) => {
  let formObject = {};
  let fields = {};

  const fieldId = rawFormData.formId ?? null;
  for (let [key, value] of Object.entries(rawFormData)) {
    const regex = new RegExp(fieldId ? `.*${fieldId}\:{1}` : /(.*:)/, "g");
    if (key.startsWith("field:")) {
      const formattedKay = key.replace(regex, "");
      if (!formattedKay.startsWith("_")) {
        fields[formattedKay] = value;
      }
    }
    formObject[key.replace(regex, "")] = value;
  }

  // Format form name
  const formName = formObject.formName
    ? formObject.formName
        .replace("Home - submit into ", "")
        .slice(formObject.formName.indexOf("submit into ") + 12)
        .replace(" Quotes collection", "")
        .replace(" Form collection", "")
    : "Unknown form name";

  const formGuid = formObject.formGuid;
  const address = formObject.address ?? undefined;
  const latLng = !address
    ? undefined
    : { lat: formObject.address.location.latitude, lng: formObject.address.location.longitude };
  const email = formObject.email;

  if (!formName || !formGuid || !email) {
    handleErrors(`Form incomplete or missing fields:${" " + formName}${" " + formGuid}`);
  }
  console.log("Fields", fields);
  console.log("FormName", formName);
  console.log("FormGuid", formGuid);
  return { fields, formName, formGuid, address, latLng, email };
};

export const getCollection = (formName) => {
  let typeString = formName.replace(/\s/g, "");
  let typeRegExp = new RegExp(typeString, "gi");

  const matchedName = matchFormName(formName, qmsStoreCollections);

  return qmsStoreCollections.find((i) => {
    return !!i.match(typeRegExp);
  });
};

export const getFieldValue = (form, field, searchByValue) => {
  let retVal = Object.entries(form).find(([key, value]) => key.toLowerCase().includes(field.toLowerCase()));

  if (!retVal && searchByValue) {
    retVal = Object.entries(form).find(([key, value]) => value.toLowerCase().includes(field.toLowerCase()));
  }

  return retVal ? retVal[1] : null;
};

export const getAllSupplierTypesInForm = (supplierList, formAnswers) => {
  const requiredSupplierTypes = new Set();

  Object.entries(formAnswers).forEach(([fieldKey, fieldValue]) => {
    if (
      fieldValue === "yes" ||
      fieldValue === true ||
      fieldKey.toLowerCase().includes("supply") ||
      fieldKey.toLowerCase().includes("quote") ||
      typeof fieldValue !== "object"
    ) {
      const normalizedFieldKey = fieldKey.toLowerCase().replace(/[^a-z]/g, "");
      const normalizedFieldValue =
        typeof fieldValue !== "string" ? `${fieldValue}` : fieldValue.toLowerCase().replace(/[^a-z]/g, "");
      // console.log("normalised fieldKey", fieldKey, "normalised fieldValue", fieldValue);

      supplierList.forEach((supplierListChild) => {
        if (
          normalizedFieldKey.includes(supplierListChild.supplierType.toLowerCase()) ||
          normalizedFieldValue.includes(supplierListChild.supplierType.toLowerCase())
        ) {
          requiredSupplierTypes.add(supplierListChild.supplierType);
        } else if (
          normalizedFieldKey.includes(supplierListChild.baseType.toLowerCase()) ||
          normalizedFieldValue.includes(supplierListChild.baseType.toLowerCase())
        ) {
          requiredSupplierTypes.add(supplierListChild.baseType);
        }
      });
    }
  });

  const supplierTypesNeeded = Array.from(requiredSupplierTypes);

  return [...supplierTypesNeeded, formAnswers.formName];
};

const asbestosQuestionPatterns = [
  "containasbestos",
  "containsasbestos",
  "haveasbestos",
  "hasasbestos",
  "madeofasbestos",
  "asbestospresent",
  "asbestosispresent",
  "asbestosin",
  "withasbestos",
  "includingasbestos",
  "asbestos",
];

const asbestosQuestionAntiPatterns = [
  "doesnotcontainasbestos",
  "doesntcontainasbestos",
  "doesntcontainsasbestos",
  "noasbestos",
  "hasasbestos",
  "notmadeofasbestos",
  "noasbestospresent",
  "noasbestosispresent",
  "noasbestosin",
  "notwithasbestos",
  "notincludingasbestos",
];

export const checkQuestionForAsbestos = (questionString, questionKey = "") => {
  const normalizedQuestion = questionString.toLowerCase().replace(/\s/g, "");
  const normalizedKey = questionKey.toLowerCase();

  // Check if the question text contains asbestos patterns
  const questionContainsAsbestos = asbestosQuestionPatterns.some((pattern) => normalizedQuestion.includes(pattern));

  // Check if the question key contains 'asbestos'
  const keyContainsAsbestos = normalizedKey.includes("asbestos");

  return questionContainsAsbestos || keyContainsAsbestos;
};
export const checkAnswerForAsbestos = (answerString) => {
  if (answerString.toLowerCase() === "asbestos") return true;

  const pattern = asbestosQuestionPatterns.some((p) => answerString.toLowerCase().replace(/\s/g, "").includes(p));
  const antiPattern = asbestosQuestionAntiPatterns.some((p) => {
    return answerString.toLowerCase().replace(/\s/g, "").includes(p);
  });

  return !pattern && !antiPattern ? pattern : true;
};

export const getAllFieldsWith = (form, field, searchByValue) => {
  let retVal = Object.entries(form).filter(([key, value]) => key.toLowerCase().includes(field.toLowerCase()));

  if (searchByValue) {
    const hasMatchingValue = Object.entries(form).filter(([key, value]) => {
      if (typeof value !== "object" || value === null) {
        let val = String(value).toLowerCase();
        return val.toLowerCase().includes(field.toLowerCase());
      } else return false;
    });
    retVal = hasMatchingValue;
  }

  return retVal ? retVal.map((r) => ({ field: r[0], value: r[1] })) : null;
};
export const buildingSizes = (formFields) => {
  // Always return metric metre measurements
  const units = getFieldValue(formFields, "measurementUnits") === "metric" ? "m" : "ft";
  const length = getFieldValue(formFields, "polytunnelLength") || getFieldValue(formFields, "buildingLength");
  const width = getFieldValue(formFields, "buildingWidth");
  const height = getFieldValue(formFields, "buildingHeight");
  console.log("buildingSizes", { length, width, height, units });
  const format = (val) =>
    typeof val === "string"
      ? val.includes("ft")
        ? Number((Number(val.replace("ft", "")) * 0.3048).toFixed(2))
        : Number(val.replace("m", ""))
      : Number(val);

  return {
    length: length ? format(length) : null,
    width: width ? format(width) : null,
    height: height ? format(height) : null,
    units: units ?? null,
  };
};

export const lowerFirst = (s) => (s && String(s[0]).toLowerCase() + String(s).slice(1)) || "";

// Helper function to check if form contains asbestos
const checkFormForAsbestos = (formAnswers) => {
  // Check field names that contain 'asbestos' and have positive values
  const asbestosFieldsWithPositiveValues = getAllFieldsWith(formAnswers, "asbestos", false).filter((field) => {
    const hasAsbestosInKey = checkQuestionForAsbestos(field.field);
    const hasPositiveValue = field.value === "yes" || field.value === "true" || field.value === true;
    return hasAsbestosInKey && hasPositiveValue;
  });

  // Check field values that contain 'asbestos' and indicate presence
  const asbestosInFieldValues = getAllFieldsWith(formAnswers, "asbestos", true).filter((field) =>
    checkAnswerForAsbestos(field.value)
  );

  return asbestosFieldsWithPositiveValues.length > 0 || asbestosInFieldValues.length > 0;
};

export const filterSuppliers = (suppliers, supplierTypesInForm, formAnswers) => {
  console.log("Start", suppliers.length, " suppliers");
  const quoteContainsAsbestos = checkFormForAsbestos(formAnswers);
  const quoteLatLng = getLatLng(formAnswers.address, formAnswers.Guid);
  const quoteBuildingDimensions = buildingSizes(formAnswers);

  if (quoteContainsAsbestos) {
    console.log("Contains asbestos?");
    suppliers = suppliers.filter((supplier) => supplier.handlesAsbestos);
  }

  const containsSubstring = (str, substring) => {
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };
    const escapedSubstring = escapeRegExp(substring);
    const regex = new RegExp(escapedSubstring, "i");
    return regex.test(str);
  };

  const mainBuildingSuppliersByType = suppliers.filter((supplier) =>
    supplier.quoteTypesProvided.some((quoteType) => containsSubstring(formAnswers.formName, quoteType))
  );

  const mainBuildingSuppliers = {
    type: { supplierType: formAnswers.formName, baseSupplierType: formAnswers.formName },
    suppliers: mainBuildingSuppliersByType,
  };

  const nonDimensionSupplierTypes = supplierTypesInForm
    .filter((s) => !s.hasMinMaxDimensions)
    .map((type) => ({
      type: type,
      suppliers: suppliers.filter((supplier) =>
        supplier.quoteTypesProvided.some((quoteType) => containsSubstring(type.supplierType, quoteType))
      ),
    }));

  console.log("MAIN CHECk", mainBuildingSuppliers);

  console.log(
    "NONDIMEN CHECk",
    nonDimensionSupplierTypes.filter((i) => i.suppliers.length > 0)
  );

  const dimensionSupplierTypes = supplierTypesInForm
    .filter((s) => s.hasMinMaxDimensions)
    .map((type) => ({
      type: type,
      suppliers: suppliers.filter((supplier) => {
        const { length, width, height } = quoteBuildingDimensions;
        const isSupplierType = supplier.quoteTypesProvided.some((quoteType) =>
          containsSubstring(type.supplierType, quoteType)
        );

        if (!supplier.minMaxMeasurements.hasOwnProperty(type.baseType)) return false;

        const isWithinLength =
          length >= supplier.minMaxMeasurements[type.baseType].minLength &&
          length <= supplier.minMaxMeasurements[type.baseType].maxLength;
        const isWithinWidth = width
          ? width >= supplier.minMaxMeasurements[type.baseType].minWidth &&
            width <= supplier.minMaxMeasurements[type.baseType].maxWidth
          : true;
        const isWithinHeight = height
          ? height >= supplier.minMaxMeasurements[type.baseType].minHeight &&
            height <= supplier.minMaxMeasurements[type.baseType].maxHeight
          : true;
        return isWithinLength && isWithinWidth && isWithinHeight && isSupplierType;
      }),
    }));

  console.log(
    "DIMEN CHECk",
    dimensionSupplierTypes.filter((i) => i.suppliers.length > 0)
  );

  const sortedSuppliersByDistance = [
    ...nonDimensionSupplierTypes,
    ...dimensionSupplierTypes,
    ...[mainBuildingSuppliers],
  ]
    .filter((s) => s.suppliers.length > 0)
    .map((s) => ({
      ...s.type,
      suppliers: sortSuppliersByDistance(s.suppliers, quoteLatLng),
    }));

  // // Return type -
  // [
  //   {
  //     supplierType: "roofSupplyAndInstall",
  //     baseType: "roof",
  //     newBuildings: true,
  //     repairReplace: false,
  //     hasMinMaxDimensions: true,
  //     suppliers: [
  //       {
  //         subscriptionEndDate: "2022-08-20",
  //         latitude: 51.981923,
  //         _id: "6b1a26fa-56d7-429e-a6da-f12211db6a73",
  //         _owner: "85839425-0cfe-471f-94da-e4086b1dc961",
  //         _createdDate: "2025-01-01T13:40:30.828Z",
  //         minMaxMeasurements: {},
  //         handlesAsbestos: false,
  //         emailAddress: "dave@abcxyz.com",
  //         quoteTypesProvided: ["Mono Pitch", "Concrete Slab", "Mezzanine Floor", "Round House", "Portal Frame"],
  //         _updatedDate: "2025-08-07T11:39:46.481Z",
  //         longitude: -3.410408,
  //         quotesSent: [],
  //         subscriptionDate: "2021-08-20",
  //         contactId: "ca6facad-745f-4358-91bc-cf819132739b",
  //         isActive: true,
  //         supplierName: "XYZ Corporation",
  //       },
  //     ],
  //   },
  // ];

  // buildingSuppliers: buildingSuppliers,
  //   steelErectorSuppliers: steelErectSuppliers,
  //   steelFabricationSuppliers: steelFabricationSuppliers,
  //   roofSuppliers: roofSuppliers,

  // Run the fetch for all suppliers
  // Filter?

  // If they want X supplier quote, get all suppliers of X within 50miles for this supplier
  // If they want X installation quote, get all installers of X within 50miles for this supplier

  // get all suppliers within 50miles for this suppliers

  // if none then expand the net.

  // return array of suppliers

  // identify the specific form answers for the specific suppliers

  return sortedSuppliersByDistance;
};

export const getSuppliers = async (form) => {
  // identify suppliers for this form
  // ensure that the IDs are the same for each form

  // quoteForQuantitySurveyor === "yes"
  // "details_quoteForInstallation": "quoteFromOtherSteelErector",
  // "details_quoteForLevellingSite": "",
  // "solarPanelQuoteFromProvider": "yes",
  // "floor_concretedFloorQuote": "yes",
  // "mezzanineFloor_quoteFromSupplier": "quoteFromOtherSteelErector",

  // groundworkers and concrete - supply and install is same right?
  // Would groundworks and concrete boys both quote for a concrete floor? Would it be both?
  // Steel erector would just be install - or supply too?

  // get with collection - SupplierTypes

  // const supplierTypeList = await getCollectionData("SupplierTypes", "createdOn", "2025-08-07T11:52:56Z");

  const supplierTypeList = [
    {
      supplierType: "demolitionWalls",
      baseType: "demolitionWalls",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "demolitionCladding",
      baseType: "demolitionCladding",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "quantitySurveyorInstall",
      baseType: "quantitySurveyor",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "concreteBlockInstall",
      baseType: "concreteBlock",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "roofSupplyAndInstall",
      baseType: "roof",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "roofRepairSupply",
      baseType: "roofRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "steelFabricatorSupplyAndInstall",
      baseType: "steelFabricator",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "solarPanelSupply",
      baseType: "solarPanel",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "polytunnelSupplyAndInstall",
      baseType: "polytunnel",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "polytunnelSupply",
      baseType: "polytunnel",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "demolitionRoof",
      baseType: "demolitionRoof",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "concreteWallRepairSupplyAndInstall",
      baseType: "concreteWallRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "massConcreteSupplyAndInstall",
      baseType: "massConcrete",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "roofInstall",
      baseType: "roof",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "concreteBlockSupply",
      baseType: "concreteBlock",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "steelErectorSupplyAndInstall",
      baseType: "steelErector",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "solarPanelInstall",
      baseType: "solarPanel",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "cattleSheetDoorSupplyAndInstall",
      baseType: "cattleSheetDoor",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "quantitySurveyorSupply",
      baseType: "quantitySurveyor",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "polytunnelInstall",
      baseType: "polytunnel",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "concreteBlockSupplyAndInstall",
      baseType: "concreteBlock",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "demolitionStructures",
      baseType: "demolitionStructures",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "concreteFloorSupplyAndInstall",
      baseType: "concreteFloor",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "groundWorkerSupply",
      baseType: "groundWorker",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "steelErectorSupply",
      baseType: "steelErector",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "rainwaterHarvestingSupply",
      baseType: "rainwaterHarvesting",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "claddingRepairInstall",
      baseType: "claddingRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "concretePanelSupply",
      baseType: "concretePanel",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "roofRepairSupplyAndInstall",
      baseType: "roofRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "cattleSheetDoorSupply",
      baseType: "cattleSheetDoor",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "claddingRepairSupplyAndInstall",
      baseType: "claddingRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "rainwaterHarvestingSupplyAndInstall",
      baseType: "rainwaterHarvesting",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "gutteringSupplyAndInstall",
      baseType: "guttering",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "gutteringRepairInstall",
      baseType: "gutteringRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "claddingRepairSupply",
      baseType: "claddingRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "roofSupply",
      baseType: "roof",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "solarPanelSupplyAndInstall",
      baseType: "solarPanel",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "concreteFloorSupply",
      baseType: "concreteFloor",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "concreteWallRepairSupply",
      baseType: "concreteWallRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "claddingSupplyAndInstall",
      baseType: "cladding",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "groundWorkerInstall",
      baseType: "groundWorker",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "concretePanelInstall",
      baseType: "concretePanel",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "gutteringRepairSupply",
      baseType: "gutteringRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "gutteringRepairSupplyAndInstall",
      baseType: "gutteringRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "massConcreteInstall",
      baseType: "massConcrete",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "rainwaterHarvestingInstall",
      baseType: "rainwaterHarvesting",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "doorSupplyAndInstall",
      baseType: "door",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "massConcreteSupply",
      baseType: "massConcrete",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "gutteringSupply",
      baseType: "guttering",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "doorSupply",
      baseType: "door",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "groundWorkerSupplyAndInstall",
      baseType: "groundWorker",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "steelFabricatorInstall",
      baseType: "steelFabricator",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "steelErectorInstall",
      baseType: "steelErector",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "concretePanelSupplyAndInstall",
      baseType: "concretePanel",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "concreteFloorInstall",
      baseType: "concreteFloor",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "steelFabricatorSupply",
      baseType: "steelFabricator",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "doorInstall",
      baseType: "door",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "demolitionConcrete",
      baseType: "demolitionConcrete",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "cattleSheetDoorInstall",
      baseType: "cattleSheetDoor",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "roofRepairInstall",
      baseType: "roofRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: true,
    },
    {
      supplierType: "claddingSupply",
      baseType: "cladding",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "gutteringInstall",
      baseType: "guttering",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "quantitySurveyorSupplyAndInstall",
      baseType: "quantitySurveyor",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "concreteWallRepairInstall",
      baseType: "concreteWallRepair",
      newBuildings: false,
      repairReplace: true,
      hasMinMaxDimensions: false,
    },
    {
      supplierType: "claddingInstall",
      baseType: "cladding",
      newBuildings: true,
      repairReplace: false,
      hasMinMaxDimensions: false,
    },
  ];

  // PT 1 - Get all supplier types
  const supplierTypesInForm = getAllSupplierTypesInForm(supplierTypeList, form);

  console.log("Supplier Types in Form: ", supplierTypesInForm);

  // PT 2 - Get filtered suppliers
  let suppliers = await wixData
    .query("SupplierList")
    .hasSome("quoteTypesProvided", supplierTypesInForm)
    .eq("isActive", true)
    .limit(1000)
    .find()
    .then((results) => results.items);

  console.log("Suppliers returned: ", suppliers);

  //     "claddingRepairSupply",
  // "claddingRepairInstall",
  // "claddingRepairSupplyAndInstall",
  // "roofRepairSupply", *
  // "roofRepairInstall", *
  // "roofRepairSupplyAndInstall", *
  //     "demolitionStructures",
  // "demolitionWalls",
  // "demolitionRoof",
  // "demolitionCladding",
  // "demolitionConcrete",
  // Asbestos filtering for reRoof and reCladding(?) and demolition quotes

  const filteredSuppliers = filterSuppliers(suppliers, supplierTypesInForm, form)
    .map((supplierType) => {
      return supplierType.suppliers.map((s) => ({
        ...s,
        supplierType: supplierType.supplierType,
        baseSupplierType:
          "baseSupplierType" in supplierType ? supplierType.baseSupplierType : supplierType.supplierType,
      }));
    })
    .flat();

  console.log("returning filtered suppliers: ", filteredSuppliers);
  return filteredSuppliers;
};

export const invoke = async ({ payload }) => {
  console.log("Fired, payload:", payload);

  const formObject = prepareFormData(payload);
  const { formName, formGuid, address, fields } = formObject;
  const collection = getCollection(formName);

  console.log(
    "FORMOBJECT",
    formObject,
    "\n",
    `formName: ${formName}`,
    "\n",
    `formGuid: ${formGuid}`,
    "\n",
    `collection: ${collection}`
  );

  if (formGuid && formName) {
    let completedForm = await getFormDetailsFromCollection(collection, formGuid);
    let contactAddress = address ?? completedForm.address;
    const combinedFormFields = { ...completedForm, ...fields };
    completedForm = Object.keys(combinedFormFields).reduce((acc, key) => {
      if (!acc.hasOwnProperty(key)) {
        acc[key] = combinedFormFields[key];
      }
      return acc;
    }, {});

    console.log("COMPLETED FORM:\n", completedForm);

    const suppliers = await getSuppliers({ ...completedForm, ...contactAddress, formName: formName });

    console.log("Selected suppliers:", suppliers);

    // IF only a concrete supplier etc - only send them relative fields

    // get form details from collection

    // send to suppliers - whole form and groundworkers etc.
    // if xyz is filled, send to groundworkers etc.

    const stringifiedForm = stringifyForm(completedForm, formName);

    // Not corruntly working...
    // await saveToDb(formName, formGuid, ["Supplier1", "Supplier2"]);
    // return {};

    console.log("Stringified Form", stringifiedForm);

    const emailOptions = {
      submittedName: completedForm.firstName + " " + completedForm.lastName,
      submittedEmail: formObject.email,
      submittedPhone: formObject.phone ?? "no phone number provided",
      submittedType: `New ${formName === "Concrete Slab" ? "Concrete Project" : formName}`,
      //   submittedDistance: Math.trunc(ssl[i].dist / 1000),
      buildingSize: "20m x 3m x 1m",
      submittedDistance: 40,
      // ...(stringifiedForm["Form Details"] && { formDetails: stringifiedForm["Form Details"] }),
      // ...(stringifiedForm["Form Walls"] && { formWalls: stringifiedForm["Form Walls"] }),
      // ...(stringifiedForm["Form Roof"] && { formRoof: stringifiedForm["Form Roof"] }),
      // ...(stringifiedForm["Form Cladding"] && { formCladding: stringifiedForm["Form Cladding"] }),
      // ...(stringifiedForm["Form Doors"] && { formDoors: stringifiedForm["Form Doors"] }),
      // ...(stringifiedForm["Form Floor"] && { formFloor: stringifiedForm["Form Floor"] }),
      ...(stringifiedForm["Fields"] && { formDetails: stringifiedForm["Fields"] }),
      ...(stringifiedForm["Form Contact"] && { formContact: stringifiedForm["Form Contact"] }),
    };

    console.log("Email built...", emailOptions);
    if (suppliers.length === 0) console.log("No suppliers found!");
    for (const supplier of suppliers) {
      console.log("supplier", supplier);

      const secondarySuppliers = ["steelFabricator", "solarPanel", "quantitySurveyor", "groundWorker"];

      console.log(
        `Emailing ${secondarySuppliers.includes(supplier.baseSupplierType) ? "secondary" : "main"} supplier ${
          supplier.supplierName
        }`
      );
      try {
        // await saveToDb(formName, formGuid, suppliers);
        await sendSupplierEmail(supplier, emailOptions, {
          formGuid: formGuid,
          formCollection: collection,
        });
      } catch (error) {
        handleErrors(error);
        console.log(`Error sending email to supplier: ${supplier.supplierName}\n`, error.message);
      }
    }
  } else {
    handleErrors(`Missing formGuid for form ${formName}`);
  }

  // The function must return an empty object, do not delete
  return {};
};
