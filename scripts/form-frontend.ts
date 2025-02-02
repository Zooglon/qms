// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { openLightbox } from "wix-window-frontend";
import { getMapCreds } from "./masterPage";

const DEBUG_MODE = true;

let mapCreds;
let measurementUnits
let areaCalcObj = {};

const formOptions = [
  {
    "formName": "concreteSlab",
    "fields": [
      {
        "parentElement": {
          "element": $w('#concreteThickness-field-concreteSlab'),
          "value": "custom",
          "required": true
        },
        "optionElements": [
          {
            "element": $w('#concreteThicknessCustom-field-concreteSlab')
          },
          {
            "element": $w('#concreteThicknessCustom-text-concreteSlab')
          }
        ]
      },
      {
        "parentElement": {
          "element": $w('#finishedArea-field-concreteSlab'),
          "value": "other",
          "required": false
        },
        "optionElements": [
          {
            "element": $w('#finishedAreaCustom-field-concreteSlab')
          },
          {
            "element": $w('#finishedAreaCustom-text-concreteSlab')
          }
        ]
      },
      {
        "parentElement": {
          "element": $w('#finishOptions-concreteSlab'),
          "vaue": "patterned",
          "required": false
        },
        "optionElements": [
          {
            "parentElement": {
              "element": $w('#patterned-field-concreteSlab'),
              "value": "custom",
              "required": false
            },
            "optionElements": [
              {
                "element": $w('#patternedCustom-field-concreteSlab')
              },
              {
                "element": $w('#patternedCustom-text-concreteSlab')
              }
            ]
          }
        ]
      },
      {
        "parentElement": {
          "element": $w('#finishOptions-concreteSlab'),
          "vaue": "powerFloat",
          "required": false
        },
        "optionElements": [
          {
            "element": $w('#powerFloat-field-concreteSlab')
          }
        ]
      }
    ]
  },
  {
    "formName": "monoPitch",
    "fields": [
      {
        "parentElement": {
          "element": $w('#buildingType-field-monoPitch'),
          "value": "extension",
          "required": true
        },
        "optionElements": [
          {
            "element": $w('#postDimensionA-field-monoPitch'),
            "required": true
          },
          {
            "element": $w('#postDimensionB-field-monoPitch'),
            "required": true
          },
          {
            "element": $w('#postDimensionC-field-monoPitch'),
            "required": true
          }
        ]
      }
    ]
  },
  {
    "formName": "roundHouse",
    "fields": []
  }
]

$w.onReady(async function () {

  console.log("Site loaded - 000029");
  mapCreds = await getMapCreds();

  const progressBar = $w("#progressBar");
  let completedFields = [];
  const formName = "concreteSlab";

  const formGuid = crypto.randomUUID();  
  $w("#formGUID-field-concreteSlab").value = formGuid;
  console.log("Form GUID field:", $w("#formGUID-field-concreteSlab").value);

  const getForm = (isAllFields) => {
    let form = [];    
    $w("#formContainer").children.map((field) => {
      getAllFields(form, field);
    });

    if (isAllFields) {
      return form;
    } else {
      const filtForm = filterOutNonInputFields(form);
      return filtForm;
    }
  };

  DEBUG_MODE &&
    console.log(
      `Form loaded...
      ${getForm(false).length} fillable fields
      ${getForm(true).length} total fields`
    );

  // update progress bar
  progressBar.value = 0;

  getForm(false).forEach((field) => {
    field.onChange((ev) => {
      DEBUG_MODE && console.log("Field changed", ev.target.label, ev.target.value);

      if (field.id.startsWith("measurementUnits-field")) {
       measurementUnits = field.value
       console.log("UNITS", measurementUnits)
      }

      if (field.value !== "" && !completedFields.includes(field.id)) {
        completedFields.push(field.id);
        updateBar(getForm(false), progressBar);
      }
    });
  });


  // for each form add additional option show
  formOptions.find(o => o.formName === formName).fields.forEach(field => handleAllOptions(field))

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

const filterOutNonInputFields = (array) =>
  array.filter(
    (f) =>
      f.type !== "$w.Button" &&
      f.type !== "$w.Text" &&
      f.type !== "$w.Box" &&
      f.type !== "$w.FiveGridLine" &&
      f.type !== "$w.UploadButton"
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
    console.log("Target", lowerFirst(ev.target.value), "parentElem value", field.parentElement.value, "match", lowerFirst(ev.target.value) === field.parentElement.value)          
    if (lowerFirst(ev.target.value) === field.parentElement.value) {
      field.optionElements.forEach((oe) => {
        oe.element.required = field.parentElement.required
        oe.element.expand();
        if (oe.parentElement) {
          handleAllOptions(oe)
        }
      });
    }
  })        
}