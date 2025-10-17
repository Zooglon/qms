import { getMapCreds, getFormFields } from "./masterPage";
import wixLocationFrontend, { openLightbox } from "wix-window-frontend";
// import { captchaAuth } from "backend/captchaModule";
import { getFormOptions } from "public/formFunctions";

let version = "000015";
let formName = "polytunnel";

let mapCreds;
let measurementUnits;
let completedFields = [];
const DEBUG_MODE = true;

// Variables Start
let formOptions = [];
let formFields;

const setFormFields = (formName) => {
  const formOption = getFormFields(formName);
  return {
    formType: formOption.form,
    formContainer: $w(`#${formOption.formContainer}`),
    errorMsg: $w(`#${formOption.errorMsg}`),
    submitBtn: $w(`#${formOption.submitBtn}`),
    guidField: $w(`#${formOption.guidField}`),
    loadingElement: $w(`#${formOption.loadingElement}`),
    captcha: $w(`#${formOption.captcha}`),
    toggle: $w(`#${formOption.toggle}`),
    rangeSlider: $w(`#${formOption.rangeSlider}`),
    imageElement: $w(`#${formOption.imageElement}`),
  };
};

// Elements on all forms
const pitchCalcBtn = $w("#pitchCalcBtn");
const convertCalcBtn = $w("#convertCalcBtn");
const progressBar = $w("#progressBar");
let quotesDataset;
let quoteDatasetElement = $w("#quoteDataset");
let quotesDatasetElement = $w("#quoteTypeDataset");
let formTitleElement = $w("#formTitle");
const resetBtns = [
  $w("#quoteFormResetBtn"),
  $w("#quoteFormResetText"),
  $w("#buildQuoteHeaderBtn"),
  $w("#buildQuoteFooterBtn"),
];
const formBackBtns = $w("#quoteFormBackBtn").parent.children;
const formPageAnchor = $w("#homepageForm");

// State Elements
let formState;
let activeDataset;
let allFormFieldsInForm;

// Variables End

// Form setup functions

const setupForm = (formName) => {
  try {
    formOptions = getFormOptions;
    DEBUG_MODE && console.log(formOptions.length, "Form options loaded");
    formFields = setFormFields(formName);
    formFields.submitBtn.disable();
    formFields.toggle.onClick((e) => {
      if (e.target.checked) {
        // selectedForm.loadingElement.expand();
        setTimeout(() => {
          // selectedForm.loadingElement.collapse();
          selectedForm.submitBtn.enable();
        }, 500);
      } else {
        selectedForm.submitBtn.disable();
      }
    });
  } catch (error) {
    console.error("Error setting up form:", error);
  }
};

const setFormState = (dataset) => {
  allFormFieldsInForm = getForm(true);
  if (dataset) {
    DEBUG_MODE && console.log("Loading form state for form:", formName);
    formFields.imageElement.src = formState.image;
    formFields.imageElement.alt = formState.quoteTitle;
    DEBUG_MODE && console.log("Setting form name to:", `New ${formState.title} quote`);
    formTitleElement.text = `New ${formState.title.replace("Slab", "")} quote`;

    try {
      datasetSet(formState.dataset);
    } catch (error) {
      console.error("Error loading form from dataset:", error);
    }
    // loadForm(formName);
    if (mapCreds) {
      // prepareMap(mapCreds);
    } else {
      console.log("Error loading area map, please contact us");
    }
  } else {
    console.log("Error determining state, please contact us");
  }
};

$w.onReady(async function () {
  console.log(`Form ${formName} loading v.${version}...`);

  setupForm(formName);
  quotesDataset = await quotesDatasetElement.getItems(0, 30);

  quoteDatasetElement.onReady(() => {
    formState = quotesDataset.items.find((qs) => qs.quoteFormId.toLowerCase().includes(formName));
    if (!formState) console.error("Error locating form state data for this form");
    DEBUG_MODE && console.log("Form state:", formState);
    activeDataset = { id: "quoteDataset", element: quoteDatasetElement };
    setFormState(activeDataset);
  });
  quoteDatasetElement.onError(() => {
    throw new Error("Failed to load page data, please try again later.");
  });

  mapCreds = await getMapCreds();
  console.log(`${formName} page loaded`);
});

const setupUserCheck = (selectedForm) => {
  if (selectedForm && !selectedForm.captcha.collapsed) {
    selectedForm.captcha.onTimeout(() => {
      selectedForm.submitBtn.disable();
    });

    selectedForm.captcha.onError(() => {
      const msg = "Something went wrong. Please redo the captcha challenge.";
      formFields.errorMsg.text = msg;
      // formFields.loadingElement.collapse();
      formLoadingElement(formFields.loadingElement, "end");
      formFields.errorMsg.expand();
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
        }, 500);
      } else {
        selectedForm.submitBtn.disable();
      }
    });
  }
};

const datasetSet = (dataset) => {
  DEBUG_MODE && console.log("Loading form...", formName);
  const fillableFormFields = getForm(false);
  // datasetSet(formState.dataset);

  DEBUG_MODE &&
    console.log(`Form ${formName} loaded...
    Dataset set to ${activeDataset.id}...
    ${fillableFormFields.length} fillable fields`);

  fillableFormFields.forEach((field) => {
    field.onChange((ev) => handleFormChange(field, ev));
  });

  const formGuid = crypto.randomUUID();
  const areaDetails = "";

  const guidField = formFields.guidField;
  guidField.value = formGuid;

  // activeDataset.element.onBeforeSave(async () => {
  activeDataset.element.onBeforeSave(() => {
    DEBUG_MODE && console.log("Submit form fired...");
    formFields.submitBtn.disable();
    DEBUG_MODE && console.log("Submit Button state -", formFields.submitBtn);
    formLoadingElement(formFields.loadingElement, "start");
    formFields.submitBtn.collapse();

    const showError = (msg) => {
      formFields.errorMsg.text = msg;
      formLoadingElement(formFields.loadingElement, "end");
      formFields.errorMsg.expand();
      formFields.submitBtn.enable();
      formFields.submitBtn.expand();
    };
    const hideError = () => formFields.errorMsg.collapse();

    const datasetFormFields = getForm(false);

    // Set form general data
    activeDataset.element.setFieldValue("formGuid", formGuid);
    console.log("Completed fields:", JSON.stringify(completedFields));
    console.log("allFormFieldsInForm", allFormFieldsInForm);

    activeDataset.element.setFieldValue("formResponse", {
      formName: formName,
      formGUID: formGuid,
      fields: JSON.stringify(completedFields),
    });

    const contactFieldsContainer = allFormFieldsInForm.find((ff) => ff.customClassList.contains("form__contact"));
    const contactFieldsBlock = contactFieldsContainer.parent.children;

    const firstName = contactFieldsBlock.find((f) => f.id.includes("first"));
    const lastName = contactFieldsBlock.find((f) => f.id.includes("last"));
    const company = contactFieldsBlock.find((f) => f.id.includes("company"));
    const email = contactFieldsBlock.find((f) => f.id.includes("email"));
    const phone = contactFieldsBlock.find((f) => f.id.includes("phone"));
    const address = contactFieldsBlock.find((f) => f.id.includes("address"));

    activeDataset.dataset.setFieldValue("firstName", firstName.value);
    activeDataset.setFieldValue("lastName", lastName.value);
    activeDataset.setFieldValue("companyName", company.value);
    activeDataset.setFieldValue("email", email.value);
    activeDataset.setFieldValue("phoneNumber", Number(phone.value));
    activeDataset.setFieldValue("address", address.value);

    DEBUG_MODE && console.log("Checking validation...");

    // Handle validation errors
    const fieldsFailedValidation = fieldsWithValidationErrors(datasetFormFields);
    DEBUG_MODE && fieldsFailedValidation.length >= 1 && console.log("Validation Failed - ", fieldsFailedValidation);
    if (fieldsFailedValidation.length >= 1) {
      let validationMessage = [];

      fieldsFailedValidation.forEach((ffv) => {
        if (!ffv.value || ffv.value === "") {
          DEBUG_MODE && console.log("FAILED FIELD - ", ffv.id);
          validationMessage.push(
            `"${
              ffv.label ? (ffv.label.endsWith("?") ? ffv.label.slice(0, ffv.label.length - 1) : ffv.label) : ffv.id
            }" is a required field`
          );
        } else {
          validationMessage.push(`"${ffv.value}" is not a valid input for ${ffv.label}`);
        }
      });

      showError(validationMessage.join(",\n"));
    } else hideError();

    if (!formFields.captcha.collapsed) {
    } else if (!formFields.rangeSlider.collapsed) {
      formFields.submitBtn.enable();
    } else {
      DEBUG_MODE && console.log("No captcha or range slider present");
      formFields.submitBtn.enable();
    }
  });

  console.log("Dataset saved!");
};

const fieldsWithValidationErrors = (fields) => {
  const nonValidFields = fields.filter((field) => field.valid === false);
  if (nonValidFields.length >= 1) {
    DEBUG_MODE && console.log("Test form, non valid fields -", nonValidFields);
    return nonValidFields;
  } else return [];
};

// onClick variables

// Sets up the helper functions that float to the right of the form
pitchCalcBtn.onClick(async () => await openLightbox("pitch-calculator"));
convertCalcBtn.onClick(async () => await openLightbox("conversion-calculator"));

// Resets form and form state
const resetForm = () => {
  completedFields = [];
  formPageAnchor.scrollTo();
};

resetBtns.flat().forEach((rb) => rb.onClick(() => resetForm()));
formBackBtns.flat().forEach((bb) => bb.onClick((ev) => wixLocationFrontend.to("/")));

// onClick funtions end

// Functions

const updateBar = (f, b) => {
  const needCompleting = f.filter((f) => f.required && f.isVisible).length;
  const completed = f.filter((f) => f.required && f.isVisible && f.value).length;
  b.value = (completed / needCompleting) * 100;
};

const lowerFirst = (s) => (s && String(s[0]).toLowerCase() + String(s).slice(1)) || "";
const capitaliseFirst = (s) => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";

const getForm = (isAllFields) => {
  let form = [];
  const getFormStack = formFields.formContainer.children.find((s) => {
    const searchVal = `formStack-${formName.replace("concrete", "concreteSlab")}Form`;
    const match = s.id.toLowerCase() === searchVal.toLowerCase();
    return match;
  });
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

const formLoadingElement = (loadingElem, state) => {
  const arrowsSvg = loadingElem.children.filter((c) => c.type.toLowerCase() === "$w.vectorimage")[0];
  if (state === "start") {
    !arrowsSvg.customClassList.contains("form__loading-spin") && arrowsSvg.customClassList.add("form__loading-spin");
    loadingElem.expand();
  } else if (state === "end") {
    arrowsSvg.customClassList.contains("form__loading-spin") && arrowsSvg.customClassList.remove("form__loading-spin");
    loadingElem.collapse();
  }
};

const handleFormChange = (field, ev) => {
  let fieldVal = !ev ? field.value : ev.target.value;
  let fieldId = !ev ? field.id : ev.target.id;
  DEBUG_MODE &&
    console.log(
      "Field Changed:",
      (ev && ev.target.label) ?? fieldId,
      "\n",
      "Field Details:",
      field,
      "\n",
      "Field Value:",
      field.value,
      "Raw text -",
      `|${field.value}|`,
      "\n",
      "Field Valid:",
      field.validity && field.validity.valid
    );

  if (ev && ev.target.label === "First Name" && fieldVal === "test") {
    autoCompleteContactForTesting(field.parent);
  }

  if (field.parent.parent.id.includes("contactDetails")) {
    try {
      if (field.type !== "$w.AddressInput") {
        field.valid && field.customClassList.add("form__contact");
        !field.valid &&
          field.customClassList.contains("form__contact") &&
          field.customClassList.remove("form__contact");
      } else if (field.type === "$w.AddressInput") {
        field.valid && field.parent.customClassList.add("form__contact--ab");
        !field.valid &&
          field.parent.customClassList.contains("form__contact--ab") &&
          field.parent.customClassList.remove("form__contact--ab");
      }

      setupUserCheck(formFields);
    } catch (error) {
      console.log("contact error:", error);
    }
  }

  if (field.id.startsWith("measurementUnits-field")) {
    measurementUnits = field.value === "metric" ? "m" : "ft";

    if (allFormFieldsInForm.find((f) => f.text && f.text === "units")) {
      allFormFieldsInForm
        .filter((ff) => ff.text && ff.text === "units")
        .forEach((ff) => {
          ff.customClassList.add("form__units");
          ff.text = measurementUnits;
          ff.expand();
        });
    } else if (allFormFieldsInForm.find((f) => f.customClassList.contains("form__units"))) {
      allFormFieldsInForm
        .filter((ff) => ff.customClassList.contains("form__units"))
        .forEach((ff) => {
          ff.text = measurementUnits;
        });
    }
  }

  if (field.id.startsWith("polytunnelWidth-field-polytunnel")) {
    polytunnelActions(fieldVal);
  }

  if (field.value !== "" && !completedFields.some((cf) => cf.id === field.id)) {
    updateBar(getForm(false), progressBar);
  }

  completedFields.push({ id: field.id, label: field.label, value: field.value });

  DEBUG_MODE && console.log("formoptions for:", formOptions);
  const selectedForm = formOptions.find((o) => o.formName.toLowerCase() === formName.toLowerCase());

  DEBUG_MODE && console.log("SelectedForm location:", selectedForm);

  if (!selectedForm) {
    console.error("ERROR: Form options not found");
  }

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
  DEBUG_MODE && console.log("Searching for follow up fields for field ID:", idToSearch);
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
    wixElementRef.type && wixElementRef.type.toLowerCase().includes("input") && wixElementRef.resetValidityIndication();
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
  // } else {
  //   console.log("Form options not found for", formName);
  // }
};

const autoCompleteContactForTesting = (contactFields) => {
  const cInputs = contactFields.children;

  const firstName = cInputs.find((f) => f.id.includes("first"));
  const lastName = cInputs.find((f) => f.id.includes("last"));
  const company = cInputs.find((f) => f.id.includes("company"));
  const email = cInputs.find((f) => f.id.includes("email"));
  const phone = cInputs.find((f) => f.id.includes("phone"));
  const address = cInputs.find((f) => f.id.includes("address"));

  firstName.value = "Test";
  lastName.value = "User";
  company.value = "Test Company Ltd";
  email.value = "testuser@test.com";
  phone.value = `07123456789`;
  address.value = {
    formatted: "Teston, Maidstone, UK",
    country: "GB",
    location: {
      latitude: 51.25526,
      longitude: 0.4421859,
    },
    streetAddress: {
      number: "",
      name: "",
      apt: "",
      formattedAddressLine: "Teston",
    },
    postalCode: "undefined",
    subdivision: "ENG",
    subdivisions: [
      {
        code: "England",
        name: "England",
        type: "ADMINISTRATIVE_AREA_LEVEL_1",
      },
      {
        code: "Kent",
        name: "Kent",
        type: "ADMINISTRATIVE_AREA_LEVEL_2",
      },
      {
        code: "Teston",
        name: "Teston",
        type: "ADMINISTRATIVE_AREA_LEVEL_3",
      },
      {
        code: "GB",
        name: "United Kingdom",
        type: "COUNTRY",
      },
    ],
    city: "Teston",
  };
};

// Form specific functions -

// Polytunnel

const polytunnelActions = (fieldVal) => {
  console.log("Polytunnel actions triggered");
  let polytunnelHeightElement = $w("#polytunnelHeight-text-polytunnel");
  let polytunnelHoopDistance = $w("#polytunnelHoopDistance-text-polytunnel");
  console.log("Polytunnel actions pre size check");
  if (fieldVal === "4.88m") {
    console.log("Polytunnel actions 4.88m selected");
    polytunnelHeightElement.text = "8ft 6in";
    polytunnelHoopDistance.text = "27ft 10in";
  } else if (fieldVal === "5.49m") {
    console.log("Polytunnel actions 5.49m selected");
    polytunnelHeightElement.text = "8ft 6in";
    polytunnelHoopDistance.text = "29ft 6in";
  } else if (fieldVal === "6.4m") {
    console.log("Polytunnel actions 6.4m selected");
    polytunnelHeightElement.text = "9ft 9in";
    polytunnelHoopDistance.text = "34ft 9in";
  } else if (fieldVal === "7.32m") {
    console.log("Polytunnel actions 7.32m selected");
    polytunnelHeightElement.text = "10ft";
    polytunnelHoopDistance.text = "37ft 11in";
  } else if (fieldVal === "8.23m") {
    console.log("Polytunnel actions 8.23m selected");
    polytunnelHeightElement.text = "10ft 5in";
    polytunnelHoopDistance.text = "39ft 4in";
  } else if (fieldVal === "9.15m") {
    console.log("Polytunnel actions 9.15m selected");
    polytunnelHeightElement.text = "11ft";
    polytunnelHoopDistance.text = "43ft 6in";
  }
  console.log("Polytunnel actions sizes set");
  polytunnelHeightElement.collapsed && polytunnelHeightElement.expand();
  console.log("Polytunnel actions height expaneded");
  polytunnelHoopDistance.collapsed && polytunnelHoopDistance.expand();
  console.log("Polytunnel actions hoop distance expanded");
  console.log("Polytunnel actions finished");
};

// Guttering
// Guttering elements for click tiles
const gutteringRepairOptionElement = $w("#gutteringShapeChild-field-guttering");
const gutteringMonoOptionElement = $w("#gutteringShapeChild-field-monoPitch");
const gutteringPortalOptionElement = $w("#gutteringShapeChild-field-portalFrame");
const gutteringRepairOptionTarget = $w("#gutteringShape-field-guttering");
const gutteringMonoOptionTarget = $w("#gutteringShapeSelect-field-monoPitch");
const gutteringPortalOptionTarget = $w("#gutteringShapeSelect-field-portalFrame");

const gutteringformElements = [
  {
    repeaterChild: $w("#gutteringShapeChild-field-guttering"),
    target: $w("#gutteringShape-field-guttering"),
  },
  {
    repeaterChild: $w("#gutteringShapeChild-field-monoPitch"),
    target: $w("#gutteringShapeSelect-field-monoPitch"),
  },
  {
    repeaterChild: $w("#gutteringShapeChild-field-portalFrame"),
    target: $w("#gutteringShapeSelect-field-portalFrame"),
  },
];

// When guttering type is selected add the value to open question
const gutteringClick = (el, targetElement) => {
  const parentEl = el.parent;
  console.log("issue onclick?2");
  el.onClick((e) => {
    let selectedField = parentEl.data.find((item) => item._id === e.context.itemId);

    if (targetElement) {
      targetElement.value = selectedField.title;
    }
    // Style child elements
    parentEl.forEachItem(($item, itemData, i) => {
      $item(`#${el.id}`).style.borderWidth = "1px";
    });
    e.target.style.borderWidth = "5px";
    handleFormChange(targetElement);
  });
  console.log("issue onclick2 resolved");
};

if (
  gutteringformElements.some((element) => {
    return Array.isArray(element.repeaterChild) && element.repeaterChild.length !== 0;
  })
) {
  console.log("I should not fire...");
  gutteringformElements.forEach((gutteringFormElement) => {
    gutteringClick(gutteringFormElement.repeaterChild, gutteringFormElement.target);
  });
}

// Concrete

const li = $w("#digoutLength-field-concreteSlab");
const wi = $w("#digoutWidth-field-concreteSlab");
const di = $w("#digoutDepth-field-concreteSlab");
const volFields = [li, wi, di];
const vrb = $w("#volumeResult-field-concreteSlab");
const vrl = $w("#volumeResultLabel-field-concreteSlab");
const arb = $w("#areaResult-field-concreteSlab");
const arl = $w("#areaResultLabel-field-concreteSlab");
const eb = $w("#volumeError-field-concreteSlab");

const calculateVolume = (li, wi, di, rb, rl) => {
  const l = parseFloat(li.value);
  const w = parseFloat(wi.value);
  const d = parseFloat(di.value);

  if (isNaN(l) || isNaN(w) || isNaN(d)) {
    eb.text = "Please enter all dimensions.";
    rl.collapse();
    return;
  }

  const v = l * w * d;
  const res = v.toFixed(2);
  rl.expand();
  rb.text = `${res}m³`;
};

const calculateArea = (li, wi, rb, rl) => {
  const l = parseFloat(li.value);
  const w = parseFloat(wi.value);
  const d = parseFloat(di.value);

  if (isNaN(l) || isNaN(w)) {
    eb.text = "Please enter all dimensions.";
    rl.collapse();
    return;
  }

  const v = l * w;
  const res = v.toFixed(2);

  rl.expand();
  rb.text = `${res}m²`;
};

const autoCalculate = (l, w, d) => {
  if (!isNaN(l.value) && !isNaN(w.value) && !isNaN(d.value)) {
    calculateArea(l, w, arb, arl);
  }
  if (isNaN(l.value) || isNaN(w.value) || isNaN(d.value)) {
    return;
  }
  calculateVolume(l, w, d, vrb, vrl);
};

if (volFields.flat().length >= 1) {
  volFields.forEach((f) =>
    f.onBlur((e) => {
      autoCalculate(li, wi, di);
    })
  );
}

const calculateVolumeTriggers = [$w("#volumeCalc-button-concreteSlab")];

if (calculateVolumeTriggers.flat().length >= 1) {
  calculateVolumeTriggers.forEach((cvt) => cvt.onClick(() => calculateVolume(li, wi, di, vrb, vrl)));
}

// Portal Frame, MonoPitch, Reroof Repair, Solar Repair

const roofPitchPulseTriggers = [
  $w("#roofPitch-field-portalFrame"),
  $w("#roofPitch-field-monoPitch"),
  $w("#roofPitch-field-reroofRepair"),
  $w("#roofPitch-field-solarRepair"),
];

if (roofPitchPulseTriggers.flat().length >= 1) {
  roofPitchPulseTriggers
    .filter((i) => i)
    .forEach((rtp) => {
      rtp.value &&
        rtp.onMouseIn((e) => {
          $w("#pitchCalcBtn").customClassList.add("form__button--pulse");
          setTimeout(() => {
            $w("#pitchCalcBtn").customClassList.remove("form__button--pulse");
          }, 1000);
        });
    });
}

// Google maps as a priority
// Concrete slab button is down ?
