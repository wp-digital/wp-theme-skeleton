let $ = window.jQuery;
export default () => {
    let msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture;
	let touchSupport = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch);
	if(touchSupport) {
	    $("body").removeClass('with-hovers');
	}
};