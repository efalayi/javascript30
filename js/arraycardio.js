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

/* 
  An array of people
*/
const people = [
  'Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'
];

const inventorsTableHeader = ["first name", "last name", "year", "passed"];

const inventorsTable = document.querySelector('.inventors table');
const peopleTable = document.querySelector('.people table');

const inputText = document.querySelector('input[name="text"]');
const filterButton = document.querySelector('.filter');
const reduceButton = document.querySelector('.reduce');

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

function createTable(tableData, tableHeader) {
 return `
    ${createTableHeader(tableHeader)}
    <tbody>
      ${tableData.map(createTableRow).join("")}
    </tbody>
  `;
}

function filterInventors(event) {
  const { value } = inputText;
  const filterInventors = inventors.filter((inventor) => {
    const regex = new RegExp(value, 'gi');
    return inventor.first.match(regex);
  });
  inventorsTable.innerHTML = createTable(filterInventors, inventorsTableHeader);
  return;
}

function reduceInventors(event) {
  const result = people.reduce((accumulators, currentValue) => {
    console.log("acc:", accumulators);
    console.log("cv: ",currentValue);
  });
  return result;
}

inventorsTable.innerHTML = createTable(inventors, inventorsTableHeader);
filterButton.addEventListener('click', filterInventors);
reduceButton.addEventListener('click', reduceInventors);