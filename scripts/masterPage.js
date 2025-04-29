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
