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
