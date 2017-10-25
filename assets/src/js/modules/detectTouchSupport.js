import $ from 'jquery';
import detectTouchEvents from 'detect-touch-events';

export default () => {
	if (detectTouchEvents.hasSupport) {
	    $("body").removeClass('with-hovers');
	}
};
