import { helloThere, getMapCreds } from "./masterPage";
import wixWindowFrontend from "wix-window-frontend";
import { openLightbox } from "wix-window-frontend";

let version = "000130";
let mapCreds;
let measurementUnits;
let formName;
let areaCalcObj = {};
const DEBUG_MODE = true;

const formOptions = [
  {
    formName: "concreteSlabForm",
    fields: [
      {
        parentElement: {
          element: $w("#concreteThickness-field-concreteSlab"),
          value: "custom",
          required: true,
        },
        optionElements: [
          {
            element: $w("#concreteThicknessCustom-field-concreteSlab"),
          },
          {
            element: $w("#concreteThicknessCustom-text-concreteSlab"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#finishedArea-field-concreteSlab"),
          value: "other",
          required: false,
        },
        optionElements: [
          {
            element: $w("#finishedAreaCustom-field-concreteSlab"),
          },
          {
            element: $w("#finishedAreaCustom-text-concreteSlab"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#finishOptions-concreteSlab"),
          value: "patterned",
          required: false,
        },
        optionElements: [
          {
            parentElement: {
              element: $w("#patterned-field-concreteSlab"),
              value: "custom",
              required: false,
            },
            optionElements: [
              {
                element: $w("#patternedCustom-field-concreteSlab"),
              },
              {
                element: $w("#patternedCustom-text-concreteSlab"),
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#finishOptions-concreteSlab"),
          value: "powerFloat",
          required: false,
        },
        optionElements: [
          {
            element: $w("#powerFloat-field-concreteSlab"),
          },
        ],
      },
    ],
  },
  {
    formName: "monoPitchForm",
    fields: [
      {
        parentElement: {
          element: $w("#buildingType-field-monoPitch"),
          value: "extension",
          required: true,
        },
        optionElements: [
          {
            element: $w("#postDimensionsContainer-monoPitch"),
          },
          {
            element: $w("#postDimensionA-field-monoPitch"),
          },
          {
            element: $w("#postDimensionB-field-monoPitch"),
          },
          {
            element: $w("#postDimensionC-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#usage-field-monoPitch"),
          value: "horseStable",
          required: true,
        },
        optionElements: [
          {
            element: $w("#usageHorseStable-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#usage-field-monoPitch"),
          value: "horseLooseHousing",
          required: true,
        },
        optionElements: [
          {
            element: $w("#usageInternals-field-monoPitch"),
            option: ["cattleShed"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#usage-field-monoPitch"),
          value: "cattleShed",
          required: true,
        },
        optionElements: [
          {
            element: $w("#usageInternals-field-monoPitch"),
            option: ["horseLooseHousing"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#usage-field-monoPitch"),
          value: "custom",
          required: true,
        },
        optionElements: [
          {
            element: $w("#usageCustom-field-monoPitch"),
          },
          {
            element: $w("#usageCustom-text-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#walls-field-monoPitch"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#wallsSides-field-monoPitch"),
          },
          {
            element: $w("#wallMaterial-field-monoPitch"),
          },
          {
            element: $w("#wallNumberOfPanelHeight-field-monoPitch"),
          },
          {
            parentElement: {
              element: $w("#wallPanelHeight-field-monoPitch"),
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: $w("#wallPanelHeightCustom-field-monoPitch"),
              },
              {
                element: $w("#wallPanelHeightCustom-text-monoPitch"),
              },
            ],
          },
          {
            parentElement: {
              element: $w("#wallPanelThickness-field-monoPitch"),
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: $w("#wallPanelThicknessCustom-field-monoPitch"),
              },
              {
                element: $w("#wallPanelThicknessCustom-text-monoPitch"),
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofMaterial-field-monoPitch"),
          value: "composite",
          required: true,
        },
        optionElements: [
          {
            element: $w("#roofColour-field-monoPitch"),
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: $w("#roofColour-image-monoPitch"),
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: $w("#roofCompositeThickness-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofMaterial-field-monoPitch"),
          value: "boxProfileSheet",
          required: true,
        },
        optionElements: [
          {
            element: $w("#roofColour-field-monoPitch"),
            option: ["composite", "corrugatedSheet"],
          },
          {
            element: $w("#roofColour-image-monoPitch"),
            option: ["composite", "corrugatedSheet"],
          },
          {
            element: $w("#roofBoxProfile-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofMaterial-field-monoPitch"),
          value: "corrugatedSheet",
          required: true,
        },
        optionElements: [
          {
            element: $w("#roofColour-field-monoPitch"),
            option: ["composite", "boxProfileSheet"],
          },
          {
            element: $w("#roofColour-image-monoPitch"),
            option: ["composite", "boxProfileSheet"],
          },
          {
            element: $w("#roofCorrugatedSheet-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofLights-field-monoPitch"),
          value: "yes",
          required: false,
        },
        optionElements: [
          {
            parentElement: {
              element: $w("#roofLightsPerBay-field-monoPitch"),
              value: "other",
              required: false,
            },
            optionElements: [
              {
                element: $w("#roofLightsPerBayCustom-field-monoPitch"),
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofSolarPanels-field-monoPitch"),
          value: "no",
          required: true,
        },
        optionElements: [
          {
            element: $w("#roofSolarPanelsFuture-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofSolarPanels-field-monoPitch"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            parentElement: {
              element: $w("#roofSolarPanelsCoverage-field-monoPitch"),
              value: "custom",
            },
            optionElements: [
              {
                element: $w("#roofSolarPanelsCoverageCustom-field-monoPitch"),
              },
            ],
          },
          {
            element: $w("#roofSolarPanelsQuoteFromProvider-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#buildingType-field-monoPitch"),
          value: "freestanding",
          required: true,
        },
        optionElements: [
          {
            element: $w("#roofCantilever-field-monoPitch"),
          },
          {
            element: $w("#roofRidgeCaps-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#cladding-field-monoPitch"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#claddingType-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#claddingType-field-monoPitch"),
          value: "composite",
          required: true,
        },
        optionElements: [
          {
            element: $w("#claddingColour-field-monoPitch"),
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: $w("#claddingColour-image-monoPitch"),
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: $w("#claddingCompositeThickness-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#claddingType-field-monoPitch"),
          value: "boxProfileSheet",
          required: true,
        },
        optionElements: [
          {
            element: $w("#claddingColour-field-monoPitch"),
            option: ["composite", "corrugatedSheet"],
          },
          {
            element: $w("#claddingColour-image-monoPitch"),
            option: ["composite", "corrugatedSheet"],
          },
          {
            element: $w("#claddingBoxProfileType-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#claddingType-field-monoPitch"),
          value: "corrugatedSheet",
          required: true,
        },
        optionElements: [
          {
            element: $w("#claddingColour-field-monoPitch"),
            option: ["composite", "boxProfileSheet"],
          },
          {
            element: $w("#claddingColour-image-monoPitch"),
            option: ["composite", "boxProfileSheet"],
          },
          {
            element: $w("#claddingCorrugatedSheetType-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#claddingType-field-monoPitch"),
          value: "timber",
          required: true,
        },
        optionElements: [
          {
            element: $w("#claddingTimberBoardType-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#doorsRollerDoors-field-monoPitch"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#doorsRollerDoors-text-monoPitch"),
          },
          {
            element: $w("#doorsDoorLocation-field-monoPitch"),
          },
          {
            parentElement: {
              element: $w("#doorsRollerNumber-field-monoPitch"),
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: $w("#doorsRollerNumberCustom-field-monoPitch"),
              },
              {
                element: $w("#doorsRollerNumberCustom-text-monoPitch"),
              },
            ],
          },
          {
            element: $w("#doorsRollerWidth-field-monoPitch"),
          },
          {
            element: $w("#doorsRollerHeight-field-monoPitch"),
          },
          {
            element: $w("#doorsRollerBirdBrush-field-monoPitch"),
          },
          {
            element: $w("#doorsRollerRubberSeal-field-monoPitch"),
          },
          {
            element: $w("#doorsRollerPowerFeed-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#doorsPersonnel-field-monoPitch"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#doorsPersonnelNumber-field-monoPitch"),
          },
          {
            element: $w("#doorsPersonnelWidth-field-monoPitch"),
          },
          {
            parentElement: {
              element: $w("#doorsPersonnelFire-field-monoPitch"),
              value: "yes",
              required: true,
            },
            optionElements: [
              {
                element: $w("#doorsPersonnelNumberOfFireDoors-field-monoPitch"),
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#concretingFloor-field-monoPitch"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#concretingFloorQuote-field-monoPitch"),
          },
          {
            element: $w("#floorAdditionalNotes-field-monoPitch"),
          },
          {
            element: $w("#floorUpload-field-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#hasMezzanine-field-monoPitch"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#mezzanineInstallation-field-monoPitch"),
          },
          {
            element: $w("#mezzanineFreestanding-field-monoPitch"),
          },
          {
            element: $w("#mezzanineSteelOptions-field-monoPitch"),
          },
          {
            parentElement: {
              element: $w("#mezzanineBayWidth-field-monoPitch"),
              value: "other",
              required: false,
            },
            optionElements: [
              {
                element: $w("#mezzanineBayWidthOther-field-monoPitch"),
              },
            ],
          },
          {
            parentElement: {
              element: $w("#mezzanineSpanOptions-field-monoPitch"),
              value: "supportPosts",
              required: true,
            },
            optionElements: [
              {
                element: $w("#mezzanineHeight-field-monoPitch"),
              },
            ],
          },
          {
            element: $w("#mezzaninePurlins-field-monoPitch"),
          },
          {
            element: $w("#mezzanineFloorOptions-field-monoPitch"),
          },
          {
            element: $w("#mezzanineHandrails-field-monoPitch"),
          },
          {
            element: $w("#mezzanineFloorAccess-field-monoPitch"),
          },
          {
            element: $w("#mezzanineForkliftBay-field-monoPitch"),
          },
          {
            element: $w("#mezzanineAdditionalNotes-field-monoPitch"),
          },
        ],
      },
    ],
  },
  {
    formName: "roundHouseForm",
    fields: [
      {
        parentElement: {
          element: $w("#siteRequiresLevelling-field-roundHouse"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#siteRequiresLevellingQuote-field-roundHouse"),
          },
        ],
      },
    ],
  },
  {
    formName: "portalFrameForm",
    fields: [
      {
        parentElement: {
          element: $w("#buildingUsage-field-portalFrame"),
          value: "other",
          required: true,
        },
        optionElements: [
          {
            element: $w("#buildingUsageOther-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#buildingUsage-field-portalFrame"),
          value: "horseLooseHousing",
          option: ["cattleShed", "horseStable"],
          required: true,
        },
        optionElements: [
          {
            element: $w("#buildingUsageInternalsHorseCow-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#buildingUsage-field-portalFrame"),
          value: "cattleShed",
          option: ["horseLooseHousing", "horseStable"],
          required: true,
        },
        optionElements: [
          {
            element: $w("#buildingUsageInternalsHorseCow-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#buildingUsage-field-portalFrame"),
          value: "horseStable",
          option: ["cattleShed", "horseLooseHousing"],
          required: true,
        },
        optionElements: [
          {
            element: $w("#buildingUsageInternalsStable-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#buildingUsage-field-portalFrame"),
          value: "cattleShed",
          required: true,
        },
        optionElements: [
          {
            element: $w("#postDimensionsContainer-monoPitch"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofPitch-field-portalFrame"),
          value: "custom",
          required: true,
        },
        optionElements: [
          {
            element: $w("#roofPitchCustom-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#buildingHasWalls-field-portalFrame"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#howManySidesWalls-field-portalFrame"),
          },
          {
            element: $w("#wallMaterial-field-portalFrame"),
          },
          {
            element: $w("#wallHeightInPanels-field-portalFrame"),
          },
          {
            parentElement: {
              element: $w("#wallPanelHeight-field-portalFrame"),
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: $w("#wallPanelHeightCustom-field-portalFrame"),
              },
              {
                element: $w("#wallPanelHeightCustom-text-portalFrame"),
              },
            ],
          },
          {
            parentElement: {
              element: $w("#wallPanelThickness-field-portalFrame"),
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: $w("#wallPanelThicknessCustom-field-portalFrame"),
              },
              {
                element: $w("#wallPanelThicknessCustom-text-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofMaterial-field-portalFrame"),
          value: "fiberCement",
          required: true,
        },
        optionElements: [
          {
            element: $w("#fiberCementColour-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofMaterial-field-portalFrame"),
          value: "composite",
          required: true,
        },
        optionElements: [
          {
            element: $w("#roofColour-image-portalFrame"),
            option: ["corrugatedRoofSheets", "boxProfileRoofSheets"],
          },
          {
            element: $w("#roofColour-field-portalFrame"),
            option: ["corrugatedRoofSheets", "boxProfileRoofSheets"],
          },
          {
            element: $w("#compositeThickness-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofMaterial-field-portalFrame"),
          value: "boxProfileRoofSheets",
          required: true,
        },
        optionElements: [
          {
            element: $w("#roofColour-image-portalFrame"),
            option: ["composite", "corrugatedRoofSheets"],
          },
          {
            element: $w("#roofColour-field-portalFrame"),
            option: ["composite", "corrugatedRoofSheets"],
          },
          {
            element: $w("#boxProfileFinish-field-portalFrame"),
          },
          {
            element: $w("#boxProfileOption-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofMaterial-field-portalFrame"),
          value: "corrugatedRoofSheets",
          required: true,
        },
        optionElements: [
          {
            element: $w("#roofColour-image-portalFrame"),
            option: ["composite", "boxProfileRoofSheets"],
          },
          {
            element: $w("#roofColour-field-portalFrame"),
            option: ["composite", "boxProfileRoofSheets"],
          },
          {
            element: $w("#corrugatedSheetFinish-field-portalFrame"),
          },
          {
            element: $w("#corrugatedSheetOption-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#roofLights-field-portalFrame"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            parentElement: {
              element: $w("#roofLightsPerBay-field-portalFrame"),
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: $w("#roofLightsPerBayCustom-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#solarPanels-field-portalFrame"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#solarPanelQuoteFromProvider-field-portalFrame"),
          },
          {
            parentElement: {
              element: $w("#solarPanelCoverage-field-portalFrame"),
              value: "custom",
            },
            optionElements: [
              {
                element: $w("#solarPanelCoverageCustom-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#solarPanels-field-portalFrame"),
          value: "no",
          required: true,
        },
        optionElements: [
          {
            element: $w("#solarPanelsInTheFuture-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#rollerDoors-field-portalFrame"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#rollerDoors-text-portalFrame"),
          },
          {
            element: $w("#rollerDoorLocation-field-portalFrame"),
          },
          {
            parentElement: {
              element: $w("#numberOfRollerDoors-field-portalFrame"),
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: $w("#numberOfRollerDoorsCustom-field-portalFrame"),
              },
            ],
          },
          {
            element: $w("#rollerDoorwayWidth-field-portalFrame"),
          },
          {
            element: $w("#rollerDoorwayHeight-field-portalFrame"),
          },
          {
            element: $w("#rollerDoorBirdBrush-field-portalFrame"),
          },
          {
            element: $w("#rollerDoorRubberSeal-field-portalFrame"),
          },
          {
            element: $w("#rollerDoorPowerFeed-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#personnelDoors-field-portalFrame"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#numberOfPersonnelDoors-field-portalFrame"),
          },
          {
            element: $w("#personnelDoorWidth-field-portalFrame"),
          },
          {
            element: $w("#fireDoors-field-portalFrame"),
          },
          {
            element: $w("#numberOfFireDoors-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#cladding-field-portalFrame"),
          value: "composite",
          required: true,
        },
        optionElements: [
          {
            element: $w("#claddingColour-text-portalFrame"),
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: $w("#claddingColour-field-portalFrame"),
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: $w("#claddingCompositeThickness-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#cladding-field-portalFrame"),
          value: "timber",
          required: true,
        },
        optionElements: [
          {
            element: $w("#claddingTimberBoardType-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#cladding-field-portalFrame"),
          value: "boxProfileSheet",
          required: true,
        },
        optionElements: [
          {
            element: $w("#claddingBoxProfileType-field-portalFrame"),
          },
          {
            element: $w("#claddingColour-text-portalFrame"),
            option: ["composite", "corrugatedSheet"],
          },
          {
            element: $w("#claddingColour-field-portalFrame"),
            option: ["composite", "corrugatedSheet"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#cladding-field-portalFrame"),
          value: "corrugatedSheet",
          required: true,
        },
        optionElements: [
          {
            element: $w("#claddingCorrugatedSheetFinish-field-portalFrame"),
          },
          {
            element: $w("#claddingColour-text-portalFrame"),
            option: ["composite", "boxProfileSheet"],
          },
          {
            element: $w("#claddingColour-field-portalFrame"),
            option: ["composite", "boxProfileSheet"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#concreteFloor-field-portalFrame"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#concreteFloorQuote-field-portalFrame"),
          },
          {
            element: $w("#concreteFloorAdditionalNotes-field-portalFrame"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#hasMezzanine-field-portalFrame"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#mezzanineInstallation-field-portalFrame"),
          },
          {
            element: $w("#mezzanineFreestanding-field-portalFrame"),
          },
          {
            parentElement: {
              element: $w("#mezzanineBayWidth-field-portalFrame"),
              value: "other",
              required: false,
            },
            optionElements: [
              {
                element: $w("#mezzanineBayWidthOther-field-portalFrame"),
              },
            ],
          },
          {
            parentElement: {
              element: $w("#mezzanineSpanOptions-field-portalFrame"),
              value: "supportPosts",
              required: true,
            },
            optionElements: [
              {
                element: $w("#mezzanineOptionsSpanHeight-box-portalFrame"),
              },
              {
                element: $w("#mezzanineHeight-field-portalFrame"),
              },
            ],
          },
          {
            element: $w("#mezzanineSteelOptions-field-portalFrame"),
          },
          {
            element: $w("#mezzaninePurlins-field-portalFrame"),
          },
          {
            element: $w("#mezzanineFloorOptions-field-portalFrame"),
          },
          {
            element: $w("#mezzanineHandrails-field-portalFrame"),
          },
          {
            element: $w("#mezzanineFloorAccess-field-portalFrame"),
          },
          {
            element: $w("#mezzanineForkliftBay-field-portalFrame"),
          },
          {
            element: $w("#mezzanineAdditionalNotes-field-portalFrame"),
          },
        ],
      },
    ],
  },
  {
    formName: "mezzanineFloorForm",
    fields: [
      {
        parentElement: {
          element: $w("#mezzanineOptions-field-mezzanineFloor"),
          value: "betweenExistingPosts",
          required: true,
        },
        optionElements: [
          {
            element: $w("#postDimensionsMainContainer-mezzanineFloor"),
          },
          {
            element: $w("#mainPostDimensionsA-field-mezzanineFloor"),
          },
          {
            element: $w("#mainPostDimensionsB-field-mezzanineFloor"),
          },
          {
            element: $w("#mainPostDimensionsC-field-mezzanineFloor"),
          },
          {
            parentElement: {
              element: $w("#gablePosts-field-mezzanineFloor"),
              value: "yes",
              required: false,
            },
            optionElements: [
              {
                element: $w("#postDimensionsGableContainer-mezzanineFloor"),
              },
              {
                element: $w("#gablePostDimensionsA-field-mezzanineFloor"),
              },
              {
                element: $w("#gablePostDimensionsB-field-mezzanineFloor"),
              },
              {
                element: $w("#gablePostDimensionsC-field-mezzanineFloor"),
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#bayWidth-field-mezzanineFloor"),
          value: "other",
          required: false,
        },
        optionElements: [
          {
            element: $w("#bayWidthOther-field-mezzanineFloor"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#mezzanineOptionsSpan-field-mezzanineFloor"),
          value: "supportPosts",
          required: true,
        },
        optionElements: [
          {
            element: $w("#mezzanineOptionsSpanHeight-box-mezzanineFloor"),
          },
        ],
      },
    ],
  },
  {
    formName: "polyTunnelForm",
    fields: [
      {
        parentElement: {
          element: $w("#polytunnelSiteLevel-field-polytunnel"),
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: $w("#polytunnelSiteLevelQuote-field-polytunnel"),
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "1.83m",
          required: true,
          // option: ["2.44m", "3.05m", "3.66m", "4.27m", "4.88m", "5.49m", "6.4m", "7.32m", "8.23m", "9.15m"],
        },
        optionElements: [
          { element: $w("#polytunnelLength6ft-field-polytunnel") },
          {
            element: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
            // option: ["8ft", "10ft", "12ft", "14ft"]
            option: ["2.44m", "3.05m", "3.66m", "4.27m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "2.44m",
          required: true,
          // option: ["1.83m", "3.05m", "3.66m", "4.27m", "4.88m", "5.49m", "6.4m", "7.32m", "8.23m", "9.15m"],
        },
        optionElements: [
          { element: $w("#polytunnelLength8ft-field-polytunnel") },
          {
            element: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
            // option: ["6ft", "10ft", "12ft", "14ft"]
            option: ["1.83m", "3.05m", "3.66m", "4.27m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "3.05m",
          required: true,
          // option: ["1.83m", "2.44m", "3.66m", "4.27m", "4.88m", "5.49m", "6.4m", "7.32m", "8.23m", "9.15m"],
        },
        optionElements: [
          { element: $w("#polytunnelLength10ft-field-polytunnel") },
          {
            element: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
            // option: ["6ft", "8ft", "12ft", "14ft"]
            option: ["1.83m", "2.44m", "3.66m", "4.27m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "3.66m",
          required: true,
          // option: ["1.83m", "2.44m", "3.05m", "4.27m", "4.88m", "5.49m", "6.4m", "7.32m", "8.23m", "9.15m"],
        },
        optionElements: [
          { element: $w("#polytunnelLength12ft14fts-field-polytunnel") },
          {
            element: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
            // option: ["6ft", "8ft", "12ft", "14ft"]
            option: ["1.83m", "2.44m", "3.05m", "4.27m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "4.27m",
          required: true,
          // option: ["1.83m", "2.44m", "3.05m", "3.66m", "4.88m", "5.49m", "6.4m", "7.32m", "8.23m", "9.15m"],
        },
        optionElements: [
          {
            parentElement: { element: $w("#hoopSpacing-field-polytunnel"), value: "5ft" },
            optionElements: [
              {
                element: $w("#polytunnelLength12ft14fts-field-polytunnel"),
              },
            ],
          },
          {
            parentElement: { element: $w("#hoopSpacing-field-polytunnel"), value: "6ft" },
            optionElements: [
              {
                element: $w("#polytunnelLength14ft-field-polytunnel"),
              },
            ],
          },
          {
            element: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
            // option: ["6ft", "8ft", "12ft", "14ft"]
            option: ["1.83m", "2.44m", "3.05m", "3.66m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "4.88m",
          required: true,
          // option: ["1.83m", "2.44m", "3.05m", "3.66m", "4.27m", "5.49m", "6.4m", "7.32m", "8.23m", "9.15m"],
        },
        optionElements: [
          { element: $w("#polytunnelLengthLarge-field-polytunnel"), option: ["5.49m"] },
          {
            element: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
            // option: ["18ft", "21ft", "24ft", "27ft", "30ft"],
            option: ["5.49m", "6.4m", "7.32m", "8.23m", "9.15m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "5.49m",
          required: true,
          // option: ["1.83m", "2.44m", "3.05m", "3.66m", "4.27m", "4.88m", "6.4m", "7.32m", "8.23m", "9.15m"],
        },
        optionElements: [
          { element: $w("#polytunnelLengthLarge-field-polytunnel"), option: ["4.88m"] },
          {
            element: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
            // option: ["16ft", "21ft", "24ft", "27ft", "30ft"],
            option: ["4.88m", "6.4m", "7.32m", "8.23m", "9.15m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "6.4m",
          required: true,
          // option: ["1.83m", "2.44m", "3.05m", "3.66m", "4.27m", "4.88m", "5.49m", "7.32m", "8.23m", "9.15m"],
        },
        optionElements: [
          {
            element: $w("#polytunnelLengthXtraLarge-field-polytunnel"),
            // option: ["24ft", "27ft", "30ft"]
            option: ["7.32m", "8.23m", "9.15m"],
          },
          {
            element: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
            // option: ["16ft", "18ft", "24ft", "27ft", "30ft"],
            option: ["4.88m", "5.49m", "7.32m", "8.23m", "9.15m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "7.32m",
          required: true,
          // option: ["1.83m", "2.44m", "3.05m", "3.66m", "4.27m", "4.88m", "5.49m", "6.4m", "8.23m", "9.15m"],
        },
        optionElements: [
          {
            element: $w("#polytunnelLengthXtraLarge-field-polytunnel"),
            // option: ["21ft", "27ft", "30ft"]
            option: ["6.4m", "8.23m", "9.15m"],
          },
          {
            element: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
            // option: ["16ft", "18ft", "21ft", "27ft", "30ft"],
            option: ["4.88m", "5.49m", "6.4m", "8.23m", "9.15m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "8.23m",
          required: true,
          // option: ["1.83m", "2.44m", "3.05m", "3.66m", "4.27m", "4.88m", "5.49m", "6.4m", "7.32m", "9.15m"],
        },
        optionElements: [
          {
            element: $w("#polytunnelLengthXtraLarge-field-polytunnel"),
            // option: ["21ft", "24ft", "30ft"]
            option: ["6.4m", "7.32m", "9.15m"],
          },
          {
            element: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
            // option: ["16ft", "18ft", "21ft", "24ft", "30ft"],
            option: ["4.88m", "5.49m", "6.4m", "7.32m", "9.15m"],
          },
        ],
      },
      {
        parentElement: {
          element: $w("#polytunnelWidth-field-polytunnel"),
          value: "9.15m",
          required: true,
          // option: ["1.83m", "2.44m", "3.05m", "3.66m", "4.27m", "4.88m", "5.49m", "6.4m", "7.32m", "8.23m"],
        },
        optionElements: [
          {
            element: $w("#polytunnelLengthXtraLarge-field-polytunnel"),
            // option: ["21ft", "24ft", "27ft"]
            option: ["6.4m", "7.32m", "8.23m"],
          },
          {
            element: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
            // option: ["16ft", "18ft", "21ft", "24ft", "27ft"],
            option: ["4.88m", "5.49m", "6.4m", "7.32m", "8.23m"],
          },
        ],
      },
    ],
  },
];

// Variables Start
const formStateContainer = $w("#formStateContainer");
const formStartBtn = $w("#formStartBtn");
const supplierSignUp = $w("#supplierSignUp");
const newOrRepairStateContainer = $w("#newOrRepairStateContainer");
const quoteTypeRepeater = $w("#quoteTypeRepeater");
const quoteTypeRepeaterChild = $w("#newOrRepairStateBtn");
const repairReplaceRepeater = $w("#repairReplaceRepeater");
const repairReplaceRepeaterChild = $w("#repairReplaceRepeaterChild");
const buildingTypeRepeater = $w("#buildingTypeRepeater");
const buildingTypeRepeaterChild = $w("#buildingTypeRepeaterChild");
const quoteStateContainer = $w("#quoteStateContainer");
const mainFormImage = $w("#mainFormImage");
const formTitle = $w("#formTitle");
// const calcStateContainer = $w("#calcStateContainer");
// const pitchSwitches = [$w("#pitchCalcTriggerBtn"), $w("#closePitch")];
// const areaSwitches = [$w("#areaCalcTriggerBtn"), $w("#closeArea")];
// const forms = [
//   $w("#monoPitchForm-content"),
//   $w("#portalFrameForm-content"),
//   $w("#mezzanineFloorForm-content"),
//   $w("#roundHouseForm-content"),
//   $w("#concreteSlabForm-content"),
// ];

const formFields = [
  {
    formContainer: $w("#mezzanineFloorForm"),
    errorMsg: $w("#submitFailed-mezzanineFloor"),
    guidField: $w("#formGUID-field-mezzanineFloor"),
    // areaField: $w("#areaDetail-field-mezzanineFloor"),
  },
  {
    formContainer: $w("#monoPitchForm"),
    errorMsg: $w("#submitFailed-monoPitch"),
    guidField: $w("#formGUID-field-monoPitch"),
    // areaField: $w("#areaDetail-field-monoPitch"),
  },
  {
    formContainer: $w("#portalFrameForm"),
    errorMsg: $w("#submitFailed-portalFrame"),
    guidField: $w("#formGUID-field-portalFrame"),
    // areaField: $w("#areaDetail-field-portalFrame"),
  },
  {
    formContainer: $w("#concreteSlabForm"),
    errorMsg: $w("#submitFailed-concreteSlab"),
    guidField: $w("#formGUID-field-concreteSlab"),
    // areaField: $w("#areaDetail-field-concreteSlab"),
  },
  {
    formContainer: $w("#roundHouseForm"),
    errorMsg: $w("#submitFailed-roundHouse"),
    guidField: $w("#formGUID-field-roundHouse"),
    // areaField: $w("#areaDetail-field-roundHouse"),
  },
  {
    formContainer: $w("#polyTunnelForm"),
    errorMsg: $w("#submitFailed-polytunnel"),
    guidField: $w("#formGUID-field-polytunnel"),
    // areaField: $w("#areaDetail-field-roundHouse"),
  },
];

// const calculatePitchBtn = $w("#calcPitch");
const buildQuoteHeaderBtn = $w("#buildQuoteHeaderBtn");
const buildQuoteFooterBtn = $w("#buildQuoteFooterBtn");
const resetBtns = [
  $w("#quoteTypeResetBtn"),
  $w("#quoteTypeResetText"),
  $w("#quoteFormResetBtn"),
  $w("#quoteFormResetText"),
];
const formStartBtnContainer = $w("#formStartBtnContainer");
const progressBar = $w("#progressBar");

// State Elements

let formAdditionalFiels = {
  url: undefined,
  centerLat: undefined,
  centerLng: undefined,
  area: undefined,
  markers: undefined,
  lens: undefined,
};

let areaDetails = {};

let formState;
let activeDataset;
let selectedFormFields;

// Area Calc Element
const acc = $w("#mapComponent");

// Variables End

$w.onReady(async function () {
  helloThere();
  console.log(`Site loaded - ${version}`);

  formStartBtn.expand();
  supplierSignUp.expand();

  mapCreds = await getMapCreds();
});

// Functions
const loadForm = (formName) => {
  console.log("Load form fired,", formName, formState);
  let completedFields = [];

  const fillableFormFields = getForm(false);
  const allFormFields = getForm(true);
  datasetSet(formState.dataset);

  DEBUG_MODE &&
    console.log(
      `Form ${formName} loaded...
    Dataset set to ${activeDataset.id}...
    ${fillableFormFields.length} fillable fields,
    ${allFormFields.length} total fields`
    );

  // update progress bar
  progressBar.value = 0;

  fillableFormFields.forEach((field) => {
    field.onChange((ev) => {
      DEBUG_MODE && console.log("Field changed", ev.target.label, ev.target.value);

      if (field.id.startsWith("measurementUnits-field")) {
        measurementUnits = field.value;

        const formFields = getForm(true);
        if (formFields.find((f) => f.text && f.text === "units")) {
          formFields
            .filter((ff) => ff.text && ff.text === "units")
            .forEach((ff) => {
              ff.customClassList.add("form__units");
              ff.text = measurementUnits === "metric" ? "mm" : "ft";
              ff.expand();
            });
        } else if (formFields.find((f) => f.customClassList.contains("form__units"))) {
          formFields
            .filter((ff) => ff.customClassList.contains("form__units"))
            .forEach((ff) => {
              ff.text = measurementUnits === "metric" ? "mm" : "ft";
            });
        }
      }

      if (field.value !== "" && !completedFields.includes(field.id)) {
        updateBar(getForm(false), progressBar);
      }

      completedFields;
      completedFields.push(field.id);
    });
  });

  // for each form add additional option show
  if (!!formOptions.find((o) => o.formName === formName)) {
    formOptions.find((o) => o.formName === formName).fields.forEach((field) => handleAllOptions(field));
  } else {
    console.log("Form options not found for", formName);
  }

  $w("#areaCalcBtn-concreteSlab").onClick(async () => {
    const dataToSend = mapCreds;

    const retObj = await openLightbox("area-calculator", dataToSend);
    const areaField = $w("#concreteArea-field-concreteSlab");
    const areaDetailsField = $w("#areaDetails-field-concreteSlab");

    console.log("RETOBJ", retObj);

    for (let [key, value] of Object.entries(retObj)) {
      let formatKey = capitaliseFirst(key).replace(/_/g, " ");
      areaCalcObj[`${formatKey}`] = value;
    }
    console.log("Inputting - ", `${Number(retObj.building_area_mono)}`);
    if (areaField && areaDetailsField && retObj) {
      areaField.value = `${Number(retObj.building_area_mono)}`;
      areaDetailsField.value = JSON.stringify(areaCalcObj);
    }
  });

  $w("#pitchCalcBtn").onClick(async () => await openLightbox("pitch-calculator"));
  $w("#convertCalcBtn").onClick(async () => await openLightbox("conversion-calculator"));
};

const datasetSet = (dataset) => {
  // Add dataset in
  console.log("DATASET", dataset);
  switch (dataset) {
    case "monoPitchQuotesDataset": {
      console.log("MATCH Pt 1, monoPitchQuotesDataset");
      activeDataset = { id: "monoPitchQuotesDataset", element: $w("#monoPitchQuotesDataset") };
      console.log("MATCH ", "monoPitchQuotesDataset", dataset, "||", JSON.stringify(activeDataset));
      break;
    }
    case "concreteSlabDataset": {
      console.log("MATCH Pt 1, concreteSlabDataset");
      activeDataset = { id: "concreteSlabDataset", element: $w("#concreteSlabDataset") };
      console.log("MATCH ", "concreteSlabDataset", dataset, "||", JSON.stringify(activeDataset));
      break;
    }
    case "portalFrameQuotesDataset": {
      console.log("MATCH Pt 1, portalFrameQuotesDataset");
      activeDataset = { id: "portalFrameQuotesDataset", element: $w("#portalFrameQuotesDataset") };
      console.log("MATCH ", "portalFrameQuotesDataset", dataset, "||", JSON.stringify(activeDataset));
      break;
    }
    case "roundHouseQuotesDataset": {
      console.log("MATCH Pt 1, roundHouseQuotesDataset");
      activeDataset = { id: "roundHouseQuotesDataset", element: $w("#roundHouseQuotesDataset") };
      console.log("MATCH ", "roundHouseQuotesDataset", dataset, "||", JSON.stringify(activeDataset));
      break;
    }
    case "mezzanineFloorQuotesDataset": {
      console.log("MATCH Pt 1, mezzanineFloorQuotesDataset");
      activeDataset = { id: "mezzanineFloorQuotesDataset", element: $w("#mezzanineFloorQuotesDataset") };
      console.log("MATCH ", "mezzanineFloorQuotesDataset", dataset, "||", JSON.stringify(activeDataset));
      break;
    }
    case "polyTunnelQuotesDataset": {
      console.log("MATCH Pt 1, polyTunnelQuotesDataset");
      activeDataset = { id: "polyTunnelQuotesDataset", element: $w("#polyTunnelQuotesDataset") };
      console.log("MATCH ", "polyTunnelQuotesDataset", dataset, "||", JSON.stringify(activeDataset));
      break;
    }
    default: {
      console.log("DEFAULT", dataset);
      break;
    }
  }

  const formGuid = crypto.randomUUID();
  const areaDetails = "";

  const guidField = selectedFormFields.guidField;
  guidField.value = formGuid;
  // const areaField = selectedFormFields.areaField
  // areaField.value = areaDetails

  // console.log("activeDataset", activeDataset, dataset);

  activeDataset.element.onBeforeSave(() => {
    const errorMessageBox = selectedFormFields.errorMsg;

    activeDataset.element.setFieldValue("formGuid", formGuid);
    activeDataset.element.setFieldValue("details_areaMapDetails", areaDetails);
    // activeDataset.element.setFieldValue("formOrder", "");

    const fieldsFailedValidation = fieldsWithValidationErrors();
    DEBUG_MODE && console.log("Validation Field - ", fieldsFailedValidation);
    if (fieldsFailedValidation) {
      let validationMessage = [];

      fieldsFailedValidation.forEach((ffv) => {
        if (!ffv.value || ffv.value === "") {
          validationMessage.push(
            `"${ffv.label.endsWith("?") ? ffv.label.slice(0, ffv.label.length - 1) : ffv.label}" is a required field`
          );
        } else {
          validationMessage.push(`"${ffv.value}" is not a valid input for ${ffv.label}`);
        }
      });

      errorMessageBox.text = validationMessage.join(",\n");
      errorMessageBox.expand();
    } else errorMessageBox.collapse();
  });
};

const fieldsWithValidationErrors = () => {
  const fields = getForm(false);
  const nonValidFields = fields.filter((field) => !field.valid);
  if (nonValidFields.length >= 1) {
    return nonValidFields;
  }
};

const updateFormState = (dataset) => {
  if (dataset) {
    formName = formState.quoteFormId.replace("-content", "");
    mainFormImage.src = `${dataset.image}`;
    mainFormImage.alt = `${dataset.quoteTitle} image`;
    formTitle.text = `New ${dataset.quoteTitle} quote`;
    loadForm(formName);
    if (mapCreds) {
      // prepareMap(mapCreds);
    } else {
      console.log("Error loading area map, please contact us");
    }
  } else {
    console.log("Error forming state, please contact us");
  }
};

// const prepareMap = (msg) => {
//   acc.postMessage(msg);
//   acc.onMessage((event) => {
//     let receivedMessage = event.data;
//     if (formState.quoteFormId === "concreteSlabForm-content") {
//       let selectedForm = forms.find((form) => form.id === formState.quoteFormId);
//       formAdditionalFiels = receivedMessage;
//       selectedForm.setFieldValues({
//         building_area_mono: Number(Number(formAdditionalFiels.area).toFixed(2)),
//         site_satellite_area: `${Number(formAdditionalFiels.area).toFixed(2)}m2`,
//         site_maps_link: `https://www.google.com/maps/place/${formAdditionalFiels.centerLat},${formAdditionalFiels.centerLng}`,
//         line_lengths: `${formAdditionalFiels.lens.join(",\n")}`,
//         site_satellite_view_image: `${formAdditionalFiels.url}`,
//       });
//       selectedForm.save;
//     }
//   });
// };

// OnClicks
formStartBtn.onClick(() => formStateContainer.changeState("newQuoteState"));
buildQuoteHeaderBtn.onClick(() => formStateContainer.changeState("newQuoteState"));
buildQuoteFooterBtn.onClick(() => formStateContainer.changeState("newQuoteState"));

buildingTypeRepeaterChild.onClick((event) => {
  formState = buildingTypeRepeater.data.find((item) => item._id === event.context.itemId);
  console.log("buildingTypeState", formState);
  formStateContainer.changeState("formState");
  quoteStateContainer.changeState(formState.quoteFormId.replace("-content", ""));
  updateFormState(formState);
});

repairReplaceRepeaterChild.onClick((event) => {
  formState = repairReplaceRepeater.data.find((item) => item._id === event.context.itemId);
  console.log("repairReplace", formState);
  formStateContainer.changeState("formState");
  quoteStateContainer.changeState(formState.quoteFormId.replace("-content", ""));
  updateFormState(formState);
});

// When selecting New building or repair/replace...
quoteTypeRepeaterChild.onClick((event) => {
  console.log("quoteType", event);
  let id = quoteTypeRepeater.data.find((item) => item._id === event.context.itemId);
  if (id.title === "New Building") {
    newOrRepairStateContainer.changeState("newBuildingState");
  } else {
    newOrRepairStateContainer.changeState("repairReplaceState");
  }
});

resetBtns.forEach((rb) =>
  rb.onClick(() => {
    newOrRepairStateContainer.changeState("newOrRepairState");
    formStateContainer.changeState("initialState");
    wixWindowFrontend.scrollTo(0, 0);
  })
);

const updateBar = (f, b) => {
  const needCompleting = f.filter((f) => f.required && f.isVisible).length;
  const completed = f.filter((f) => f.required && f.isVisible && f.value).length;
  b.value = (completed / needCompleting) * 100;
};

const lowerFirst = (s) => (s && String(s[0]).toLowerCase() + String(s).slice(1)) || "";
const capitaliseFirst = (s) => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";

const getForm = (isAllFields) => {
  let form = [];
  selectedFormFields = formFields.find((fc) => fc.formContainer.id === formName);
  const getForm = selectedFormFields.formContainer;
  const getFormStack = getForm.children.find((s) => s.id === `formStack-${formName.replace("-content", "")}`);
  getFormStack.children.map((field) => {
    getAllFields(form, field);
  });

  if (isAllFields) {
    return form;
  } else {
    const filtForm = filterOutNonInputFields(form);
    filtForm.forEach((inputElem) => {
      if (inputElem.type === "$w.RadioButtonGroup" && inputElem.options.length >= 3) {
        inputElem.options.length == 3
          ? inputElem.customClassList.add("form__radio__triple")
          : inputElem.customClassList.add("form__radio__multiple");
      }
    });
    return filtForm;
  }
};

const filterOutNonInputFields = (array) =>
  array.filter(
    (f) =>
      f.type !== "$w.Button" &&
      f.type !== "$w.Text" &&
      f.type !== "$w.Box" &&
      f.type !== "$w.Image" &&
      f.type !== "$w.FiveGridLine" &&
      f.type !== "$w.UploadButton" &&
      f.type !== "$w.Captcha"
  );

const getAllFields = (fieldsArray, element) => {
  if (element.type === "$w.Box") {
    element.children.map((ce) => getAllFields(fieldsArray, ce));
  } else {
    fieldsArray.push(element);
  }
};

const handleAllOptions = (field) => {
  field.parentElement.element.onChange((ev) => {
    console.log("FIELD", field);
    if (lowerFirst(ev.target.value) !== field.parentElement.value) {
      field.optionElements.forEach((oe) => {
        if (oe.element) {
          oe.element.id === "hoopSpacing-field-polytunnel" && console.log("Appeared?");
          if (oe.element.value) {
            oe.element.value = "";
          }
          if (oe.element.required) {
            oe.element.required = false;
          }
          if (!(oe.option && oe.option.includes(lowerFirst(ev.target.value)))) {
            oe.element.id === "hoopSpacing-field-polytunnel" && console.log("Appeared?");
            oe.element.collapse();
          }
        } else {
          console.log("Whats this?", oe); // this is child option elements
          const collapseElem = (f) => {
            if (f.element) {
              f.element.id === "hoopSpacing-field-polytunnel" && console.log("Appeared in collapse 1?");
              f.element.collapse();
            } else {
              f.optionElements.forEach((opte) => {
                opte.element.id === "hoopSpacing-field-polytunnel" && console.log("Appeared in collapse 2?");
                collapseElem(opte);
                if (opte.element.value) {
                  opte.element.value = "";
                }
              });
              f.parentElement.element.collapse();
              if (f.parentElement.element.value) {
                f.parentElement.element.value = "";
              }
            }
          };
          if (!(oe.option && oe.option.includes(lowerFirst(ev.target.value)))) {
            console.log("Appeared at base", oe.option);
            collapseElem(oe);
          }
        }
      });
    } else {
      console.log("Step One", field, "click target val", ev.target.value, "field parent value", ev.target.value);
      field.optionElements.forEach((oe) => {
        if (oe.element) {
          oe.element.expand();
          if (field.parentElement.required) {
            if (oe.element.required == true || oe.element.required == false) {
              oe.element.required = field.parentElement.required;
              oe.element.resetValidityIndication();
            }
          }
        } else {
          oe.parentElement.element.expand();
          if (field.parentElement.required) {
            if (oe.parentElement.element.required == true || oe.parentElement.element.required == false) {
              oe.parentElement.element.required = field.parentElement.required;
              oe.parentElement.element.resetValidityIndication();
            }
          }

          handleAllOptions(oe);
        }
      });
    }
  });
};
