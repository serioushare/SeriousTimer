# Class: TimerMarker
The `TimerMarker` class represents the markers that can be placed on a [`Timer`][api.timer] using the `Timer.addMarker` method. When a timer passes an added marker, it dispatches a [`TimerEvent`][api.timerevent] of type `marker` on the timer.

## Constructor
**`TimerMarker()`**  
Creates an TimerMarker object, returning it to the caller.

#### Syntax
```javascript
marker = new TimerMarker(time);
marker = new TimerMarker(time, callback);
```

#### Parameters
**`time`**  
The position that the marker should be placed at.

**`callback`** `optional`  
Optional callback that behaves the same way as any marker event handler, except it only triggers for this specific marker. Triggers before the regular event listeners.

## Properties
**`TimerMarker.time`** `readonly`  
The position of the marker on the timer.

**`TimerMarker.callback`** `readonly`  
The callback function of the timer. Is called by `Timer.dispathEvent` and handed a event as first argument.





[api.timer]:       Timer.md

