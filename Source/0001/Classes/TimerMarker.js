
/**[public class: TimerMarker ]***************************************************************
 * @remark: The TimerMarker class represents a marker placed on the timer. These markers two *
 *          primary goals. The first is to control functions based on the passed time. 
 *          
 *****************************************************************************[Serious Hare]**/
	function TimerMarker(){
		const me = this;
		
		var _time;
		var _callback;
		
		function construct(time, callback){
			_time = time;
			_callback = callback;
		}
		
		Object.defineProperty(me, "time",     {get:function(){return _time},     enumerable:true})
		Object.defineProperty(me, "callback", {get:function(){return _callback}, enumerable:true})
		
		construct.apply(me, arguments);
	}
	Object.defineProperty(window, "TimerMarker", {value:TimerMarker, enumerable:true});
	
