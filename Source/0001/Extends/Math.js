
(function(){
	
	if( typeof Math.toZero === "undefined"){
		Math.toZero = toZero;
	}else{
		console.error( "Monkey Patch Failed: Math.toZero is already defined." );
	}
	
	function toZero( number ){
		if( number < 0 ){
			return Math.ceil( number );
		}else{
			return Math.floor( number );
		}
	}
	
}());
