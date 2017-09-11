
/**[public class: TimerEvent ]****************************************************************
 * @remark: The TimerEvent class represents any Event raised by a Timer class intance.       *
 *****************************************************************************[Serious Hare]**/
function TimerEvent(type, target, time){
	const me = this;
	
	var time = (typeof time === "number")? time : target.time;
	
	Object.defineProperty(me, "bubbles",          {value:false,        enumerable:true});
	Object.defineProperty(me, "cancelBubble",     {value:false,        enumerable:true});
	Object.defineProperty(me, "cancelable",       {value:false,        enumerable:true});
	Object.defineProperty(me, "composed",         {value:false,        enumerable:true});
	Object.defineProperty(me, "currentTarget",    {value:false,        enumerable:true});
	Object.defineProperty(me, "defaultPrevented", {value:false,        enumerable:true});
	Object.defineProperty(me, "eventPhase",       {value:0,            enumerable:true});
	Object.defineProperty(me, "isTrusted",        {value:true,         enumerable:true});
	Object.defineProperty(me, "path",             {value:[],           enumerable:true});
	Object.defineProperty(me, "returnValue",      {value:time,         enumerable:true});
	Object.defineProperty(me, "srcElement",       {value:target,       enumerable:true});
	Object.defineProperty(me, "target",           {value:target,       enumerable:true});
	Object.defineProperty(me, "timeStamp",        {value:Date.now(),   enumerable:true});
	Object.defineProperty(me, "type",             {value:type,         enumerable:true});
}
