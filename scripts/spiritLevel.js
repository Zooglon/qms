// Spirit Level App for Roof Angle Measurement

// Get canvas element
const canvas = document.getElementById('spiritLevelCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions (adjust as needed)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initial angle (can be adjusted based on user input or device orientation)
let angle = 0;

// Function to draw the spirit level
function drawSpiritLevel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate center of canvas
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Calculate bubble position based on angle
  const bubbleX = centerX + Math.sin(angle * Math.PI / 180) * 50; // Adjust bubble movement distance as needed
  const bubbleY = centerY - Math.cos(angle * Math.PI / 180) * 50;

  // Draw level background
  ctx.fillStyle = 'lightgray';
  ctx.fillRect(centerX - 100, centerY - 20, 200, 40);

  // Draw bubble
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(bubbleX, bubbleY, 10, 0, 2 * Math.PI);
  ctx.fill();

  // Display angle
  ctx.font = '20px Arial';
  ctx.fillText(`Angle: ${angle.toFixed(2)}°`, centerX - 50, centerY + 50);
}

// Event listener for device orientation (if supported)
window.addEventListener('deviceorientation', (event) => {
  // Use device orientation data to update angle (replace with actual calculation)
  // Example:
  angle = event.beta; // Assuming beta represents the tilt angle

  drawSpiritLevel();
});

// Initial draw
drawSpiritLevel();

// Optional: Add user interaction (e.g., sliders to adjust angle)
// ...

// Example: Using a slider to adjust angle
const angleSlider = document.getElementById('angleSlider');

angleSlider.addEventListener('input', () => {
  angle = parseFloat(angleSlider.value);
  drawSpiritLevel();
});

// For iOS and Android (using DeviceOrientationEvent)
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', handleOrientation);
} else {
  alert("Sorry, your browser doesn't support DeviceOrientationEvent.");
}

function handleOrientation(event) {
  // Use event.beta and event.gamma to calculate the angle
  // This calculation might need adjustments based on device orientation and sensor accuracy 
  let angle = event.beta; 

  // Update the angle and redraw the spirit level
  drawSpiritLevel();
}