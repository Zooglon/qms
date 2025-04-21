import { mapHelper } from "backend/mapsModule.web";

export function helloThere() {
  console.log("Funcs Loaded");
}

export async function getMapCreds() {
  const cred = await mapHelper();
  return cred.value;
}

export function calculatePitch(inputOne, inputTwo, inputThree, roofError, showText) {
  let hyp = Number.parseFloat(inputOne.value);
  let run = Number.parseFloat(inputTwo.value);
  let rise = Number.parseFloat(inputThree.value);

  // Find hypotenuse
  if (!hyp) hyp = Math.sqrt(run * run + rise * rise);
  // Find run
  if (!run) run = Math.sqrt(hyp * hyp - rise * rise);
  // Find rise
  if (!rise) rise = Math.sqrt(hyp * hyp - run * run);

  const pitch = ((rise / run) * (180 / Math.PI)).toFixed();

  if ((!hyp && !run) || (!hyp && !rise) || (!run && !rise)) {
    roofError.show();
  } else {
    showText.show();
    showText.text = pitch + "°";
  }
}

export const formOptions = [
  {
    formName: "concreteSlabForm",
    formFields: [
      {
        elementID: "concreteThickness-field-concreteSlab",
        showOptions: [
          {
            elementID: "concreteThicknessCustom-field-concreteSlab",
            optionValue: "custom",
            required: true,
          },
          {
            elementID: "concreteThicknessCustom-text-concreteSlab",
            optionValue: "custom",
            required: true,
          },
        ],
      },
      {
        elementID: "finishedArea-field-concreteSlab",
        showOptions: [
          { elementID: "finishedAreaCustom-field-concreteSlab", optionValue: "other", required: false },
          { elementID: "finishedAreaCustom-text-concreteSlab", optionValue: "other", required: false },
        ],
      },
      {
        elementID: "finishOptions-concreteSlab",
        showOptions: [
          {
            elementID: "patterned-field-concreteSlab",
            optionValue: "patterned",
            required: false,
            showOptions: [
              {
                elementID: "patternedCustom-field-concreteSlab",
                optionValue: "custom",
                required: false,
              },
              { elementID: "patternedCustom-text-concreteSlab", optionValue: "custom", required: false },
            ],
          },
          { elementID: "powerFloat-field-concreteSlab", optionValue: "powerFloat", required: false },
        ],
      },
    ],
  },
  {
    formName: "monoPitchForm",
    formFields: [
      {
        elementID: "buildingType-field-monoPitch",
        showOptions: [
          { elementID: "postDimensionsContainer-monoPitch", optionValue: "extension", required: true },
          { elementID: "postDimensionA-field-monoPitch", optionValue: "extension", required: true },
          { elementID: "postDimensionB-field-monoPitch", optionValue: "extension", required: true },
          { elementID: "postDimensionC-field-monoPitch", optionValue: "extension", required: true },
        ],
      },
      {
        elementID: "usage-field-monoPitch",
        showOptions: [
          { elementID: "usageHorseStable-field-monoPitch", optionValue: "horseStable", required: true },
          {
            elementID: "usageInternals-field-monoPitch",
            optionValue: "horseLooseHousing",
            required: true,
          },
          { elementID: "usageInternals-field-monoPitch", optionValue: "cattleShed", required: true },
          { elementID: "usageCustom-field-monoPitch", optionValue: "custom", required: true },
          { elementID: "usageCustom-text-monoPitch", optionValue: "custom", required: true },
        ],
      },
      {
        elementID: "walls-field-monoPitch",
        showOptions: [
          { elementID: "wallsSides-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "wallMaterial-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "wallNumberOfPanelHeight-field-monoPitch", optionValue: "yes", required: true },
          {
            elementID: "wallPanelHeight-field-monoPitch",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "wallPanelHeightCustom-field-monoPitch",
                optionValue: "custom",
                required: true,
              },
              {
                elementID: "wallPanelHeightCustom-text-monoPitch",
                optionValue: "custom",
                required: true,
              },
            ],
          },
          {
            elementID: "wallPanelThickness-field-monoPitch",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "wallPanelThicknessCustom-field-monoPitch",
                optionValue: "custom",
                required: true,
              },
              {
                elementID: "wallPanelThicknessCustom-text-monoPitch",
                optionValue: "custom",
                required: true,
              },
            ],
          },
        ],
      },
      {
        elementID: "roofMaterial-field-monoPitch",
        showOptions: [
          { elementID: "roofColour-field-monoPitch", optionValue: "composite", required: true },
          { elementID: "roofColour-image-monoPitch", optionValue: "composite", required: true },
          {
            elementID: "roofCompositeThickness-field-monoPitch",
            optionValue: "composite",
            required: true,
          },
          { elementID: "roofColour-field-monoPitch", optionValue: "boxProfileSheet", required: true },
          { elementID: "roofColour-image-monoPitch", optionValue: "boxProfileSheet", required: true },
          {
            elementID: "roofBoxProfile-field-monoPitch",
            optionValue: "boxProfileSheet",
            required: true,
          },
          { elementID: "roofColour-field-monoPitch", optionValue: "corrugatedSheet", required: true },
          { elementID: "roofColour-image-monoPitch", optionValue: "corrugatedSheet", required: true },
          {
            elementID: "roofCorrugatedSheet-field-monoPitch",
            optionValue: "corrugatedSheet",
            required: true,
          },
        ],
      },
      {
        elementID: "roofLights-field-monoPitch",
        showOptions: [
          {
            elementID: "roofLightsPerBay-field-monoPitch",
            optionValue: "yes",
            required: false,
            showOptions: [
              {
                elementID: "roofLightsPerBayCustom-field-monoPitch",
                optionValue: "other",
                required: false,
              },
            ],
          },
        ],
      },
      {
        elementID: "roofSolarPanels-field-monoPitch",
        showOptions: [
          { elementID: "roofSolarPanelsFuture-field-monoPitch", optionValue: "no", required: true },
          {
            elementID: "roofSolarPanelsCoverage-field-monoPitch",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "roofSolarPanelsCoverageCustom-field-monoPitch",
                optionValue: "custom",
                required: true,
              },
            ],
          },
          {
            elementID: "roofSolarPanelsQuoteFromProvider-field-monoPitch",
            optionValue: "yes",
            required: true,
          },
          { elementID: "roofCantilever-field-monoPitch", optionValue: "freestanding", required: true },
          { elementID: "roofRidgeCaps-field-monoPitch", optionValue: "freestanding", required: true },
        ],
      },
      {
        elementID: "cladding-field-monoPitch",
        showOptions: [
          {
            elementID: "claddingType-field-monoPitch",
            optionValue: "yes",
            required: true,
            showOptions: [
              { elementID: "claddingColour-field-monoPitch", optionValue: "composite", required: true },
              { elementID: "claddingColour-image-monoPitch", optionValue: "composite", required: true },
              {
                elementID: "compositeThickness-field-claddingRepair",
                optionValue: "composite",
                required: true,
              },
              {
                elementID: "claddingColour-field-monoPitch",
                optionValue: "boxProfileSheet",
                required: true,
              },
              {
                elementID: "claddingColour-image-monoPitch",
                optionValue: "boxProfileSheet",
                required: true,
              },
              {
                elementID: "BoxProfileType-field-monoPitch",
                optionValue: "boxProfileSheet",
                required: true,
              },
              {
                elementID: "claddingColour-field-monoPitch",
                optionValue: "corrugatedSheet",
                required: true,
              },
              {
                elementID: "claddingColour-image-monoPitch",
                optionValue: "corrugatedSheet",
                required: true,
              },
              {
                elementID: "CorrugatedSheetType-field-monoPitch",
                optionValue: "corrugatedSheet",
                required: true,
              },
              {
                elementID: "TimberBoardType-field-monoPitch",
                optionValue: "timber",
                required: true,
              },
            ],
          },
        ],
      },
      {
        elementID: "doorsRollerDoors-field-monoPitch",
        showOptions: [
          { elementID: "doorsRollerDoors-text-monoPitch", optionValue: "yes", required: true },
          { elementID: "doorsDoorLocation-field-monoPitch", optionValue: "yes", required: true },
          {
            elementID: "doorsRollerNumber-field-monoPitch",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "doorsRollerNumberCustom-field-monoPitch",
                optionValue: "custom",
                required: true,
              },
              {
                elementID: "doorsRollerNumberCustom-text-monoPitch",
                optionValue: "custom",
                required: true,
              },
            ],
          },
          { elementID: "doorsRollerWidth-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "doorsRollerHeight-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "doorsRollerBirdBrush-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "doorsRollerRubberSeal-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "doorsRollerPowerFeed-field-monoPitch", optionValue: "yes", required: true },
        ],
      },
      {
        elementID: "doorsPersonnel-field-monoPitch",
        showOptions: [
          { elementID: "doorsPersonnelNumber-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "doorsPersonnelWidth-field-monoPitch", optionValue: "yes", required: true },
          {
            elementID: "doorsPersonnelFire-field-monoPitch",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "doorsPersonnelNumberOfFireDoors-field-monoPitch",
                optionValue: "yes",
                required: true,
              },
            ],
          },
        ],
      },
      {
        elementID: "concretingFloor-field-monoPitch",
        showOptions: [
          { elementID: "concretingFloorQuote-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "floorAdditionalNotes-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "floorUpload-field-monoPitch", optionValue: "yes", required: true },
        ],
      },
      {
        elementID: "hasMezzanine-field-monoPitch",
        showOptions: [
          { elementID: "mezzanineInstallation-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "mezzanineFreestanding-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "mezzanineSteelOptions-field-monoPitch", optionValue: "yes", required: true },
          {
            elementID: "mezzanineBayWidth-field-monoPitch",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "mezzanineBayWidthOther-field-monoPitch",
                optionValue: "other",
                required: false,
              },
            ],
          },
          {
            elementID: "mezzanineSpanOptions-field-monoPitch",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "mezzanineHeight-field-monoPitch",
                optionValue: "supportPosts",
                required: true,
              },
            ],
          },
          { elementID: "mezzaninePurlins-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "mezzanineFloorOptions-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "mezzanineHandrails-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "mezzanineFloorAccess-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "mezzanineForkliftBay-field-monoPitch", optionValue: "yes", required: true },
          { elementID: "mezzanineAdditionalNotes-field-monoPitch", optionValue: "yes", required: true },
        ],
      },
    ],
  },
  {
    formName: "roundHouseForm",
    formFields: [
      {
        elementID: "siteRequiresLevelling-field-roundHouse",
        showOptions: [
          {
            elementID: "siteRequiresLevellingQuote-field-roundHouse",
            optionValue: "yes",
            required: true,
          },
        ],
      },
    ],
  },
  {
    formName: "portalFrameForm",
    formFields: [
      {
        elementID: "buildingUsage-field-portalFrame",
        showOptions: [
          { elementID: "buildingUsageOther-field-portalFrame", optionValue: "other", required: true },
          {
            elementID: "buildingUsageInternalsHorseCow-field-portalFrame",
            optionValue: "horseLooseHousing",
            required: true,
          },
          {
            elementID: "buildingUsageInternalsHorseCow-field-portalFrame",
            optionValue: "cattleShed",
            required: true,
          },
          {
            elementID: "buildingUsageInternalsStable-field-portalFrame",
            optionValue: "horseStable",
            required: true,
          },
        ],
      },
      {
        elementID: "roofPitch-field-portalFrame",
        showOptions: [{ elementID: "roofPitchCustom-field-portalFrame", optionValue: "custom", required: true }],
      },
      {
        elementID: "buildingHasWalls-field-portalFrame",
        showOptions: [
          { elementID: "howManySidesWalls-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "wallMaterial-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "wallHeightInPanels-field-portalFrame", optionValue: "yes", required: true },
          {
            elementID: "wallPanelHeight-field-portalFrame",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "wallPanelHeightCustom-field-portalFrame",
                optionValue: "custom",
                required: true,
              },
              {
                elementID: "wallPanelHeightCustom-text-portalFrame",
                optionValue: "custom",
                required: true,
              },
            ],
          },
          {
            elementID: "wallPanelThickness-field-portalFrame",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "wallPanelThicknessCustom-field-portalFrame",
                optionValue: "custom",
                required: true,
              },
              {
                elementID: "wallPanelThicknessCustom-text-portalFrame",
                optionValue: "custom",
                required: true,
              },
            ],
          },
        ],
      },
      {
        elementID: "roofMaterial-field-portalFrame",
        showOptions: [
          {
            elementID: "fibreCementColour-field-portalFrame",
            optionValue: "fibreCement",
            required: true,
          },
          { elementID: "roofColour-image-portalFrame", optionValue: "composite", required: true },
          { elementID: "roofColour-field-portalFrame", optionValue: "composite", required: true },
          {
            elementID: "compositeThickness-field-portalFrame",
            optionValue: "composite",
            required: true,
          },
          {
            elementID: "roofColour-image-portalFrame",
            optionValue: "boxProfileRoofSheets",
            required: true,
          },
          {
            elementID: "roofColour-field-portalFrame",
            optionValue: "boxProfileRoofSheets",
            required: true,
          },
          {
            elementID: "boxProfileFinish-field-portalFrame",
            optionValue: "boxProfileRoofSheets",
            required: true,
          },
          {
            elementID: "boxProfileOption-field-portalFrame",
            optionValue: "boxProfileRoofSheets",
            required: true,
          },
          {
            elementID: "roofColour-image-portalFrame",
            optionValue: "corrugatedRoofSheets",
            required: true,
          },
          {
            elementID: "roofColour-field-portalFrame",
            optionValue: "corrugatedRoofSheets",
            required: true,
          },
          {
            elementID: "corrugatedSheetFinish-field-portalFrame",
            optionValue: "corrugatedRoofSheets",
            required: true,
          },
          {
            elementID: "corrugatedSheetOption-field-portalFrame",
            optionValue: "corrugatedRoofSheets",
            required: true,
          },
        ],
      },
      {
        elementID: "roofLights-field-portalFrame",
        showOptions: [
          {
            elementID: "roofLightsPerBay-field-portalFrame",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "roofLightsPerBayCustom-field-portalFrame",
                optionValue: "custom",
                required: true,
              },
            ],
          },
        ],
      },
      {
        elementID: "solarPanels-field-portalFrame",
        showOptions: [
          {
            elementID: "solarPanelQuoteFromProvider-field-portalFrame",
            optionValue: "yes",
            required: true,
          },
          {
            elementID: "solarPanelCoverage-field-portalFrame",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "solarPanelCoverageCustom-field-portalFrame",
                optionValue: "custom",
                required: true,
              },
            ],
          },
          { elementID: "solarPanelsInTheFuture-field-portalFrame", optionValue: "no", required: true },
        ],
      },
      {
        elementID: "rollerDoors-field-portalFrame",
        showOptions: [
          { elementID: "rollerDoors-text-portalFrame", optionValue: "yes", required: true },
          { elementID: "rollerDoorLocation-field-portalFrame", optionValue: "yes", required: true },
          {
            elementID: "numberOfRollerDoors-field-portalFrame",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "numberOfRollerDoorsCustom-field-portalFrame",
                optionValue: "custom",
                required: true,
              },
            ],
          },
          { elementID: "rollerDoorwayWidth-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "rollerDoorwayHeight-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "rollerDoorBirdBrush-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "rollerDoorRubberSeal-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "rollerDoorPowerFeed-field-portalFrame", optionValue: "yes", required: true },
        ],
      },
      {
        elementID: "personnelDoors-field-portalFrame",
        showOptions: [
          { elementID: "numberOfPersonnelDoors-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "personnelDoorWidth-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "fireDoors-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "numberOfFireDoors-field-portalFrame", optionValue: "yes", required: true },
        ],
      },
      {
        elementID: "cladding-field-portalFrame",
        showOptions: [
          { elementID: "claddingColour-text-portalFrame", optionValue: "composite", required: true },
          { elementID: "claddingColour-field-portalFrame", optionValue: "composite", required: true },
          {
            elementID: "claddingCompositeThickness-field-portalFrame",
            optionValue: "composite",
            required: true,
          },
          {
            elementID: "claddingTimberBoardType-field-portalFrame",
            optionValue: "timber",
            required: true,
          },
          {
            elementID: "claddingBoxProfileType-field-portalFrame",
            optionValue: "boxProfileSheet",
            required: true,
          },
          {
            elementID: "claddingColour-text-portalFrame",
            optionValue: "boxProfileSheet",
            required: true,
          },
          {
            elementID: "claddingColour-field-portalFrame",
            optionValue: "boxProfileSheet",
            required: true,
          },
          {
            elementID: "claddingCorrugatedSheetFinish-field-portalFrame",
            optionValue: "corrugatedSheet",
            required: true,
          },
          {
            elementID: "claddingColour-text-portalFrame",
            optionValue: "corrugatedSheet",
            required: true,
          },
          {
            elementID: "claddingColour-field-portalFrame",
            optionValue: "corrugatedSheet",
            required: true,
          },
        ],
      },
      {
        elementID: "concreteFloor-field-portalFrame",
        showOptions: [
          { elementID: "concreteFloorQuote-field-portalFrame", optionValue: "yes", required: true },
          {
            elementID: "concreteFloorAdditionalNotes-field-portalFrame",
            optionValue: "yes",
            required: true,
          },
        ],
      },
      {
        elementID: "hasMezzanine-field-portalFrame",
        showOptions: [
          { elementID: "mezzanineInstallation-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "mezzanineFreestanding-field-portalFrame", optionValue: "yes", required: true },
          {
            elementID: "mezzanineBayWidth-field-portalFrame",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "mezzanineBayWidthOther-field-portalFrame",
                optionValue: "other",
                required: false,
              },
            ],
          },
          {
            elementID: "mezzanineSpanOptions-field-portalFrame",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "mezzanineOptionsSpanHeight-box-portalFrame",
                optionValue: "supportPosts",
                required: true,
              },
              {
                elementID: "mezzanineHeight-field-portalFrame",
                optionValue: "supportPosts",
                required: true,
              },
            ],
          },
          { elementID: "mezzanineSteelOptions-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "mezzaninePurlins-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "mezzanineFloorOptions-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "mezzanineHandrails-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "mezzanineFloorAccess-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "mezzanineForkliftBay-field-portalFrame", optionValue: "yes", required: true },
          { elementID: "mezzanineAdditionalNotes-field-portalFrame", optionValue: "yes", required: true },
        ],
      },
    ],
  },
  {
    formName: "mezzanineFloorForm",
    formFields: [
      {
        elementID: "mezzanineOptions-field-mezzanineFloor",
        showOptions: [
          {
            elementID: "postDimensionsMainContainer-mezzanineFloor",
            optionValue: "betweenExistingPosts",
            required: true,
          },
          {
            elementID: "mainPostDimensionsA-field-mezzanineFloor",
            optionValue: "betweenExistingPosts",
            required: true,
          },
          {
            elementID: "mainPostDimensionsB-field-mezzanineFloor",
            optionValue: "betweenExistingPosts",
            required: true,
          },
          {
            elementID: "mainPostDimensionsC-field-mezzanineFloor",
            optionValue: "betweenExistingPosts",
            required: true,
          },
          {
            elementID: "gablePosts-field-mezzanineFloor",
            optionValue: "betweenExistingPosts",
            required: true,
            showOptions: [
              {
                elementID: "postDimensionsGableContainer-mezzanineFloor",
                optionValue: "yes",
                required: false,
              },
              {
                elementID: "gablePostDimensionsA-field-mezzanineFloor",
                optionValue: "yes",
                required: false,
              },
              {
                elementID: "gablePostDimensionsB-field-mezzanineFloor",
                optionValue: "yes",
                required: false,
              },
              {
                elementID: "gablePostDimensionsC-field-mezzanineFloor",
                optionValue: "yes",
                required: false,
              },
            ],
          },
        ],
      },
      {
        elementID: "bayWidth-field-mezzanineFloor",
        showOptions: [{ elementID: "bayWidthOther-field-mezzanineFloor", optionValue: "other", required: false }],
      },
      {
        elementID: "mezzanineOptionsSpan-field-mezzanineFloor",
        showOptions: [
          {
            elementID: "mezzanineOptionsSpanHeight-box-mezzanineFloor",
            optionValue: "supportPosts",
            required: true,
          },
        ],
      },
    ],
  },
  {
    formName: "polyTunnelForm",
    formFields: [
      {
        elementID: "polytunnelSiteLevel-field-polytunnel",
        showOptions: [{ elementID: "polytunnelSiteLevelQuote-field-polytunnel", optionValue: "yes", required: true }],
      },
      {
        elementID: "polytunnelWidth-field-polytunnel",
        showOptions: [
          { elementID: "polytunnelLengthLarge-field-polytunnel", optionValue: "4.88m", required: true },
          {
            elementID: "polytunnelLengthCoveringLarge-field-polytunnel",
            optionValue: "4.88m",
            required: true,
          },
          { elementID: "polytunnelLengthLarge-field-polytunnel", optionValue: "5.49m", required: true },
          {
            elementID: "polytunnelLengthCoveringLarge-field-polytunnel",
            optionValue: "5.49m",
            required: true,
          },
          {
            elementID: "polytunnelLengthXtraLarge-field-polytunnel",
            optionValue: "6.4m",
            required: true,
          },
          {
            elementID: "polytunnelLengthCoveringLarge-field-polytunnel",
            optionValue: "6.4m",
            required: true,
          },
          {
            elementID: "polytunnelLengthXtraLarge-field-polytunnel",
            optionValue: "7.32m",
            required: true,
          },
          {
            elementID: "polytunnelLengthCoveringLarge-field-polytunnel",
            optionValue: "7.32m",
            required: true,
          },
          {
            elementID: "polytunnelLengthXtraLarge-field-polytunnel",
            optionValue: "8.23m",
            required: true,
          },
          {
            elementID: "polytunnelLengthCoveringLarge-field-polytunnel",
            optionValue: "8.23m",
            required: true,
          },
          {
            elementID: "polytunnelLengthXtraLarge-field-polytunnel",
            optionValue: "9.15m",
            required: true,
          },
          {
            elementID: "polytunnelLengthCoveringLarge-field-polytunnel",
            optionValue: "9.15m",
            required: true,
          },
        ],
      },
      {
        elementID: "polytunnelDoors-field-polytunnel",
        showOptions: [{ elementID: "polytunnelDoorPlacement-field-polytunnel", optionValue: "yes", required: true }],
      },
      {
        elementID: "polytunnelGuttering-field-polytunnel",
        showOptions: [{ elementID: "polytunnelGutteringSides-field-polytunnel", optionValue: "yes", required: true }],
      },
    ],
  },
  {
    formName: "rainwaterRepairForm",
    formFields: [
      {
        elementID: "waterPump-field-rainwaterHarvesting",
        showOptions: [{ elementID: "waterPumpSize-field-rainwaterHarvesting", optionValue: "yes", required: true }],
      },
    ],
  },
  {
    formName: "wallsRepairForm",
    formFields: [
      {
        elementID: "wallMaterial-field-wallsRepair",
        showOptions: [
          {
            elementID: "concretePanelHeight-field-wallsRepair",
            optionValue: "concretePanels",
            required: true,
            showOptions: [
              {
                elementID: "concretePanelHeightOther-field-wallsRepair",
                optionValue: "custom",
                required: true,
              },
              {
                elementID: "concretePanelHeightOther-text-wallsRepair",
                optionValue: "custom",
                required: true,
              },
            ],
          },
          {
            elementID: "concretePanelThickness-field-wallsRepair",
            optionValue: "concretePanels",
            required: true,
            showOptions: [
              {
                elementID: "concretePanelThicknessOther-field-wallsRepair",
                optionValue: "custom",
                required: true,
              },
              {
                elementID: "concretePanelThicknessOther-text-wallsRepair",
                optionValue: "custom",
                required: true,
              },
            ],
          },
          {
            elementID: "heightInConcretePanels-field-wallsRepair",
            optionValue: "concretePanels",
            required: true,
          },
          {
            elementID: "heightMassConcrete-field-wallsRepair",
            optionValue: "massConcrete",
            required: true,
          },
          {
            elementID: "massConcreteWallThickness-field-wallsRepair",
            optionValue: "massConcrete",
            required: true,
          },
          {
            elementID: "massConcreteWallThicknessOther-field-wallsRepair",
            optionValue: "massConcrete",
            required: true,
          },
          {
            elementID: "concreteLegoSize-field-wallsRepair",
            optionValue: "concreteLegoBlocks",
            required: true,
          },
        ],
      },
    ],
  },
  {
    formName: "claddingRepairForm",
    formFields: [
      {
        elementID: "claddingType-field-claddingRepair",
        showOptions: [
          { elementID: "claddingColour-field-claddingRepair", optionValue: "composite", required: true },
          { elementID: "claddingColour-image-claddingRepair", optionValue: "composite", required: true },
          {
            elementID: "claddingCompositeThickness-field-claddingRepair",
            optionValue: "composite",
            required: true,
          },
          {
            elementID: "claddingColour-field-claddingRepair",
            optionValue: "boxProfileSheet",
            required: true,
          },
          {
            elementID: "claddingColour-image-claddingRepair",
            optionValue: "boxProfileSheet",
            required: true,
          },
          {
            elementID: "claddingBoxProfileType-field-claddingRepair",
            optionValue: "boxProfileSheet",
            required: true,
          },
          {
            elementID: "claddingColour-field-claddingRepair",
            optionValue: "corrugatedSheet",
            required: true,
          },
          {
            elementID: "claddingColour-image-claddingRepair",
            optionValue: "corrugatedSheet",
            required: true,
          },
          {
            elementID: "claddingCorrugatedSheetType-field-claddingRepair",
            optionValue: "corrugatedSheet",
            required: true,
          },
          {
            elementID: "claddingTimberBoardType-field-claddingRepair",
            optionValue: "timber",
            required: true,
          },
        ],
      },
    ],
  },
  {
    formName: "doorsRepairForm",
    formFields: [
      {
        elementID: "doorType-field-doorsRepair",
        required: true,
        showOptions: [
          {
            elementID: "rollerShutterLocation-field-doorsRepair",
            optionValue: "rollerShutter",
            required: true,
          },
          {
            elementID: "rollerDoorsNumber-field-doorsRepair",
            optionValue: "rollerShutter",
            required: true,
            showOptions: [
              {
                elementID: "rollerDoorsNumberCustom-field-doorsRepair",
                optionValue: "custom",
                required: true,
              },
            ],
          },
          {
            elementID: "rollerDoorsWidth-field-doorsRepair",
            optionValue: "rollerShutter",
            required: true,
          },
          {
            elementID: "rollerDoorsHeight-field-doorsRepair",
            optionValue: "rollerShutter",
            required: true,
          },
          {
            elementID: "rollerDoorsBirdBrush-field-doorsRepair",
            optionValue: "rollerShutter",
            required: true,
          },
          {
            elementID: "rollerDoorsRubberSeal-field-doorsRepair",
            optionValue: "rollerShutter",
            required: true,
          },
          {
            elementID: "rollerDoorsPowerFeed-field-doorsRepair",
            optionValue: "rollerShutter",
            required: true,
          },
          {
            elementID: "personnelDoorsNumber-field-doorsRepair",
            optionValue: "personnel",
            required: true,
          },
          {
            elementID: "personnelDoorWidth-field-doorsRepair",
            optionValue: "personnel",
            required: true,
          },
          {
            elementID: "personnelDoorFireDoors-field-doorsRepair",
            optionValue: "personnel",
            required: true,
            showOptions: [
              {
                elementID: "personnelDoorFireDoorsNumber-field-doorsRepair",
                optionValue: "yes",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    formName: "reroofRepairForm",
    formFields: [
      {
        elementID: "oldRoof-field-reroofRepair",
        showOptions: [
          {
            elementID: "oldRoofMaterial-field-reroofRepair",
            optionValue: "yes",
            showOptions: [
              {
                elementID: "oldRoofMaterialOther-field-reroofRepair",
                optionValue: "other",
                required: true,
              },
            ],
          },
        ],
      },

      {
        elementID: "newRoofMaterial-field-reroofRepair",
        showOptions: [
          {
            elementID: "roofColour-image-reroofRepair",
            optionValue: "fibreCement",
            required: true,
          },
          {
            elementID: "fibreCementColour-field-reroofRepair",
            optionValue: "fibreCement",
            required: true,
          },

          {
            elementID: "roofColour-image-reroofRepair",
            optionValue: "composite",
            required: true,
          },
          {
            elementID: "compositeColour-field-reroofRepair",
            optionValue: "composite",
            required: true,
          },
          {
            elementID: "compositeThickness-field-reroofRepair",
            optionValue: "composite",
            required: true,
          },

          {
            elementID: "roofColour-image-reroofRepair",
            optionValue: "boxProfileRoofSheets",
            required: true,
          },
          {
            elementID: "boxProfileColour-field-reroofRepair",
            optionValue: "boxProfileRoofSheets",
            required: true,
          },
          {
            elementID: "boxProfileFinish-field-reroofRepair",
            optionValue: "boxProfileRoofSheets",
            required: true,
          },

          {
            elementID: "roofColour-image-reroofRepair",
            optionValue: "corrugatedRoofSheets",
            required: true,
          },
          {
            elementID: "corrugatedSheet-field-reroofRepair",
            optionValue: "corrugatedRoofSheets",
            required: true,
          },
          {
            elementID: "corrugatedSheetOption-field-reroofRepair",
            optionValue: "corrugatedRoofSheets",
            required: true,
          },
          {
            elementID: "corrugatedSheetFinish-field-reroofRepair",
            optionValue: "corrugatedRoofSheets",
            required: true,
          },
        ],
      },
      {
        elementID: "roofSheetLength-field-reroofRepair",
        showOptions: [
          {
            elementID: "152SheetLength-field-reroofRepair",
            optionValue: "1.52m ",
            required: true,
          },

          {
            elementID: "167SheetLength-field-reroofRepair",
            optionValue: "1.67m",
            required: true,
          },

          {
            elementID: "182SheetLength-field-reroofRepair",
            optionValue: "1.82m",
            required: true,
          },
          {
            elementID: "198SheetLength-field-reroofRepair",
            optionValue: "1.98m",
            required: true,
          },
          {
            elementID: "213SheetLength-field-reroofRepair",
            optionValue: "2.13m",
            required: true,
          },
          {
            elementID: "228SheetLength-field-reroofRepair",
            optionValue: "2.28m",
            required: true,
          },
          {
            elementID: "243SheetLength-field-reroofRepair",
            optionValue: "2.43m",
            required: true,
          },
          {
            elementID: "259SheetLength-field-reroofRepair",
            optionValue: "2.59m",
            required: true,
          },
          {
            elementID: "274SheetLength-field-reroofRepair",
            optionValue: "2.74m",
            required: true,
          },
          {
            elementID: "289SheetLength-field-reroofRepair",
            optionValue: "2.89m",
            required: true,
          },

          {
            elementID: "304SheetLength-field-reroofRepair",
            optionValue: "3.04m",
            required: true,
          },
          {
            elementID: "365SheetLength-field-reroofRepair",
            optionValue: "3.65m",
            required: true,
          },
          {
            elementID: "donotknow-text-reroofRepair",
            optionValue: "unknown",
            required: true,
          },
        ],
      },
      {
        elementID: "newGuttering-field-reroofRepair",
        showOptions: [
          {
            elementID: "gutteringType-field-reroofRepair",
            optionValue: "yes",
            showOptions: [
              {
                elementID: "gutteringColour-image-reroofRepair",
                optionValue: "galvanisedFoldedColoured",
                required: true,
              },

              {
                elementID: "gutteringColour-field-reroofRepair",
                optionValue: "galvanisedFoldedColoured",
                required: true,
              },
              {
                elementID: "gutteringOutlets-field-reroofRepair",
                optionValue: "blackPVC",
                required: true,
              },
              {
                elementID: "gutteringShapePlain-field-reroofRepair",
                optionValue: "galvanisedFoldedPlain",
                required: true,
              },
              {
                elementID: "gutteringShapeColoured-field-reroofRepair",
                optionValue: "galvanisedFoldedColoured",
                required: true,
              },
            ],
          },
          {
            elementID: "gutteringDownpipe-field-reroofRepair",
            optionValue: "yes",
            required: true,
          },
          {
            elementID: "rainwaterCatchment-field-reroofRepair",
            optionValue: "yes",
            showOptions: [
              {
                elementID: "rainwaterCatchmentTank-field-reroofRepair",
                optionValue: "yes",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    formName: "dismantleRepairForm",
    formFields: [
      {
        elementID: "cladding-field-dismantle",
        showOptions: [
          {
            elementID: "claddingType-field-dismantle",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "claddingTypeOther-field-dismantle",
                required: true,
                optionValue: "other",
              },
            ],
          },
        ],
      },
      {
        elementID: "roof-field-dismantle",
        showOptions: [
          {
            elementID: "oldRoofMaterial-field-reroofRepair",
            optionValue: "yes",
            required: true,
            showOptions: [
              {
                elementID: "roofMaterial-field-dismantle",
                optionValue: "yes",
                required: true,
                showOptions: [
                  {
                    elementID: "roofMaterialOther-field-dismantle",
                    required: true,
                    optionValue: "other",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    formName: "solarRepairForm",
    formFields: [
      {
        elementID: "roofMaterial-field-solarRepair",
        showOptions: [
          {
            elementID: "roofMaterialOther-field-solarRepair",
            optionValue: "other",
            required: true,
          },
        ],
      },
    ],
  },
  {
    formName: "gutteringRepairForm",
    formFields: [
      {
        elementID: "gutteringType-field-guttering",
        showOptions: [
          {
            elementID: "existingOutlets-field-guttering",
            optionValue: "blackPVC",
            required: true,
          },
          {
            elementID: "gutteringShapePlain-field-guttering",
            optionValue: "galvanisedFoldedPlain",
            required: true,
          },
          {
            elementID: "gutteringShapeColoured-field-guttering",
            optionValue: "galvanisedFoldedColoured",
            required: true,
          },
          {
            elementID: "gutteringColour-field-guttering",
            optionValue: "galvanisedFoldedColoured",
            required: true,
          },
          {
            elementID: "gutteringColour-image-guttering",
            optionValue: "galvanisedFoldedColoured",
            required: true,
          },
        ],
      },
      {
        formName: "rainwaterCatchment-field-guttering",
        formFields: [
          {
            elementID: "rainwaterCatchmentTank-field-guttering",
            optionValue: "yes",
            required: true,
          },
        ],
      },
    ],
  },
];
