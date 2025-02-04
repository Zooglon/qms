// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { openLightbox } from "wix-window-frontend";
import { getMapCreds } from "./masterPage";

let version = "000012";
let mapCreds;
let measurementUnits;
let formName;
let areaCalcObj = {};
const DEBUG_MODE = true;

const formOptions = [
  {
    formName: "concreteSlab",
    fields: [
      {
        parentElement: {
          element: "$w('#concreteThickness-field-concreteSlab')",
          value: "custom",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#concreteThicknessCustom-field-concreteSlab')",
          },
          {
            element: "$w('#concreteThicknessCustom-text-concreteSlab')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#finishedArea-field-concreteSlab')",
          value: "other",
          required: false,
        },
        optionElements: [
          {
            element: "$w('#finishedAreaCustom-field-concreteSlab')",
          },
          {
            element: "$w('#finishedAreaCustom-text-concreteSlab')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#finishOptions-concreteSlab')",
          value: "patterned",
          required: false,
        },
        optionElements: [
          {
            parentElement: {
              element: "$w('#patterned-field-concreteSlab')",
              value: "custom",
              required: false,
            },
            optionElements: [
              {
                element: "$w('#patternedCustom-field-concreteSlab')",
              },
              {
                element: "$w('#patternedCustom-text-concreteSlab')",
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#finishOptions-concreteSlab')",
          value: "powerFloat",
          required: false,
        },
        optionElements: [
          {
            element: "$w('#powerFloat-field-concreteSlab')",
          },
        ],
      },
    ],
  },
  {
    formName: "monoPitch",
    fields: [
      {
        parentElement: {
          element: "$w('#buildingType-field-monoPitch')",
          value: "extension",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#postDimensionsContainer-monoPitch')",
          },
          {
            element: "$w('#postDimensionA-field-monoPitch')",
          },
          {
            element: "$w('#postDimensionB-field-monoPitch')",
          },
          {
            element: "$w('#postDimensionC-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#usage-field-monoPitch')",
          value: "horseStable",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#usageHorseStable-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#usage-field-monoPitch')",
          value: "horseLooseHousing",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#usageInternals-field-monoPitch')",
            option: ["cattleShed"],
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#usage-field-monoPitch')",
          value: "cattleShed",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#usageInternals-field-monoPitch')",
            option: ["horseLooseHousing"],
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#usage-field-monoPitch')",
          value: "custom",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#usageCustom-field-monoPitch')",
          },
          {
            element: "$w('#usageCustom-text-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#walls-field-monoPitch')",
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#wallsSides-field-monoPitch')",
          },
          {
            element: "$w('#wallMaterial-field-monoPitch')",
          },
          {
            element: "$w('#wallNumberOfPanelHeight-field-monoPitch')",
          },
          {
            parentElement: {
              element: "$w('#wallPanelHeight-field-monoPitch')",
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: "$w('#wallPanelHeightCustom-field-monoPitch')",
              },
              {
                element: "$w('#wallPanelHeightCustom-text-monoPitch')",
              },
            ],
          },
          {
            parentElement: {
              element: "$w('#wallPanelThickness-field-monoPitch')",
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: "$w('#wallPanelThicknessCustom-field-monoPitch')",
              },
              {
                element: "$w('#wallPanelThicknessCustom-text-monoPitch')",
              },
            ],
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#roofMaterial-field-monoPitch')",
          value: "composite",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#roofColour-field-monoPitch')",
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: "$w('#roofColour-image-monoPitch')",
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: "$w('#roofCompositeThickness-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#roofMaterial-field-monoPitch')",
          value: "boxProfileSheet",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#roofColour-field-monoPitch')",
            option: ["composite", "corrugatedSheet"],
          },
          {
            element: "$w('#roofColour-image-monoPitch')",
            option: ["composite", "corrugatedSheet"],
          },
          {
            element: "$w('#roofBoxProfile-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#roofMaterial-field-monoPitch')",
          value: "corrugatedSheet",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#roofColour-field-monoPitch')",
            option: ["composite", "boxProfileSheet"],
          },
          {
            element: "$w('#roofColour-image-monoPitch')",
            option: ["composite", "boxProfileSheet"],
          },
          {
            element: "$w('#roofCorrugatedSheet-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#roofLights-field-monoPitch')",
          value: "yes",
          required: false,
        },
        optionElements: [
          {
            element: "$w('#roofLightsPerBay-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#roofSolarPanels-field-monoPitch')",
          value: "no",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#roofSolarPanelsFuture-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#roofSolarPanels-field-monoPitch')",
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#roofSolarPanelsCoverage-field-monoPitch')",
          },
          {
            element: "$w('#roofSolarPanelsQuoteFromProvider-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#buildingType-field-monoPitch')",
          value: "freestanding",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#roofCantilever-field-monoPitch')",
          },
          {
            element: "$w('#roofRidgeCaps-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#cladding-field-monoPitch')",
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#claddingType-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#claddingType-field-monoPitch')",
          value: "composite",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#claddingColour-field-monoPitch')",
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: "$w('#claddingColour-image-monoPitch')",
            option: ["boxProfileSheet", "corrugatedSheet"],
          },
          {
            element: "$w('#claddingType-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#claddingType-field-monoPitch')",
          value: "boxProfileSheet",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#claddingColour-field-monoPitch')",
            option: ["composite", "corrugatedSheet"],
          },
          {
            element: "$w('#claddingColour-image-monoPitch')",
            option: ["composite", "corrugatedSheet"],
          },
          {
            element: "$w('#claddingType-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#claddingType-field-monoPitch')",
          value: "corrugatedSheet",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#claddingColour-field-monoPitch')",
            option: ["composite", "boxProfileSheet"],
          },
          {
            element: "$w('#claddingColour-image-monoPitch')",
            option: ["composite", "boxProfileSheet"],
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#claddingType-field-monoPitch')",
          value: "composite",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#claddingCompositeThickness-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#claddingType-field-monoPitch')",
          value: "composite",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#claddingTimberBoardType-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#claddingType-field-monoPitch')",
          value: "boxProfile",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#claddingBoxProfileType-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#claddingType-field-monoPitch')",
          value: "corrugatedSheet",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#claddingCorrugatedSheetType-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#doorsRollerDoors-field-monoPitch')",
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#doorsRollerDoors-text-monoPitch')",
          },
          {
            parentElement: {
              element: "$w('#doorsRollerNumber-field-monoPitch')",
              value: "custom",
              required: true,
            },
            optionElements: [
              {
                element: "$w('#doorsRollerNumberCustom-field-monoPitch')",
              },
              {
                element: "$w('#doorsRollerNumberCustom-test-monoPitch')",
              },
            ],
          },
          {
            element: "$w('#doorsRollerWidth-field-monoPitch')",
          },
          {
            element: "$w('#doorsRollerHeight-field-monoPitch')",
          },
          {
            element: "$w('#doorsRollerBirdBrush-field-monoPitch')",
          },
          {
            element: "$w('#doorsRollerRubberSeal-field-monoPitch')",
          },
          {
            element: "$w('#doorsRollerPowerFeed-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#doorsPersonnel-field-monoPitch')",
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#doorsPersonnelNumber-field-monoPitch')",
          },
          {
            element: "$w('#doorsPersonnelWidth-field-monoPitch')",
          },
          {
            element: "$w('#doorsPersonnelFire-field-monoPitch')",
          },
          {
            element: "$w('#doorsPersonnelNumberOfFireDoors-field-monoPitch')",
          },
        ],
      },
      {
        parentElement: {
          element: "$w('#concretingFloor-field-monoPitch ')",
          value: "yes",
          required: true,
        },
        optionElements: [
          {
            element: "$w('#concretingFloorQuote-field-monoPitch')",
          },
          {
            element: "$w('#floorAdditionalNotes-field-monoPitch')",
          },
          {
            element: "$w('#floorUpload-field-monoPitch')",
          },
        ],
      },
    ],
  },
  {
    formName: "roundHouse",
    fields: [],
  },
];

$w.onReady(async function () {
  console.log(`Site loaded - ${version}`);
  mapCreds = await getMapCreds();

  const progressBar = $w("#progressBar");
  let completedFields = [];
  formName = "monoPitch";
  const formGuid = crypto.randomUUID();
  $w("#formGUID-field-concreteSlab").value = formGuid;
  console.log("Form GUID field:", $w("#formGUID-field-concreteSlab").value);

  DEBUG_MODE &&
    console.log(
      `Form ${formName} loaded...
      ${getForm(false).length} fillable fields,
      ${getForm(true).length} total fields`
    );

  // update progress bar
  progressBar.value = 0;

  getForm(false).forEach((field) => {
    field.onChange((ev) => {
      DEBUG_MODE && console.log("Field changed", ev.target.label, ev.target.value);

      if (field.id.startsWith("measurementUnits-field")) {
        measurementUnits = field.value;
        console.log("UNITS", measurementUnits);
      }

      if (field.value !== "" && !completedFields.includes(field.id)) {
        completedFields.push(field.id);
        updateBar(getForm(false), progressBar);
      }
    });
  });

  // for each form add additional option show
  formOptions
    .find((o) => o.formName === formName)
    .fields.forEach((field) => handleAllOptions(field));

  $w("#areaCalcBtn-concreteSlab").onClick(async () => {
    const dataToSend = mapCreds;
    const retObj = await openLightbox("area-calculator", dataToSend);
    const areaField = $w("#concreteArea-field-concreteSlab");
    const areaDetailsField = $w("#areaDetails-field-concreteSlab");

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

  $w("#testBtn").onClick(async () => {
    console.log("Submitting form - ", getForm(true));
  });
});

const updateBar = (f, b) => {
  const needCompleting = f.filter((f) => f.required && f.isVisible).length;
  const completed = f.filter((f) => f.required && f.isVisible && f.value).length;
  b.value = (completed / needCompleting) * 100;
};

const lowerFirst = (s) => (s && String(s[0]).toLowerCase() + String(s).slice(1)) || "";
const capitaliseFirst = (s) => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";

const getForm = (isAllFields) => {
  let form = [];
  $w("#formContainer")
    .children.find((s) => s.id === `formStack-${formName}`)
    .children.map((field) => {
      getAllFields(form, field);
    });

  if (isAllFields) {
    return form;
  } else {
    const filtForm = filterOutNonInputFields(form);
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
    console.log(
      "FIELD",
      ev,
      "targetVal",
      lowerFirst(ev.target.value),
      "parentVal",
      field.parentElement.value,
      "match",
      lowerFirst(ev.target.value) === field.parentElement.value
    );

    if (lowerFirst(ev.target.value) === field.parentElement.value) {
      field.optionElements.forEach((oe) => {
        if (oe.element) {
          oe.element.expand();
          if (field.parentElement.required) {
            console.log("RESET", oe.element.required);
            if (oe.element.required == true || oe.element.required == false) {
              oe.element.required = field.parentElement.required;
              oe.element.resetValidityIndication();
            }
          }
        } else {
          oe.parentElement.element.expand();
          if (field.parentElement.required) {
            if (
              oe.parentElement.element.required == true ||
              oe.parentElement.element.required == false
            ) {
              oe.parentElement.element.required = field.parentElement.required;
              oe.parentElement.element.resetValidityIndication();
            }
          }

          handleAllOptions(oe);
        }
      });
    } else {
      field.optionElements.forEach((oe) => {
        if (oe.element) {
          if (oe.element.value) {
            oe.element.value = "";
          }
          if (oe.element.required) {
            oe.element.required = false;
          }
          console.log("OE", oe, oe.option ?? "no option");
          if (!(oe.option && oe.option.includes(lowerFirst(ev.target.value)))) {
            oe.element.collapse();
          }
        } else {
          const collapseElem = (f) => {
            if (f.element) {
              f.element.collapse();
            } else {
              f.optionElements.forEach((opte) => {
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
          console.log("OE2", oe, oe.option ?? "no option");
          if (!(oe.option && oe.option.includes(lowerFirst(ev.target.value)))) {
            collapseElem(oe);
          }
        }
      });
    }
  });
};
