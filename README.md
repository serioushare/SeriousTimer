# SeriousTimer.js by Serious Hare

## Introduction
While working on an other project, I found myself in need of a javascript timer that had some more complex features. For instance, it needed to go both ways (counting up or down), work with times below zero, support different speeds, and trigger events at irregular points instead of a constant interval.

The goal of SeriousTimer is to offer a timer that takes minimal code if you need simple operation, but also offer lots of options for more complex scenarios.

## Features
* Control the state (play/pause/stop)
* Control the direction (forward/backward)
* Control the speed (ie. fast-forward/backward)
* Trigger at a contant interval
* Trigger at predefined points on the timer
* Cap the time within a set range
* Loop over the defined range
* Use event listeners to respond to events happening within the timer

## Examples
#### Simple repeating timer
```javascript
// create the timer with an interval of 1000 milliseconds
var timer = new Timer(0, 1000);

// add a simple ontick listener
timer.ontick = function(event){
    console.info("tick");
}

//start the timer
timer.play();
```
#### Using multiple listeners
```javascript
// the tick event listener
function tickListener(event){
    console.info("a tick event was raised")
}

// the update event listener
function updateListener(event){
    var fadeTime = 10000
    var modTime = event.returnValue % fadeTime;
    document.body.style.backgroundColor = "hsl(" + Math.floor( (modTime / fadeTime) * 360 ) + ", 100%, 50%)";
}

// create the timer with an interval of 1000 milliseconds
var timer = new Timer(0, 1000);

timer.addEventListener("tick", tickListener);
timer.addEventListener("update", updateListener);

//start the timer
timer.play();
```
#### Using markers
```javascript
// create the timer
var timer = new Timer();

// add a marker that fires after 1 second
timer.addMarker(1000, function(event){
    console.info("This only fires after 1 second");
})

// add a marker that fires after 5 seconds
timer.addMarker(5000, function(event){
    console.info("This only fires after 5 second");
})

timer.addEventListener("marker", function(event){
    console.info("This fires at each marker");
})

//start the timer
timer.play();
```

## Changelog
#### Version 0.1.0001
* Initial release.
* Mostly commented and refactored.
* Simple PHP builder file to put everything together.
