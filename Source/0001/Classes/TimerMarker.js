
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
