// ============================================================================
// JavaScript Numbers, Precision Formatting, & The Built-in Math Object
// ============================================================================

/*
  ----------------------------------------------------------------------------
  CONCEPT 1: Primitive Numbers vs. Number Object Wrappers
  ----------------------------------------------------------------------------
  - Primitive Number: Stored in Stack memory. Simple and memory-efficient.
  - Number Object (`new Number()`): Explicitly creates a Number object instance in Heap memory.
*/

const userScore = 400; // Primitive number
// console.log(userScore); // Output: 400

const accountBalance = new Number(100); // Number Object instance
// console.log(accountBalance); // Output: [Number: 100]


/*
  ----------------------------------------------------------------------------
  CONCEPT 2: Number Inspection & Formatting Methods
  ----------------------------------------------------------------------------
*/

// 1. Converting Number to String & Checking Length:
// Allows chaining string methods directly onto numbers after explicit conversion.
console.log(accountBalance.toString().length); // Output: 3

// 2. `.toFixed(digits)`: Formats a number with a specific number of decimal places.
// 💡 Crucial for financial/currency calculations to avoid floating-point display bugs.
console.log(accountBalance.toFixed(2)); // Output: "100.00"

// 3. `.toPrecision(precisionDigits)`: Returns a string representing the number 
// formatted to specified SIGNIFICANT DIGITS (rounds appropriately).
const measureReading = 123.8966;
console.log(measureReading.toPrecision(4)); // Output: "123.9" (Rounds 4th digit)

const largeMeasurement = 1123.8966;
console.log(largeMeasurement.toPrecision(3)); // Output: "1.12e+3" (Uses exponential notation when precision < integer length)

// 4. `.toLocaleString(locale)`: Formats numbers according to specific region formatting (e.g., adding commas).
const standardTransactionAmount = 1000000;
console.log(standardTransactionAmount.toLocaleString('en-IN')); // Output: "10,00,00,0" -> "10,00,000" (Indian Standard: Lakhs/Crores)
console.log(standardTransactionAmount.toLocaleString('en-US')); // Output: "1,000,000" (US Standard: Millions)


/*
  ----------------------------------------------------------------------------
  CONCEPT 3: The Built-in `Math` Object
  ----------------------------------------------------------------------------
  `Math` is a built-in static object containing mathematical constants and functions.
*/

// Basic Math Operations:
console.log(Math.abs(-4));      // Output: 4    (Absolute value: turns negative to positive)
console.log(Math.round(4.6));   // Output: 5    (Standard rounding)
console.log(Math.ceil(4.2));    // Output: 5    (Ceiling: Always rounds UP to nearest integer)
console.log(Math.floor(4.9));   // Output: 4    (Floor: Always rounds DOWN to nearest integer)
console.log(Math.min(4, 3, 6)); // Output: 3    (Returns lowest value in set)
console.log(Math.max(4, 3, 6)); // Output: 6    (Returns highest value in set)


/*
  ----------------------------------------------------------------------------
  CONCEPT 4: Random Number Generation (`Math.random()`)
  ----------------------------------------------------------------------------
  `Math.random()` returns a pseudo-random floating-point number in the range:
  0 (inclusive) up to 1 (exclusive) -> [0, 1)
*/

console.log(Math.random()); // Example Output: 0.7384912...

// Scaling to range [0, 10) and adding 1 to shift range to [1, 10]:
console.log((Math.random() * 10) + 1); // Range: 1.0 to 10.999...

// Flooring the value to get a clean whole number integer between 1 and 10:
console.log(Math.floor(Math.random() * 10) + 1); // Integer between 1 and 10


/*
  ----------------------------------------------------------------------------
  CONCEPT 5: Master Formula for Random Range Between Min & Max (INTERVIEW MUST-KNOW!)
  ----------------------------------------------------------------------------
  Formula: `Math.floor(Math.random() * (max - min + 1)) + min`
  - `(max - min + 1)`: Determines the number of possible outcomes in the range.
  - `+ min`: Shifts the minimum starting value from 0 to `min`.
*/

const minRollValue = 10;
const maxRollValue = 20;

const randomRangedValue = Math.floor(Math.random() * (maxRollValue - minRollValue + 1)) + minRollValue;
console.log(randomRangedValue); // Output: Random integer strictly between 10 and 20 (inclusive)


/*
  ----------------------------------------------------------------------------
  BONUS CONCEPT FOR REVISION: The Floating-Point Math Problem
  ----------------------------------------------------------------------------
  JavaScript uses IEEE 754 double-precision floats for all numbers.
  Because computers store fractions in binary (base-2), some decimal fractions cannot 
  be represented exactly, leading to floating-point precision quirks:
  
  Example: console.log(0.1 + 0.2); // Output: 0.30000000000000004
  Solution: Use Number.EPSILON or `.toFixed()` when comparing floating numbers.
*/