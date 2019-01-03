import $ from 'jquery'; // @TODO: uncomment if jQuery or remove if opposite
import domReady from '@wordpress/dom-ready';
import detectTouchSupport from './modules/detectTouchSupport';

domReady(() => {
  detectTouchSupport();
  $('.test');
});
