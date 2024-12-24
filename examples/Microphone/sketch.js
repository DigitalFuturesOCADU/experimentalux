/**
 * 
 * Description: This p5.js sketch demonstrates how to capture and analyze
 *              microphone input across multiple platforms (Android, iOS, Desktop),
 *              including volume analysis, history tracking, and loud event detection.
 * 
 * Usage: 
 * - Run this sketch on any device or browser
 * - Click the "Start Microphone" button
 * - Grant microphone permissions when prompted
 * - Make sounds and watch the visualizations update
 * 
 * Dependencies: p5.js library, p5.sound library
 * 
 * Variables:
 * mic: p5.AudioIn - Stores the microphone input object
 * volume: Number - Raw volume level from the microphone
 * scaledVolume: Number - Amplified volume level (0 to 1)
 * peakVolume: Number - Highest volume reached
 * averageVolume: Number - Average volume over recent history
 * volumeHistory: Array - Stores recent volume readings
 * lastLoudEventTime: Number - Timestamp of the last detected loud event
 * timeSinceLoudEvent: Number - Time elapsed since the last loud event in seconds
 * loudEventCount: Number - Count of recent loud events
 * loudEventRate: Number - Calculates the rate of loud events per second
 * started: Boolean - Indicates if the sketch has been started by user interaction
 * permissionGranted: Boolean - Indicates if microphone permission has been granted
 * dataReceived: Boolean - Indicates if any microphone data has been received
 * startButton: p5.Element - Button to initiate microphone input
 *
 * Updated to work across platforms including iOS
 */

// Microphone and volume variables
let mic;
let volume = 0;
let scaledVolume = 0;

// Constants for volume processing
let VOLUME_SCALAR = 5;  // Amplifies the volume
let HISTORY_LENGTH = 100;  // Number of past volume readings to store
let LOUD_THRESHOLD = 0.5;  // Volume level considered "loud"
let RATE_WINDOW = 5000;  // Time window for calculating loud event rate (ms)

// Variables for volume analysis
let peakVolume = 0;
let averageVolume = 0;
let volumeHistory = [];
let lastLoudEventTime = 0;
let timeSinceLoudEvent = 0;
let loudEventCount = 0;
let loudEventRate = 0;

// State variables
let started = false;
let permissionGranted = false;
let dataReceived = false;

// UI elements
let startButton;

function setup() {
  // Create a canvas that fills the window
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  frameRate(60);

  // Initialize microphone (but don't start it yet)
  mic = new p5.AudioIn();

  // Create and position the start button
  startButton = createButton('Start Microphone');
  startButton.position(width/2 - 75, height/2);
  startButton.size(150, 50);
  startButton.mousePressed(startMicrophone);
}

function draw() {
  background(220);
  
  if (!started) {
    // Waiting for user to start the sketch
    displayStartMessage();
  } else if (!permissionGranted) {
    // Waiting for microphone permission
    displayWaitingMessage();
  } else if (!dataReceived) {
    // Microphone allowed, but no data yet
    displayCheckMessage();
  } else {
    // Microphone is working and sending data
    updateData();
    displayData();  // Comment this out to add your own visuals
    
    // Add your own drawing code here
    // You can use the following variables in your visuals:
    // - scaledVolume: current volume level (0 to 1)
    // - peakVolume: highest volume reached
    // - averageVolume: average volume over recent history
    // - timeSinceLoudEvent: time since last loud sound
    // - loudEventRate: frequency of loud sounds
  }
}

// Function to display the start message
function displayStartMessage() {
  textSize(24);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Click the button to start", width/2, height/2 - 50);
}

// Function to display the waiting for permission message
function displayWaitingMessage() {
  textSize(16);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Waiting for microphone permission...\nPlease grant permission if prompted.", width/2, height/2);
}

// Function to display the checking for audio input message
function displayCheckMessage() {
  textSize(16);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Microphone permission granted.\nChecking for audio input...", width/2, height/2);
}

// Function to start the microphone
function startMicrophone() {
  userStartAudio();
  started = true;
  startButton.remove(); // Remove the button after it's clicked

  // Start the microphone input
  mic.start(() => {
    console.log('Microphone started');
    permissionGranted = true;
    setTimeout(checkAudioInput, 100);
  }, () => {
    console.log('Error starting microphone');
    permissionGranted = false;
  });
}

// Function to actually start the microphone after permissions are handled
function actuallyStartMicrophone() {
  mic.start(() => {
    console.log('Microphone started');
    permissionGranted = true;
    setTimeout(checkAudioInput, 100);
  }, () => {
    console.log('Error starting microphone');
    permissionGranted = false;
  });
}

// Function to check if audio input is being received
function checkAudioInput() {
  if (mic.getLevel() > 0) {
    dataReceived = true;
  } else {
    setTimeout(checkAudioInput, 100);
  }
}

// Function to update volume data and perform analysis
function updateData() {
  // Get current volume and apply scaling
  volume = mic.getLevel();
  scaledVolume = min(volume * VOLUME_SCALAR, 1);
  
  // Update volume history
  volumeHistory.push(scaledVolume);
  if (volumeHistory.length > HISTORY_LENGTH) {
    volumeHistory.shift();
  }
  
  // Update peak and average volume
  peakVolume = max(peakVolume, scaledVolume);
  averageVolume = volumeHistory.reduce((sum, vol) => sum + vol, 0) / volumeHistory.length;
  
  // Check for loud events
  if (scaledVolume > LOUD_THRESHOLD) {
    lastLoudEventTime = millis();
    loudEventCount++;
  }
  
  // Update time since last loud event
  timeSinceLoudEvent = (millis() - lastLoudEventTime) / 1000;
  
  // Update loud event rate
  loudEventRate = loudEventCount / (RATE_WINDOW / 1000);
  if (millis() - lastLoudEventTime > RATE_WINDOW) {
    loudEventCount = 0;
  }
}

// Function to display all the volume data
function displayData() {
  let yPos = 20;
  let lineHeight = 20;

  textSize(16);
  fill(0);
  textAlign(LEFT, TOP);
  text("Microphone Volume Data", 20, yPos);
  yPos += lineHeight * 1.5;

  textSize(12);

  // Display current volume
  text("Current Volume:", 20, yPos);
  yPos += lineHeight;
  text("Raw Level: " + formatValue(volume), 40, yPos);
  yPos += lineHeight;
  text("Scaled Level: " + formatValue(scaledVolume), 40, yPos);
  yPos += lineHeight * 1.5;

  // Display volume bar
  text("Volume Bar (Scaled):", 20, yPos);
  yPos += lineHeight;
  drawVolumeBar(40, yPos, width - 80, 20);
  yPos += lineHeight * 1.5;

  // Display peak and average volume
  fill(0);
  text("Peak Volume: " + formatValue(peakVolume), 20, yPos);
  yPos += lineHeight;
  text("Average Volume: " + formatValue(averageVolume), 20, yPos);
  yPos += lineHeight * 1.5;

  // Display loud event data
  text("Time Since Last Loud Event: " + formatValue(timeSinceLoudEvent) + " seconds", 20, yPos);
  yPos += lineHeight;
  text("Loud Event Rate: " + formatValue(loudEventRate) + " events/second", 20, yPos);
  yPos += lineHeight * 1.5;

  // Display volume history graph
  text("Volume History:", 20, yPos);
  yPos += lineHeight;
  drawVolumeHistory(40, yPos, width - 80, 100);
}

// Function to draw the volume bar
function drawVolumeBar(x, y, width, height) {
  noStroke();
  fill(200);
  rect(x, y, width, height);
  fill(0, 255, 0);
  rect(x, y, width * scaledVolume, height);
}

// Function to draw the volume history graph
function drawVolumeHistory(x, y, width, height) {
  // Draw background
  fill(200);
  noStroke();
  rect(x, y, width, height);

  // Draw volume history
  stroke(0);
  noFill();
  beginShape();
  for (let i = 0; i < volumeHistory.length; i++) {
    let xPos = map(i, 0, HISTORY_LENGTH - 1, x, x + width);
    let yPos = map(volumeHistory[i], 0, 1, y + height, y);
    vertex(xPos, yPos);
  }
  endShape();

  // Draw LOUD_THRESHOLD line
  stroke(255, 0, 0);
  let thresholdY = map(LOUD_THRESHOLD, 0, 1, y + height, y);
  line(x, thresholdY, x + width, thresholdY);

  // Label the threshold line
  noStroke();
  fill(255, 0, 0);
  textAlign(RIGHT, BOTTOM);
  text("LOUD_THRESHOLD", x + width - 5, thresholdY - 5);
}

// Function to format numerical values for display
function formatValue(value) {
  return value !== null ? value.toFixed(3) : "N/A";
}

// Function to handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (!started) {
    startButton.position(width/2 - 75, height/2);
  }
}