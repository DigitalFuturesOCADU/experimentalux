/**
 * 
 * Description: This p5.js sketch demonstrates various ways to capture and display
 *              mouse/touch interaction data, including clicks per second, toggle states,
 *              click locations, and distance between clicks. The canvas matches
 *              the window size and readjusts when the window is resized.
 * 
 * Usage: 
 * - Tap/click anywhere on the canvas to register interactions
 * - Rapid taps/clicks will affect the interactions per second calculation
 * - Interaction location is displayed for the most recent tap/click
 * - Distance between the last two interactions is calculated and displayed
 * - The canvas will resize to match the window size
 * - Works on Desktop + Mobile browsers IOS + Android
 * 
 * Dependencies: p5.js library
 * 
 * Notes: 
 * - Include the following meta tag in your HTML file for proper mobile behavior:
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
 * 
 * Variables:
 * toggleState: Boolean - Alternates between true/false on each interaction
 * lastInteractionTime: Number - Timestamp of the most recent interaction
 * timeSinceLastInteraction: Number - Time elapsed since the last interaction in seconds
 * totalInteractions: Number - Total number of interactions since the sketch started
 * interactionTimes: Array - Stores timestamps of recent interactions for IPS calculation
 * interactionsPerSecond: Number - Calculated interactions per second over the last 3 seconds
 * interactionWindow: Number - Time window (in milliseconds) for IPS calculation (set to 3000ms)
 * lastInteractionX: Number - X-coordinate of the most recent interaction
 * lastInteractionY: Number - Y-coordinate of the most recent interaction
 * prevInteractionX: Number - X-coordinate of the second-to-last interaction
 * prevInteractionY: Number - Y-coordinate of the second-to-last interaction
 * distanceBetweenInteractions: Number - Distance between the last two interactions
 * angleBetweenInteractions: Number - Angle between the last two interactions in radians
 *
 */

let toggleState = false;
let lastInteractionTime = 0;
let timeSinceLastInteraction = 0;
let totalInteractions = 0;
let interactionTimes = [];
let interactionsPerSecond = 0;
const interactionWindow = 3000; // Calculate IPS over the last 3 seconds
let lastInteractionX = 0;
let lastInteractionY = 0;
let prevInteractionX = 0;
let prevInteractionY = 0;
let distanceBetweenInteractions = 0;
let angleBetweenInteractions = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  frameRate(60);
  
  // Disable default touch behaviors
  disableScroll();
}

function draw() {
  background(220);
  
  getInteractionData(); // calculates the input
  showInteractionData();
  
  // Visual representation of interactions per second
  fill(255, 0, 0);
  ellipse(width/2, height/2, interactionsPerSecond * 10, interactionsPerSecond * 10);
  
  // Draw green line between points
  stroke(0, 255, 0);
  strokeWeight(2);
  line(prevInteractionX, prevInteractionY, lastInteractionX, lastInteractionY);
  
  // Draw current tap location
  fill(0, 255, 0, 178); // Green with 70% opacity
  noStroke();
  ellipse(lastInteractionX, lastInteractionY, 20, 20);
  
  // Draw previous tap location
  noFill();
  stroke(0, 255, 0);
  ellipse(prevInteractionX, prevInteractionY, 20, 20);
}

function getInteractionData() {
  timeSinceLastInteraction = (millis() - lastInteractionTime) / 1000;
  
  const currentTime = millis();
  interactionTimes = interactionTimes.filter(time => currentTime - time <= interactionWindow);
  interactionsPerSecond = interactionTimes.length / (interactionWindow / 1000);
  
  distanceBetweenInteractions = dist(prevInteractionX, prevInteractionY, lastInteractionX, lastInteractionY);
  
  // Calculate angle between interactions
  angleBetweenInteractions = atan2(lastInteractionY - prevInteractionY, lastInteractionX - prevInteractionX);
}

function showInteractionData() {
  let yPos = 20;
  const lineHeight = 20;
  
  textSize(16);
  noStroke();
  fill(0);
  
  text("Single Touch Input. Tap Anywhere on the Screen", 20, yPos);
  yPos += lineHeight * 1.5;
  
  textSize(12);
  
  text("Toggle State: " + (toggleState ? 'On' : 'Off'), 20, yPos);
  yPos += lineHeight;
  
  text("Time Since Last Interaction: " + timeSinceLastInteraction.toFixed(2) + " seconds", 20, yPos);
  yPos += lineHeight;
  
  text("Interactions Per Second: " + interactionsPerSecond.toFixed(2), 20, yPos);
  yPos += lineHeight;
  
  text("Total Interactions: " + totalInteractions, 20, yPos);
  yPos += lineHeight;
  
  text("Last Interaction Location: (" + Math.round(lastInteractionX) + ", " + Math.round(lastInteractionY) + ")", 20, yPos);
  yPos += lineHeight;
  
  text("Distance Between Last Interactions: " + distanceBetweenInteractions.toFixed(2), 20, yPos);
  yPos += lineHeight;
  
  text("Angle Between Last Interactions: " + degrees(angleBetweenInteractions).toFixed(2) + "°", 20, yPos);
}

function handleInteraction(x, y) {
  toggleState = !toggleState;
  totalInteractions++;
  lastInteractionTime = millis();
  
  prevInteractionX = lastInteractionX;
  prevInteractionY = lastInteractionY;
  lastInteractionX = x;
  lastInteractionY = y;
  
  interactionTimes.push(millis());
}

function touchStarted() {
  if (touches.length > 0) {
    handleInteraction(touches[0].x, touches[0].y);
  }
  return false;
}

function mousePressed() {
  handleInteraction(mouseX, mouseY);
  return false;
}

function touchMoved() {
  return false;
}

function touchEnded() {
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function disableScroll() {
  // Prevent default touch behavior on the canvas
  document.body.addEventListener('touchstart', function(e) {
    if (e.target == canvas) {
      e.preventDefault(); // Stops the browser from processing the touch event
    }
  }, { passive: false }); // 'passive: false' allows preventDefault to work

  // Prevent scrolling when touching the canvas
  document.body.addEventListener('touchmove', function(e) {
    if (e.target == canvas) {
      e.preventDefault(); // Stops the default scrolling behavior
    }
  }, { passive: false });

  // Prevent default behavior for touchend events on the canvas
  document.body.addEventListener('touchend', function(e) {
    if (e.target == canvas) {
      e.preventDefault(); // Stops any default actions associated with touch end
    }
  }, { passive: false });
  
  // Prevent pinch-to-zoom gesture on the entire document
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault(); // Disables pinch-to-zoom
  });
  
  // Disable overscroll/bounce effect on the body
  document.body.style.overscrollBehavior = 'none';
  // 'none' prevents the overscroll glow effect and bounce back behavior
}