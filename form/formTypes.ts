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
    details_quoteRadiusKm: number;
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
    details_siteImagesVideos: string;
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
    details_quoteRadiusKm: number;
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
    details_quoteForLevellingSite: string;
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
    details_siteNeedsLevelling: string;
    details_quoteForLevelling: string;
    details_polytunnelWidth: string;
    details_polytunnelLength: string;
    details_polytunnelCovering: string;
    details_doors: string;
    details_doorPlacement: string;
    details_guttering: string;
    details_gutteringBothSides: string;
    details_anchoring: string;
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

type rainwaterRepairForm = {
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

type wallsRepairForm = {
  details: {
    details_howManyBays: string;
    details_baySize: string;
    details_wallMaterial: string;
    details_wallHeightMassConcrete: string;
    details_massConcreteWallThickness: string;
    details_massConcreteWallThicknessCustom: string;
    details_concretePanelHeight: string;
    details_concretePanelHeightCustom: string;
    details_wallHeightInConcretePanels: string;
    details_concretePanelThickness: string;
    details_concretePanelThicknessCustom: string;
    details_concreteLegoBlockSize: string;
    details_mainPostDimensionA: string;
    details_mainPostDimensionB: string;
    details_mainPostDimensionC: string;
    details_gablePosts: string;
    details_gablePostDimensionA: string;
    details_gablePostDimensionB: string;
    details_gablePostDimensionC: string;
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

type gutteringRepairForm = {
  details: {
    details_gutteringType: string;
    details_existingOutlets: string;
    details_gutteringTypeShape: string;
    details_sizeOfDownpipe: string;
    details_downpipeSize: string;
    details_gutteringColour: string;
    details_rainwaterCatchment: string;
    details_rainwaterCatchmentTank: string;
    details_measurementUnits: string;
    details_buildingLength: string;
    details_buildingWidth: string;
    details_buildingHeight: string;
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

type solarPanelsRepairForm = {
  details: {
    details_roofArea: string;
    details_measurementUnits: string;
    details_buildingLength: string;
    details_buildingWidth: string;
    details_buildingHeight: string;
    details_coverage: string;
    details_roofMaterial: string;
    details_roofMaterialOther: string;
    details_roofContainsAsbestos: string;
    details_roofImagesVideos: string;
    details_roofPitch: string;
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

type dismantleRepairForm = {
  details: {
    details_measurementUnits: string;
    details_buildingLength: string;
    details_buildingWidth: string;
    details_buildingHeight: string;
    details_cladding: string;
    details_claddingType: string;
    details_claddingTypeOther: string;
    details_roofMaterial: string;
    details_roofMaterialOther: string;
    details_accessAllAround: string;
    details_additionalNotes: string;
    details_shedImageVideoUploads: string;
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

type doorsRepairForm = {
  details: {
    details_removeOldDoor: string;
    details_doorType: string[];
    details_rollerShutterDoorLocation: string;
    details_numberOfRollerShutterDoors: string;
    details_numberOfRollerShutterDoorsCustom: string;
    details_rollerShutterDoorWidthM: string;
    details_rollerShutterDoorHeightM: string;
    details_rollerShutterDoorBirdBrush: string;
    details_rollerShutterDoorRubberBirdSeal: string;
    details_rollerShutterDoorPowerFeed: string;
    details_numberOfPersonnelDoors: string;
    details_personnelDoorWidth: string;
    details_arePersonnelDoorsFireDoors: string;
    details_numberOfPersonnelFireDoors: string;

    details_doorImageVideoUploads: any;
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

type reRoofRepairForm = {
  details: {
    details_measurementUnits: string;
    details_buildingLength: string;
    details_buildingWidth: string;
    details_buildingHeight: string;
    details_roofPitch: string;
    details_isTheOldRoofStillInPlace: string;
    details_oldRoofMaterial: string;
    details_oldRoofMaterialOther: string;
    details_existingPurlins: string;
    details_newRoofMaterial: string;
    details_fibreCementColour: string;
    details_roofColour: string;
    details_compositeRoofColour: string;
    details_compositeThickness: string;
    details_boxProfileRoofColour: string;
    details_boxProfileOption: string;
    details_boxProfileFinish: string;
    details_corrugatedSheetColour: string;
    details_corrugatedSheetOption: string;
    details_corrugatedSheetFinish: string;
    details_roofSheetLengths: string;
    details_152mLengths: string;
    details_1670mLengths: string;
    details_1820mLengths: string;
    details_1980mmLengths: string;
    details_2280mmLengths: string;
    details_2130mmLengths: string;
    details_2430mmLengths: string;
    details_2590mmLengths: string;
    details_2740mmLengths: string;
    details_2890mmLengths: string;
    details_3040mmLengths: string;
    details_3650mmLengths: string;
    details_newGuttering: string;
    details_gutteringType: string;
    details_existingGutteringOutlets: string;
    details_gutteringTypeShape: string;
    details_gutteringColour: string;
    details_gutteringDownpipeSize: string;
    details_rainwaterCatchment: string;
    details_rainwaterCatchmentTank: string;
    details_gutteringMeasurementUnits: string;
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

type claddingRepairForm = {
  details: {
    details_claddingHeight: string;
    details_claddingType: string;
    details_claddingTypesSelected: string[];
    details_claddingColourComposite: string;
    details_claddingColourBoxProfile: string;
    details_claddingColourCorrugatedSheet: string;
    details_compositeThickness: string;
    details_timberBoardType: string;
    details_boxProfileType: string;
    details_corrugatedSheetType: string;
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
