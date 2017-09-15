# Class: Timer
The `Timer` class represents a timer with advanced control options and high precision events (no, not HPET). All events are dispatch the same way as regular events (like those of DOM Elements). They return a [`TimerEvent`][api.timerevent] which inherits [`Event`][ext.event].

Each timer also supports setting event handlers via `on...` properties.

## Constructors
**`Timer()`**  
Creates an `Timer` object, returning it to the caller.

#### Syntac
```javascript
timer = new Timer([withEvent]);
timer = new Timer(time[, withEvent]);
timer = new Timer(time, interval[, withEvent]);
timer = new Timer(time, interval, state[, withEvent]);
timer = new Timer(time, interval, state, bottom, top, loop[, withEvent]);
timer = new Timer(time, interval, state, bottom, top, loop, speed[, withEvent]);
```

#### Parameters
**`time`**  
Initial time for the timer. This is used when creating the timer, and as reset position.

**`interval`**  
This is the interval time at which the timer will dispatch a `tick` event.

**`state`**  
Initial timer state: `Timer.PLAYING` or `Timer.STOPPED`.

**`bottom`**  
The lowest position the timer can reach.

**`top`**  
The highest position the timer can reach.

**`loop`**  
Boolean value to indicate wether the timer loops.

**`speed`**  
The initial speed at which the timer progresses.

**`withEvents`**  
Defines wether the timer fires events.

## Properties
**`Timer.bottom`**  
Get or set the lowest position that the timer can reach.

**`Timer.interval`**  
Get or set the time between tick events.

**`Timer.loop`**  
Get or set wether the timer loops when it reaches it's limit. Loops over to the opposing limit.

**`Timer.speed`**  
Get or set the current progression speed of the timer.

**`Timer.state`** `readonly`  
Get the current state of the timer.

**`Timer.ticks`** `readonly`  
Get the number of ticks between the initial timer position and the current position.

**`Timer.time`**  
Get or set the current position of the timer.

**`Timer.top`**  
Get or set the highest position that the timer can reach.

## Methods
**`Timer.addEventListener(type, listener)`**  
Registers an event handler to a specific event type on this timer.

**`Timer.addMarker({marker|time[, callback]})`**  
Places a marker on the timers marker list, and returns the index at which it's placed. It accepts either a [`TimerMarker`][api.timermarker] or a [`Number`][ext.number] as first argument. If a [`Number`][ext.number] is used a new [`TimerMarker`][api.timermarker] instance is created and the optional `callback` is registered as event listener for this specific marker.

**`Timer.dispatchEvent(event)`**  
Dispatch an event to this timer.

**`Timer.fastBackward()`**  
Sets `Timer.speed` to -2 times the initial speed and starts the timer at it's current position.

**`Timer.fastForward()`**  
Sets `Timer.speed` to 2 times the initial speed and starts the timer at it's current position.

**`Timer.pause()`**  
Stops the timer, but does not reset it.

**`Timer.play()`**  
Sets `Timer.speed` to the initial speed and starts the timer at it's current position.

**`Timer.playBackward()`**  
Sets `Timer.speed` to -1 times the initial speed and starts the timer at it's current position.

**`Timer.removeEventListener(type, listener)`**  
Removes an event listener from this timer.

**`Timer.removeMarker(marker)`**  
Removes a marker from the marker list.

**`Timer.reset()`**  
Resets the timer to it's initial configuration. Does not change the state.

**`Timer.stop()`**  
Stops the timer and resets it to it's initial configuration.

## Static Constants
**`Timer.DEFAULT_BOTTOM`**  
Default bottom limit of the timer.

**`Timer.DEFAULT_INTERVAL`**  
Default time between `tick` events.

**`Timer.DEFAULT_LOOP`**  
Default behavior when the timer reaches one of its limits.

**`Timer.DEFAULT_PLAYSTATE`**  
Default timer state.

**`Timer.DEFAULT_SPEED`**  
Default timer state.

**`Timer.DEFAULT_TIME`**  
Default timer state.

**`Timer.DEFAULT_TOP`**  
Default top limit of the timer.

**`Timer.DEFAULT_WITH_EVENTS`**  
Default timer state.

**`Timer.PLAYING`**  
Contant Integer to indicate the timers state as playing

**`Timer.PRECISION`**  
Default top limit of the timer.

**`Timer.STOPPED`**  
Contant Integer to indicate the timers state as stopped

## Event types
**`bottom`**  
The timer hits it's bottom limit.

**`narker`**  
The timer passes a marker.

**`play`**  
The state changed from `Timer.STOPPED` to any other state.

**`reset`**  
The timer is reset.

**`stop`**  
The state changed from any other state to `Timer.STOPPED`.

**`tick`**  
The timer passes the set interval.

**`top`**  
The timer hits it's top limit.

**`update`**  
The internal update funtion was called.






[api.timerevent]:  TimerEvent.md
[api.timermarker]: TimerMarker.md
[ext.event]:       https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
[ext.number]:      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

