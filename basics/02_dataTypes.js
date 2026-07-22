// ============================================================================
// JavaScript Basics: Strict Mode, Environment Contexts, & Type System
// ============================================================================

/*
  ----------------------------------------------------------------------------
  CONCEPT 1: Strict Mode ("use strict")
  ----------------------------------------------------------------------------
  - Introduced in ECMAScript 5 (ES5).
  - Enforces stricter parsing and error handling in your code.
  - Prevents accidental global variables, catches silent errors, and disables
    problematic language features.
*/

"use strict"; // Must be placed at the very top of the script or function

// Example of what strict mode prevents:
// x = 10; // ❌ Uncaught ReferenceError: x is not defined (Without "use strict", this would create a global variable)


/*
  ----------------------------------------------------------------------------
  CONCEPT 2: Runtime Environments (Node.js vs. Browser)
  ----------------------------------------------------------------------------
  - Browser JS: Includes Web APIs like `window`, `document`, `fetch`, `alert()`.
  - Node.js JS: Includes server APIs like `global`, `process`, `fs`, `path`.
*/

// alert("Hello!"); 
// ❌ ReferenceError in Node.js (Web API). Works only in browsers.


/*
  ----------------------------------------------------------------------------
  CONCEPT 3: Code Readability & Semicolon Insertion (ASI)
  ----------------------------------------------------------------------------
  - JavaScript has Automatic Semicolon Insertion (ASI), but relying on it 
    or splitting expressions across lines aggressively can lead to bugs.
*/

// BAD PRACTICE: Hard to read
console.log(3 
    + 
    3); 

// GOOD PRACTICE: Clean and legible
console.log(3 + 3);


/*
  ----------------------------------------------------------------------------
  CONCEPT 4: Complete Overview of JavaScript Datatypes
  ----------------------------------------------------------------------------
  JS is dynamically typed (variables can change types at runtime).
  Data types are divided into two main categories:
  
  1. Primitive Types (Passed by VALUE, stored in Stack Memory)
  2. Reference / Non-Primitive Types (Passed by REFERENCE, stored in Heap Memory)
*/

// --- A. PRIMITIVE TYPES ---

let str = "Danny";           // 1. String
let age = 23;                // 2. Number (Integers & Floats)
let isLoggedIn = false;      // 3. Boolean (true/false)
let state;                   // 4. Undefined (Declared, but value not assigned)
let emptyValue = null;       // 5. Null (Intentional absence of any object value)

// 6. BigInt: Handles integers larger than (2^53 - 1)
let hugeNumber = 9007199254740991n; // Appending 'n' makes it a BigInt

// 7. Symbol: Guarantees unique values, useful for object property keys
let id1 = Symbol("123");
let id2 = Symbol("123");
console.log(id1 === id2);    // Output: false (Every Symbol is strictly unique)


// --- B. REFERENCE TYPES (Non-Primitives) ---

// Objects, Arrays, Functions
let user = { name: "Danny", age: 23 };               // Object
let numbers = [1, 2, 3, 4, 5];                         // Array
let greet = function() { return "Hello World"; };      // Function


/*
  ----------------------------------------------------------------------------
  CONCEPT 5: The `typeof` Operator & Its Historical Quirks
  ----------------------------------------------------------------------------
  Used to evaluate the data type of a variable or value.
*/

console.log(typeof "Danny");      // "string"
console.log(typeof age);          // "number"
console.log(typeof isLoggedIn);   // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof hugeNumber);   // "bigint"
console.log(typeof id1);          // "symbol"
console.log(typeof user);         // "object"
console.log(typeof greet);        // "function" (Technically an object, but `typeof` handles functions specially)

// ⚠️ FAMOUS INTERVIEW TRAP: `typeof null`
console.log(typeof null);         
// Output: "object" 
// REASON: This is a legacy bug from the initial version of JavaScript (1995) 
// where values were represented as type tags and `null` shared the object tag (000).
// It was never fixed to prevent breaking existing code on the web.


/*
  ----------------------------------------------------------------------------
  BONUS CONCEPT FOR FUTURE REVISION: Primitive vs. Reference Memory Behavior
  ----------------------------------------------------------------------------
*/

// Primitives: Copies the actual VALUE (Stack)
let originalScore = 100;
let copiedScore = originalScore;
copiedScore = 200;

console.log(originalScore); // 100 (Unchanged!)
console.log(copiedScore);   // 200

// Reference Types: Copies the MEMORY ADDRESS / POINTER (Heap)
let userOne = { email: "user@google.com" };
let userTwo = userOne; // Points to the exact same memory address in the Heap

userTwo.email = "danish16112002@google.com";

console.log(userOne.email); // "danish16112002@google.com" (Both variables point to same object!)
console.log(userTwo.email); // "danish16112002@google.com"