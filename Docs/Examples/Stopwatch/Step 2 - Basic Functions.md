# Stopwatch: Step 2 - Basic Function
### Adding the Timer and some basic functions

Now it's time to add the first bit of functionality to the stopwatch. We start with creating a Timer instance. Than we add the functions to display the time, and control the timer.

#### Creating the Timer.
Lets start with creating a new Timer. We don't need to change any of the default values, so we don't have to use any of the arguments. We just need this one timer for all features (including the more complex that come with later steps). Lest also define the variables that will reference the HTML Elements.
```javascript
// This timer will control the stopwatch
var timer = new Timer();
```

#### The Update Event.
Next we create a function that updates the display. We attach this function to the `onupdate` property of the timer. The `update` event is called at a high rate. It calls with the internal interval at 1 millisecond (not the effective interval), and on all control calls.
```javascript
// This function is called at a high rate (when the timer is running).
timer.onupdate = function(){
  // Let's just output the time for now
  document.getElementById("display").value = timer.time;
}
```

#### Simple Controls
The start and stop functions are rather simple. They start or stop the timer, and change the text on the start/stop button.
```javascript
// This function starts the timer, and replaces the text on the button to 'Stop'
function start(){
  // First we start the timer, we don't want any delay here.
  timer.play();
  // Next we change the button text
  document.getElementById("start_stop").innerHTML = "Stop";
}
```

```javascript
// This function stops the timer, and replaces the text on the button to 'Start'
function stop(){
  // First we pause the timer, we don't want any delay here.
  timer.pause();
  // Next we change the button text
  document.getElementById("start_stop").innerHTML = "Start";
}
```

#### Switch based on timer.state
A key feature of a stopwatch is that you use only one button to start and stop it. That way the user doesn't create a delay by moving his finger, or the mouse. So we need a start and stop function and a switch to call the one we need. We can easily do this with the `state` property of the timer.
```javascript
// This function stops the timer, and replaces the text on the button to 'Start'
function startStop(){
  if(timer.state) stop();
  else start();
}
```

#### Resetting the timer
We also want to be able to reset the timer, but only when the timer is not running. We can make sure of that by using timer.state again.
```javascript
// This function resets the timer of it's not running.
function reset(){
  if(!timer.state) timer.reset();
}
```

#### [Previous: Step 1 - Setup][step_1] | [Next: Step 3 - Interface][step_3]

[step_1]: Step%201%20-%20Setup.md
[step_3]: Step%203%20-%20Interface.md
