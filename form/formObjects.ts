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
          value: "fibreCement",
          required: true,
        },
        optionElements: [
          {
            element: $w("#fibreCementColour-field-portalFrame"),
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
