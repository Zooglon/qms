// @ts-nocheck
import wixLocationFrontend from "wix-location-frontend";

let version = "000002";
const DEBUG_MODE = true;

const formStartBtn = $w("#formStartBtn");
const supplierSignUp = $w("#supplierSignUp");

let formState;

const formStateContainer = $w("#formStateContainer");
const quoteStateContainer = $w("#quoteStateContainer");
const newOrRepairStateContainer = $w("#newOrRepairStateContainer");
const buildingTypeRepeater = $w("#buildingTypeRepeater");
const buildingTypeRepeaterChild = $w("#buildingTypeRepeaterChild");
const repairReplaceRepeater = $w("#repairReplaceRepeater");
const repairReplaceRepeaterChild = $w("#repairReplaceRepeaterChild");
const quoteTypeRepeater = $w("#quoteTypeRepeater");
const quoteTypeRepeaterChild = $w("#newOrRepairStateBtn");
const resetBtns = [$w("#quoteTypeResetBtn"), $w("#quoteTypeResetText")];
const quoteTypeBackBtns = [$w("#quoteTypeBackBtn"), $w("#quoteTypeBackText")];

formStartBtn.onClick(() => formStateContainer.changeState("newQuoteState"));

const repeaterHandler = (repeaterElem, event) => {
  formState = repeaterElem.data.find((item) => item._id === event.context.itemId);
  DEBUG_MODE && console.log("formState", formState);
  if (formState.title === "New Building") {
    newOrRepairStateContainer.changeState("newBuildingState");
  } else if (formState.title === "Repair / Replace") {
    newOrRepairStateContainer.changeState("repairReplaceState");
  } else {
    formStateContainer.changeState("formState");
    console.log("Redirecting to", `/${formState.quoteUrl}`);
    wixLocationFrontend.to(`/${formState.quoteUrl}`);
    // quoteStateContainer.changeState(formState.quoteFormId.replace("-content", ""));
  }
};

buildingTypeRepeaterChild.onClick((ev) => {
  repeaterHandler(buildingTypeRepeater, ev);
});

repairReplaceRepeaterChild.onClick((ev) => {
  repeaterHandler(repairReplaceRepeater, ev);
});

quoteTypeRepeaterChild.onClick((ev) => {
  repeaterHandler(quoteTypeRepeater, ev);
});

const resetForm = () => {
  newOrRepairStateContainer.changeState("newOrRepairState");
  formStateContainer.changeState("initialState");
  $w("#QuoteUnderOneRoof").scrollTo();
};

const goBack = (area) => {
  if (area === "quoteBuilding") {
    if (newOrRepairStateContainer.currentState.id === "newOrRepairState") {
      newOrRepairStateContainer.changeState("newOrRepairState");
      formStateContainer.changeState("initialState");
    } else {
      newOrRepairStateContainer.changeState("newOrRepairState");
    }
  } else if (area === "quoteForm") {
    if (formState && formState.type === "New Shed") {
      formStateContainer.changeState("newQuoteState");
      newOrRepairStateContainer.changeState("newBuildingState");
    } else {
      formStateContainer.changeState("newQuoteState");
      newOrRepairStateContainer.changeState("repairReplaceState");
    }
  }
  $w("#QuoteUnderOneRoof").scrollTo();
};

resetBtns.forEach((rb) => rb.onClick(() => resetForm()));
quoteTypeBackBtns.forEach((bb) => bb.onClick((ev) => goBack("quoteBuilding")));

$w.onReady(async function () {
  console.log(`Site loading...`);
  formStartBtn.show();
  // formStartBtn.expand();
  formStartBtn.expand().then(() => {
    console.log("form start expanded...");
  });
  supplierSignUp.show();
  supplierSignUp.expand().then(() => {
    console.log("supplier sign up expanded...");
  });

  resetForm();
  console.log(`Site loaded - ${version}`);
});
