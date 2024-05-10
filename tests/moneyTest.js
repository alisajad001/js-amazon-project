import { twoDecimalPlaces } from '../scripts/utils/money.js';

console.log('Test suit format cents to dollars');

console.log('Converts cents into dollars and cents');
if (twoDecimalPlaces(2095) === '20.95') {
  console.log('Passed');
} else {
  console.log('Failed');
}

console.log('Works with zero');
if (twoDecimalPlaces(0) === '0.00') {
  console.log('Passed');
} else {
  console.log('Failed');
}

console.log('Rounds up to the nearest cent');
if (twoDecimalPlaces(2000.5) === '20.01') {
  console.log('Passed');
} else {
  console.log('Failed');
}
