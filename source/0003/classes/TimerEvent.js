
/**[public class: TimerEvent ]****************************************************************
 * @remark: The TimerEvent class represents any Event raised by a Timer class intance.       *
 *****************************************************************************[Serious Hare]**/
	function TimerEvent(typeArg, eventInit){
		const me = this;
		if(Event)me.__proto__.__proto__ = new Event(typeArg);
		
		var target = eventInit instanceof Timer? eventInit : TimerEvent.caller? TimerEvent.caller.parent : {time:0};
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
