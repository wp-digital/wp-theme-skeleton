let $ = window.jQuery;
import detectTouchEvents from 'detect-touch-events';

export default () => {
	if(detectTouchEvents.hasSupport === true) {
	    $("body").removeClass('with-hovers');
	}
};