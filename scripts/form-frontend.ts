import { helloThere, getMapCreds } from "./masterPage";
import wixWindowFrontend from "wix-window-frontend";
import { openLightbox } from "wix-window-frontend";
import { captchaAuth } from "backend/captchaModule";
import { getFormOptions } from "public/formFunctions";

// recursive remove not working 100%
// capcha auth needs to be awaited - i think?

let version = "000296";
let mapCreds;
let measurementUnits;
let formName;
let areaCalcObj = {};
const DEBUG_MODE = true;

// Variables Start
let formOptions = [];
const formStartBtn = $w("#formStartBtn");
const supplierSignUp = $w("#supplierSignUp");

const formFields = [
  // New building
  {
    formContainer: $w("#mezzanineFloorForm"),
    errorMsg: $w("#submitFailed-mezzanineFloor"),
    submitBtn: $w("#submitButton-mezzanineFloor"),
    guidField: $w("#formGUID-field-mezzanineFloor"),
    loadingElement: $w("#submitLoading-mezzanineFloor"),
    captcha: $w("#captcha-mezzanineFloor"),
    imageElement: $w("#mainImage-mezzanineFloor"),
  },
  {
    formContainer: $w("#monoPitchForm"),
    errorMsg: $w("#submitFailed-monoPitch"),
    submitBtn: $w("#submitButton-monoPitch"),
    guidField: $w("#formGUID-field-monoPitch"),
    loadingElement: $w("#submitLoading-monoPitch"),
    captcha: $w("#captcha-monoPitch"),
    imageElement: $w("#mainImage-monoPitch"),
  },
  {
    formContainer: $w("#portalFrameForm"),
    errorMsg: $w("#submitFailed-portalFrame"),
    submitBtn: $w("#submitButton-portalFrame"),
    guidField: $w("#formGUID-field-portalFrame"),
    loadingElement: $w("#submitLoading-portalFrame"),
    captcha: $w("#captcha-portalFrame"),
    imageElement: $w("#mainImage-portalFrame"),
  },
  {
    formContainer: $w("#concreteSlabForm"),
    errorMsg: $w("#submitFailed-concreteSlab"),
    submitBtn: $w("#submitButton-concreteSlab"),
    guidField: $w("#formGUID-field-concreteSlab"),
    loadingElement: $w("#submitLoading-concreteSlab"),
    captcha: $w("#captcha-concreteSlab"),
    imageElement: $w("#mainImage-concreteSlab"),
  },
  {
    formContainer: $w("#roundHouseForm"),
    errorMsg: $w("#submitFailed-roundHouse"),
    submitBtn: $w("#submitButton-roundHouse"),
    guidField: $w("#formGUID-field-roundHouse"),
    loadingElement: $w("#submitLoading-roundHouse"),
    captcha: $w("#captcha-roundHouse"),
    imageElement: $w("#mainImage-roundHouse"),
  },
  {
    formContainer: $w("#polyTunnelForm"),
    errorMsg: $w("#submitFailed-polytunnel"),
    submitBtn: $w("#submitButton-polytunnel"),
    guidField: $w("#formGUID-field-polytunnel"),
    loadingElement: $w("#submitLoading-polytunnel"),
    captcha: $w("#captcha-polytunnel"),
    imageElement: $w("#mainImage-polytunnel"),
  },
  // Repair/Replace
  {
    formContainer: $w("#wallsRepairForm"),
    errorMsg: $w("#submitFailed-wallsRepair"),
    submitBtn: $w("#submitButton-wallsRepair"),
    guidField: $w("#formGUID-field-wallsRepair"),
    loadingElement: $w("#submitLoading-wallsRepair"),
    captcha: $w("#captcha-wallsRepair"),
    imageElement: $w("#mainImage-wallsRepair"),
  },
  {
    formContainer: $w("#gutteringRepairForm"),
    errorMsg: $w("#submitFailed-gutteringRepair"),
    submitBtn: $w("#submitButton-gutteringRepair"),
    guidField: $w("#formGUID-field-gutteringRepair"),
    loadingElement: $w("#submitLoading-gutteringRepair"),
    captcha: $w("#captcha-gutteringRepair"),
    imageElement: $w("#mainImage-gutteringRepair"),
  },
  {
    formContainer: $w("#solarRepairForm"),
    errorMsg: $w("#submitFailed-solarRepair"),
    submitBtn: $w("#submitButton-solarRepair"),
    guidField: $w("#formGUID-field-solarRepair"),
    loadingElement: $w("#submitLoading-solarRepair"),
    captcha: $w("#captcha-solarRepair"),
    imageElement: $w("#mainImage-solarRepair"),
  },
  {
    formContainer: $w("#dismantleRepairForm"),
    errorMsg: $w("#submitFailed-dismantleRepair"),
    submitBtn: $w("#submitButton-dismantleRepair"),
    guidField: $w("#formGUID-field-dismantleRepair"),
    loadingElement: $w("#submitLoading-dismantleRepair"),
    captcha: $w("#captcha-dismantleRepair"),
    imageElement: $w("#mainImage-dismantleRepair"),
  },
  {
    formContainer: $w("#rainwaterRepairForm"),
    errorMsg: $w("#submitFailed-rainwaterRepair"),
    submitBtn: $w("#submitButton-rainwaterRepair"),
    guidField: $w("#formGUID-field-rainwaterRepair"),
    loadingElement: $w("#submitLoading-rainwaterRepair"),
    captcha: $w("#captcha-rainwaterRepair"),
    imageElement: $w("#mainImage-rainwaterRepair"),
  },
  {
    formContainer: $w("#doorsRepairForm"),
    errorMsg: $w("#submitFailed-doorsRepair"),
    submitBtn: $w("#submitButton-doorsRepair"),
    guidField: $w("#formGUID-field-doorsRepair"),
    loadingElement: $w("#submitLoading-doorsRepair"),
    captcha: $w("#captcha-doorsRepair"),
    imageElement: $w("#mainImage-doorsRepair"),
  },
  {
    formContainer: $w("#reroofRepairForm"),
    errorMsg: $w("#submitFailed-reroofRepair"),
    submitBtn: $w("#submitButton-reroofRepair"),
    guidField: $w("#formGUID-field-reroofRepair"),
    loadingElement: $w("#submitLoading-reroofRepair"),
    captcha: $w("#captcha-reroofRepair"),
    imageElement: $w("#mainImage-reroofRepair"),
  },
  {
    formContainer: $w("#claddingRepairForm"),
    errorMsg: $w("#submitFailed-claddingRepair"),
    submitBtn: $w("#submitButton-claddingRepair"),
    guidField: $w("#formGUID-field-claddingRepair"),
    loadingElement: $w("#submitLoading-claddingRepair"),
    captcha: $w("#captcha-claddingRepair"),
    imageElement: $w("#mainImage-claddingRepair"),
  },
];

const buildQuoteHeaderBtn = $w("#buildQuoteHeaderBtn");
const buildQuoteFooterBtn = $w("#buildQuoteFooterBtn");
const resetBtns = [
  $w("#quoteTypeResetBtn"),
  $w("#quoteTypeResetText"),
  $w("#quoteFormResetBtn"),
  $w("#quoteFormResetText"),
];
const progressBar = $w("#progressBar");

// State Elements
let formState;
let activeDataset;
let selectedFormFields;

// Variables End

$w.onReady(async function () {
  helloThere();
  formOptions = getFormOptions;
  console.log(`Site loaded - ${version}`);

  formStartBtn.expand();
  supplierSignUp.expand();

  mapCreds = await getMapCreds();
});

// Functions
const loadForm = (formName) => {
  DEBUG_MODE && console.log("Loading form...", formName);
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
      DEBUG_MODE && console.log("Field Changed:", ev.target.label ?? ev.target.id, "\n", "Field Details:", field);

      let fieldVal = ev.target.value;
      // POSSBILY CHANGE FIELD TO THIS?
      let fieldId = ev.target.id;

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

      if (field.id.startsWith("polytunnelWidth-field-polytunnel")) {
        let polytunnelHeightElement = $w("#polytunnelHeight-text-polytunnel");
        let polytunnelHoopDistance = $w("#polytunnelHoopDistance-text-polytunnel");
        if (fieldVal === "4.88m") {
          polytunnelHeightElement.text = "8ft 6in";
          polytunnelHoopDistance.text = "27ft 10in";
        } else if (fieldVal === "5.49m") {
          polytunnelHeightElement.text = "8ft 6in";
          polytunnelHoopDistance.text = "29ft 6in";
        } else if (fieldVal === "6.4m") {
          polytunnelHeightElement.text = "9ft 9in";
          polytunnelHoopDistance.text = "34ft 9in";
        } else if (fieldVal === "7.32m") {
          polytunnelHeightElement.text = "10ft";
          polytunnelHoopDistance.text = "37ft 11in";
        } else if (fieldVal === "8.23m") {
          polytunnelHeightElement.text = "10ft 5in";
          polytunnelHoopDistance.text = "39ft 4in";
        } else if (fieldVal === "9.15m") {
          polytunnelHeightElement.text = "11ft";
          polytunnelHoopDistance.text = "43ft 6in";
        }
        polytunnelHeightElement.collapsed && polytunnelHeightElement.expand();
        polytunnelHoopDistance.collapsed && polytunnelHoopDistance.expand();
      }

      if (field.value !== "" && !completedFields.includes(field.id)) {
        updateBar(getForm(false), progressBar);
      }

      completedFields.push(field.id);

      if (!!formOptions.find((o) => o.formName === formName)) {
        const selectedForm = formOptions.find((o) => o.formName === formName);

        const findMatch = (id, obj) => {
          let matches = [];

          const findMatchedId = (id, obj) => {
            if (obj.elementID === id) {
              matches.push(obj);
            }

            const checkArray = (array) => {
              for (const item of array) {
                if (typeof item === "object") {
                  findMatchedId(id, item);
                }
              }
            };

            if (obj.formFields) {
              checkArray(obj.formFields);
            }

            if (obj.showOptions) {
              checkArray(obj.showOptions);
            }
          };

          findMatchedId(id, obj);
          return matches;
        };

        const idToSearch = fieldId;
        const foundObject = findMatch(idToSearch, selectedForm);

        const hideField = (input) => {
          if (!input.elementID) {
            DEBUG_MODE && console.log("(Remove)", "Error, no elementID found in ", input);
            return;
          }
          // @ts-ignore
          const wixElementRef = $w(`#${input.elementID}`);
          if (wixElementRef.collapsed) return;

          DEBUG_MODE && console.log("removing...", wixElementRef, input);

          if (wixElementRef.required) {
            wixElementRef.required = false;
          }

          // reset field and if subfields reset recursively
          if (input.showOptions) {
            input.showOptions.map((option) => {
              DEBUG_MODE && console.log("Hiding subsub...", option);
              hideField(option);

              // if (option.showOptions) {
              //   option.showOptions.map((subSubField) => {
              //     console.log("Hiding subsub...", subSubField);
              //     hideField(subSubField);
              //   });
              // }
            });
          }

          if (wixElementRef.type && wixElementRef.type.toLowerCase().includes("input")) {
            wixElementRef.value = "";
            wixElementRef.resetValidityIndication();
          }
          wixElementRef.collapse();
        };

        const showField = (input) => {
          DEBUG_MODE && console.log("Adding to view...", input);
          // @ts-ignore
          const wixElementRef = $w(`#${input.elementID}`);
          wixElementRef.type &&
            wixElementRef.type.toLowerCase().includes("input") &&
            wixElementRef.resetValidityIndication();
          wixElementRef.collapsed && wixElementRef.expand();
        };

        const handleFormOptionFields = (formOptionObj, selectedValue) => {
          let fieldValue = selectedValue.map((v) => lowerFirst(v));
          DEBUG_MODE &&
            console.log("handler fired...", [
              { "Options to render": formOptionObj.showOptions.map((f) => f.elementID ?? "No elementID") },
              { "element ID": formOptionObj.elementID },
              { "input value": fieldValue },
            ]);
          if (formOptionObj.showOptions && formOptionObj.elementID) {
            // is a top level?
            // show subFields that match option
            let showFieldsArray = formOptionObj.showOptions;

            let showList = [];
            let hideList = [];

            showFieldsArray.forEach((showOption) => {
              fieldValue.includes(showOption.optionValue) ? showList.push(showOption) : hideList.push(showOption);
            });
            // add fields to page that match option
            showList.forEach((hf) => showField(hf));
            // if elementID matches a shown field, filter out of hide list
            hideList = hideList.filter((hf) => !showList.find((h) => h.elementID === hf.elementID));
            // Hide non matching fields from page
            hideList.forEach((hf) => hideField(hf));
          }
        };

        foundObject.forEach((foundObj) => {
          if (!foundObj) console.log("Error, no object found in ", foundObj);
          foundObj.showOptions && handleFormOptionFields(foundObj, [fieldVal].flat());
        });
      } else {
        console.log("Form options not found for", formName);
      }
    });
  });

  // $w("#areaCalcBtn-concreteSlab").onClick(async () => {
  //   const dataToSend = mapCreds;

  //   const retObj = await openLightbox("area-calculator", dataToSend);
  //   const areaField = $w("#concreteArea-field-concreteSlab");
  //   const areaDetailsField = $w("#areaDetails-field-concreteSlab");

  //   console.log("RETOBJ", retObj);

  //   for (let [key, value] of Object.entries(retObj)) {
  //     let formatKey = capitaliseFirst(key).replace(/_/g, " ");
  //     areaCalcObj[`${formatKey}`] = value;
  //   }
  //   console.log("Inputting - ", `${Number(retObj.building_area_mono)}`);
  //   if (areaField && areaDetailsField && retObj) {
  //     areaField.value = `${Number(retObj.building_area_mono)}`;
  //     areaDetailsField.value = JSON.stringify(areaCalcObj);
  //   }
  // });

  $w("#pitchCalcBtn").onClick(async () => await openLightbox("pitch-calculator"));
  $w("#convertCalcBtn").onClick(async () => await openLightbox("conversion-calculator"));
};

const setCaptcha = (selectedForm) => {
  if (selectedForm) {
    selectedForm.captcha.onTimeout(() => {
      selectedForm.submitBtn.disable();
    });

    selectedForm.captcha.onError(() => {
      const msg = "Something went wrong. Please redo the captcha challenge.";
      selectedFormFields.errorMsg.text = msg;
      selectedFormFields.loadingElement.collapse();
      selectedFormFields.errorMsg.expand();
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
  DEBUG_MODE && console.log(`Setting dataset '${dataset}'...`);
  // @ts-ignore
  activeDataset = { id: dataset, element: $w(`#${dataset}`) };
  DEBUG_MODE && console.log("Set active dataset", dataset);

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
          DEBUG_MODE && console.log("FAILED FIELD - ", ffv.id);
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
        DEBUG_MODE && console.log("Auth check passed");
        selectedFormFields.captcha.reset();
        selectedFormFields.submitBtn.enable();

        selectedFormFields.loadingElement.collapse();
      })
      .catch(() => {
        DEBUG_MODE && console.log("Auth check failed");
        selectedFormFields.captcha.reset();
        showError("Something went wrong. Please check the captcha.");
        return false;
      });
    // });
  });
};

const fieldsWithValidationErrors = () => {
  const fields = getForm(false);
  DEBUG_MODE && console.log("Test form", fields);
  const nonValidFields = fields.filter((field) => !field.valid);
  if (nonValidFields.length >= 1) {
    return nonValidFields;
  }
};

const updateFormState = (dataset) => {
  if (dataset) {
    let formTitle = $w("#formTitle");
    formName = formState.quoteFormId.replace("-content", "");
    console.log("FORMNAME", formName);
    selectedFormFields = formFields.find((fc) => fc.formContainer.id === formName);
    selectedFormFields.imageElement.src = formState.image;
    selectedFormFields.imageElement.alt = formState.quoteTitle;
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

// onClick variables
const formStateContainer = $w("#formStateContainer");
const quoteStateContainer = $w("#quoteStateContainer");
const newOrRepairStateContainer = $w("#newOrRepairStateContainer");
const buildingTypeRepeater = $w("#buildingTypeRepeater");
const buildingTypeRepeaterChild = $w("#buildingTypeRepeaterChild");
const repairReplaceRepeater = $w("#repairReplaceRepeater");
const repairReplaceRepeaterChild = $w("#repairReplaceRepeaterChild");
const quoteTypeRepeater = $w("#quoteTypeRepeater");
const quoteTypeRepeaterChild = $w("#newOrRepairStateBtn");
// onClick variables end

// onClick funtions

formStartBtn.onClick(() => formStateContainer.changeState("newQuoteState"));
buildQuoteHeaderBtn.onClick(() => formStateContainer.changeState("newQuoteState"));
buildQuoteFooterBtn.onClick(() => formStateContainer.changeState("newQuoteState"));

buildingTypeRepeaterChild.onClick((ev) => {
  formState = buildingTypeRepeater.data.find((item) => item._id === ev.context.itemId);
  DEBUG_MODE && console.log("buildingTypeState", formState);
  formStateContainer.changeState("formState");
  quoteStateContainer.changeState(formState.quoteFormId.replace("-content", ""));
  updateFormState(formState);
});

repairReplaceRepeaterChild.onClick((ev) => {
  formState = repairReplaceRepeater.data.find((item) => item._id === ev.context.itemId);
  DEBUG_MODE && console.log("repairReplace", formState);
  formStateContainer.changeState("formState");
  quoteStateContainer.changeState(formState.quoteFormId.replace("-content", ""));
  updateFormState(formState);
});

// When selecting New building or repair/replace...
quoteTypeRepeaterChild.onClick((ev) => {
  DEBUG_MODE && console.log("quoteType", ev);
  let id = quoteTypeRepeater.data.find((item) => item._id === ev.context.itemId);
  if (id.title === "New Building") {
    newOrRepairStateContainer.changeState("newBuildingState");
  } else {
    newOrRepairStateContainer.changeState("repairReplaceState");
  }
});

$w("#gutteringShapeChild-field-guttering").onClick((ev) => {
  DEBUG_MODE && console.log("GutteringType", ev);
  let selectedField = $w("#gutteringShape-field-guttering").data.find((item) => item._id === ev.context.itemId);
  DEBUG_MODE && console.log("guttering ID", selectedField);
  DEBUG_MODE && console.log("guttering Target", ev.target);
  let gutteringOptions = [$w("#gutteringShapeColoured-field-guttering"), $w("#gutteringShapePlain-field-guttering")];

  ev.target.id.style.borderColor = "red";
  ev.target.id.style.borderWidth = "5px";
  gutteringOptions.filter((i) => !i.collapsed).map((i) => (i.value = selectedField.gutteringReference));
});
// onClick funtions end

// Functions

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
  // selectedFormFields = formFields.find((fc) => fc.formContainer.id === formName);
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

const nonInputFields = [
  "$w.Button",
  "$w.Text",
  "$w.Box",
  "$w.Image",
  "$w.VectorImage",
  "$w.FiveGridLine",
  "$w.UploadButton",
  "$w.Captcha",
  "$w.Repeater",
];
const filterOutNonInputFields = (array) => array.filter((f) => !nonInputFields.includes(f.type));

const getAllFields = (fieldsArray, element) => {
  if (element.type === "$w.Box") {
    element.children.map((ce) => getAllFields(fieldsArray, ce));
  } else {
    fieldsArray.push(element);
  }
};
