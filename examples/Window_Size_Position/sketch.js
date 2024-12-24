/**
 * Window Size and Position Data Visualization
 * 
 * This p5.js sketch combines monitoring of both window size and position,
 * displaying real-time data about how the window changes and moves on screen.
 * 
 * Features:
 * - Tracks and displays window size changes
 * - Monitors window position on screen
 * - Shows position relative to screen quadrants
 * - Updates in real-time for both movement and resizing
 * - Allows toggling the data display with the spacebar
 * 
 * Variables for size tracking:
 * - lastWidth, lastHeight: Store the previous window dimensions
 * - changeX, changeY: Change in window size since last resize
 * - biggerOrSmaller: Indicates if the window got bigger or smaller
 * 
 * Variables for position tracking:
 * - lastX, lastY: Store the previous window position
 * - moveX, moveY: Change in position since last movement
 * - moveDirection: Indicates the direction of window movement
 */

// Size-related variables
let lastWidth, lastHeight, lastSizeChangeTime;
let changeX, changeY, timeSinceSizeChange;
let biggerOrSmaller;

// Position-related variables
let lastX, lastY, lastMoveTime;
let moveX, moveY, timeSinceMove;
let moveDirection;
let totalDistanceMoved = 0;

// Screen quadrant booleans
let leftSide = false;
let rightSide = false;
let topHalf = false;
let bottomHalf = false;

// Display control
let showData = true;

function setup() {
  // Create a canvas that fills the window
  createCanvas(windowWidth, windowHeight);
  
  // Initialize size variables
  lastWidth = width;
  lastHeight = height;
  lastSizeChangeTime = millis();
  changeX = 0;
  changeY = 0;
  timeSinceSizeChange = 0;
  biggerOrSmaller = "";
  
  // Initialize position variables
  lastX = screenX;
  lastY = screenY;
  lastMoveTime = millis();
  moveX = 0;
  moveY = 0;
  timeSinceMove = 0;
  moveDirection = "None";
  
  // Set default text properties
  textSize(12);
  textAlign(LEFT, TOP);
}

function draw() {
  // Clear the canvas
  background(220);
  
  // Update timing variables
  timeSinceSizeChange = (millis() - lastSizeChangeTime) / 1000;
  timeSinceMove = (millis() - lastMoveTime) / 1000;
  
  // Check for window movement
  checkWindowMove();
  
  // Display heading
  fill(0);
  noStroke();
  textSize(24);
  textAlign(LEFT, TOP);
  text("Window Size & Position Monitor", 10, 10);
  
  // Reset text properties for data display
  textSize(12);
  textAlign(LEFT, TOP);
  
  if (showData) {
    displayData();
    drawPositionIndicator();
  } else {
    // Display instruction when data is hidden
    text("Press SPACEBAR to show data", 10, 50);
  }
}

function displayData() {
  let y = 50;
  let lineHeight = 20;
  
  // Size Section
  text("Window Size Data:", 10, y); y += lineHeight;
  text(`Current size: ${width} x ${height}`, 20, y); y += lineHeight;
  text(`Size change: ${changeX} x ${changeY}`, 20, y); y += lineHeight;
  text(`Time since resize: ${timeSinceSizeChange.toFixed(2)} seconds`, 20, y); y += lineHeight;
  text(`Size change: ${biggerOrSmaller}`, 20, y); y += lineHeight * 1.5;
  
  // Position Section
  text("Window Position Data:", 10, y); y += lineHeight;
  text(`Current position: ${screenX}, ${screenY}`, 20, y); y += lineHeight;
  text(`Movement: ${moveX}, ${moveY}`, 20, y); y += lineHeight;
  text(`Time since move: ${timeSinceMove.toFixed(2)} seconds`, 20, y); y += lineHeight;
  text(`Movement direction: ${moveDirection}`, 20, y); y += lineHeight;
  text(`Total distance moved: ${totalDistanceMoved.toFixed(0)} pixels`, 20, y); y += lineHeight * 1.5;
  
  // Screen Position Section
  text("Screen Position:", 10, y); y += lineHeight;
  text(`Left Side: ${leftSide}`, 20, y); y += lineHeight;
  text(`Right Side: ${rightSide}`, 20, y); y += lineHeight;
  text(`Top Half: ${topHalf}`, 20, y); y += lineHeight;
  text(`Bottom Half: ${bottomHalf}`, 20, y); y += lineHeight * 1.5;
  
  // Screen Info Section
  text("Screen Info:", 10, y); y += lineHeight;
  text(`Screen size: ${screen.width} x ${screen.height}`, 20, y);
}

function updateScreenPosition() {
  // Calculate screen midpoints
  let screenMidX = screen.width / 2;
  let screenMidY = screen.height / 2;
  
  // Update position booleans based only on top-left corner position
  leftSide = screenX < screenMidX;
  rightSide = screenX >= screenMidX;
  topHalf = screenY < screenMidY;
  bottomHalf = screenY >= screenMidY;
}

function checkWindowMove() {
  // Update screen position booleans
  updateScreenPosition();
  
  // Check if window position has changed
  if (screenX !== lastX || screenY !== lastY) {
    // Calculate movement
    moveX = screenX - lastX;
    moveY = screenY - lastY;
    
    // Update total distance moved
    let distance = sqrt(moveX * moveX + moveY * moveY);
    totalDistanceMoved += distance;
    
    // Determine movement direction
    if (abs(moveX) > abs(moveY)) {
      moveDirection = moveX > 0 ? "Right" : "Left";
    } else if (abs(moveY) > abs(moveX)) {
      moveDirection = moveY > 0 ? "Down" : "Up";
    } else if (moveX === 0 && moveY === 0) {
      moveDirection = "None";
    } else {
      moveDirection = "Diagonal";
    }
    
    // Update last known values
    lastX = screenX;
    lastY = screenY;
    lastMoveTime = millis();
  }
}

function drawPositionIndicator() {
  // Draw a miniature screen representation
  let margin = 20;
  let indicatorWidth = 150;
  let indicatorHeight = 100;
  let x = width - indicatorWidth - margin;
  let y = height - indicatorHeight - margin;
  
  // Draw screen boundary
  stroke(0);
  noFill();
  rect(x, y, indicatorWidth, indicatorHeight);
  
  // Draw screen midlines
  line(x + indicatorWidth/2, y, x + indicatorWidth/2, y + indicatorHeight);
  line(x, y + indicatorHeight/2, x + indicatorWidth, y + indicatorHeight/2);
  
  // Calculate window position on indicator
  let windowX = map(screenX, 0, screen.width, x, x + indicatorWidth);
  let windowY = map(screenY, 0, screen.height, y, y + indicatorHeight);
  
  // Draw window position
  fill(0, 255, 0);
  ellipse(windowX, windowY, 8, 8);
}

function windowResized() {
  // Adjust canvas size to match new window size
  resizeCanvas(windowWidth, windowHeight);
  
  // Calculate changes in window dimensions
  changeX = width - lastWidth;
  changeY = height - lastHeight;
  
  // Determine if the window got bigger or smaller
  let newArea = width * height;
  let oldArea = lastWidth * lastHeight;
  biggerOrSmaller = newArea > oldArea ? "Bigger" : (newArea < oldArea ? "Smaller" : "Same");
  
  // Update last known values
  lastWidth = width;
  lastHeight = height;
  lastSizeChangeTime = millis();
}

function keyPressed() {
  // Toggle data display when spacebar is pressed
  if (key === ' ') {
    showData = !showData;
  }
}