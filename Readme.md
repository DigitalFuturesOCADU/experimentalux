```markdown
# Experimenting with Inputs + Templates

## Table of Contents
- [Experimental UX](#experimental-ux)
- [Input Templates](#input-templates)
  - [Single Touch Data](#single-touch-data)
  - [Multi Touch Data](#multi-touch-data)
  - [Microphone Data](#microphone-data)
  - [Phone Sensors - Accelerometer + Gyroscope](#phone-sensors---accelerometer--gyroscope)

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
<td width="300px">
<img src="/images/singleTouch_Screen.png" alt="Single Touch Screen" width="100%"/>
</td>
<td width="300px">
<img src="/images/singleTouch_QR.jpg.png" alt="Single Touch QR" width="100%"/>
</td>
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
<td width="300px">
<img src="/images/multitouch_screen.png" alt="Multi Touch Screen" width="100%"/>
</td>
<td width="300px">
<img src="/images/multitouch_QR.png" alt="Multi Touch QR" width="100%"/>
</td>
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
<td width="300px">
<img src="/images/microphone_screen.png" alt="Microphone Screen" width="100%"/>
</td>
<td width="300px">
<img src="/images/microphone_QR.png" alt="Microphone QR" width="100%"/>
</td>
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
<td width="300px">
<img src="/images/orientation_screen.png" alt="Orientation Screen" width="100%"/>
</td>
<td width="300px">
<img src="/images/orientation_QR.png" alt="Orientation QR" width="100%"/>
</td>
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
```