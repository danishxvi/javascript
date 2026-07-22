// ============================================================================
// JavaScript Strings: Template Literals, String Wrappers & Core Methods
// ============================================================================

/*
  ----------------------------------------------------------------------------
  CONCEPT 1: String Creation & Interpolation (Template Literals)
  ----------------------------------------------------------------------------
  - Legacy approach: Concatenation using `+` operator (harder to read, error-prone).
  - Modern ES6 approach: Template Literals using backticks (``) and `${}` interpolation.
*/

const developerName = "Danny";
const publicRepoCount = 50;

// BAD PRACTICE (Legacy concatenation):
// console.log(developerName + publicRepoCount + " Repositories");

// GOOD PRACTICE (Modern string interpolation):
console.log(`Hello, my name is ${developerName} and my repo count is ${publicRepoCount}.`);
// Output: Hello, my name is Danny and my repo count is 50.


/*
  ----------------------------------------------------------------------------
  CONCEPT 2: String Primitive vs. String Object Constructor
  ----------------------------------------------------------------------------
  - Primitive String: Stored in Stack memory. Immutable and lightweight.
  - String Object (`new String()`): Instantiates a String wrapper object in Heap memory.
    It exposes internal properties like standard object key-value pairs (index-based).
*/

// String Object creation:
const profileUsername = new String('danny-dev-com');

// Index-based access and Prototype inspection:
console.log(profileUsername[0]);        // Output: "d" (Character at index 0)
console.log(profileUsername.__proto__); // Output: {} (Exposes all inherited String methods)


/*
  ----------------------------------------------------------------------------
  CONCEPT 3: Common String Inspection & Case Conversion Methods
  ----------------------------------------------------------------------------
  NOTE: Strings in JavaScript are IMMUTABLE. Calling methods on a string returns
  a NEW string; it never mutates the original string value.
*/

console.log(profileUsername.length);        // Output: 13 (Property, not a method)
console.log(profileUsername.toUpperCase()); // Output: "DANNY-DEV-COM" (New string)
console.log(profileUsername.charAt(2));     // Output: "n" (Character at index 2)
console.log(profileUsername.indexOf('n'));   // Output: 2   (First occurrence index of character)


/*
  ----------------------------------------------------------------------------
  CONCEPT 4: Extracting Substrings (`substring` vs. `slice`)
  ----------------------------------------------------------------------------
  - `substring(start, end)`: Extracts characters from `start` up to (but not including) `end`.
    Negative indices are treated as `0`.
  - `slice(start, end)`: Similar to `substring`, but SUPPORTS NEGATIVE INDICES
    (counts backward from the end of the string).
*/

// substring(0, 4) -> Indices 0, 1, 2, 3
const usernamePrefix = profileUsername.substring(0, 5);
console.log(usernamePrefix); // Output: "danny"

// slice(-7, 10) -> Negative index counts backward from the end of length 13
const extractedSegment = profileUsername.slice(-7, 10);
console.log(extractedSegment); // Output: "dev"


/*
  ----------------------------------------------------------------------------
  CONCEPT 5: Trimming, Replacing & Searching Strings
  ----------------------------------------------------------------------------
*/

// Trimming Whitespace:
const paddedUserInput = "   Danny    ";
console.log(paddedUserInput);        // Output: "   Danny    "
console.log(paddedUserInput.trim()); // Output: "Danny" (Removes leading & trailing whitespace)

// String Replacement & Querying:
const targetWebsiteUrl = "https://danny.com/danny%20developer";

// Replaces '%20' (URL encoded space) with hyphen '-':
const sanitizedUrl = targetWebsiteUrl.replace('%20', '-');
console.log(sanitizedUrl); // Output: "https://danny.com/danny-developer"

// Search check (Returns boolean):
console.log(targetWebsiteUrl.includes('sundar')); // Output: false
console.log(targetWebsiteUrl.includes('danny'));  // Output: true


/*
  ----------------------------------------------------------------------------
  CONCEPT 6: Splitting Strings into Arrays
  ----------------------------------------------------------------------------
  `split(separator)` splits a string into an array of substrings based on a delimiter.
*/

const domainSegments = profileUsername.split('-');
console.log(domainSegments); // Output: [ 'danny', 'dev', 'com' ]


/*
  ----------------------------------------------------------------------------
  BONUS CONCEPT FOR REVISION: Primitive Autoboxing
  ----------------------------------------------------------------------------
  How can primitive strings call methods like `.toUpperCase()` if they aren't objects?
  
  ANSWER: JavaScript performs "Autoboxing". When you invoke a method on a primitive string,
  JS temporarily wraps it in a temporary `String` object, executes the method, 
  and immediately discards the temporary object.
*/