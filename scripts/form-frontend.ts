import { helloThere, getMapCreds } from "./masterPage";
import wixWindowFrontend from "wix-window-frontend";
import { openLightbox } from "wix-window-frontend";
import { captchaAuth } from "backend/captchaModule";

let version = "000183";
let mapCreds;
let measurementUnits;
let formName;
let areaCalcObj = {};
const DEBUG_MODE = true;

const formOptions = [
  {
    formName: "concreteSlabForm",
    formFields: [
      {
        elementID: $w("#concreteThickness-field-concreteSlab"),
        subFields: [
          {
            optionValue: "custom",
            required: true,
            subFields: [
              {
                elementID: $w("#concreteThicknessCustom-field-concreteSlab"),
              },
              {
                elementID: $w("#concreteThicknessCustom-text-concreteSlab"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#finishedArea-field-concreteSlab"),
        subFields: [
          {
            optionValue: "other",
            required: false,
            subFields: [
              {
                elementID: $w("#finishedAreaCustom-field-concreteSlab"),
              },
              {
                elementID: $w("#finishedAreaCustom-text-concreteSlab"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#finishOptions-concreteSlab"),
        subFields: [
          {
            optionValue: "patterned",
            required: false,
            subFields: [
              {
                elementID: $w("#patterned-field-concreteSlab"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: false,
                    subFields: [
                      {
                        elementID: $w("#patternedCustom-field-concreteSlab"),
                      },
                      {
                        elementID: $w("#patternedCustom-text-concreteSlab"),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            optionValue: "powerFloat",
            required: false,
            subFields: [
              {
                elementID: $w("#powerFloat-field-concreteSlab"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    formName: "monoPitchForm",
    formFields: [
      {
        elementID: $w("#buildingType-field-monoPitch"),
        subFields: [
          {
            optionValue: "extension",
            required: true,
            subFields: [
              {
                elementID: $w("#postDimensionsContainer-monoPitch"),
              },
              {
                elementID: $w("#postDimensionA-field-monoPitch"),
              },
              {
                elementID: $w("#postDimensionB-field-monoPitch"),
              },
              {
                elementID: $w("#postDimensionC-field-monoPitch"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#usage-field-monoPitch"),
        subFields: [
          {
            optionValue: "horseStable",
            required: true,
            subFields: [
              {
                elementID: $w("#usageHorseStable-field-monoPitch"),
              },
            ],
          },
          {
            optionValue: "horseLooseHousing",
            required: true,
            subFields: [
              {
                elementID: $w("#usageInternals-field-monoPitch"),
              },
            ],
          },
          {
            optionValue: "cattleShed",
            required: true,
            subFields: [
              {
                elementID: $w("#usageInternals-field-monoPitch"),
              },
            ],
          },
          {
            optionValue: "custom",
            required: true,
            subFields: [
              {
                elementID: $w("#usageCustom-field-monoPitch"),
              },
              {
                elementID: $w("#usageCustom-text-monoPitch"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#walls-field-monoPitch"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#wallsSides-field-monoPitch"),
              },
              {
                elementID: $w("#wallMaterial-field-monoPitch"),
              },
              {
                elementID: $w("#wallNumberOfPanelHeight-field-monoPitch"),
              },
              {
                elementID: $w("#wallPanelHeight-field-monoPitch"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#wallPanelHeightCustom-field-monoPitch"),
                      },
                      {
                        elementID: $w("#wallPanelHeightCustom-text-monoPitch"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#wallPanelThickness-field-monoPitch"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#wallPanelThicknessCustom-field-monoPitch"),
                      },
                      {
                        elementID: $w("#wallPanelThicknessCustom-text-monoPitch"),
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
        elementID: $w("#roofMaterial-field-monoPitch"),
        subFields: [
          {
            optionValue: "composite",
            required: true,
            subFields: [
              {
                elementID: $w("#roofColour-field-monoPitch"),
              },
              {
                elementID: $w("#roofColour-image-monoPitch"),
              },
              {
                elementID: $w("#roofCompositeThickness-field-monoPitch"),
              },
            ],
          },
          {
            optionValue: "boxProfileSheet",
            required: true,
            subFields: [
              {
                elementID: $w("#roofColour-field-monoPitch"),
              },
              {
                elementID: $w("#roofColour-image-monoPitch"),
              },
              {
                elementID: $w("#roofBoxProfile-field-monoPitch"),
              },
            ],
          },
          {
            optionValue: "corrugatedSheet",
            required: true,
            subFields: [
              {
                elementID: $w("#roofColour-field-monoPitch"),
              },
              {
                elementID: $w("#roofColour-image-monoPitch"),
              },
              {
                elementID: $w("#roofCorrugatedSheet-field-monoPitch"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#roofLights-field-monoPitch"),
        subFields: [
          {
            optionValue: "yes",
            required: false,
            subFields: [
              {
                elementID: $w("#roofLightsPerBay-field-monoPitch"),
                subFields: [
                  {
                    optionValue: "other",
                    required: false,
                    subFields: [
                      {
                        elementID: $w("#roofLightsPerBayCustom-field-monoPitch"),
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
        elementID: $w("#roofSolarPanels-field-monoPitch"),
        subFields: [
          {
            optionValue: "no",
            required: true,
            subFields: [
              {
                elementID: $w("#roofSolarPanelsFuture-field-monoPitch"),
              },
            ],
          },
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#roofSolarPanelsCoverage-field-monoPitch"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#roofSolarPanelsCoverageCustom-field-monoPitch"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#roofSolarPanelsQuoteFromProvider-field-monoPitch"),
              },
            ],
          },
          {
            optionValue: "freestanding",
            required: true,
            subFields: [
              {
                elementID: $w("#roofCantilever-field-monoPitch"),
              },
              {
                elementID: $w("#roofRidgeCaps-field-monoPitch"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#cladding-field-monoPitch"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#claddingType-field-monoPitch"),
                subFields: [
                  {
                    optionValue: "composite",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#claddingColour-field-monoPitch"),
                      },
                      {
                        elementID: $w("#claddingColour-image-monoPitch"),
                      },
                      {
                        elementID: $w("#claddingCompositeThickness-field-monoPitch"),
                      },
                    ],
                  },
                  {
                    optionValue: "boxProfileSheet",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#claddingColour-field-monoPitch"),
                      },
                      {
                        elementID: $w("#claddingColour-image-monoPitch"),
                      },
                      {
                        elementID: $w("#claddingBoxProfileType-field-monoPitch"),
                      },
                    ],
                  },
                  {
                    optionValue: "corrugatedSheet",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#claddingColour-field-monoPitch"),
                      },
                      {
                        elementID: $w("#claddingColour-image-monoPitch"),
                      },
                      {
                        elementID: $w("#claddingCorrugatedSheetType-field-monoPitch"),
                      },
                    ],
                  },
                  {
                    optionValue: "timber",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#claddingTimberBoardType-field-monoPitch"),
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
        elementID: $w("#doorsRollerDoors-field-monoPitch"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#doorsRollerDoors-text-monoPitch"),
              },
              {
                elementID: $w("#doorsDoorLocation-field-monoPitch"),
              },
              {
                elementID: $w("#doorsRollerNumber-field-monoPitch"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#doorsRollerNumberCustom-field-monoPitch"),
                      },
                      {
                        elementID: $w("#doorsRollerNumberCustom-text-monoPitch"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#doorsRollerWidth-field-monoPitch"),
              },
              {
                elementID: $w("#doorsRollerHeight-field-monoPitch"),
              },
              {
                elementID: $w("#doorsRollerBirdBrush-field-monoPitch"),
              },
              {
                elementID: $w("#doorsRollerRubberSeal-field-monoPitch"),
              },
              {
                elementID: $w("#doorsRollerPowerFeed-field-monoPitch"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#doorsPersonnel-field-monoPitch"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#doorsPersonnelNumber-field-monoPitch"),
              },
              {
                elementID: $w("#doorsPersonnelWidth-field-monoPitch"),
              },
              {
                elementID: $w("#doorsPersonnelFire-field-monoPitch"),
                subFields: [
                  {
                    optionValue: "yes",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#doorsPersonnelNumberOfFireDoors-field-monoPitch"),
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
        elementID: $w("#concretingFloor-field-monoPitch"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#concretingFloorQuote-field-monoPitch"),
              },
              {
                elementID: $w("#floorAdditionalNotes-field-monoPitch"),
              },
              {
                elementID: $w("#floorUpload-field-monoPitch"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#hasMezzanine-field-monoPitch"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#mezzanineInstallation-field-monoPitch"),
              },
              {
                elementID: $w("#mezzanineFreestanding-field-monoPitch"),
              },
              {
                elementID: $w("#mezzanineSteelOptions-field-monoPitch"),
              },
              {
                elementID: $w("#mezzanineBayWidth-field-monoPitch"),
                subFields: [
                  {
                    optionValue: "other",
                    required: false,
                    subFields: [
                      {
                        elementID: $w("#mezzanineBayWidthOther-field-monoPitch"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#mezzanineSpanOptions-field-monoPitch"),
                subFields: [
                  {
                    optionValue: "supportPosts",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#mezzanineHeight-field-monoPitch"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#mezzaninePurlins-field-monoPitch"),
              },
              {
                elementID: $w("#mezzanineFloorOptions-field-monoPitch"),
              },
              {
                elementID: $w("#mezzanineHandrails-field-monoPitch"),
              },
              {
                elementID: $w("#mezzanineFloorAccess-field-monoPitch"),
              },
              {
                elementID: $w("#mezzanineForkliftBay-field-monoPitch"),
              },
              {
                elementID: $w("#mezzanineAdditionalNotes-field-monoPitch"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    formName: "roundHouseForm",
    formFields: [
      {
        elementID: $w("#siteRequiresLevelling-field-roundHouse"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#siteRequiresLevellingQuote-field-roundHouse"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    formName: "portalFrameForm",
    formFields: [
      {
        elementID: $w("#buildingUsage-field-portalFrame"),
        subFields: [
          {
            optionValue: "other",
            required: true,
            subFields: [
              {
                elementID: $w("#buildingUsageOther-field-portalFrame"),
              },
            ],
          },
          {
            optionValue: "horseLooseHousing",
            required: true,
            subFields: [
              {
                elementID: $w("#buildingUsageInternalsHorseCow-field-portalFrame"),
              },
            ],
          },
          {
            optionValue: "cattleShed",
            required: true,
            subFields: [
              {
                elementID: $w("#buildingUsageInternalsHorseCow-field-portalFrame"),
              },
            ],
          },
          {
            optionValue: "horseStable",
            required: true,
            subFields: [
              {
                elementID: $w("#buildingUsageInternalsStable-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#roofPitch-field-portalFrame"),
        subFields: [
          {
            optionValue: "custom",
            required: true,
            subFields: [
              {
                elementID: $w("#roofPitchCustom-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#buildingHasWalls-field-portalFrame"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#howManySidesWalls-field-portalFrame"),
              },
              {
                elementID: $w("#wallMaterial-field-portalFrame"),
              },
              {
                elementID: $w("#wallHeightInPanels-field-portalFrame"),
              },
              {
                elementID: $w("#wallPanelHeight-field-portalFrame"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#wallPanelHeightCustom-field-portalFrame"),
                      },
                      {
                        elementID: $w("#wallPanelHeightCustom-text-portalFrame"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#wallPanelThickness-field-portalFrame"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#wallPanelThicknessCustom-field-portalFrame"),
                      },
                      {
                        elementID: $w("#wallPanelThicknessCustom-text-portalFrame"),
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
        elementID: $w("#roofMaterial-field-portalFrame"),
        subFields: [
          {
            optionValue: "fibreCement",
            required: true,
            subFields: [
              {
                elementID: $w("#fibreCementColour-field-portalFrame"),
              },
            ],
          },
          {
            optionValue: "composite",
            required: true,
            subFields: [
              {
                elementID: $w("#roofColour-image-portalFrame"),
              },
              {
                elementID: $w("#roofColour-field-portalFrame"),
              },
              {
                elementID: $w("#compositeThickness-field-portalFrame"),
              },
            ],
          },
          {
            optionValue: "boxProfileRoofSheets",
            required: true,
            subFields: [
              {
                elementID: $w("#roofColour-image-portalFrame"),
              },
              {
                elementID: $w("#roofColour-field-portalFrame"),
              },
              {
                elementID: $w("#boxProfileFinish-field-portalFrame"),
              },
              {
                elementID: $w("#boxProfileOption-field-portalFrame"),
              },
            ],
          },
          {
            optionValue: "corrugatedRoofSheets",
            required: true,
            subFields: [
              {
                elementID: $w("#roofColour-image-portalFrame"),
              },
              {
                elementID: $w("#roofColour-field-portalFrame"),
              },
              {
                elementID: $w("#corrugatedSheetFinish-field-portalFrame"),
              },
              {
                elementID: $w("#corrugatedSheetOption-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#roofLights-field-portalFrame"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#roofLightsPerBay-field-portalFrame"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#roofLightsPerBayCustom-field-portalFrame"),
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
        elementID: $w("#solarPanels-field-portalFrame"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#solarPanelQuoteFromProvider-field-portalFrame"),
              },
              {
                elementID: $w("#solarPanelCoverage-field-portalFrame"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#solarPanelCoverageCustom-field-portalFrame"),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            optionValue: "no",
            required: true,
            subFields: [
              {
                elementID: $w("#solarPanelsInTheFuture-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#rollerDoors-field-portalFrame"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#rollerDoors-text-portalFrame"),
              },
              {
                elementID: $w("#rollerDoorLocation-field-portalFrame"),
              },
              {
                elementID: $w("#numberOfRollerDoors-field-portalFrame"),
                subFields: [
                  {
                    optionValue: "custom",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#numberOfRollerDoorsCustom-field-portalFrame"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#rollerDoorwayWidth-field-portalFrame"),
              },
              {
                elementID: $w("#rollerDoorwayHeight-field-portalFrame"),
              },
              {
                elementID: $w("#rollerDoorBirdBrush-field-portalFrame"),
              },
              {
                elementID: $w("#rollerDoorRubberSeal-field-portalFrame"),
              },
              {
                elementID: $w("#rollerDoorPowerFeed-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#personnelDoors-field-portalFrame"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#numberOfPersonnelDoors-field-portalFrame"),
              },
              {
                elementID: $w("#personnelDoorWidth-field-portalFrame"),
              },
              {
                elementID: $w("#fireDoors-field-portalFrame"),
              },
              {
                elementID: $w("#numberOfFireDoors-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#cladding-field-portalFrame"),
        subFields: [
          {
            optionValue: "composite",
            required: true,
            subFields: [
              {
                elementID: $w("#claddingColour-text-portalFrame"),
              },
              {
                elementID: $w("#claddingColour-field-portalFrame"),
              },
              {
                elementID: $w("#claddingCompositeThickness-field-portalFrame"),
              },
            ],
          },
          {
            optionValue: "timber",
            required: true,
            subFields: [
              {
                elementID: $w("#claddingTimberBoardType-field-portalFrame"),
              },
            ],
          },
          {
            optionValue: "boxProfileSheet",
            required: true,
            subFields: [
              {
                elementID: $w("#claddingBoxProfileType-field-portalFrame"),
              },
              {
                elementID: $w("#claddingColour-text-portalFrame"),
              },
              {
                elementID: $w("#claddingColour-field-portalFrame"),
              },
            ],
          },
          {
            optionValue: "corrugatedSheet",
            required: true,
            subFields: [
              {
                elementID: $w("#claddingCorrugatedSheetFinish-field-portalFrame"),
              },
              {
                elementID: $w("#claddingColour-text-portalFrame"),
              },
              {
                elementID: $w("#claddingColour-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#concreteFloor-field-portalFrame"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#concreteFloorQuote-field-portalFrame"),
              },
              {
                elementID: $w("#concreteFloorAdditionalNotes-field-portalFrame"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#hasMezzanine-field-portalFrame"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#mezzanineInstallation-field-portalFrame"),
              },
              {
                elementID: $w("#mezzanineFreestanding-field-portalFrame"),
              },
              {
                elementID: $w("#mezzanineBayWidth-field-portalFrame"),
                subFields: [
                  {
                    optionValue: "other",
                    required: false,
                    subFields: [
                      {
                        elementID: $w("#mezzanineBayWidthOther-field-portalFrame"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#mezzanineSpanOptions-field-portalFrame"),
                subFields: [
                  {
                    optionValue: "supportPosts",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#mezzanineOptionsSpanHeight-box-portalFrame"),
                      },
                      {
                        elementID: $w("#mezzanineHeight-field-portalFrame"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#mezzanineSteelOptions-field-portalFrame"),
              },
              {
                elementID: $w("#mezzaninePurlins-field-portalFrame"),
              },
              {
                elementID: $w("#mezzanineFloorOptions-field-portalFrame"),
              },
              {
                elementID: $w("#mezzanineHandrails-field-portalFrame"),
              },
              {
                elementID: $w("#mezzanineFloorAccess-field-portalFrame"),
              },
              {
                elementID: $w("#mezzanineForkliftBay-field-portalFrame"),
              },
              {
                elementID: $w("#mezzanineAdditionalNotes-field-portalFrame"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    formName: "mezzanineFloorForm",
    formFields: [
      {
        elementID: $w("#mezzanineOptions-field-mezzanineFloor"),
        subFields: [
          {
            optionValue: "betweenExistingPosts",
            required: true,
            subFields: [
              {
                elementID: $w("#postDimensionsMainContainer-mezzanineFloor"),
              },
              {
                elementID: $w("#mainPostDimensionsA-field-mezzanineFloor"),
              },
              {
                elementID: $w("#mainPostDimensionsB-field-mezzanineFloor"),
              },
              {
                elementID: $w("#mainPostDimensionsC-field-mezzanineFloor"),
              },
              {
                elementID: $w("#gablePosts-field-mezzanineFloor"),
                subFields: [
                  {
                    optionValue: "yes",
                    required: false,
                    subFields: [
                      {
                        elementID: $w("#postDimensionsGableContainer-mezzanineFloor"),
                      },
                      {
                        elementID: $w("#gablePostDimensionsA-field-mezzanineFloor"),
                      },
                      {
                        elementID: $w("#gablePostDimensionsB-field-mezzanineFloor"),
                      },
                      {
                        elementID: $w("#gablePostDimensionsC-field-mezzanineFloor"),
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
        elementID: $w("#bayWidth-field-mezzanineFloor"),
        subFields: [
          {
            optionValue: "other",
            required: false,
            subFields: [
              {
                elementID: $w("#bayWidthOther-field-mezzanineFloor"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#mezzanineOptionsSpan-field-mezzanineFloor"),
        subFields: [
          {
            optionValue: "supportPosts",
            required: true,
            subFields: [
              {
                elementID: $w("#mezzanineOptionsSpanHeight-box-mezzanineFloor"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    formName: "polyTunnelForm",
    formFields: [
      {
        elementID: $w("#polytunnelSiteLevel-field-polytunnel"),
        subFields: [
          {
            optionValue: "yes",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelSiteLevelQuote-field-polytunnel"),
              },
            ],
          },
        ],
      },
      {
        elementID: $w("#polytunnelWidth-field-polytunnel"),
        subFields: [
          {
            optionValue: "1.83m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLength6ft-field-polytunnel"),
              },
              {
                elementID: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "2.44m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLength8ft-field-polytunnel"),
              },
              {
                elementID: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "3.05m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLength10ft-field-polytunnel"),
              },
              {
                elementID: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "3.66m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLength12ft14fts-field-polytunnel"),
              },
              {
                elementID: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "4.27m",
            required: true,
            subFields: [
              {
                elementID: $w("#hoopSpacing-field-polytunnel"),
                subFields: [
                  {
                    optionValue: "5ft",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#polytunnelLength12ft14fts-field-polytunnel"),
                      },
                    ],
                  },
                  {
                    optionValue: "6ft",
                    required: true,
                    subFields: [
                      {
                        elementID: $w("#polytunnelLength14ft-field-polytunnel"),
                      },
                    ],
                  },
                ],
              },
              {
                elementID: $w("#polytunnelLengthCoveringSmall-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "4.88m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLengthLarge-field-polytunnel"),
                option: ["5.49m"],
              },
              {
                elementID: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "5.49m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLengthLarge-field-polytunnel"),
                option: ["4.88m"],
              },
              {
                elementID: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "6.4m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLengthXtraLarge-field-polytunnel"),
              },
              {
                elementID: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "7.32m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLengthXtraLarge-field-polytunnel"),
              },
              {
                elementID: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "8.23m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLengthXtraLarge-field-polytunnel"),
              },
              {
                elementID: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
              },
            ],
          },
          {
            optionValue: "9.15m",
            required: true,
            subFields: [
              {
                elementID: $w("#polytunnelLengthXtraLarge-field-polytunnel"),
              },
              {
                elementID: $w("#polytunnelLengthCoveringLarge-field-polytunnel"),
              },
            ],
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

const formFields = [
  {
    formContainer: $w("#mezzanineFloorForm"),
    errorMsg: $w("#submitFailed-mezzanineFloor"),
    submitBtn: $w("#submitButton-mezzanineFloor"),
    guidField: $w("#formGUID-field-mezzanineFloor"),
    loadingElement: $w("#submitLoading-mezzanineFloor"),
    captcha: $w("#captcha-mezzanineFloor"),
  },
  {
    formContainer: $w("#monoPitchForm"),
    errorMsg: $w("#submitFailed-monoPitch"),
    submitBtn: $w("#submitButton-monoPitch"),
    guidField: $w("#formGUID-field-monoPitch"),
    loadingElement: $w("#submitLoading-monoPitch"),
    captcha: $w("#captcha-monoPitch"),
  },
  {
    formContainer: $w("#portalFrameForm"),
    errorMsg: $w("#submitFailed-portalFrame"),
    submitBtn: $w("#submitButton-portalFrame"),
    guidField: $w("#formGUID-field-portalFrame"),
    loadingElement: $w("#submitLoading-portalFrame"),
    captcha: $w("#captcha-portalFrame"),
  },
  {
    formContainer: $w("#concreteSlabForm"),
    errorMsg: $w("#submitFailed-concreteSlab"),
    submitBtn: $w("#submitButton-concreteSlab"),
    guidField: $w("#formGUID-field-concreteSlab"),
    loadingElement: $w("#submitLoading-concreteSlab"),
    captcha: $w("#captcha-concreteSlab"),
  },
  {
    formContainer: $w("#roundHouseForm"),
    errorMsg: $w("#submitFailed-roundHouse"),
    submitBtn: $w("#submitButton-roundHouse"),
    guidField: $w("#formGUID-field-roundHouse"),
    loadingElement: $w("#submitLoading-roundHouse"),
    captcha: $w("#captcha-roundHouse"),
  },
  {
    formContainer: $w("#polyTunnelForm"),
    errorMsg: $w("#submitFailed-polytunnel"),
    submitBtn: $w("#submitButton-polytunnel"),
    guidField: $w("#formGUID-field-polytunnel"),
    loadingElement: $w("#submitLoading-polytunnel"),
    captcha: $w("#captcha-polytunnel"),
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
      // DEBUG_MODE && console.log("Field changed", ev.target.label ?? ev.target.id);
      DEBUG_MODE && console.log("Field Changed:", ev.target.label ?? ev.target.id, "\n", "Field Details:", field);

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
    formOptions.find((o) => o.formName === formName).formFields.forEach((field) => handleFormSubFields(field));
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

const setCaptcha = (selectedForm) => {
  if (selectedForm) {
    selectedForm.captcha.onTimeout(() => {
      selectedForm.submitBtn.disable();
    });

    selectedForm.captcha.onError(() => {
      showError("Something went wrong. Please redo the captcha challenge.");
      selectedForm.captcha.reset();

      selectedForm.submitBtn.disable();
    });

    selectedForm.captcha.onVerified(() => {
      selectedForm.submitBtn.enable();
    });
  }
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

  activeDataset.element.onBeforeSave(() => {
    selectedFormFields.submitBtn.disable();
    selectedFormFields.loadingElement.expand();

    const showError = (msg) => {
      selectedFormFields.errorMsg.text = msg;
      selectedFormFields.loadingElement.collapse();
      selectedFormFields.errorMsg.expand();
    };
    const hideError = () => selectedFormFields.errorMsg.collapse();

    // Handle reCaptcha
    let captchaToken = selectedFormFields.captcha.token;

    if (!captchaToken) {
      showError("Please complete the reCaptcha.");
      return false;
    }

    // Handle validation errors
    const fieldsFailedValidation = fieldsWithValidationErrors();
    DEBUG_MODE && console.log("Validation Field - ", fieldsFailedValidation);
    if (fieldsFailedValidation) {
      let validationMessage = [];

      fieldsFailedValidation.forEach((ffv) => {
        if (!ffv.value || ffv.value === "") {
          console.log("FAILED FIELD - ", ffv.id);
          validationMessage.push(
            `"${ffv.label.endsWith("?") ? ffv.label.slice(0, ffv.label.length - 1) : ffv.label}" is a required field`
          );
        } else {
          validationMessage.push(`"${ffv.value}" is not a valid input for ${ffv.label}`);
        }
      });

      showError(validationMessage.join(",\n"));
    } else hideError();

    captchaAuth(captchaToken)
      .then(() => {
        // Save form data for backend reference
        activeDataset.element.setFieldValue("formGuid", formGuid);
        activeDataset.element.setFieldValue("details_areaMapDetails", areaDetails);
        // If everything is in order and the item is submitted, we show a success message and reset the captcha.
        // Submit form
        console.log("Auth check passed");
        selectedFormFields.captcha.reset();
        selectedFormFields.submitBtn.enable();

        selectedFormFields.loadingElement.collapse();
      })
      .catch(() => {
        console.log("Auth check failed");
        selectedFormFields.captcha.reset();
        showError("Something went wrong. Please check the captcha.");
        return false;
      });
    // });
  });
};

const fieldsWithValidationErrors = () => {
  const fields = getForm(false);
  console.log("Test form", fields);
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
  setCaptcha(selectedFormFields);
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
      f.type !== "$w.VectorImage" &&
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

const handleFormSubFields = (fieldWithSubField) => {
  const resetField = (inputField, recurse) => {
    if (recurse && inputField.subFields) {
      inputField.subFields.forEach((sf) => resetField(sf.subFields ?? ssf, recurse));
    }
    inputField.elementID.value = "";
    inputField.elementID.required = false;
    !inputField.elementID.collapsed && inputField.elementID.collapse();
  };

  fieldWithSubField.elementID.onChange((ev) => {
    const selected = ev.target.value;
    const options = fieldWithSubField.subFields;

    if (fieldWithSubField.elementID.type === "$w.RadioButtonGroup") {
      const [expandedOption, collapsedOptions] = options.reduce(
        (acc, option) => {
          if (option.optionValue === selected) {
            acc[0].push(option);
          } else {
            acc[1].push(option);
          }
          return acc;
        },
        [[], []]
      );

      collapsedOptions.forEach((co) => co.subFields.forEach((subField) => resetField(subField, true)));
      expandedOption.forEach((eo) =>
        eo.subFields.forEach((sf) => {
          if ("required" in sf.elementID) {
            sf.elementID.required = eo.required;
            sf.elementID.resetValidityIndication();
          }
          sf.elementID.collapsed && sf.elementID.expand();
        })
      );
    } else if (fieldWithSubField.elementID.type === "$w.SelectionTags") {
      const [expandedOptions, collapsedOptions] = selected.reduce(
        (acc, optionValue) => {
          const option = options.find((o) => o.optionValue === optionValue);
          if (option) {
            acc[0].push(option);
          } else {
            acc[1].push(options.find((o) => o.optionValue !== optionValue));
          }
          return acc;
        },
        [[], []]
      );

      collapsedOptions.forEach((s) => s.subFields.forEach((subSubField) => resetField(subSubField, true)));
      expandedOptions.forEach((s) =>
        s.subFields.forEach((subField) => {
          if ("required" in subField.elementID) {
            subField.elementID.required = s.required;
            subField.elementID.resetValidityIndication();
          }
          subField.elementID.collapsed && subField.elementID.expand();
        })
      );
    } else {
      console.log("Unhandled field type", fieldWithSubField.field.type);
    }
  });
};
