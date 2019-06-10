import './config/publicPath'; // Should be at the very beginning of entry

import domReady from '@wordpress/dom-ready';
import detectTouchSupport from './modules/detectTouchSupport';

domReady(() => {
  detectTouchSupport();
});
