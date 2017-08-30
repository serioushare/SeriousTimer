# SHTimer by Serious Hare
While working on an other project, I found myself in need of a JavaScript timer that had some more complex features. For instance, it needed to go both wait (counting up or down), work with times below zero, and trigger events at iregular point instead of a constant interval.

## Features
* Control the state (play/pause/stop)
* Control the direction (forward/backward)
* Control the speed (ie. fast-forward/backward)
* Trigger at a contant interval
* Trigger at predefined points in time
* Cap the time within a set range
* Loop over the defined range
* Use event listeners to respond to events happening within the timer

`
var timer = new Timer()
`
