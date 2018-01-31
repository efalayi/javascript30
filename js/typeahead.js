import './index.js';
import '../styles/typeahead.scss';

console.log("TypeAhead.js");

const cities = [];
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Fetch data from endpoint
fetch(endpoint)
  .then(response => response.json())
  .then(data => cities.push(...data));

// Add comma to number format
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Filter cities array with wordToMatch
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

// Append filtered cities to ul element
function displayMatches() {
  const matches = findMatches(this.value, cities);
  let suggestionList;
  if (!matches.length) {
    suggestionList = `
    <li>
      <span class="name">No match found</span>
    </li>
    `;
  } else {
    suggestionList = matches.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city
        .replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state
        .replace(regex, `<span class="hl">${this.value}</span>`);
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    }).join("");
  }
  suggestions.innerHTML = suggestionList;
}

// Event listeners
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
