# Enabling Phone Hardware Access in P5.js for IOS
When using **P5 on IOS**, you must directly enable access to hardware inputs. The method for doing this has changed with new versions of the operating system, but these examples have been tested to work with **IOS 18**. 
If running the examples on **Android/Chrome**, no access permissions are required.

## Table of Contents
- [**Enable Microphone Access IOS**](#enable-microphone-access-ios)
- [**Enable Motion Sensor Access IOS**](#enable-motion-sensor-access-ios)

### Enable Microphone Access IOS

<div style="display: flex; flex-direction: row; gap: 5px;">
    <div style="width: 30%;">
        <p><strong>Step 1</strong> : When the page load press <strong>[Start Microphone]</strong> Button</p>
        <img src="../images/microphone_1.jpg" alt="Step 1 Microphone" style="max-width: 100%; height: auto;"/>
    </div>
    <div style="width: 30%;">
        <p><strong>Step 2</strong> : When the Pop-up comes up click <strong>[Allow]</strong></p>
        <img src="../images/microphone_2.jpg" alt="Step 2 Microphone" style="max-width: 100%; height: auto;"/>
    </div>
    <div style="width: 30%;">
        <p>You should now see the data from the microphone. *Note Noise cancellation makes them each behave differently</p>
        <img src="../images/microphone_3.jpg" alt="Step 3 Microphone" style="max-width: 100%; height: auto;"/>
    </div>
</div>

### Enable Motion Sensor Access IOS

<div style="display: flex; flex-direction: row; gap: 5px;">
    <div style="width: 30%;">
        <p><strong>Step 1</strong> : click <strong>[Click to allow access to sensors]</strong> Button</p>
        <img src="../images/motion_1.jpg" alt="Step 1 Motion" style="max-width: 100%; height: auto;"/>
    </div>
    <div style="width: 30%;">
        <p><strong>Step 2</strong> : When the pop-up comes up, click <strong>[Allow]</strong></p>
        <img src="../images/motion_2.jpg" alt="Step 2 Motion" style="max-width: 100%; height: auto;"/>
    </div>
    <div style="width: 30%;">
        <p>You should now see the data from the motion sensors</p>
        <img src="../images/motion_3.jpg" alt="Step 3 Motion" style="max-width: 100%; height: auto;"/>
    </div>
</div>