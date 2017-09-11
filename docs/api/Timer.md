# Class: Timer
The Timer class is the core class of the SeriousTimer.js API. It represents a timer with advanced control options and high precision events (no, not HPET).

## Arguments
All arguments are optional, following the order shown in the table.

Name       | Default                       | Description
-----------|-------------------------------|------------------------
time       | `Number:0`                    | Initial time for the timer. This is used when creating the timer, and as reset points.
interval   | `Number:1000`                 | This is the interval time at which the timer will dispatch a tick event.
state      | `Number:0`                    | Initial timer state: `Timer.PLAYING` or `Timer.STOPPED`.
bottom     | `Number:Timer.DEFAULT_BOTTOM` | The lowest position the timer can reach.
top        | `Number:Timer.DEFAULT_TOP`    | The highest position the timer can reach.
loop       | `Boolean:false`               | Boolean value to indicate wether the timer loops.
speed      | `Number:1`                    | The initial speed at which the timer progresses.
withEvents | `Boolean:true`                | Defines wether the timer fires events. 

## Properties
Name     | Type      | Default                 | Description
---------|-----------|-------------------------|--------------------------
bottom   | `Number`  | `Timer.DEFAULT_BOTTOM`  | Get or set the lowest position that the timer can reach.
interval | `Number`  | `1000`                  | Get or set the time between tick events.
loop     | `Boolean` | `false`                 | Get or set wether the timer loops when it reaches it's limit. Loops over to the opposing limit.
speed    | `Number`  | `1`                     | Get or set the current progression speed of the timer.
state    | `Number`  | `0`                     | Get the current state of the timer.
ticks    | `Number`  | `0`                     | Get the number of ticks between the initial timer position and the current position.
time     | `Number`  | `0`                     | Get or set the current position of the timer.
top      | `Number`  | `Timer.DEFAULT_TOP`     | Get or set the highest position that the timer can reach.

## Methods
Name                | Arguments                          | Returns | Events         | Description
--------------------|------------------------------------|---------|----------------|--------------------------
addEventListener    | `String:type`, `Function:listener` |         |                | Adds `Function:listener` to the list of listeners for events of type `String:type`.
addMarker           | `TimerMarker:marker`               | `index` |                | places `TimerMarker:marker` on the marker list, and returns the index at which it's placed.
addMarker           | `Number:time`, `Function:callback` | `index` |                | Creates a new `TimerMarker` on the marker list, and returns the index at which it's placed. Callback is stored within the marker and is called before the marker event dispatches.
dispatchEvent       | `TimerEvent:event`                 |         |                | Dispatches `TimerEvent:event` on the timer, raising all event listeners for `String:event.type`.
fastBackward        |                                    |         | `play`         | Sets `timer.speed` to `-2 * initialSpeed` and starts the timer at it's current position.
fastForward         |                                    |         | `play`         | Sets `timer.speed` to `2 * initialSpeed` and starts the timer at it's current position.
pause               |                                    |         | `stop`         | Stops the timer, but does not reset it.
play                |                                    |         | `play`         | Sets `timer.speed` to `initialSpeed` and starts the timer at it's current position.
playBackward        |                                    |         | `play`         | Sets `timer.speed` to `-1 * initialSpeed` and starts the timer at it's current position.
removeEventListener | `String:type`, `Function:listener` |         |                | Removes `Function:listener` to the list of listeners for events of type `String:type`.
removeMarker        | `TimerMarker:marker`               |         |                | Removes `TimerMarker:marker` from the list of markers.
reset               |                                    |         | `reset`        | Resets the timer to it's initial position. Does not change the state.
stop                |                                    |         | `stop`,`reset` | Stops the timer and resets it to it's initial position.

## Statics Constants (Used for the Timers default values)
Name                | Constant | Value
--------------------|----------|-----------------
PRECISION           | `true`   | `1`
STOPPED             | `true`   | `0`
PLAYING             | `true`   | `0`
DEFAULT_TIME        | `true`   | `0`
DEFAULT_INTERVAL    | `true`   | `1000`
DEFAULT_PLAYSTATE   | `true`   | `Timer.STOPPED`
DEFAULT_SPEED       | `true`   | `1`
DEFAULT_BOTTOM      | `true`   | `Number.NEGATIVE_INFINITY`
DEFAULT_TOP         | `true`   | `Number.POSITIVE_INFINITY`
DEFAULT_LOOP        | `true`   | `false`
DEFAULT_WITH_EVENTS | `true`   | `true`

## Event types
Name      | ReturnValue  | Dispatched When
----------|--------------|-----------------
bottom    | `timer.time` | The timer hits it's bottom limit.
narker    | `marker`     | The timer passes a marker.
play      | `timer.time` | The state changed from `Timer.STOPPED` to any other state.
reset     | `timer.time` | The timer is reset.
stop      | `timer.time` | The state changed from any other state to `Timer.STOPPED`
tick      | `timer.time` | The timer passes the set interval.
top       | `timer.time` | The timer hits it's top limit.
update    | `timer.time` | The internal update funtion was called.






