import './index.js';
import '../styles/cssvariables.scss';

console.log('CSSVariables.js');

const controlInputs = document.querySelectorAll('.controls input');

function updateProperty() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

controlInputs
.forEach(input => input.addEventListener('change', updateProperty));
