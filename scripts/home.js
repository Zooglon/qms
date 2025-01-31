import wixData from "wix-data";
import { openLightbox } from "wix-window-frontend";
import { getMapCreds } from "./masterPage";

const DEBUG_MODE = true;

let mapCreds;
let areaCalcObj = {};

const formOptions = {
  concreteSlab: [
    {
      parentElement: $w("#concreteThickness-field-concreteSlab"),
      optionElements: [
        $w("#concreteThicknessCustom-field-concreteSlab"),
        $w("#concreteThicknessCustom-text"),
      ],
    },
    {
      parentElement: $w("#finishedArea-field-concreteSlab"),
      optionElements: [
        $w("#finishedAreaCustom-field-concreteSlab"),
        $w("#finishedAreaCustom-text"),
      ],
    },
    {
      parentElement: $w("#finishOptions-concreteSlab"),
      optionElements: [$w("#patterned-field-concreteSlab"), $w("#powerFloat-field-concreteSlab")],
    },
    {
      parentElement: $w("#patterned-field-concreteSlab"),
      optionElements: [
        $w("#patternedCustom-field-concreteSlab"),
        $w("#patternedCustom-text-concreteSlab"),
      ],
    },
  ],
  roundHouse: [],
};

$w.onReady(async function () {
  console.log("Site loaded - 000015");
  mapCreds = await getMapCreds();

  const progressBar = $w("#progressBar");
  let completedFields = [];
  const formName = "concreteSlab";

  $w("#formGUID-field-concreteSlab").value = crypto.randomUUID();

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
      "Form loaded\nFillable fields",
      getForm(false),
      "Form loaded\nAll fields",
      getForm(true)
    );

  // update progress bar
  progressBar.value = 0;

  getForm(false).forEach((field) => {
    field.onChange((ev) => {
      DEBUG_MODE && console.log("Field changed", ev.target.label, ev.target.value);
      if (field.value !== "" && !completedFields.includes(field.id)) {
        completedFields.push(field.id);
        updateBar(getForm(false), progressBar);
      }
    });
  });

  // for each form add additional option show
  formOptions[`${formName}`].forEach((option) => {
    option.parentElement.onChange((ev) => {
      if (ev.target.value.toLowerCase() === "custom" || ev.target.value.toLowerCase() === "other") {
        option.optionElements.forEach((oe) => oe.expand());
      } else {
        option.optionElements.forEach((oe) =>
          oe.id.slice(0, -6) === ev.target.value ? oe.expand() : oe.collapse()
        );
      }
    });
  });

  $w("#areaCalcBtn-concreteSlab").onClick(async () => {
    const dataToSend = mapCreds;
    const retObj = await openLightbox("area-calculator", dataToSend);
    const areaField = $w("#concreteArea-field-concreteSlab");
    const areaDetailsField = $w("#areaDetails-field-concreteSlab");

    for (let [key, value] of Object.entries(retObj)) {
      const capitalise = (s) => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";
      let formatKey = capitalise(key).replace(/_/g, " ");
      areaCalcObj[`${formatKey}`] = value;
    }

    if (areaField && areaDetailsField && retObj) {
      areaField.value = Number(retObj.building_area_mono);
      areaDetailsField.value = JSON.stringify(areaCalcObj);
    }
  });
});

const updateBar = (f, b) => {
  const needCompleting = f.filter((f) => f.required && f.isVisible).length;
  const completed = f.filter((f) => f.required && f.isVisible && f.value).length;
  b.value = (completed / needCompleting) * 100;
};

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
