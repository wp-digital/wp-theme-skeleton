// import $ from 'jquery'; @TODO: uncomment if jQuery or remove if opposite
import detectTouchSupport from "./modules/detectTouchSupport";

document.addEventListener('DOMContentLoaded', () => {
    detectTouchSupport();
});

// @TODO: uncomment if jQuery or remove if opposite
// if (Array.isArray(window.bindReadyQ)) {
//     $.each(window.bindReadyQ, (index, handler) => {
//         $(handler);
//     });
// }
//
// if (Array.isArray(window.bindLoadQ)) {
//     $.each(window.bindLoadQ, (index, handler) => {
//         $(window).on('load', handler);
//     });
// }