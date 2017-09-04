/* The context in which all this happens */
var context

if(typeof module == 'object' && module.exports) {
    /* We are running in Node.js */
	context = global
	module.exports = Timer
} else if (window != undefined) {
    /* If not Node, we are in browser if window exists. */
	context = window
} else {
    /* Spooky unknown environment, the context is current context */
	context = this
}



