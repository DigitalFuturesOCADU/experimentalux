# Experimenting with Inputs + Templates in P5
This series of P5 examples introduce methods for working with standard input methods in new ways

## Table of Contents
- [Experimental UX](#experimental-ux)
- [Input Templates](#input-templates)
  - [Single Touch Data](#single-touch-data)
  - [Multi Touch Data](#multi-touch-data)
  - [Microphone Data](#microphone-data)
  - [Phone Sensors - Accelerometer + Gyroscope](#phone-sensors---accelerometer--gyroscope)
  - [Window Size and Position](#window-size-and-position)
  - [Scroll Data](#scroll-data)

## Experimental UX

![UX Graph](/images/uxGraph.png)

When working with Experimental UX, the goal to create interactions that are extremely specific to media and experience. It does not need to be transferable to other situations, but it needs to work well for this one. P5 provides relatively easy methods for accessing various input data points. Because you have access to the raw input data, you are able to develop new data points from the input that move beyond the typical/expected.

## Input Templates

These sketches provide a base to build from that calculates multiple values from an input that can be easily integrated into your code.

These examples split the draw into clear functions:
- A function to calculate all data and store it into the variables
- A function to display that data on screen as text
  - You can comment out the display function in any example to easily draw/interact with the data however you want
- Microphone + Sensor Examples require extra functions for managing access to the hardware

### Single Touch Data

<table>
<tr>
<td width="300px"><img src="/images/singleTouch_Screen.png" alt="Single Touch Screen" width="100%"/></td>
<td width="300px"><img src="/images/singleTouch_QR.jpg.png" alt="Single Touch QR" width="100%"/></td>
</tr>
</table>

Works With: Laptop MacOS | Laptop Windows | Android | Mobile IOS

This simple input shows multiple pieces of data that can be collected from a single click on the canvas.

Note the meta tag in the index.html page that disables the default multitouch zoom behaviour:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

[Editor Link](https://editor.p5js.org/npuckett/sketches/Kn_WL5OCt)

[Fullscreen Link](https://editor.p5js.org/npuckett/full/Kn_WL5OCt)

**Variables:**
- toggleState: Boolean - Alternates between true/false on each interaction
- lastInteractionTime: Number - Timestamp of the most recent interaction 
- timeSinceLastInteraction: Number - Time elapsed since the last interaction in seconds
- totalInteractions: Number - Total number of interactions since the sketch started
- interactionTimes: Array - Stores timestamps of recent interactions for IPS calculation
- interactionsPerSecond: Number - Calculated interactions per second over the last 3 seconds
- interactionWindow: Number - Time window (in milliseconds) for IPS calculation (set to 3000ms)
- lastInteractionX: Number - X-coordinate of the most recent interaction
- lastInteractionY: Number - Y-coordinate of the most recent interaction
- prevInteractionX: Number - X-coordinate of the second-to-last interaction
- prevInteractionY: Number - Y-coordinate of the second-to-last interaction
- distanceBetweenInteractions: Number - Distance between the last two interactions

### Multi Touch Data

<table>
<tr>
<td width="300px"><img src="/images/multitouch_screen.png" alt="Multi Touch Screen" width="100%"/></td>
<td width="300px"><img src="/images/multitouch_QR.png" alt="Multi Touch QR" width="100%"/></td>
</tr>
</table>

Works With: Mobile IOS | Android

Reads multi-touch data on screen. Focused on reading multiple input points.

Note the meta tag in the index.html page that disables the default multitouch zoom behaviour:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

[Editor Link](https://editor.p5js.org/npuckett/sketches/YaicoC9rh)

[Fullscreen Link](https://editor.p5js.org/npuckett/full/YaicoC9rh)

**Variables:**
- touchPoints: Array - Stores current touch points
- totalTouches: Number - Total number of touch events since the sketch started
- lastTouchTime: Number - Timestamp of the most recent touch event
- timeSinceLastTouch: Number - Time elapsed since the last touch in seconds
- touchDistances: Array - Distances between each pair of touch points
- totalLength: Number - Sum of all distances between touch points

### Microphone Data

<table>
<tr>
<td width="300px"><img src="/images/microphone_screen.png" alt="Microphone Screen" width="100%"/></td>
<td width="300px"><img src="/images/microphone_QR.png" alt="Microphone QR" width="100%"/></td>
</tr>
</table>

Works With: Laptop MacOS | Laptop Windows | IOS | Android

Reads the volume level of the microphone and transforms it into multiple datapoints.

The code also handles enabling access to the microphone across platforms.

Because of security settings in all browsers, microphone access cannot be enabled automatically.

[Enabling Phone Hardware Access in P5.js](enabling-phone-hardware-access.md)

[Editor Link](https://editor.p5js.org/npuckett/sketches/g1Ek4q0Oy)

[Fullscreen Link](https://editor.p5js.org/npuckett/full/g1Ek4q0Oy)

**Variables:**
- mic: p5.AudioIn - Stores the microphone input object
- volume: Number - Raw volume level from the microphone
- scaledVolume: Number - Amplified volume level (0 to 1)
- peakVolume: Number - Highest volume reached
- averageVolume: Number - Average volume over recent history
- volumeHistory: Array - Stores recent volume readings
- lastLoudEventTime: Number - Timestamp of the last detected loud event
- timeSinceLoudEvent: Number - Time elapsed since the last loud event in seconds
- loudEventCount: Number - Count of recent loud events
- loudEventRate: Number - Calculates the rate of loud events per second
- started: Boolean - Indicates if the sketch has been started by user interaction
- permissionGranted: Boolean - Indicates if microphone permission has been granted
- dataReceived: Boolean - Indicates if any microphone data has been received

### Phone Sensors - Accelerometer + Gyroscope

<table>
<tr>
<td width="300px"><img src="/images/orientation_screen.png" alt="Orientation Screen" width="100%"/></td>
<td width="300px"><img src="/images/orientation_QR.png" alt="Orientation QR" width="100%"/></td>
</tr>
</table>

Works With: IOS | Android

Reads the Orientation and Acceleration data from the sensors and stores it multiple datapoints.

The code also handles enabling access to the sensors across platforms.

Because of security settings in IOS, Access to sensors must be enabled manually.

Note the meta tag in the index.html page that disables the default multitouch zoom behaviour:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

[Enabling Phone Hardware Access in P5.js](enabling-phone-hardware-access.md)

[Editor Link](https://editor.p5js.org/npuckett/sketches/XLiasuc99)

[Fullscreen Link](https://editor.p5js.org/npuckett/full/XLiasuc99)

**Variables:**
- rotationData: Object - Stores rotation data for X, Y, and Z axes
- accelerationData: Object - Stores acceleration data for X, Y, and Z axes
- isShaken: Boolean - Indicates if the device is currently shaken
- shakeToggle: Boolean - Shake to toggle ON / Shake to toggle OFF
- lastShakeTime: Number - Timestamp of the last detected shake
- timeSinceShake: Number - Time elapsed since the last shake in seconds
- dataReceived: Boolean - Indicates if any sensor data has been received
- shakeHistory: Array - Stores timestamps of recent shakes
- shakeRate: Number - Calculates the rate of shakes per second

### Window Size and Position

<table>
<tr>
<td width="300px"><img src="/images/windowSize_screen.png" alt="Window Size Screen" width="100%"/></td>
<td width="300px"><img src="/images/windowSize_QR.png" alt="Window Size QR" width="100%"/></td>
</tr>
</table>

Works With: Laptop MacOS | Laptop Windows

This sketch combines monitoring of both window size and position, displaying real-time data about how the window changes and moves on screen. It tracks window size changes, monitors window position, shows position relative to screen quadrants, and updates in real-time for both movement and resizing. The data display can be toggled with the spacebar.

[Editor Link](https://editor.p5js.org/npuckett/sketches/jJ3wX1yef)

[Fullscreen Link](https://editor.p5js.org/npuckett/full/jJ3wX1yef)

**Variables:**
Size tracking:
- lastWidth: Number - Stores the previous window width
- lastHeight: Number - Stores the previous window height
- lastSizeChangeTime: Number - Timestamp of the last window resize
- changeX: Number - Change in window width since last resize
- changeY: Number - Change in window height since last resize
- timeSinceSizeChange: Number - Time elapsed since the last window resize in seconds
- biggerOrSmaller: String - Indicates if the window got bigger or smaller

Position tracking:
- lastX: Number - Stores the previous window X position
- lastY: Number - Stores the previous window Y position
- lastMoveTime: Number - Timestamp of the last window movement
- moveX: Number - Change in X position since last movement
- moveY: Number - Change in Y position since last movement
- timeSinceMove: Number - Time elapsed since the last movement in seconds
- moveDirection: String - Indicates the direction of window movement
- totalDistanceMoved: Number - Total distance the window has moved in pixels

Screen position:
- leftSide: Boolean - Indicates if window is on the left side of screen
- rightSide: Boolean - Indicates if window is on the right side of screen
- topHalf: Boolean - Indicates if window is in the top half of screen
- bottomHalf: Boolean - Indicates if window is in the bottom half of screen

Display:
- showData: Boolean - Controls the visibility of the data display

### Scroll Data

<table>
<tr>
<td width="300px"><img src="/images/scroll_screen.png" alt="Scroll Screen" width="100%"/></td>
<td width="300px"><img src="/images/scroll_QR.png" alt="Scroll QR" width="100%"/></td>
</tr>
</table>

Works With: Laptop MacOS | Laptop Windows | IOS | Android

This sketch demonstrates scrolling behavior based on user input with support for both mouse wheel and touch events. It features momentum-based scrolling, touch gesture handling, and smooth scroll animation. The system tracks scroll position, direction, speed, and timing while providing both mouse and touch input support with momentum-based movement.

[Editor Link](https://editor.p5js.org/npuckett/sketches/lZzKl-sBI)

[Fullscreen Link](https://editor.p5js.org/npuckett/full/lZzKl-sBI)

**Variables:**
Scroll State:
- scrollY: Number - Current vertical scroll position
- scrollDirection: String - Indicates scroll direction (Up, Down, or None)
- scrollState: Number - Numeric representation of scroll state (0: None, 1: Down, 2: Up)
- scrollIncrement: Number - Fixed amount to increment/decrement scroll position
- maxScroll: Number - Maximum allowed scroll position
- scrollSpeed: Number - Current scrolling speed in pixels per second

Timing:
- lastChangeTime: Number - Time of the last scroll change
- lastDirectionChangeTime: Number - Time of the last direction change
- lastScrollTime: Number - Timestamp of last scroll movement
- speedBuffer: Array - Stores recent speed measurements for averaging

Touch Input:
- touchStartY: Number - Initial Y position when touch starts
- touchPrevY: Number - Previous touch Y position for calculating movement
- isTouching: Boolean - Indicates if user is currently touching
- lastTouchTime: Number - Timestamp of last touch event
- lastTouchY: Number - Last recorded touch Y position
- momentum: Number - Current scroll momentum value

Display:
- showData: Boolean - Controls the visibility of the data display