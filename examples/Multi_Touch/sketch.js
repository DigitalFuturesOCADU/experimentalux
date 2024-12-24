/**
 * 
 * Description: This p5.js sketch demonstrates ways to capture and display
 *              touch interaction data, with additional measures to prevent
 *              default touch behaviors across platforms.
 * 
 * Usage: 
 * - Touch the screen with one or more fingers
 * - The sketch will display information about each touch point
 * - The total number of touches since the start is tracked
 * - Distances between all pairs of touch points are calculated and displayed
 * - The total length (sum of all distances) is calculated and displayed
 * 
 * Notes: 
 * - Include the following meta tag in your HTML file for proper mobile behavior:
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
 * 
 * Variables:
 * touchPoints: Array - Stores current touch points
 * totalTouches: Number - Total number of touch events since the sketch started
 * lastTouchTime: Number - Timestamp of the most recent touch event
 * timeSinceLastTouch: Number - Time elapsed since the last touch in seconds
 * touchDistances: Array - Distances between each pair of touch points
 * totalLength: Number - Sum of all distances between touch points
 *
*/ 

let touchPoints = [];
let totalTouches = 0;
let lastTouchTime = 0;
let timeSinceLastTouch = 0;
let touchDistances = [];
let totalLength = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  frameRate(60);
  
  // Disable default touch behaviors
  disableScroll();
}

function draw() {
  background(220);
  
  // Update data
  getTouchData();
  
  // Display data comment out as needed
  showTouchData();
  
  // Visual representation of touch points
  drawTouchPoints();
}

function getTouchData() {
  // Update time since last touch
  timeSinceLastTouch = (millis() - lastTouchTime) / 1000;
  
  // Update touch points array
  touchPoints = [];
  for (let i = 0; i < touches.length; i++) {
    touchPoints.push({
      x: touches[i].x,
      y: touches[i].y,
      id: touches[i].id
    });
  }
  
  // Calculate distances between all pairs of touch points
  touchDistances = [];
  totalLength = 0;
  for (let i = 0; i < touchPoints.length; i++) {
    for (let j = i + 1; j < touchPoints.length; j++) {
      let d = calculateDistance(touchPoints[i], touchPoints[j]);
      touchDistances.push({
        pair: (i+1) + "-" + (j+1),
        distance: d
      });
      totalLength += d;
    }
  }
}

function calculateDistance(point1, point2) {
  return dist(point1.x, point1.y, point2.x, point2.y);
}

function showTouchData() {
  let yPos = 20;
  const lineHeight = 20;
  
  textSize(16);  // Larger size for the title
  fill(0);
  noStroke();
  text("Touch / Drag Multiple Points", 20, yPos);
  yPos += lineHeight * 1.5;  // Add extra space after the title
  
  textSize(12);  // Reset to smaller size for the data
  
  text("Number of current touches: " + touchPoints.length, 20, yPos);
  yPos += lineHeight;
  
  text("Total touches: " + totalTouches, 20, yPos);
  yPos += lineHeight;
  
  // toFixed(2) rounds the number to 2 decimal places
  text("Time since last touch: " + timeSinceLastTouch.toFixed(2) + " seconds", 20, yPos);
  yPos += lineHeight;
  
  // Display info for each touch point
  for (let i = 0; i < touchPoints.length; i++) {
    // toFixed(0) rounds the number to the nearest integer
    text("Touch " + (i + 1) + ": (" + touchPoints[i].x.toFixed(0) + ", " + touchPoints[i].y.toFixed(0) + ")", 20, yPos);
    yPos += lineHeight;
  }
  
  // Display distances between touch points
  for (let i = 0; i < touchDistances.length; i++) {
    text("Distance " + touchDistances[i].pair + ": " + touchDistances[i].distance.toFixed(2), 20, yPos);
    yPos += lineHeight;
  }
  
  // Display total length
  text("Total length: " + totalLength.toFixed(2), 20, yPos);
}

function drawTouchPoints() {
  // Draw touch points
  for (let i = 0; i < touchPoints.length; i++) {
    fill(255, 0, 0);
    ellipse(touchPoints[i].x, touchPoints[i].y, 20, 20);
    
    // Draw the touch point number below the circle
    fill(0);
    textAlign(CENTER, TOP);
    textSize(24);  // Larger text size for better visibility
    
    // Calculate position for the number
    let numberX = touchPoints[i].x;
    let numberY = touchPoints[i].y + 50;  // Move 50 pixels below the touch point
    
    // Adjust if too close to the bottom of the canvas
    if (numberY > height - 30) {
      numberY = touchPoints[i].y - 50;  // Move above if too close to bottom
    }
    
    // Draw a white background for the number for better contrast
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(numberX, numberY, 40, 40);
    
    // Draw the number
    fill(0);
    text(i + 1, numberX, numberY + 5);  // +5 for vertical centering
    
    textAlign(LEFT, TOP);
    textSize(12);  // Reset text size
  }
  
  // Draw lines between all touch points
  for (let i = 0; i < touchPoints.length; i++) {
    for (let j = i + 1; j < touchPoints.length; j++) {
      stroke(0, 255, 0);
      line(touchPoints[i].x, touchPoints[i].y, touchPoints[j].x, touchPoints[j].y);
    }
  }
}

function touchStarted() {
  totalTouches++;
  lastTouchTime = millis();
  return false;  // Prevent default behavior
}

function touchMoved() {
  return false;  // Prevent default behavior
}

function touchEnded() {
  return false;  // Prevent default behavior
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function disableScroll() {
  // Prevent default touch behaviors
  document.body.addEventListener('touchstart', function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener('touchmove', function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener('touchend', function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  
  // Disable zoom
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
  });
  
  // Optional: Disable pull-to-refresh
  document.body.style.overscrollBehavior = 'none';
}