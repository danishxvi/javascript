// ============================================================================
// JavaScript Type Conversion, Implicit Coercion & Operations
// ============================================================================

/*
  ----------------------------------------------------------------------------
  CONCEPT 1: Explicit Type Conversion (Casting)
  ----------------------------------------------------------------------------
  Converting a value from one data type to another using built-in constructors
  like `Number()`, `Boolean()`, and `String()`.
*/

// --- A. Conversion to Number ---
let score = "Danny";

// Type checking syntax (both functional and operator forms work identically):
// console.log(typeof score);   // "string"
// console.log(typeof(score)); // "string"

let valueInNumber = Number(score);
console.log(typeof valueInNumber); // Output: "number"
console.log(valueInNumber);       // Output: NaN (Not-a-Number)

/*
  SUMMARY OF Number() CONVERSION RESULTS:
  ---------------------------------------
  "33"       => 33
  "33abc"    => NaN (Type is still 'number', but value is invalid math result)
  null       => 0
  undefined  => NaN
  true       => 1
  false      => 0
  "Danny"    => NaN
*/


// --- B. Conversion to Boolean ---
let isLoggedIn = "Danny";
let booleanIsLoggedIn = Boolean(isLoggedIn);
console.log(booleanIsLoggedIn); // Output: true

/*
  SUMMARY OF Boolean() CONVERSION RESULTS (Falsy vs Truthy):
  ----------------------------------------------------------
  Falsy Values (Convert to false):
    0, -0, 0n, "", null, undefined, NaN

  Truthy Values (Convert to true):
    1 (or any non-zero number), "Danny", " ", [], {}, function(){}
*/


// --- C. Conversion to String ---
let someNumber = 33;
let stringNumber = String(someNumber);

console.log(stringNumber);        // Output: "33"
console.log(typeof stringNumber); // Output: "string"


/*
  ----------------------------------------------------------------------------
  CONCEPT 2: Arithmetic Operations & String Concatenation
  ----------------------------------------------------------------------------
*/

let value = 3;
let negValue = -value;
console.log(negValue); // Output: -3

// Basic Arithmetic Operators:
// console.log(2 + 2);  // Addition: 4
// console.log(2 - 2);  // Subtraction: 0
// console.log(2 * 2);  // Multiplication: 4
// console.log(2 ** 3); // Exponentiation (Power): 8
// console.log(2 / 3);  // Division: 0.6666666666666666
// console.log(2 % 3);  // Modulus (Remainder): 2

// String Concatenation:
let str1 = "hello";
let str2 = " Danny";
let str3 = str1 + str2;
console.log(str3); // Output: "hello Danny"


/*
  ----------------------------------------------------------------------------
  CONCEPT 3: Implicit Type Coercion & Evaluation Order (TC39 Rules)
  ----------------------------------------------------------------------------
  JavaScript converts types implicitly behind the scenes based on abstract
  operations defined in the ECMAScript spec (e.g., ToPrimitive, ToNumber).
  
  RULE: Left-to-right evaluation matters!
  - If a String comes first, subsequent `+` operations perform string concatenation.
  - If Numbers come first, math is evaluated FIRST until a String is encountered.
*/

console.log("1" + 2);     // Output: "12"   (String + Number -> String)
console.log(1 + "2");     // Output: "12"   (Number + String -> String)
console.log("1" + 2 + 2); // Output: "112"  ("1" + 2 = "12", then "12" + 2 = "122")
console.log(1 + 2 + "2"); // Output: "32"   (1 + 2 = 3, then 3 + "2" = "32")

// Operator Precedence (Use parentheses for clarity in production code):
console.log(((3 + 4) * 5) % 3); // Output: 2


/*
  ----------------------------------------------------------------------------
  CONCEPT 4: Unary Operators & Assignment Chaining
  ----------------------------------------------------------------------------
*/

// Unary `+` attempts to convert its operand into a Number:
console.log(+true); // Output: 1  (Implicit coercion to Number)
console.log(+"");   // Output: 0  (Empty string coerces to 0)

// Multiple Assignments (Chaining):
// Evaluated from right to left, but avoid doing this in real projects for readability.
let num1, num2, num3;
num1 = num2 = num3 = 2 + 2;


/*
  ----------------------------------------------------------------------------
  CONCEPT 5: Prefix vs. Postfix Increment Operators
  ----------------------------------------------------------------------------
  - Postfix (x++): Returns the value FIRST, then increments.
  - Prefix (++x): Increments FIRST, then returns the value.
*/

let gameCounter = 100;
++gameCounter; 
console.log(gameCounter); // Output: 101

// Demonstrating Postfix vs Prefix difference for Revision:
let x = 5;
let y = x++; // y gets 5, then x becomes 6
console.log({ x, y }); // Output: { x: 6, y: 5 }

let a = 5;
let b = ++a; // a becomes 6, then b gets 6
console.log({ a, b }); // Output: { a: 6, b: 6 }

/*
  Official Specification Link for Deep-Dive Revision:
  https://tc39.es/ecma262/multipage/abstract-operations.html#sec-type-conversion
*/