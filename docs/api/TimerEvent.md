# Class: TimerEvent
The `TimerEvent` class represents the events dispatched by timer instances.

## Constructor
**`TimerEvent()`**  
Creates an `TimerEvent` object, returning it to the caller.

#### Syntax
```javascript
event = new TimerEvent(typeArg, eventInit);
event = new TimerEvent(typeArg, marker);
// deprecated constructors
event = new TimerEvent(typeArg, target);
event = new TimerEvent(typeArg, target, time);
```

#### Parameters
**`typeArg`**  
Defines what type the `TimerEvent` is.

**`eventInit`**  
Initial variables used for the event, as Object:  
```javascript
eventInit = {
    time: overrideTime      // optional override TimerEvent.time
}
```

**`marker`**  
Reference to the `TimerMarker` that triggered the event.

**`target`** `deprecated`  
Reference to the creator of the `TimerEvent`.

**`time`** `deprecated` `optional`  
Time at which the event was triggered, used for timed events.

## Properties
**`TimerEvent.bubbles`** `readonly`  
A dummy property to override `Event.bubbles`.

**`TimerEvent.cancelBubble`**  
A dummy property to override `Event.cancelBubble`.

**`TimerEvent.cancelable`** `readonly`  
A dummy property to override `Event.cancelable`.

**`TimerEvent.composed`** `readonly`  
A dummy property to override `Event.composed`.

**`TimerEvent.currentTarget`** `readonly`  
A reference to the timer that the event is registered to. 

**`TimerEvent.defaultPrevented`** `readonly`  
A dummy property to override `Event.defaultPrevented`.

**`TimerEvent.eventPhase`** `readonly`  
A dummy property to override `Event.eventPhase`.

**`TimerEvent.isTrusted`** `readonly`  
A Boolean indicating wether the event is created by a timer.

**`TimerEvent.marker`** `readonly`  
A reference to the marker that triggerd the event.

**`TimerEvent.path`** `readonly`  
A dummy property to override `Event.path`.

**`TimerEvent.returnValue`** `readonly`  
A dummy property to override `Event.returnValue`.

**`TimerEvent.srcElement`** `readonly`  
A dummy property to override `Event.srcElement`.

**`TimerEvent.target`** `readonly`  
A reference to the timer where the event originated.

**`TimerEvent.time`** `readonly`  
The timers position when the event was created, or the position associated with the event.

**`TimerEvent.timeStamp`** `readonly`  
The timestamp when the event was created.

**`TimerEvent.type`** `readonly`  
String containing the type of the event.









