import './index.js';
import '../styles/drumkit.scss';

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
        key = event.target.parentElement
      }
      audio = document
        .querySelector(`audio[data-key="${key.getAttribute('data-key')}"]`);
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
keys.forEach((key) => {
  key.addEventListener('transitionend', removeTransition);
  key.addEventListener('click', playSound);
  
});
window.addEventListener('keydown', playSound);
