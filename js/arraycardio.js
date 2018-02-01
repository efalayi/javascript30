import './index.js';
import '../styles/arraycardio.scss';

console.log('ArrayCardio.js');

/* 
  An array of inventors
*/
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const inventorsTableHeader = ["first name", "last name", "year", "passed"];

const inventorsTable = document.querySelector('.inventors table');

const inputText = document.querySelector('input[name="text"]');
const filterButton = document.querySelector('.filter');
const reduceButton = document.querySelector('.reduce');
const sortButton = document.querySelector('.sort');


function getInputText() {
  const regex = RegExp(/^[0-9]+$/);
  return regex.test(inputText.value) ? parseInt(inputText.value) : inputText.value;
}

/* 
  cellData: Data to be displayed
  position: table head or table body
*/
function createTableCell(cellData, position)  {
  switch (position) {
    case "thead":
      return `<th>${cellData}</th>`;
      break;
    default:
      return `<td>${cellData}</td>`;
      break;
  }
}

function createTableHeader(cellData) {
  return `
    <thead>
      ${Object.values(cellData)
        .map(value => createTableCell(value, "thead")).join("")}
    </thead>
  `;
}

function createTableRow(rowData) {
  return `
    <tr>
      ${Object.values(rowData)
        .map(value => createTableCell(value, "tbody")).join("")}
    </tr>
  `;
}

function notFoundTableRow() {
  return `
    <tr class="one-row">
      <td colspan="4">Not found</td>
    </tr>
  `
}

function createTable(tableData, tableHeader) {
  const tbody = tableData.length ? tableData.map(createTableRow).join("") : notFoundTableRow()
 return `
    ${createTableHeader(tableHeader)}
    <tbody>
      ${tbody}
    </tbody>
  `;
}

// Check if object key value matches regex
function objectValueExists(objectElement, regex) {
  return Object.keys(objectElement).some(objectKey => {
    return objectElement[objectKey].toString().match(regex);
  });
}

// Filter inventors
function filterInventors(event) {
  const inputValue = getInputText();
  const filterInventors = inventors.filter((inventor) => {
    const regex = new RegExp(inputValue, 'gi');
    return objectValueExists(inventor, regex);
  });
  
  inventorsTable.innerHTML = createTable(filterInventors, inventorsTableHeader);
  return;
}

function sortArray(arrayElement, objectKey) {
  if (objectKey) {
    return arrayElement.sort((prev, next) => {
      let prevValue = prev[objectKey];
      let nextValue = next[objectKey];

      const prevValueType = typeof prev[objectKey];
      if (typeof prev[objectKey] !== "number") {
        prevValue = prevValue.toUpperCase();
        nextValue = nextValue.toUpperCase();
      }

      if (prevValue < nextValue) return -1
      if (prevValue > nextValue) return 1
      return 0;
    });
  } 
}

function sortInventors(event) {
  const inputValue = getInputText();
  let sortResult;
  console.log(typeof inputValue);
  switch (inputValue.toLowerCase()) {
    case "first name":
    case "firstname":
    case "first":
      sortResult = sortArray(inventors, "first");
      break;
    case "last name":
    case "lastname":
    case "last":
      sortResult = sortArray(inventors, "last");
      break;
    case "year":
      sortResult = sortArray(inventors, "year");
      break;
    case "passed":
      sortResult = sortArray(inventors, "passed");
      break;
    default:
      sortResult = [];
      break;
  }
  inventorsTable.innerHTML = createTable(sortResult, inventorsTableHeader);
  return;
}

inventorsTable.innerHTML = createTable(inventors, inventorsTableHeader);

filterButton.addEventListener('click', filterInventors);
inputText.addEventListener('keyup', filterInventors);
sortButton.addEventListener('click', sortInventors);
