export const calculatePitch = (sideOne, sideTwo, sideThree) => {
  let hyp = Number.parseFloat(sideOne);
  let run = Number.parseFloat(sideTwo);
  let rise = Number.parseFloat(sideThree);

  // Ensure at least two sides are provided
  if ((!hyp && !run) || (!hyp && !rise) || (!run && !rise)) {
    return { error: "At least two sides must be provided" };
  }

  // Calculate missing side
  if (!hyp) hyp = Math.sqrt(run * run + rise * rise);
  if (!run) run = Math.sqrt(hyp * hyp - rise * rise);
  if (!rise) rise = Math.sqrt(hyp * hyp - run * run);

  // Calculate pitch
  const pitchInDegrees = Math.atan(rise / run) * (180 / Math.PI);
  const pitch = pitchInDegrees.toFixed(1);

  if ((!hyp && !run) || (!hyp && !rise) || (!run && !rise)) {
    $w("#roofPitchError").show();
  } else {
    $w("#roofPitchShowText").show();
    $w("#roofPitchShowText").text = "Roof Pitch:" + " " + pitch + "°";
  }
};
