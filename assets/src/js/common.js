// import $ from 'jquery'; @TODO: uncomment if jQuery or remove if opposite
import '@babel/polyfill';
import detectTouchSupport from './modules/detectTouchSupport';
import { person } from './modules/testModule';
import App from './app/index.jsx';

const someVar = 'var';

document.addEventListener('DOMContentLoaded', () => {
  global.console.log(person.name);
  App();
  console.log(someVar);
  detectTouchSupport();
});
