# Class: Timer
The `Timer` class represents a timer with advanced control options and high precision events (no, not HPET).

Each timer also supports setting event handlers via `on...` properties.

### Constructors
**`Timer()`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Creates an `Timer` object, returning it to the caller.

#### Parameters
**`time`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Initial time for the timer. This is used when creating the timer, and as reset position.

**`interval`**  
&nbsp;&nbsp;&nbsp;&nbsp;
This is the interval time at which the timer will dispatch a `tick` event.

**`state`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Initial timer state: `Timer.PLAYING` or `Timer.STOPPED`.

**`bottom`**  
&nbsp;&nbsp;&nbsp;&nbsp;
The lowest position the timer can reach.

**`top`**  
&nbsp;&nbsp;&nbsp;&nbsp;
The highest position the timer can reach.

**`loop`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Boolean value to indicate wether the timer loops.

**`speed`**  
&nbsp;&nbsp;&nbsp;&nbsp;
The initial speed at which the timer progresses.

**`withEvents`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Defines wether the timer fires events.

### Properties
**`Timer.bottom`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Get or set the lowest position that the timer can reach.

**`Timer.interval`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Get or set the time between tick events.

**`Timer.loop`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Get or set wether the timer loops when it reaches it's limit. Loops over to the opposing limit.

**`Timer.speed`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Get or set the current progression speed of the timer.

**`Timer.state`** `readonly`  
&nbsp;&nbsp;&nbsp;&nbsp;
Get the current state of the timer.

**`Timer.ticks`** ``readonly``  
&nbsp;&nbsp;&nbsp;&nbsp;
Get the number of ticks between the initial timer position and the current position.

**`Timer.time`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Get or set the current position of the timer.

**`Timer.top`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Get or set the highest position that the timer can reach.

### Methods
**`Timer.addEventListener(type, listener)`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Registers an event handler to a specific event type on this timer.

**`Timer.addMarker({marker|time[, callback]})`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Places a marker on the timers marker list, and returns the index at which it's placed. It accepts either a `TimerMarker` or a `Number` as first argument. If a `Number` is used a new `TimerMarker` instance is created and the optional `callback` is registered as event listener for this specific marker.

**`Timer.dispatchEvent(event)`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Dispatch an event to this timer.

**`Timer.fastBackward()`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Sets `Timer.speed` to -2 times the initial speed and starts the timer at it's current position.

**`Timer.fastForward()`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Sets `Timer.speed` to 2 times the initial speed and starts the timer at it's current position.

**`Timer.pause()`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Stops the timer, but does not reset it.

**`Timer.play()`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Sets `Timer.speed` to the initial speed and starts the timer at it's current position.

**`Timer.playBackward()`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Sets `Timer.speed` to -1 times the initial speed and starts the timer at it's current position.

**`Timer.removeEventListener(type, listener)`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Removes an event listener from this timer.

**`Timer.removeMarker(marker)`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Removes a marker from the marker list.

**`Timer.reset()`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Resets the timer to it's initial configuration. Does not change the state.

**`Timer.stop()`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Stops the timer and resets it to it's initial configuration.

### Static Constants
**`Timer.DEFAULT_BOTTOM`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Default bottom limit of the timer.

**`Timer.DEFAULT_INTERVAL`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Default time between `tick` events.

**`Timer.DEFAULT_LOOP`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Default behavior when the timer reaches one of its limits.

**`Timer.DEFAULT_PLAYSTATE`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Default timer state.

**`Timer.DEFAULT_SPEED`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Default timer state.

**`Timer.DEFAULT_TIME`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Default timer state.

**`Timer.DEFAULT_TOP`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Default top limit of the timer.

**`Timer.DEFAULT_WITH_EVENTS`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Default timer state.

**`Timer.PLAYING`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Contant Integer to indicate the timers state as playing

**`Timer.PRECISION`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Default top limit of the timer.

**`Timer.STOPPED`**  
&nbsp;&nbsp;&nbsp;&nbsp;
Contant Integer to indicate the timers state as stopped


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






