# SeriousTimer.js by Serious Hare

## Introduction

While working on an other project, I found myself in need of a javascript timer that had some more complex features. For instance, it needed to go both ways (counting up or down), work with times below zero, support different speeds, and trigger events at irregular points instead of a constant interval.

The goal of SeriousTimer is to offer a timer that takes minimal code if you need simple operation, but also offer lots of options for more complex scenarios.

> This API is still in an early state and it's functionality and syntax might still undergo slight changes. Where possible I'll try to keep the old syntax available. I'll keep these changes to an absolute minimal. All breaking changes will be listed below.

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
#### Version 0.1.0003 [Parental Trust]
* Modified the `TimerEvent` constructor arguments. Now uses en abstract object `eventInit` as second arguments.
* When creating a new `TimerEvent`, it will require a `Timer` as `target` or the `TimerEvent.isTrusted` will be `false`.
* Now uses `TimerEvent.time` to return the timer position.
* Uses `TimerEvent.marker` to return the marker that triggered the event, if any.
* Added `Event` as `__proto__.__proto__` within the `TimerEvent`. This way both `event instanceof TimerEvent` and `event instanceof Event` will return `true`.

#### Version 0.1.0002 [Getting Closure]
* Moved everything into a closure.
* Closure uses dynamic `context` instead of `window`.
* Fixed handling of decimal (float) intervals.
* PHP builder now uses `build.json` for it's build instructions.

#### Version 0.1.0001 [Play]
* Initial release.
* Mostly commented and refactored.
* Simple PHP builder file to put everything together.
