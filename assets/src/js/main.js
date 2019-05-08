import domReady from '@wordpress/dom-ready';
import detectTouchSupport from './modules/detectTouchSupport';

// import icon from './modules/Heckert_GNU_white.svg';

domReady(() => {
  window.console.log(1);
  // window.console.log(icon);
  detectTouchSupport();
});
