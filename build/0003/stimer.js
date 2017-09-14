

/**[SeriousBuilder]***************************************************************************
 * Name:       SeriousTimer 
 * Version:    0.1.0003 
 * Language:   JavaScript 
 *****************************************************************************[Serious Hare]**/

(function closure(context){

/**[public class: Timer ]*********************************************************************
 * @remark:           This is the core class of the SHTimer API. It represents a complex and *
 *                    accurate timer that can be used for measure and control purposes.      *
 * @param time:       The initial time for the timer. Also used on reset.                    *
 * @param tick:       The interval at which to raise a tick event.                           *
 * @param state:      The initial state of the timer.                                        *
 * @param bottom:     The lowest time the timer can reach, can be negative.                  *
 * @param top:        The highest time the timer can reach, can be negative.                 *
 * @param loop:       Defines wether the timer loops.                                        *
 * @param speed:      Defines the speed at which the timer runs.                             *
 * @param withEvents: Defines wether the timer raise events.                                 *
 *****************************************************************************[Serious Hare]**/
	function Timer(){
		const me = this;
		
		var baseTime;             // Time passed before the last state or speed change.
		var startTime;            // Timestamp of the last state or speed change.
		var multiplier;           // Current speed multiplier.
		
		var interval = null;      // Reference to the interval, or null.
		var markers = [];         // Array used to store the markers.
		var prevTime = 0;
		
		var _withEvents;
		var _reset = {};          // Container for the initial values, used to reset the timer
		var _times = {};
		
		function construct(time, interval, state, bottom, top, loop, speed, withEvents){
			// find the position of the withEvents argument and move it to the proper position.
			if( typeof(time) == "boolean" ){
				withEvents = time;
				time = Timer.DEFAULT_TIME;
			}else if( typeof(interval) == "boolean" ){
				withEvents = interval;
				interval = Timer.DEFAULT_INTERVAL;
			}else if( typeof(state) == "boolean" ){
				withEvents = state;
				state = Timer.DEFAULT_PLAYSTATE;
			}else if( typeof(bottom) == "boolean" ){
				withEvents = bottom;
				bottom = Timer.DEFAULT_BOTTOM;
			}else if( typeof(speed) == "boolean" ){
				withEvents = speed;
				speed = Timer.DEFAULT_SPEED;
			}
			
			// check if the initial time lies within the range of the timer.
			if(( time < me.bottom ) || ( time > me.top )) throw new TypeError("time lies outside of the available range of the timer");
			
			// apply the default values for the arguments if needed.
			me.bottom      = (typeof(bottom)     === "number")?  bottom     : Timer.DEFAULT_BOTTOM;       _reset.bottom   = me.bottom;
			me.loop        = (typeof(loop)       === "boolean")? loop       : Timer.DEFAULT_LOOP;             _reset.loop     = me.loop;
			me.speed       = (typeof(speed)      === "number")?  speed      : Timer.DEFAULT_SPEED;            _reset.speed    = me.speed;
			me.interval    = (typeof(interval)   === "number")?  interval   : Timer.DEFAULT_INTERVAL;         _reset.interval = me.interval;
			me.time        = (typeof(time)       === "number")?  time       : Timer.DEFAULT_TIME;             _reset.time     = me.time;
			me.top         = (typeof(top)        === "number")?  top        : Timer.DEFAULT_TOP;          _reset.top      = me.top;
			
			_state         = (typeof(state)      === "number")?  state      : Timer.DEFAULT_PLAYSTATE;        _reset.state    = _state;
			_withEvents    = (typeof(withEvents) === "boolean")? withEvents : Timer.DEFAULT_RAISES_EVENTS;
			
			if( me.state == Timer.PLAYING ){
				play();
			}
		}
		
		
	/**[public readonly property: bottom ]********************************************************
	 * @return: Get or set the bottom limit of the timer. Rounds toward zero.                    *
	 *****************************************************************************[Serious Hare]**/
		Object.defineProperty(me, "bottom", {
			get:function(){return _bottom},
			set:function(value){
				_bottom = (typeof value === "number")? Math.toZero(value) : Timer.DEFAULT_BOTTOM;
			},
			enumerable:true,
		})
		var _bottom = Timer.DEFAULT_BOTTOM;
		
	/**[public readonly property: loop ]**********************************************************
	 * @return: Get or set wether the timer loops when it reaches the top or bottom limit. Sets  *
	 *          the time to the opposite limit when looping.                                     *
	 *****************************************************************************[Serious Hare]**/
		Object.defineProperty(me, "loop", {
			get:function(){return _loop},
			set:function(value){
				_loop = value? true : false;
			},
			enumerable:true,
		})
		var _loop = null;
		
	/**[public readonly property: speed ]*********************************************************
	 * @return: Get or set the speed at which the timer progresses.                              *
	 *****************************************************************************[Serious Hare]**/
		Object.defineProperty(me, "speed", {
			get:function(){return _speed},
			set:function(value){
				// store the timers new position
				baseTime = Math.toZero(me.time);
				// set the startTime to the current time
				startTime = Date.now();
				
				_speed = value? value : Timer.DEFAULT_SPEED;
			},
			enumerable:true,
		})
		var _speed = Timer.DEFAULT_SPEED;
		
	/**[public readonly property: state ]*********************************************************
	 * @return: Get the current state of the timer.                                              *
	 *****************************************************************************[Serious Hare]**/
		Object.defineProperty(me, "state", {
			get:function(){return _state},
			enumerable:true,
		})
		var _state = 0;
		
	/**[public readonly property: top ]***********************************************************
	 * @return: Get or set the top limit of the timer. Rounds toward zero.                       *
	 *****************************************************************************[Serious Hare]**/
		Object.defineProperty(me, "top", {
			get:function(){return _top},
			set:function(value){
				_top = value? Math.toZero(value) : Timer.DEFAULT_TOP;
			},
			enumerable:true,
		})
		var _top = Timer.DEFAULT_TOP;
		
	/**[public readonly property: interval ]******************************************************
	 * @return: Get or set the tick interval of the timer.                                       *
	 *****************************************************************************[Serious Hare]**/
		Object.defineProperty(me, "interval", {
			get:function(){return _interval},
			set:function(value){
				_interval = value? Math.max(1, value) : Timer.DEFAULT_INTERVAL;
			},
			enumerable:true,
		})
		var _interval = Timer.DEFAULT_INTERVAL;
		
		
	/**[public readonly property: ticks ]*********************************************************
	 * @return: Get the passed ticks count.                                                      *
	 *****************************************************************************[Serious Hare]**/
		Object.defineProperty(me, "ticks", {
			get:function(){
				// calculate and return the passed ticks
				return Math.toZero(me.time / _interval);
			},
			enumerable:true,
		})
		
		
	/**[public property: time ]*******************************************************************
	 * @return: Get or set the current position of the timer.                                    *
	 *****************************************************************************[Serious Hare]**/
		Object.defineProperty(me, "time", {
			get:function(){
				// get the timers base time and add the movement since then. Uses multiplier to account for the playback speed
				var returnTime = Math.toZero( baseTime + (( Date.now() - startTime ) * ( _speed * Math.min(_state, 1) )));
				//check if the time lies within the timers range
				returnTime = Math.max(_bottom, Math.min(_top, returnTime));
				// return the current time, or the initial if the current time is NaN
				return !isNaN(returnTime)? returnTime : _reset.time;
			},
			set:function(time){
				//check if the new time lies within the timers range
				if(( time < _bottom ) || ( time > _top )) throw new TypeError("time lies outside of the available range of the timer");
				// store the timers new position
				baseTime = Math.toZero(time);
				// set the startTime to the current time
				startTime = Date.now();
				// trigger a timer update
				update();
			},
			enumerable:true,
		})
		
		
	/**[protected public method: play ]***********************************************************
	 * @remark: Start the timer at the current position.                                         *
	 *****************************************************************************[Serious Hare]**/
		function play(){
			// store the current timer position.
			baseTime = me.time;
			// store the current timestamp.
			startTime = Date.now();
			
			// set the state to playing.
			_state = Timer.PLAYING;
			
			// set the speed to the initial speed.
			_speed = _reset.speed;
			
			// start the interval if it's not set.
			setTimerInterval();
			
			// raise an event of type play.
			dispatchEvent(new TimerEvent("play", {time:baseTime}));
		}
		play.parent = me;
		// Make play a protected public method.
		me.play = play;
		
		
	/**[protected public method: pause ]**********************************************************
	 * @remark: Pause the timer at the current position.                                         *
	 *****************************************************************************[Serious Hare]**/
		function pause(){
			// store the current timer position.
			baseTime = me.time;
			// store the current timestamp.
			startTime = Date.now();
			
			// set the state to stopped.
			_state = Timer.STOPPED;
			
			// clear the interval if it's set
			clearTimerInterval();
			
			// force a call to the interval tick function, to make sure tick events are called on reset.
			update();
			
			// raise an event of type pause.
			dispatchEvent(new TimerEvent("stop", {time:baseTime}));
		}
		pause.parent = me;
		// Make pause a protected public method
		me.pause = pause;
		
		
	/**[protected public method: stop ]***********************************************************
	 * @remark:  Stops the timer and resets it.                                                  *
	 *****************************************************************************[Serious Hare]**/
		function stop(){
			// set the timer position to it's initital time.
			baseTime = _reset.time;
			// store the current timestamp.
			startTime = Date.now();
			
			// set the state to stopped.
			_state = Timer.STOPPED;
			
			// clear the interval if it's set
			clearTimerInterval();
			
			// force a call to the interval tick function, to make sure tick events are called on reset.
			update();
			
			// raise an event of type stop.
			dispatchEvent(new TimerEvent("stop", {time:baseTime}));
			dispatchEvent(new TimerEvent("reset", {time:baseTime}));
		}
		stop.parent = me;
		// Make stop a protected public method
		me.stop = stop;
		
		
	/**[protected public method: reset ]**********************************************************
	 * @remark: Resets the timer.                                                                *
	 *****************************************************************************[Serious Hare]**/
		function reset(){
			// set the base time back to the initial time
			baseTime = _reset.time;
			// set the startTime to the current time
			startTime = Date.now();
			
			// force a call to the interval tick function, to make sure tick events are called on reset.
			update();
			
			// raise an event of type stop.
			dispatchEvent(new TimerEvent("reset", {time:baseTime}));
		}
		reset.parent = me;
		// Make reset a protected public method
		me.reset = reset;
		
		
	/**[protected public method: fastForward ]****************************************************
	 * @remark: Start the timer at the current position.                                         *
	 *****************************************************************************[Serious Hare]**/
		function fastForward(){
			// store the timers current position
			baseTime = me.time;
			// set the startTime to the current time
			startTime = Date.now();
			
			// set the state to playing.
			_state = Timer.PLAYING;
			
			// reset the multiplier to the initial multiplier value.
			_speed = _reset.speed * 2;
			
			// Create an interval and attach the tick handler if there is no timer running.
			setTimerInterval();
			
			// raise an event of type play.
			dispatchEvent(new TimerEvent("play", {time:baseTime}));
		}
		fastForward.parent = me;
		// Make fastForward a protected public method
		me.fastForward = fastForward;
		
		
	/**[protected public method: playBackward ]***************************************************
	 * @remark: Start the timer at the current position.                                         *
	 *****************************************************************************[Serious Hare]**/
		function playBackward(){
			// store the current timer position.
			baseTime = me.time;
			// store the current timestamp.
			startTime = Date.now();
			
			// set the state to playing.
			_state = Timer.PLAYING;
			
			// set the speed to the initial speed.
			_speed = _reset.speed * -1;
			
			// start the interval if it's not set.
			setTimerInterval();
			
			// raise an event of type play.
			dispatchEvent(new TimerEvent("play", {time:baseTime}));
		}
		playBackward.parent = me;
		// Make fastForward a protected public method
		me.playBackward = playBackward;
		
		
	/**[protected public method: fastBackward ]***************************************************
	 * @remark: Start the timer at the current position.                                         *
	 *****************************************************************************[Serious Hare]**/
		function fastBackward(){
			// store the timers current position
			baseTime = me.time;
			// set the startTime to the current time
			startTime = Date.now();
			
			// set the state of the player to playing.
			_state = Timer.PLAYING;
			// set the speed to the -2 times the initial speed.
			_speed = _reset.speed * -2;
			
			// Create an interval and attach the tick handler if there is no timer running.
			setTimerInterval();
			
			// raise an event of type play.
			dispatchEvent(new TimerEvent("play", {time:baseTime}));
		}
		fastBackward.parent = me;
		// Make fastForward a protected public method
		me.fastBackward = fastBackward;
		
		
		
	/**[protected public method: addMarker ]******************************************************
	 * @remark:         Adds a new marker to the timer at the given time.                        *
	 * @param time:     Position of the marker in miliseconds.                                   *
	 * @param callback: An optional callback function, which is executed when a marker event is  *
	 *                  raised for this marker.                                                  *
	 *****************************************************************************[Serious Hare]**/
		function addMarker(time, callback){
			var marker = time;
			
			if(!(marker instanceof TimerMarker)){
				// create a new marker object.
				marker = new TimerMarker(time, callback);
			}
			// add it to the list of markers.
			markers.push(marker);
			// return the new markers id.
			return markers.length - 1;
		}
		// Make playSlower a protected public method
		me.addMarker = addMarker;
		
		
	/**[protected public method: removeMarker ]***************************************************
	 * @remark:         Adds a new marker to the timer at the given time.                        *
	 * @param marker:   Index of the marker, as received from the addMarker function.            *
	 *****************************************************************************[Serious Hare]**/
		function removeMarker(marker){
			// clear the marker;
			markers[marker] = null;
		}
		// Make playSlower a protected public method
		me.removeMarker = removeMarker;
		
		
	/**[ Private Control Methods ]************************************************[Serious Hare]**/
		
		
	/**[private method: setTimerInterval ]*************************************************************
	 * @remark: The setTimerInterval method checks if there is an interval set, and creates a new one *
	 *          if it's not set, and stores the interval id in a private reference.              *
	 *****************************************************************************[Serious Hare]**/
		function setTimerInterval(){
			// Create an interval and attach the tick handler if there is no timer running.
			if(interval == null && _withEvents) interval = context.setInterval(update, Timer.PRECISION);
		}
		
		
	/**[private method: clearTimerInterval ]***********************************************************
	 * @remark: The clearTimerInterval method clear the interval if it's set, and sets the interval   *
	 *          reference to null.                                                               *
	 *****************************************************************************[Serious Hare]**/
		function clearTimerInterval(){
			// clear the interval
			if(interval !== null) context.clearInterval(interval);
			// set the interval reference to null
			interval = null;
		}
		
	/**[private method: update ]******************************************************************
	 * @remark: Handles the update functions for the timer, if the timer raises events (default) *
	 *          and the internal interval is set.                                                *
	 *****************************************************************************[Serious Hare]**/
		function update(){
			var time = me.time;
			
			dispatchEvent(new TimerEvent("update", {time:time}));
			
			var caphit = testCaps(time);
			testTick(time, caphit);
			testMarkers(time, caphit);
			
			prevTime = time;
		}
		update.parent = me;
		var lastTick = 0
		
		
		
		function testCaps(workTime){
			var caphit = false;
			var ostate = _state;
			
			if(workTime >= _top){
				caphit = true;
				
				dispatchEvent(new TimerEvent("top", {time:_top}));
				
				if(_loop && ostate){
					baseTime = _bottom + (workTime - _top);
					startTime = Date.now();
					
					dispatchEvent(new TimerEvent("bottom", {time:_bottom}));
				}else if(ostate){
					workTime = _top;
					baseTime = _top;
					startTime = Date.now();
					_state = Timer.STOPPED;
					clearTimerInterval();
					
					dispatchEvent(new TimerEvent("stop", {time:_top}));
				}
			}
			
			if(workTime <= _bottom && !caphit){
				caphit = true;
				
				dispatchEvent(new TimerEvent("bottom", {time:_bottom}));
				
				if(_loop && ostate){
					baseTime = _top - (_bottom - workTime);
					startTime = Date.now();
					
					dispatchEvent(new TimerEvent("top", {time:_top}));
				}else if(ostate){
					workTime = _bottom;
					baseTime = _bottom;
					startTime = Date.now();
					_state = Timer.STOPPED;
					clearTimerInterval();
					
					dispatchEvent(new TimerEvent("stop", {time:_bottom}));
				}
			}
			
			return caphit
		}
		testTick.parent = me;
		
		function testTick(workTime){
			var prevTickTime = prevTime % _interval;
			var tickTime = me.time % _interval;
			
			if(_speed > 0 && _state > 0){
				if(tickTime < prevTickTime){
					var returnTime = workTime - (workTime % _interval);
					dispatchEvent(new TimerEvent("tick", {time:returnTime}));
				}
			}else if(_speed < 0 && _state > 0){
				if(tickTime > prevTickTime){
					var returnTime = workTime + (workTime % _interval);
					dispatchEvent(new TimerEvent("tick", {time:returnTime}));
				}
			}
		}
		testTick.parent = me;
		
		function testMarkers(workTime, fireOnce){
			for(var i=0; i<markers.length; i++){
				var marker = markers[i];
				if(_speed > 0 && (_state > 0 || fireOnce) && marker){
					if(((prevTime < marker.time) && (workTime > marker.time)) || (workTime == marker.time)){
						var event = new TimerEvent("marker", marker);
						if(marker.callback){
							marker.callback(event);
						}
						dispatchEvent(event);
					}
				}else if(_speed < 0 && (_state > 0 || fireOnce) && marker){
					if(((prevTime > marker.time) && (workTime < marker.time)) || (workTime == marker.time)){
						var event = new TimerEvent("marker", marker);
						if(marker.callback){
							marker.callback(event);
						}
						dispatchEvent(event);
					}
				}
			}
		}
		testMarkers.parent = me;
		
		
	/**[ Event Methods/Functions ]************************************************[Serious Hare]**/
		
		
		// Container for storage of the event listeners
		var listeners = {
			bottom:    [],
			marker:    [],
			play:      [],
			reset:     [],
			stop:      [],
			tick:      [],
			top:       [],
			update:    []
		}
		
		
	/**[protected public method: addEventListener ]***********************************************
	 * @remark:         Adds the specified EventListener method to the list of event listeners   *
	 *                  for the specified event type on the Timer on which it is called.         *
	 * @param type:     (String) A string representing the event type to listen for.             *
	 * @param listener: (Function) The EventListener to add.                                     *
	 *****************************************************************************[Serious Hare]**/
		function addEventListener(type, listener, options){
			// create an array for the listeners of type, if it's not created jet.
			if(!(type in listeners)){
				listeners[type] = [];
			}
			// add the listener to the list.
			listeners[type].push(listener);
		}
		// Make addEventListener a protected public method
		me.addEventListener = addEventListener;
		
		
	/**[protected public method: removeEventListener ]********************************************
	 * @remark:         Removes an EventListener method from the list of event listeners, that   *
	 *                  matches based on the EventListener, and the event type is was previously *
	 *                  registered for by Timer.addEventListener.                                *
	 * @param type:     (String) A string which specifies the type of event for which to remove  *
	 *                  an event.                                                                *
	 * @param listener: (Function) The EventListener method of the event handler to remove from  *
	 *                  the event target.                                                        *
	 *****************************************************************************[Serious Hare]**/
		function removeEventListener(type, listener, options){
			// check if there is an array with listeners for type, and return nothing if it's not there.
			if(!(type in listeners)){
				return;
			}
			// get a local reference for the listeners array
			var stack = listeners[type];
			// iterate over the array, remove the listener that matches the profided one.
			for(var i=0; i < stack.length; i++){
				if(stack[i] === listener){
					stack.splice(i, 1);
					return;
				}
			}
		}
		// Make removeEventListener a protected public method
		me.removeEventListener = removeEventListener;
		
		
	/**[public method: dispatchEvent ]************************************************************
	 * @remark:      Dispatches a TimerEvent at the Timer on which it is called.                 *
	 * @param event: (TimerEvent) The event to be dispatched.                                    *
	 *****************************************************************************[Serious Hare]**/
		function dispatchEvent(event){
			// check if there is an array with listeners for type, and return true if it's not there.
			if(!(event.type in listeners)){
				return true;
			}
			// get a local reference for the listeners array
			var stack = listeners[event.type];
			// set the target of the event
			event.target = me;
			// check if there is an on[type] listener for the event. If so, call it.
			if(stack.on)stack.on.call(me, event);
			// iterate over the array and call the eventlisteners.
			for(var i=0; i<stack.length; i++){
				stack[i].call(me, event);
			}
			// return wether the events default behavior should be prevented.
			return !event.defaultPrevented;
		}
		// Make addEventListener a protected public method
		me.dispatchEvent = dispatchEvent;
		
		
	/**[public properties: on[eventType] ]********************************************************
	 * @remark: on[eventType] properties for simple event listeners.                             *
	 *****************************************************************************[Serious Hare]**/
		Object.defineProperty(me, 'onbottom',   {get: function(){return listeners.bottom.on;}, set: function(value){listeners.bottom.on = value;}, enumerable:true});
		Object.defineProperty(me, 'onmarker',   {get: function(){return listeners.marker.on;}, set: function(value){listeners.marker.on = value;}, enumerable:true});
		Object.defineProperty(me, 'onplay',     {get: function(){return listeners.play.on;},   set: function(value){listeners.play.on = value;},   enumerable:true});
		Object.defineProperty(me, 'onreset',    {get: function(){return listeners.reset.on;},  set: function(value){listeners.reset.on = value;},  enumerable:true});
		Object.defineProperty(me, 'onstop',     {get: function(){return listeners.stop.on;},   set: function(value){listeners.stop.on = value;},   enumerable:true});
		Object.defineProperty(me, 'ontick',     {get: function(){return listeners.tick.on;},   set: function(value){listeners.tick.on = value;},   enumerable:true});
		Object.defineProperty(me, 'ontop',      {get: function(){return listeners.top.on;},    set: function(value){listeners.top.on = value;},    enumerable:true});
		Object.defineProperty(me, 'onupdate',   {get: function(){return listeners.update.on;}, set: function(value){listeners.update.on = value;}, enumerable:true});
		
		
		// Call the internal constructor
		construct.apply(me, arguments);
	}
	context.Timer = Timer;
			
	Object.defineProperty(Timer, "PRECISION",             {value: 1,                        enumerable:true});
	
	Object.defineProperty(Timer, "STOPPED",               {value: 0,                        enumerable:true});
	Object.defineProperty(Timer, "PLAYING",               {value: 1,                        enumerable:true});
	
	Object.defineProperty(Timer, "DEFAULT_TIME",          {value: 0,                        enumerable:true});
	Object.defineProperty(Timer, "DEFAULT_INTERVAL",      {value: 1000,                     enumerable:true});
	Object.defineProperty(Timer, "DEFAULT_PLAYSTATE",     {value: Timer.STOPPED,            enumerable:true});
	Object.defineProperty(Timer, "DEFAULT_SPEED",         {value: 1,                        enumerable:true});
	Object.defineProperty(Timer, "DEFAULT_BOTTOM",        {value: Number.NEGATIVE_INFINITY, enumerable:true});
	Object.defineProperty(Timer, "DEFAULT_TOP",           {value: Number.POSITIVE_INFINITY, enumerable:true});
	Object.defineProperty(Timer, "DEFAULT_LOOP",          {value: false,                    enumerable:true});
	Object.defineProperty(Timer, "DEFAULT_RAISES_EVENTS", {value: true,                     enumerable:true});
	
/**[public class: TimerEvent ]****************************************************************
 * @remark: The TimerEvent class represents any Event raised by a Timer class intance.       *
 *****************************************************************************[Serious Hare]**/
	function TimerEvent(typeArg, eventInit){
		const me = this;
		if(Event)me.__proto__.__proto__ = new Event(typeArg);
		
		var target = eventInit instanceof Timer? eventInit : TimerEvent.caller? TimerEvent.caller.parent : {time:0};
		//if(!target)throw new TypeError("TimerEvent can only be created by instances of Timer.");
		var trusted = target instanceof Timer;
		
		var time = (typeof arguments[2] === "number")? arguments[2] : (eventInit.time? eventInit.time : target.time);
		var marker = eventInit instanceof TimerMarker? eventInit : undefined;
		
		Object.defineProperty(me, "bubbles",          {value:false,       enumerable:true});
		Object.defineProperty(me, "cancelBubble",     {value:false,       enumerable:true, writable:true});
		Object.defineProperty(me, "cancelable",       {value:false,       enumerable:true});
		Object.defineProperty(me, "composed",         {value:false,       enumerable:true});
		Object.defineProperty(me, "currentTarget",    {value:target,      enumerable:true});
		Object.defineProperty(me, "defaultPrevented", {value:false,       enumerable:true});
		Object.defineProperty(me, "eventPhase",       {value:0,           enumerable:true});
		Object.defineProperty(me, "isTrusted",        {value:trusted,     enumerable:true});
		Object.defineProperty(me, "path",             {value:[],          enumerable:true});
		Object.defineProperty(me, "returnValue",      {value:true,        enumerable:true});
		Object.defineProperty(me, "srcElement",       {value:target,      enumerable:true});
		Object.defineProperty(me, "target",           {value:target,      enumerable:true});
		Object.defineProperty(me, "time",             {value:time,        enumerable:true});
		Object.defineProperty(me, "timeStamp",        {value:Date.now(),  enumerable:true});
		Object.defineProperty(me, "type",             {value:typeArg,     enumerable:true});
		
		if(eventInit instanceof TimerMarker){
			Object.defineProperty(me, "marker", {value:marker, enumerable:true});
		}else{
			var _undefined;
			Object.defineProperty(me, "marker", {value:_undefined, enumerable:true});
		}
	}
	context.TimerEvent = TimerEvent;

/**[public class: TimerMarker ]***************************************************************
 * @remark: The TimerMarker class represents a marker placed on the timer. It can be placed  *
 *          before the timers is playing, or while it's playing. The TimerMarker can be used *
 *          to trigger functionality based on the timer position, or keep track of the time  *
 *          elapsed before it was placed, if placed using timer.addMarker without arguments. *
 *                                                                                           *
 * @param time:     The position of the marker on the timer.                                 *
 * @param callback: Optional callback function, called when this specific marker is hit.     *
 *****************************************************************************[Serious Hare]**/
	function TimerMarker(time, callback){
		const me = this;
		
		var _time = time;
		var _callback = callback;
		
		Object.defineProperty(me, "time",     {get:function(){return _time},     enumerable:true})
		Object.defineProperty(me, "callback", {get:function(){return _callback}, enumerable:true})
	}
	context.TimerMarker = TimerMarker;
	
	(function(){
		
		if( typeof Math.toZero === "undefined"){
			Math.toZero = toZero;
		}else{
			console.error( "Math.toZero is already defined." );
		}
		
		function toZero( number ){
			if( number < 0 ){
				return Math.ceil( number );
			}else{
				return Math.floor( number );
			}
		}
		
	}());
}(this));
