import './index.js';
import '../styles/clock.scss';

console.log("Clock.js");

const secondHand = document.querySelector('.second');
const minuteHand = document.querySelector('.minute');
const hourHand = document.querySelector('.hour');

/* 
  Set date (hour, minute, and second) and rotate html element
*/
function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondsDegree = ((seconds / 60) * 360) + 90;
  const minutesDegree = ((minutes / 60) * 360) + 90;
  const hoursDegree = ((hours / 12) * 360) + 90;

  secondHand.style.transform = `rotate(${secondsDegree}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegree}deg)`;
  hourHand.style.transform = `rotate(${hoursDegree}deg)`;
}

setInterval(setDate, 1000);
