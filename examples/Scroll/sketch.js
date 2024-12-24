/**
 * Scroll Input Visualization with Touch Support
 * 
 * This p5.js sketch demonstrates scrolling behavior based on user input with
 * support for both mouse wheel and touch events. It shows scroll position,
 * direction, state, and timing information.
 * 
 * Additional Features:
 * - Touch event support for mobile devices
 * - Momentum-based scrolling
 * - Touch gesture prevention
 * - Smooth scroll animation
 * - Touch position tracking
 * 
 * Variables:
 * - scrollY: Current vertical scroll position
 * - scrollDirection: Indicates scroll direction (Up, Down, or None)
 * - scrollState: Numeric representation of scroll state (0: None, 1: Down, 2: Up)
 * - scrollIncrement: Fixed amount to increment/decrement scroll position
 * - maxScroll: Maximum allowed scroll position
 * - lastChangeTime: Time of the last scroll change
 * - lastDirectionChangeTime: Time of the last direction change
 * - showData: Boolean to control the visibility of the data
 * - touchStartY: Initial Y position when touch starts
 * - touchPrevY: Previous touch Y position for calculating movement
 * - isTouching: Boolean indicating if user is currently touching
 * - momentum: Current scroll momentum
 * - lastTouchTime: Timestamp of last touch event
 * - lastTouchY: Last recorded touch Y position
 */

let scrollY, scrollDirection, scrollState;
let scrollIncrement = 1;
let maxScroll = 2000;
let lastChangeTime, lastDirectionChangeTime;
let showData = true;

// Touch-specific variables
let touchStartY = 0;
let touchPrevY = 0;
let isTouching = false;
let momentum = 0;
let lastTouchTime = 0;
let lastTouchY = 0;

// Speed tracking variables
let scrollSpeed = 0;
let lastScrollY = 0;
let lastScrollTime = 0;
let speedBuffer = [];  // Array to store recent speed measurements
const SPEED_WINDOW = 300;  // Time window in milliseconds to calculate average speed
const SPEED_SAMPLES = 10;  // Number of samples to keep for averaging

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  
  // Explicitly handle touch events on the canvas element
  let canvasEl = canvas.elt;
  canvasEl.addEventListener('touchstart', handleTouchStart, {passive: false});
  canvasEl.addEventListener('touchmove', handleTouchMove, {passive: false});
  canvasEl.addEventListener('touchend', handleTouchEnd, {passive: false});
  
  // Set touch-action CSS property
  canvasEl.style.touchAction = 'none';
  // Ensure the canvas can't be selected
  canvasEl.style.userSelect = 'none';
  canvasEl.style.webkitUserSelect = 'none';
  canvasEl.style.mozUserSelect = 'none';
  // Prevent iOS text selection/callout
  canvasEl.style.webkitTouchCallout = 'none';
  
  scrollY = 0;
  scrollDirection = "None";
  scrollState = 0;
  lastChangeTime = millis();
  lastDirectionChangeTime = millis();
  
  textSize(12);
  textAlign(LEFT, TOP);
  
  createScrollableArea();
  disableScroll();
  
  // Prevent default touch behaviors
  disableTouchBehaviors();
}

function draw() {
  // Calculate scroll speed with rolling average
  let currentTime = millis();
  let deltaTime = (currentTime - lastScrollTime) / 1000; // Convert to seconds
  
  if (deltaTime > 0) {
    // Calculate instantaneous speed
    let instantSpeed = (scrollY - lastScrollY) / deltaTime;
    
    // Add new speed measurement with timestamp
    speedBuffer.push({
      speed: instantSpeed,
      time: currentTime
    });
    
    // Remove old measurements outside the time window
    while (speedBuffer.length > 0 && 
           currentTime - speedBuffer[0].time > SPEED_WINDOW) {
      speedBuffer.shift();
    }
    
    // Limit buffer size
    while (speedBuffer.length > SPEED_SAMPLES) {
      speedBuffer.shift();
    }
    
    // Calculate average speed from buffer
    if (speedBuffer.length > 0) {
      scrollSpeed = speedBuffer.reduce((sum, item) => sum + item.speed, 0) / speedBuffer.length;
    } else {
      scrollSpeed = 0;
    }
    
    lastScrollY = scrollY;
    lastScrollTime = currentTime;
  }

  // Apply momentum when not touching
  if (!isTouching && momentum !== 0) {
    let previousScrollY = scrollY;
    scrollY += momentum;
    momentum *= 0.95; // Decay factor
    
    // Stop momentum if it's very small
    if (abs(momentum) < 0.1) {
      momentum = 0;
    }
    
    // Update scroll state and timing
    updateScrollState(previousScrollY);
  }
  
  // Constrain scroll position
  scrollY = constrain(scrollY, 0, maxScroll);
  
  // Clear and draw
  clear();
  translate(0, -scrollY);
  
  // Draw background
  fill(220);
  rect(0, 0, width, maxScroll);
  
  // Display heading
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Scroll Data", 10, scrollY + 10);
  
  // Reset text properties
  textSize(12);
  textAlign(LEFT, TOP);
  
  if (showData) {
    // Display scroll and touch data
    let y = scrollY + 50;
    let lineHeight = 20;
    
    text(`Scroll position: ${scrollY.toFixed(1)}`, 10, y); y += lineHeight;
    text(`Scroll direction: ${scrollDirection}`, 10, y); y += lineHeight;
    text(`Scroll state: ${scrollState}`, 10, y); y += lineHeight;
    text(`Momentum: ${momentum.toFixed(2)}`, 10, y); y += lineHeight;
    text(`Touch active: ${isTouching}`, 10, y); y += lineHeight;
    text(`Time since last change: ${((millis() - lastChangeTime) / 1000).toFixed(2)}s`, 10, y); y += lineHeight;
    text(`Time since direction change: ${((millis() - lastDirectionChangeTime) / 1000).toFixed(2)}s`, 10, y); y += lineHeight;
    text(`Scroll speed: ${abs(scrollSpeed).toFixed(2)} pixels/sec`, 10, y);
  } else {
    text("Press SPACEBAR to show data", 10, scrollY + 50);
  }
}

// Touch event handlers
function handleTouchStart(event) {
  isTouching = true;
  lastScrollTime = millis();
  lastScrollY = scrollY;
  touchStartY = event.touches[0].clientY;
  touchPrevY = touchStartY;
  lastTouchY = touchStartY;
  lastTouchTime = millis();
  momentum = 0;
  event.preventDefault();
}

function handleTouchMove(event) {
  if (event.touches.length > 0) {
    let currentY = event.touches[0].clientY;
    let deltaY = touchPrevY - currentY;
    let previousScrollY = scrollY;
    
    scrollY += deltaY * 1.2;
    
    touchPrevY = currentY;
    lastTouchY = currentY;
    lastTouchTime = millis();
    
    updateScrollState(previousScrollY);
    event.preventDefault();
  }
}

function handleTouchEnd(event) {
  isTouching = false;
  
  let touchTime = millis() - lastTouchTime;
  let touchDelta = lastTouchY - touchStartY;
  
  if (touchTime < 100) {
    momentum = -(touchDelta / touchTime) * 2;
  }
  event.preventDefault();
}

// Remove the p5.js touch functions since we're handling them directly
function touchStarted() { return false; }
function touchMoved() { return false; }
function touchEnded() { return false; }

function mouseWheel(event) {
  let previousScrollY = scrollY;
  lastScrollTime = millis();
  
  if (event.delta > 0) {
    scrollY += scrollIncrement;
  } else if (event.delta < 0) {
    scrollY -= scrollIncrement;
  }
  
  updateScrollState(previousScrollY);
  return false;
}

function updateScrollState(previousScrollY) {
  let previousDirection = scrollDirection;
  
  if (scrollY > previousScrollY) {
    scrollDirection = "Down";
    scrollState = 1;
  } else if (scrollY < previousScrollY) {
    scrollDirection = "Up";
    scrollState = 2;
  } else {
    scrollDirection = "None";
    scrollState = 0;
  }
  
  if (scrollY !== previousScrollY) {
    lastChangeTime = millis();
  }
  if (scrollDirection !== previousDirection) {
    lastDirectionChangeTime = millis();
  }
}

function keyPressed() {
  if (key === ' ') {
    showData = !showData;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function createScrollableArea() {
  let scrollArea = createDiv();
  scrollArea.size(1, maxScroll);
  scrollArea.position(0, 0);
  scrollArea.style('pointer-events', 'none');
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

function disableTouchBehaviors() {
  // Prevent default touch behaviors on the canvas element only
  let canvas = document.querySelector('canvas');
  
  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
  }, { passive: false });
  
  canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, { passive: false });
  
  canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
  }, { passive: false });
  
  // Prevent bouncing/rubber-banding effect on iOS
  canvas.addEventListener('gesturestart', function(e) {
    e.preventDefault();
  });
  
  canvas.addEventListener('gesturechange', function(e) {
    e.preventDefault();
  });
  
  canvas.addEventListener('gestureend', function(e) {
    e.preventDefault();
  });
  
  // Additional touch-action CSS property
  canvas.style.touchAction = 'none';
}
