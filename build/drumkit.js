webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_drumkit_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_drumkit_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_drumkit_scss__);



console.log("Drumkit.js");

/* 
  Remove playing class from div if transition propertyName === transform
*/
function removeTransition(event) {
  if (event.propertyName !== "transform") return;
  event.target.classList.remove('playing');
}

/* 
  Add playing class to div is key pressed has an audio file whose data-key is equal to the keyCode
*/
function playSound(event) {
  let audio, key;
  const { target, type, keyCode } = event;
  switch (type) {
    case 'click':
      if (event.target.classList.length === 3) {
        key = event.target;
      } else {
        key = event.target.parentElement;
      }
      audio = document.querySelector(`audio[data-key="${key.getAttribute('data-key')}"]`);
      break;
    default:
      audio = document.querySelector(`audio[data-key="${keyCode}"]`);
      key = document.querySelector(`div[data-key="${keyCode}"]`);
      break;
  }
  if (!audio) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
  key.addEventListener('click', playSound);
});
window.addEventListener('keydown', playSound);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[2]);