import { helloThere, getMapCreds } from "./masterPage";
import { openLightbox } from "wix-window-frontend";
import { captchaAuth } from "backend/captchaModule";
import { getFormOptions } from "public/formFunctions";

// recursive remove not working 100%
// Add input__required class to fields where input is required - it should add the '*'
// capcha auth needs to be awaited - i think?

let version = "000343";
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
    toggle: $w("#toggle-mezzanineFloor"),
    rangeSlider: $w("#quoteDistance-field-mezzanineFloor"),
    imageElement: $w("#mainImage-mezzanineFloor"),
  },
  {
    formContainer: $w("#monoPitchForm"),
    errorMsg: $w("#submitFailed-monoPitch"),
    submitBtn: $w("#submitButton-monoPitch"),
    guidField: $w("#formGUID-field-monoPitch"),
    loadingElement: $w("#submitLoading-monoPitch"),
    captcha: $w("#captcha-monoPitch"),
    toggle: $w("#toggle-monoPitch"),
    rangeSlider: $w("#quoteDistance-field-monoPitch"),
    imageElement: $w("#mainImage-monoPitch"),
  },
  {
    formContainer: $w("#portalFrameForm"),
    errorMsg: $w("#submitFailed-portalFrame"),
    submitBtn: $w("#submitButton-portalFrame"),
    guidField: $w("#formGUID-field-portalFrame"),
    loadingElement: $w("#submitLoading-portalFrame"),
    captcha: $w("#captcha-portalFrame"),
    toggle: $w("#toggle-portalFrame"),
    rangeSlider: $w("#quoteDistance-field-portalFrame"),
    imageElement: $w("#mainImage-portalFrame"),
  },
  {
    formContainer: $w("#concreteSlabForm"),
    errorMsg: $w("#submitFailed-concreteSlab"),
    submitBtn: $w("#submitButton-concreteSlab"),
    guidField: $w("#formGUID-field-concreteSlab"),
    loadingElement: $w("#submitLoading-concreteSlab"),
    captcha: $w("#captcha-concreteSlab"),
    toggle: $w("#toggle-concreteSlab"),
    rangeSlider: $w("#quoteDistance-field-concreteSlab"),
    imageElement: $w("#mainImage-concreteSlab"),
  },
  {
    formContainer: $w("#roundHouseForm"),
    errorMsg: $w("#submitFailed-roundHouse"),
    submitBtn: $w("#submitButton-roundHouse"),
    guidField: $w("#formGUID-field-roundHouse"),
    loadingElement: $w("#submitLoading-roundHouse"),
    captcha: $w("#captcha-roundHouse"),
    toggle: $w("#toggle-roundHouse"),
    rangeSlider: $w("#quoteDistance-field-roundHouse"),
    imageElement: $w("#mainImage-roundHouse"),
  },
  {
    formContainer: $w("#polyTunnelForm"),
    errorMsg: $w("#submitFailed-polytunnel"),
    submitBtn: $w("#submitButton-polytunnel"),
    guidField: $w("#formGUID-field-polytunnel"),
    loadingElement: $w("#submitLoading-polytunnel"),
    captcha: $w("#captcha-polytunnel"),
    toggle: $w("#toggle-polytunnel"),
    rangeSlider: $w("#quoteDistance-field-polytunnel"),
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
    toggle: $w("#toggle-wallsRepair"),
    rangeSlider: $w("#quoteDistance-field-wallsRepair"),
    imageElement: $w("#mainImage-wallsRepair"),
  },
  {
    formContainer: $w("#gutteringRepairForm"),
    errorMsg: $w("#submitFailed-gutteringRepair"),
    submitBtn: $w("#submitButton-gutteringRepair"),
    guidField: $w("#formGUID-field-gutteringRepair"),
    loadingElement: $w("#submitLoading-gutteringRepair"),
    captcha: $w("#captcha-gutteringRepair"),
    toggle: $w("#toggle-gutteringRepair"),
    rangeSlider: $w("#quoteDistance-field-gutteringRepair"),
    imageElement: $w("#mainImage-gutteringRepair"),
  },
  {
    formContainer: $w("#solarRepairForm"),
    errorMsg: $w("#submitFailed-solarRepair"),
    submitBtn: $w("#submitButton-solarRepair"),
    guidField: $w("#formGUID-field-solarRepair"),
    loadingElement: $w("#submitLoading-solarRepair"),
    captcha: $w("#captcha-solarRepair"),
    toggle: $w("#toggle-solarRepair"),
    rangeSlider: $w("#quoteDistance-field-solarRepair"),
    imageElement: $w("#mainImage-solarRepair"),
  },
  {
    formContainer: $w("#dismantleRepairForm"),
    errorMsg: $w("#submitFailed-dismantleRepair"),
    submitBtn: $w("#submitButton-dismantleRepair"),
    guidField: $w("#formGUID-field-dismantleRepair"),
    loadingElement: $w("#submitLoading-dismantleRepair"),
    captcha: $w("#captcha-dismantleRepair"),
    toggle: $w("#toggle-dismantleRepair"),
    rangeSlider: $w("#quoteDistance-field-dismantleRepair"),
    imageElement: $w("#mainImage-dismantleRepair"),
  },
  {
    formContainer: $w("#rainwaterRepairForm"),
    errorMsg: $w("#submitFailed-rainwaterRepair"),
    submitBtn: $w("#submitButton-rainwaterRepair"),
    guidField: $w("#formGUID-field-rainwaterRepair"),
    loadingElement: $w("#submitLoading-rainwaterRepair"),
    captcha: $w("#captcha-rainwaterRepair"),
    toggle: $w("#toggle-rainwaterRepair"),
    rangeSlider: $w("#quoteDistance-field-rainwaterRepair"),
    imageElement: $w("#mainImage-rainwaterRepair"),
  },
  {
    formContainer: $w("#doorsRepairForm"),
    errorMsg: $w("#submitFailed-doorsRepair"),
    submitBtn: $w("#submitButton-doorsRepair"),
    guidField: $w("#formGUID-field-doorsRepair"),
    loadingElement: $w("#submitLoading-doorsRepair"),
    captcha: $w("#captcha-doorsRepair"),
    toggle: $w("#toggle-doorsRepair"),
    rangeSlider: $w("#quoteDistance-field-doorsRepair"),
    imageElement: $w("#mainImage-doorsRepair"),
  },
  {
    formContainer: $w("#reroofRepairForm"),
    errorMsg: $w("#submitFailed-reroofRepair"),
    submitBtn: $w("#submitButton-reroofRepair"),
    guidField: $w("#formGUID-field-reroofRepair"),
    loadingElement: $w("#submitLoading-reroofRepair"),
    captcha: $w("#captcha-reroofRepair"),
    toggle: $w("#toggle-reroofRepair"),
    rangeSlider: $w("#quoteDistance-field-reroofRepair"),
    imageElement: $w("#mainImage-reroofRepair"),
  },
  {
    formContainer: $w("#claddingRepairForm"),
    errorMsg: $w("#submitFailed-claddingRepair"),
    submitBtn: $w("#submitButton-claddingRepair"),
    guidField: $w("#formGUID-field-claddingRepair"),
    loadingElement: $w("#submitLoading-claddingRepair"),
    captcha: $w("#captcha-claddingRepair"),
    toggle: $w("#toggle-claddingRepair"),
    rangeSlider: $w("#quoteDistance-field-claddingRepair"),
    imageElement: $w("#mainImage-claddingRepair"),
  },
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
      DEBUG_MODE &&
        console.log(
          "Field Changed:",
          ev.target.label ?? ev.target.id,
          "\n",
          "Field Details:",
          field,
          "\n",
          "Field Valid:",
          field.validity && field.validity.valid
        );

      console.log("Has subfields - ", !!formOptions.find((o) => o.formName === formName));

      let fieldVal = ev.target.value;
      let fieldId = ev.target.id;
      console.log("Field parent parent", field.parent.parent.id);
      if (field.parent.parent.id.includes("contactDetails")) {
        try {
          console.log("Adding tick to...", field.parent.id, "parent of", field.id, "type", field.type);

          if (field.type !== "$w.AddressInput") {
            console.log("non address input");
            field.valid && field.customClassList.add("form__contact");
            !field.valid &&
              field.customClassList.contains("form__contact") &&
              field.customClassList.remove("form__contact");
          } else if (field.type === "$w.AddressInput") {
            console.log("Address input adding class to", field.parent.id);
            field.valid && field.parent.customClassList.add("form__contact--ab");
            !field.valid &&
              field.parent.customClassList.contains("form__contact--ab") &&
              field.parent.customClassList.remove("form__contact--ab");
          }
        } catch (error) {
          console.log("Tick error:", error);
        }
      }

      if (field.id.startsWith("measurementUnits-field")) {
        measurementUnits = field.value === "metric" ? "m" : "ft";

        const formFields = getForm(true);
        if (formFields.find((f) => f.text && f.text === "units")) {
          formFields
            .filter((ff) => ff.text && ff.text === "units")
            .forEach((ff) => {
              ff.customClassList.add("form__units");
              ff.text = measurementUnits;
              ff.expand();
            });
        } else if (formFields.find((f) => f.customClassList.contains("form__units"))) {
          formFields
            .filter((ff) => ff.customClassList.contains("form__units"))
            .forEach((ff) => {
              ff.text = measurementUnits;
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
        console.log(`Found ${idToSearch} in ${selectedForm.formName}... ${foundObject}`);

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
            // wixElementRef.value = "";
            wixElementRef.value = undefined;
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
          console.log("Processing...", foundObj);
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

const setupUserCheck = (selectedForm) => {
  if (selectedForm && !selectedForm.captcha.collapsed) {
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
  } else {
    selectedForm.toggle.onClick((e) => {
      if (e.target.checked) {
        // selectedForm.loadingElement.expand();
        setTimeout(() => {
          // selectedForm.loadingElement.collapse();
          selectedForm.submitBtn.enable();
        }, 1000);
      } else {
        selectedForm.submitBtn.disable();
      }
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

  activeDataset.element.onBeforeSave(async () => {
    selectedFormFields.submitBtn.disable();
    selectedFormFields.loadingElement.expand();

    const showError = (msg) => {
      selectedFormFields.errorMsg.text = msg;
      selectedFormFields.loadingElement.collapse();
      selectedFormFields.errorMsg.expand();
    };
    const hideError = () => selectedFormFields.errorMsg.collapse();

    // // Handle reCaptcha - using tick box for now
    // let captchaToken = selectedFormFields.captcha.token;

    // if (!captchaToken) {
    //   showError("Please complete the reCaptcha.");
    //   return false;
    // }

    const datasetFormFields = getForm(false);
    datasetFormFields.map((field) => console.log("field validity", field.validity));

    // Handle validation errors
    const fieldsFailedValidation = fieldsWithValidationErrors(datasetFormFields);
    DEBUG_MODE && fieldsFailedValidation && console.log("Validation Failed - ", fieldsFailedValidation);
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

    if (!selectedFormFields.captcha.collapsed) {
      // await captchaAuth(captchaToken)
      //   .then(() => {
      //     // Save form data for backend reference
      //     activeDataset.element.setFieldValue("formGuid", formGuid);
      //     activeDataset.element.setFieldValue("details_areaMapDetails", areaDetails);
      //     // If everything is in order and the item is submitted, we show a success message and reset the captcha.
      //     // Submit form
      //     DEBUG_MODE && console.log("Auth check passed");
      //     selectedFormFields.captcha.reset();
      //     selectedFormFields.submitBtn.enable();
      //     selectedFormFields.loadingElement.collapse();
      //   })
      //   .catch(() => {
      //     DEBUG_MODE && console.log("Auth check failed");
      //     selectedFormFields.captcha.reset();
      //     showError("Something went wrong. Please check the captcha.");
      //     return false;
      //   });
    } else if (!selectedFormFields.rangeSlider.collapsed) {
      selectedFormFields.submitBtn.enable();
    } else {
      DEBUG_MODE && console.log("No captcha or range slider present");
      selectedFormFields.submitBtn.enable();
    }
  });
};

const fieldsWithValidationErrors = (fields) => {
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
    setSlider(selectedFormFields);
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
const resetBtns = [
  $w("#quoteTypeResetBtn"),
  $w("#quoteTypeResetText"),
  $w("#quoteFormResetBtn"),
  $w("#quoteFormResetText"),
  $w("#buildQuoteHeaderBtn"),
  $w("#buildQuoteFooterBtn"),
];
const formBackBtns = [$w("#quoteFormBackBtn"), $w("#quoteFormBackText")];
const quoteTypeBackBtns = [$w("#quoteTypeBackBtn"), $w("#quoteTypeBackText")];

// onClick variables end

// onClick funtions

formStartBtn.onClick(() => formStateContainer.changeState("newQuoteState"));

// When selecting New Building form...
buildingTypeRepeaterChild.onClick((ev) => {
  formState = buildingTypeRepeater.data.find((item) => item._id === ev.context.itemId);
  DEBUG_MODE && console.log("buildingTypeState", formState);
  formStateContainer.changeState("formState");
  quoteStateContainer.changeState(formState.quoteFormId.replace("-content", ""));
  updateFormState(formState);
});

// When selecting Repair/replace form...
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

// When guttering type is selected add the value to open question
$w("#gutteringShapeChild-field-guttering").onClick((ev) => {
  DEBUG_MODE && console.log("GutteringType", ev);
  let selectedField = $w("#gutteringShape-field-guttering").data.find((item) => item._id === ev.context.itemId);
  DEBUG_MODE && console.log("guttering ID", selectedField), $w("#gutteringShape-field-guttering");
  DEBUG_MODE && console.log("guttering Target", ev.target);
  let gutteringOptions = [$w("#gutteringShapeColoured-field-guttering"), $w("#gutteringShapePlain-field-guttering")];

  $w("#gutteringShape-field-guttering").forEachItem(($item, itemData, i) => {
    console.log("Item - ", $item);
    console.log("ItemData - ", itemData);
    $item("#gutteringShapeChild-field-guttering").style.borderWidth = "2px";
    console.log("End of loop, index -", i);
  });

  ev.target.style.borderWidth = "5px";
  gutteringOptions.filter((i) => !i.collapsed).map((i) => (i.value = selectedField.gutteringReference));
});

// Resets form and form state
const resetForm = () => {
  newOrRepairStateContainer.changeState("newOrRepairState");
  formStateContainer.changeState("initialState");
  $w("#homepageForm").scrollTo();
};

const goBack = (area) => {
  if (area === "quoteBuilding") {
    if (newOrRepairStateContainer.currentState.id === "newOrRepairState") {
      newOrRepairStateContainer.changeState("newOrRepairState");
      formStateContainer.changeState("initialState");
    } else {
      newOrRepairStateContainer.changeState("newOrRepairState");
    }
  }
  if (area === "quoteForm") {
    if (formState && formState.type === "New Shed") {
      formStateContainer.changeState("newQuoteState");
      newOrRepairStateContainer.changeState("newBuildingState");
    } else {
      formStateContainer.changeState("newQuoteState");
      newOrRepairStateContainer.changeState("repairReplaceState");
    }
  }
};

resetBtns.forEach((rb) => rb.onClick(() => resetForm()));

quoteTypeBackBtns.forEach((bb) => bb.onClick((ev) => goBack("quoteBuilding")));
formBackBtns.forEach((bb) => bb.onClick((ev) => goBack("quoteForm")));

// onClick funtions end

// Functions

const updateBar = (f, b) => {
  const needCompleting = f.filter((f) => f.required && f.isVisible).length;
  const completed = f.filter((f) => f.required && f.isVisible && f.value).length;
  b.value = (completed / needCompleting) * 100;
};

const setSlider = (fFields) => {
  let sliderEl = fFields.rangeSlider;

  let maxValue = sliderEl.max;
  let minValue = sliderEl.min;

  const textContainer = sliderEl.parent.children.filter((c) => c !== sliderEl);
  console.log("rangeslider parents children -", sliderEl.parent.children, "textContainer -", textContainer);

  console.log("tcont check", textContainer[0], "el check", textContainer[0].id);

  try {
    console.log("undefined check- ", textContainer[0].children);
    textContainer[0].children.map((el) => {
      console.log("MAP - EL = ", el);
      if (el.customClassList.contains("form__sliderText")) {
        el.children[0].html = `<span style="text-align: left">${minValue}Km</span>`;
        el.children[1].html = `<span style="text-align: right">${maxValue}Km</span>`;
      }
    });
  } catch (error) {
    console.log("Error getting textContainer children", error);
  }
};

const lowerFirst = (s) => (s && String(s[0]).toLowerCase() + String(s).slice(1)) || "";
const capitaliseFirst = (s) => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";

const getForm = (isAllFields) => {
  let form = [];
  // selectedFormFields = formFields.find((fc) => fc.formContainer.id === formName);
  setupUserCheck(selectedFormFields);
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

[$w("#roofPitch-field-portalFrame"), $w("#roofPitch-field-monoPitch"), $w("#roofPitch-field-reroofRepair")].forEach(
  (rpe) =>
    rpe.onMouseIn((e) => {
      $w("#pitchCalcBtn").customClassList.add("form__button--pulse");
      setTimeout(() => {
        $w("#pitchCalcBtn").customClassList.remove("form__button--pulse");
      }, 1000);
    })
);

$w("#testBtn").onClick(() => {
  console.log("Getting form");
  const datasetFormFields = getForm(true);
  datasetFormFields.map((field) => console.log("field validity", field.id, field.validity && field.validity.valid));
});
