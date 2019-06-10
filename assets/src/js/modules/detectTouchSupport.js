import detectTouchEvents from 'detect-touch-events';

export default () => {
  if (detectTouchEvents.hasSupport) {
    document.body.classList.remove('with-hovers');
  }
};
