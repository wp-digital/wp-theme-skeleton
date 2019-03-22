import domReady from '@wordpress/dom-ready';
import detectTouchSupport from './modules/detectTouchSupport';

import icon from './modules/Heckert_GNU_white.svg';

domReady(() => {
  window.console.log(icon);
  detectTouchSupport();
  const extensions = [
    '.js',
    '.mjs',
    '.jsx',
    '.json',
    '.css',
    '.sass',
    '.scss',
    '.jpeg',
    '.jpg',
    '.png',
    '.gif',
    '.svg',
  ];
  window.console.log(extensions);
});
