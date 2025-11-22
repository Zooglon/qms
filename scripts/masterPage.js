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

export function getFormFields(formName) {
  console.log("This has fired...", formName);
  const formFields = [
    // New building
    {
      form: "mezzaninefloor",
      formType: "MezzanineFloorForm",
      formContainer: "mezzanineFloorForm",
      errorMsg: "submitFailed-mezzanineFloor",
      submitBtn: "submitButton-mezzanineFloor",
      guidField: "formGUID-field-mezzanineFloor",
      loadingElement: "submitLoading-mezzanineFloor",
      captcha: "captcha-mezzanineFloor",
      toggle: "toggle-mezzanineFloor",
      rangeSlider: "quoteDistance-field-mezzanineFloor",
      imageElement: "mainImage-mezzanineFloor",
    },
    {
      form: "monopitch",
      formType: "MonoPitchQuotes",
      formContainer: "monoPitchForm",
      errorMsg: "submitFailed-monoPitch",
      submitBtn: "submitButton-monoPitch",
      guidField: "formGUID-field-monoPitch",
      loadingElement: "submitLoading-monoPitch",
      captcha: "captcha-monoPitch",
      toggle: "toggle-monoPitch",
      rangeSlider: "quoteDistance-field-monoPitch",
      imageElement: "mainImage-monoPitch",
    },
    {
      form: "portalframe",
      formType: "PortalFrameQuotes",
      formContainer: "portalFrameForm",
      errorMsg: "submitFailed-portalFrame",
      submitBtn: "submitButton-portalFrame",
      guidField: "formGUID-field-portalFrame",
      loadingElement: "submitLoading-portalFrame",
      captcha: "captcha-portalFrame",
      toggle: "toggle-portalFrame",
      rangeSlider: "quoteDistance-field-portalFrame",
      imageElement: "mainImage-portalFrame",
    },
    {
      form: "concrete",
      formType: "ConcreteQuotes",
      formContainer: "concreteForm",
      errorMsg: "submitFailed-concreteSlab",
      submitBtn: "submitButton-concreteSlab",
      guidField: "formGUID-field-concreteSlab",
      loadingElement: "submitLoading-concreteSlab",
      captcha: "captcha-concreteSlab",
      toggle: "toggle-concreteSlab",
      rangeSlider: "quoteDistance-field-concreteSlab",
      imageElement: "mainImage-concreteSlab",
    },
    {
      form: "roundhouse",
      formType: "RoundHouseForm",
      formContainer: "roundHouseForm",
      errorMsg: "submitFailed-roundHouse",
      submitBtn: "submitButton-roundHouse",
      guidField: "formGUID-field-roundHouse",
      loadingElement: "submitLoading-roundHouse",
      captcha: "captcha-roundHouse",
      toggle: "toggle-roundHouse",
      rangeSlider: "quoteDistance-field-roundHouse",
      imageElement: "mainImage-roundHouse",
    },
    {
      form: "polytunnel",
      formType: "PolytunnelQuotes",
      formContainer: "polytunnelForm",
      errorMsg: "submitFailed-polytunnel",
      submitBtn: "submitButton-polytunnel",
      guidField: "formGUID-field-polytunnel",
      loadingElement: "submitLoading-polytunnel",
      captcha: "captcha-polytunnel",
      toggle: "toggle-polytunnel",
      rangeSlider: "quoteDistance-field-polytunnel",
      imageElement: "mainImage-polytunnel",
    },
    // Repair/Replace
    {
      form: "wallsRepair",
      formType: "WallQuotes",
      formContainer: "wallsRepairForm",
      errorMsg: "submitFailed-wallsRepair",
      submitBtn: "submitButton-wallsRepair",
      guidField: "formGUID-field-wallsRepair",
      loadingElement: "submitLoading-wallsRepair",
      captcha: "captcha-wallsRepair",
      toggle: "toggle-wallsRepair",
      rangeSlider: "quoteDistance-field-wallsRepair",
      imageElement: "mainImage-wallsRepair",
    },
    {
      form: "gutteringRepair",
      formType: "GutteringQuotes",
      formContainer: "gutteringRepairForm",
      errorMsg: "submitFailed-gutteringRepair",
      submitBtn: "submitButton-gutteringRepair",
      guidField: "formGUID-field-gutteringRepair",
      loadingElement: "submitLoading-gutteringRepair",
      captcha: "captcha-gutteringRepair",
      toggle: "toggle-gutteringRepair",
      rangeSlider: "quoteDistance-field-gutteringRepair",
      imageElement: "mainImage-gutteringRepair",
    },
    {
      form: "solarRepair",
      formType: "SolarPanelsQuotes",
      formContainer: "solarRepairForm",
      errorMsg: "submitFailed-solarRepair",
      submitBtn: "submitButton-solarRepair",
      guidField: "formGUID-field-solarRepair",
      loadingElement: "submitLoading-solarRepair",
      captcha: "captcha-solarRepair",
      toggle: "toggle-solarRepair",
      rangeSlider: "quoteDistance-field-solarRepair",
      imageElement: "mainImage-solarRepair",
    },
    {
      form: "dismantleRepair",
      formType: "DismantleQuotes",
      formContainer: "dismantleRepairForm",
      errorMsg: "submitFailed-dismantleRepair",
      submitBtn: "submitButton-dismantleRepair",
      guidField: "formGUID-field-dismantleRepair",
      loadingElement: "submitLoading-dismantleRepair",
      captcha: "captcha-dismantleRepair",
      toggle: "toggle-dismantleRepair",
      rangeSlider: "quoteDistance-field-dismantleRepair",
      imageElement: "mainImage-dismantleRepair",
    },
    {
      form: "rainwaterRepair",
      formType: "RainwaterHarvestingQuotes",
      formContainer: "rainwaterRepairForm",
      errorMsg: "submitFailed-rainwaterRepair",
      submitBtn: "submitButton-rainwaterRepair",
      guidField: "formGUID-field-rainwaterRepair",
      loadingElement: "submitLoading-rainwaterRepair",
      captcha: "captcha-rainwaterRepair",
      toggle: "toggle-rainwaterRepair",
      rangeSlider: "quoteDistance-field-rainwaterRepair",
      imageElement: "mainImage-rainwaterRepair",
    },
    {
      form: "doorsRepair",
      formType: "DoorsQuotes",
      formContainer: "doorsRepairForm",
      errorMsg: "submitFailed-doorsRepair",
      submitBtn: "submitButton-doorsRepair",
      guidField: "formGUID-field-doorsRepair",
      loadingElement: "submitLoading-doorsRepair",
      captcha: "captcha-doorsRepair",
      toggle: "toggle-doorsRepair",
      rangeSlider: "quoteDistance-field-doorsRepair",
      imageElement: "mainImage-doorsRepair",
    },
    {
      form: "reroofRepair",
      formType: "reroofQuotes",
      formContainer: "reroofRepairForm",
      errorMsg: "submitFailed-reroofRepair",
      submitBtn: "submitButton-reroofRepair",
      guidField: "formGUID-field-reroofRepair",
      loadingElement: "submitLoading-reroofRepair",
      captcha: "captcha-reroofRepair",
      toggle: "toggle-reroofRepair",
      rangeSlider: "quoteDistance-field-reroofRepair",
      imageElement: "mainImage-reroofRepair",
    },
    {
      form: "claddingRepair",
      formType: "CladdingQuotes",
      formContainer: "claddingRepairForm",
      errorMsg: "submitFailed-claddingRepair",
      submitBtn: "submitButton-claddingRepair",
      guidField: "formGUID-field-claddingRepair",
      loadingElement: "submitLoading-claddingRepair",
      captcha: "captcha-claddingRepair",
      toggle: "toggle-claddingRepair",
      rangeSlider: "quoteDistance-field-claddingRepair",
      imageElement: "mainImage-claddingRepair",
    },
  ];

  const selectedForm = formFields.find((form) => form.form.toLowerCase() === formName.toLowerCase());
  console.log("Returning selected form:", selectedForm);
  return selectedForm;
}
