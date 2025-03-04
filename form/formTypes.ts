type MonoPitchForm = {
  details: {
    quoteForInstallation: string;
    quoteForLevelling: string;
    steelOptions: string;
    buildingType: string;
    usage: string;
    internalsStable: string;
    internalsHorseCow: string;
    internalsCustom: string;
    measurementUnits: string;
    buildingLength: number;
    buildingWidth: number;
    buildingHeight: number;
    bayWidth: number;
    postDimensionsA: number;
    postDimensionsB: number;
    postDimensionsC: number;
    roofPitch: string;
    additionalNotes: string;
    siteVisuals: string;
  };
  walls: {
    buildingHasWalls: string;
    howManySidesHaveWalls: number;
    wallMaterial: string;
    wallPanelHeight: string;
    wallPanelHeightCustom: string;
    wallHowManyPanelsHigh: string;
    wallPanelThickness: string;
    wallPanelThicknessCustom: string;
  };
  roof: {
    roofPurlins: string;
    roofMaterial: string;
    roofColour: string;
    compositeThickness: string;
    boxProfileOptions: string;
    corrugatedSheetFinish: string;
    roofLights: string;
    roofLightsPerBay: string;
    roofLightsPerBayCustom: string;
    roofHasCantilever: string;
    cantileverSide: string;
    roofRidgeCaps: string;
    solarPanels: string;
    solarPanelsInTheFuture: string;
    solarPanelsCoverage: string;
    roof_solarPanelCoverageCustom: string;
    solarPanelsQuoteFromProvider: string;
  };
  cladding: {
    buildingHasCladding: string;
    claddingType: string;
    claddingColour: string;
    claddingCompositeThickness: string;
    claddingTimberBoardType: string;
    claddingBoxProfileType: string;
    claddingCorrugatedSheetType: string;
    claddingHeight: string;
    claddingTecsFixings: string;
    guttering: string;
    gutteringOutlets: number;
  };
  doors: {
    rollerDoors: string;
    rollerDoorLocation: string;
    numberOfRollerDoors: string;
    numberOfRollerDoorsCustom: string;
    rollerDoorWidth: number;
    rollerDoorHeight: number;
    rollerDoorBirdBrush: string;
    rollerDoorRubberFloorSeal: string;
    rollerDoorPowerFeed: string;
    personnelDoors: string;
    numberOfPersonnelDoors: string;
    personnelDoorWidth: string;
    personnelDoorsAreFireDoors: string;
    numberOfFireEscapeDoors: string;
  };
  floor: {
    concretedFloor: string;
    quoteForConcretingFloor: string;
    additionalNotesFloor: string;
    floorVisuals: string;
  };
  mezzanineFloor: {
    mezzanineFloor_buildingHasMezzanineFloor: string;
    mezzanineFloor_quoteFromSupplier: string;
    mezzanineFloor_freestanding: string;
    mezzanineFloor_BayWidth: string;
    mezzanineFloor_BayWidthOther: string;
    mezzanineFloor_SpanOptions: string;
    mezzanineFloor_Height: string;
    mezzanineFloor_SteelOptions: string;
    mezzanineFloor_Purlins: string;
    mezzanineFloor_Options: string;
    mezzanineFloor_HandRails: string;
    mezzanineFloor_Access: string;
    mezzanineFloor_ForkliftBay: string;
    mezzanineFloor_AdditionalNotes: string;
  };
  contact: {
    howManyQuotes: number;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    address: any;
  };
};

type concreteSlabForm = {
  details: {
    details_formGuid: string;
    details_sitePrepared: string;
    details_concreteThickness: string;
    details_concreteThicknessCustom: string;
    details_InteriorExteriorPlacement: string;
    details_concreteAreaM2: string;
    details_siteVisualsImageVideo: string;
    details_finishedAreaUsage: string;
    details_finishedAreaUsageOther: string;
    details_concreteReinforcementOptions: string;
    details_concreteSlabAdditionalNotes: string;
    details_concreteSlabFinishOptions: string;
    details_patternFinish: string;
    details_patternFinishCustom: string;
    details_powerFloatFinish: string;
    details_areaMapDetails: string;
  };
  contacts: {
    howManyQuotes;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    address: any;
  };
};

// details: {
//   isSitePrepared: string;
//   concreteThickness: string;
//   concreteThicknessCustom: string;
//   placement: string;
//   concreteArea: number;
//   siteVisuals: string;
//   finishedAreaUsage: string;
//   finishedAreaUsageCustom: string;
//   reinforcementOptions: string;
//   additionalNotes: string;
//   finishOptions: string;
//   pattern: string;
//   patternCustom: string;
//   powerFloat: string;
// };
// contact: {
//   howManyQuotes: number;
//   firstName: string;
//   lastName: string;
//   companyName: string;
//   email: string;
//   phoneNumber: string;
//   address: any;
// };

type portalFrameForm = {
  details: {
    details_quoteForLevellingSite: string;
    details_quoteForInstallation: string;
    details_shedUsage: string;
    details_shedUsageInternals: string;
    details_shedUsageOther: string;
    details_measurementUnits: string;
    details_buildingLength: number;
    details_buildingWidth: number;
    details_buildingHeight: number;
    details_buildingBayWidth: number;
    details_steelOptions: string;
    details_roofPitch: string;
    details_roofPitchCustom: string;
    details_additionalNotes: string;
  };
  walls: {
    walls_buildingHasWalls: string;
    walls_howManySidesHaveWalls: number;
    walls_wallMaterial: string;
    walls_wallPanelHeight: string;
    walls_wallPanelHeightCustom: string;
    walls_wallPanelThickness: string;
    walls_wallPanelThicknessCustom: string;
    walls_wallHeightNumberOfPanels: number;
  };
  roof: {
    roof_purlins: string;
    roof_roofMaterial: string;
    roof_fiberCementColour: string;
    roof_roofColour: string;
    roof_roofCompositeThickness: string;
    roof_roofBoxProfileFinish: string;
    roof_roofBoxProfileOption: string;
    roof_roofCorrugatedSheetFinish: string;
    roof_roofCorrugatedSheetOption: string;
    roof_roofLights: string;
    roof_roofLightsPerBay: string;
    roof_roofLightsPerBayCustom: string;
    roof_ridgeCaps: string;
    roof_solarPanels: string;
    roof_solarPanelsInTheFuture: string;
    roof_solarPanelsCoverage: string;
    roof_solarPanelCoverageCustom: string;
    roof_solarPanelQuoteFromProvider: string;
  };
  doors: {
    doors_rollerDoors: string;
    doors_rollerDoorLocation: string;
    doors_numberOfRollerDoors: string;
    doors_numberOfRollerDoorsCustom: string;
    doors_rollerDoorwayWidth: number;
    doors_rollerDoorwayHeight: number;
    doors_rollerDoorBirdBrush: string;
    doors_rollerDoorRubberFloorSeal: string;
    doors_rollerDoorPowerFeed: string;
    doors_personnelDoors: string;
    doors_numberOfPersonnelDoors: number;
    doors_personnelDoorWidth: string;
    doors_fireDoors: string;
    doors_numberOfFireDoors: number;
  };
  cladding: {
    cladding_claddingMaterial: string;
    cladding_claddingColour: string;
    cladding_claddingCompositeThickness: string;
    cladding_claddingTimberBoardTypes: string;
    cladding_claddingBoxProfileType: string;
    cladding_claddingCorrugatedSheetFinish: string;
    cladding_claddingHeight: string;
    cladding_claddingTecsFixings: string;
    cladding_guttering: string;
    cladding_gutteringOutlets: number;
  };
  floor: {
    floor_concreteFloor: string;
    floor_quoteForConcreteFloor: string;
    floor_additionalNotesFloor: string;
  };
  mezzanineFloor: {
    mezzanineFloor_buildingHasMezzanineFloor: string;
    mezzanineFloor_quoteFromSupplier: string;
    mezzanineFloor_freestanding: string;
    mezzanineFloor_BayWidth: string;
    mezzanineFloor_BayWidthOther: string;
    mezzanineFloor_SpanOptions: string;
    mezzanineFloor_Height: string;
    mezzanineFloor_SteelOptions: string;
    mezzanineFloor_Purlins: string;
    mezzanineFloor_Options: string;
    mezzanineFloor_HandRails: string;
    mezzanineFloor_Access: string;
    mezzanineFloor_ForkliftBay: string;
    mezzanineFloor_AdditionalNotes: string;
  };
  contact: {
    howManyQuotes: number;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    address: any;
  };
};

type roundHouseForm = {
  details: {
    details_roundHouseSize: string;
    details_animalHandlingInternals: string;
    details_siteRequiresLevelling: string;
    details_quoteForLevellingSite: string;
  };
  contact: {
    howManyQuotes: number;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    address: any;
  };
};

type mezzanineFloorForm = {
  details: {
    details_quoteForInstallation: string;
    details_mezzanineOption: string;
    details_mainPostDimensionA: string;
    details_mainPostDimensionB: string;
    details_mainPostDimensionC: string;
    details_gableIntermediatePostsPresent;
    details_gablePostDimensionA: string;
    details_gablePostDimensionB: string;
    details_gablePostDimensionC: string;
    details_measurementUnits: string;
    details_buildingLength: number;
    details_buildingWidth: number;
    details_buildingHeight: number;
    details_bayWidth: string;
    details_bayWidthOther: string;
    details_mezzanineSpanOptions: string;
    details_mezzanineFloorHeightSupportPosts: string;
    details_steelOptions: string;
    details_mezzaninePurlins: string;
    details_mezzanineFloorOptions: string;
    details_handRails: string;
    details_floorAccess: string;
    details_forkliftBay: string;
    details_additionalNotes: string;
    details_floorImageVideoUpload: string;
  };
  contact: {
    howManyQuotes: number;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    address: any;
  };
};

type polyTunnelForm = {
  details: {
    polytunnel_Width: string;
    polytunnel_hoopSpacing: string;
    polytunnel_siteRequiresLevelling: string;
    polytunnel_quoteForLevelling: string;
    polytunnel_length: string;
    polytunnel_guttering: string;
    polytunnel_covering: string;
  };
  contact: {
    howManyQuotes: number;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    address: any;
  };
};

// is datatype in wix email accesbile?
//${formDetails}

// ${formWalls}

// ${formRoof}

// ${formCladding}

// ${formDoors}

// ${formFloor}

// ${formContact}
