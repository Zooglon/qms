// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {
  console.log("File loaded.");

  let buildingType;
  let formObject;

  const fsc = $w("#formStartContainer");
  const fc = $w("#formContainer");
  const ic = $w("#imgContainer");
  const ts = [
    $w("#portalFrameSelect"),
    $w("#mezzanineFloorSelect"),
    $w("#roundHouseSelect"),
    $w("#monoPitchSelect"),
  ];
  const tt = [
    $w("#portalFrameText"),
    $w("#mezzanineFloorText"),
    $w("#roundHouseText"),
    $w("#monoPitchText"),
  ];
  const sb = $w("#buildBtnCont").children;

  ts.map((t) =>
    t.onClick((ev) => {
      handleSelection(ev.target);
    })
  );

  sb.map((btn) => btn.onClick((ev) => handleBuildForm(ev)));

  const resetType = () => {
    buildingType = undefined;
    sb.forEach((b) => b.collapse());
    ts.forEach(
      (e) =>
        e.customClassList.values().includes("formSelector-active") &&
        e.customClassList.remove("formSelector-active")
    );
    tt.forEach(
      (t) =>
        t.customClassList.values().includes("formSelector-active") &&
        t.customClassList.remove("formSelector-active")
    );
  };

  const handleSelection = (el) => {
    resetType();
    buildingType = el.id.slice(0, -6);
    el.customClassList.add("formSelector-active");
    sb.filter((btn) => btn.id.slice(0, -5) == buildingType)[0].expand();
    tt.filter((btn) => btn.id.slice(0, -5) == buildingType)[0].customClassList.add(
      "formSelector-active"
    );
  };

  const handleBuildForm = (evt) => {
    console.log(
      "BT",
      buildingType,
      formTypes.find((f) => f.buildingType === buildingType)
    );
    formObject = formTypes.find((f) => f.buildingType === buildingType);
    updateFormTitle("One", formObject.name);
    fsc.collapse();
    fc.expand();
    ic.expand();
    setImgBoxContent(formObject);
  };
});

export const formTypes = [
  {
    buildingType: "portalFrame",
    name: "Portal Frame",
    imgId: "formMainImage-portal",
    formId: "formMain-portal",
  },
  {
    buildingType: "mezzanineFloor",
    name: "Mezzanine Floor",
    imgId: "formMainImage-mezzanine",
    formId: "formMain-mezzanine",
  },
  {
    buildingType: "roundHouse",
    name: "Round House (Dutch Barn)",
    imgId: "formMainImage-round",
    formId: "formMain-round",
  },
  {
    buildingType: "monoPitch",
    name: "Mono Pitch Roof",
    imgId: "formMainImage-mono",
    formId: "formMain-mono",
  },
];

export function toggle(el) {
  el.isVisible ? el.hide() : el.show();
}

export function checkCalcCont() {
  const cc = $w("#calcCont");
  if (!cc.isVisible) {
    cc.show();
  }
}

export function area_click(event) {
  checkCalcCont();
  const areaCalc = $w("#areaMapCalculator");
  const pitchCalc = $w("#roofPitchCalculator");

  pitchCalc.hide();
  areaCalc.show();
}

export function pitch_click(event) {
  checkCalcCont();
  const areaCalc = $w("#areaMapCalculator");
  const pitchCalc = $w("#roofPitchCalculator");

  pitchCalc.show();
  areaCalc.hide();
}

export function calculatePitch() {
  let hyp = Number.parseFloat($w("#sideOne").value);
  let run = Number.parseFloat($w("#sideTwo").value);
  let rise = Number.parseFloat($w("#sideThree").value);

  // Find hypotenuse
  if (!hyp) hyp = Math.sqrt(run * run + rise * rise);
  // Find run
  if (!run) run = Math.sqrt(hyp * hyp - rise * rise);
  // Find rise
  if (!rise) rise = Math.sqrt(hyp * hyp - run * run);

  const pitch = ((rise / run) * (180 / Math.PI)).toFixed();

  if ((!hyp && !run) || (!hyp && !rise) || (!run && !rise)) {
    $w("#roofPitchError").show();
  } else {
    $w("#roofPitchShowText").show();
    $w("#roofPitchShowText").text = "Roof Pitch:" + " " + pitch + "°";
  }
}

export const updateFormTitle = (ns, nt) => {
  const sn = $w("#stepNumber");
  const st = $w("#stepText");
  if (ns) {
    sn.text = `Step ${ns}:`;
  }
  if (nt) {
    st.text = nt;
  }
};

export const setImgBoxContent = (data) => {
  const imgEls = [
    $w("#formMainImage-portal"),
    $w("#formMainImage-mezzanine"),
    $w("#formMainImage-round"),
    $w("#formMainImage-mono"),
  ];
  const ibTitle = $w("#imgBoxBuildingType");
  ibTitle.expand();
  ibTitle.text = data.name;
  setFormMainImage(imgEls.find((i) => i.id === data.imgId));
};

export const setFormMainImage = (img) => {
  img ? img.expand() : $w("#formMainImage-error").expand();
};

export const rotateFormImage = (ev) => {
  // const elem = $w('#formMainImage')
  const imgs = [];
};

export function closeBox(event) {
  const close = [$w("#areaMapCalculator"), $w("#roofPitchCalculator"), $w("#calcCont")];
  close.forEach((i) => i.hide());
}
