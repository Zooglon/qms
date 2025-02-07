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
    roofRidgeCaps: string;
    solarPanels: string;
    solarPanelsInTheFuture: string;
    solarPanelsCoverage: string;
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
    isSitePrepared: string;
    concreteThickness: string;
    concreteThicknessCustom: string;
    placement: string;
    concreteArea: number;
    siteVisuals: string;
    finishedAreaUsage: string;
    finishedAreaUsageCustom: string;
    reinforcementOptions: string;
    additionalNotes: string;
    finishOptions: string;
    pattern: string;
    patternCustom: string;
    powerFloat: string;
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
