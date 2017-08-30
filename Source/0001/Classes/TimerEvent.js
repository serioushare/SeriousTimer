
/**[public class: TimerEvent ]****************************************************************
 * @remark: The TimerEvent class represents any Event raised by a Timer class intance.       *
 *****************************************************************************[Serious Hare]**/
	function TimerEvent(type, target, time){
		this.__proto__ = new Event(type);
		
		var time = (typeof time === "number")? time : target.time;
		
		Object.defineProperty(this, "bubbles",          {value:false,        enumerable:true});
		Object.defineProperty(this, "cancelBubble",     {value:false,        enumerable:true});
		Object.defineProperty(this, "cancelable",       {value:false,        enumerable:true});
		Object.defineProperty(this, "composed",         {value:false,        enumerable:true});
		Object.defineProperty(this, "currentTarget",    {value:false,        enumerable:true});
		Object.defineProperty(this, "defaultPrevented", {value:false,        enumerable:true});
		Object.defineProperty(this, "eventPhase",       {value:0,            enumerable:true});
		Object.defineProperty(this, "isTrusted",        {value:true,         enumerable:true});
		Object.defineProperty(this, "path",             {value:[],           enumerable:true});
		Object.defineProperty(this, "returnValue",      {value:time,         enumerable:true});
		Object.defineProperty(this, "srcElement",       {value:target,       enumerable:true});
		Object.defineProperty(this, "target",           {value:target,       enumerable:true});
		Object.defineProperty(this, "timeStamp",        {value:Date.now(),   enumerable:true});
		Object.defineProperty(this, "type",             {value:type,         enumerable:true});
		
	}
	
	Object.defineProperty(window, "TimerEvent", {value:TimerEvent, enumerable:true});
