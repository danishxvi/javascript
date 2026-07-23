// ============================================================================
// JavaScript Arrays: Methods, Mutability, Flattening & Utility Functions
// ============================================================================

/*
  ----------------------------------------------------------------------------
  CONCEPT 1: Array Declarations & Memory Characteristics
  ----------------------------------------------------------------------------
  - Arrays in JS are zero-indexed and re-sizable.
  - They can store mixed data types (primitives and non-primitives).
  - JS array-copy operations create SHALLOW COPIES (sharing same references in Heap).
*/

const sampleNumbers = [0, 1, 2, 3, 4, 5];
const IndianSuperheroes = ["Shaktiman", "Naagraj"];

// Object instantiation form:
const initializedScores = new Array(1, 2, 3, 4);
// console.log(sampleNumbers[1]); // Output: 1


/*
  ----------------------------------------------------------------------------
  CONCEPT 2: Core Array Mutation Methods (`push`, `pop`, `unshift`, `shift`)
  ----------------------------------------------------------------------------
*/

// Add/Remove from END (Fast operation: O(1) time complexity):
// sampleNumbers.push(6); // Adds 6 to end
// sampleNumbers.push(7); // Adds 7 to end
// sampleNumbers.pop();    // Removes last element (7)

// Add/Remove from START (Slow operation: O(n) time complexity as all indices shift!):
// sampleNumbers.unshift(9); // Prepends 9 to start
// sampleNumbers.shift();    // Removes first element (9)

// Search & Conversion methods:
// console.log(sampleNumbers.includes(9)); // Output: false
// console.log(sampleNumbers.indexOf(3));  // Output: 3

// `.join()` converts array elements into a comma-separated string:
// const joinedStringResult = sampleNumbers.join();
// console.log(sampleNumbers);       // Output: [0, 1, 2, 3, 4, 5] (Array)
// console.log(joinedStringResult);  // Output: "0,1,2,3,4,5" (String)


/*
  ----------------------------------------------------------------------------
  CONCEPT 3: `slice()` vs `splice()` (CRUCIAL INTERVIEW QUESTION!)
  ----------------------------------------------------------------------------
  - `slice(start, end)`: Returns a shallow copy of a portion of an array.
    * Does NOT mutate the original array.
    * EXCLUDES the `end` index element.
    
  - `splice(start, deleteCount)`: Modifies the contents of an array by removing or replacing elements.
    * MUTATES (changes) the original array directly!
    * INCLUDES elements up to the specified count/range.
*/

console.log("Original Array A: ", sampleNumbers);

// Demonstrating slice():
const slicedSubset = sampleNumbers.slice(1, 3); // Extracts indices 1 and 2
console.log("Extracted with slice(): ", slicedSubset);  // Output: [1, 2]
console.log("Array B after slice(): ", sampleNumbers); // Output: [0, 1, 2, 3, 4, 5] (Unchanged!)

// Demonstrating splice():
const splicedElements = sampleNumbers.splice(1, 3); // Removes 3 elements starting at index 1
console.log("Extracted with splice(): ", splicedElements); // Output: [1, 2, 3]
console.log("Array C after splice(): ", sampleNumbers);   // Output: [0, 4, 5] (MUTATED!)


/*
  ----------------------------------------------------------------------------
  CONCEPT 4: Merging Arrays (`push` vs `concat` vs Spread Operator)
  ----------------------------------------------------------------------------
*/

const marvelHeroes = ["thor", "Ironman", "spiderman"];
const dcHeroes = ["superman", "flash", "batman"];

// ❌ TRAP 1: `push()` adds the entire nested array as a SINGLE element:
// marvelHeroes.push(dcHeroes);
// console.log(marvelHeroes); // Output: ['thor', 'Ironman', 'spiderman', ['superman', 'flash', 'batman']]

// ❌ TRAP 2: `concat()` returns a NEW merged array without mutating originals:
// const allCombinedHeroes = marvelHeroes.concat(dcHeroes);
// console.log(allCombinedHeroes);

// ✅ MODERN BEST PRACTICE: Spread Operator (`...`)
// Allows merging multiple arrays cleanly into a new flat array structure.
const combinedHeroesList = [...marvelHeroes, ...dcHeroes];
console.log(combinedHeroesList); // Output: ['thor', 'Ironman', 'spiderman', 'superman', 'flash', 'batman']


/*
  ----------------------------------------------------------------------------
  CONCEPT 5: Flattening Nested Arrays (`.flat()`)
  ----------------------------------------------------------------------------
  `.flat(depth)` creates a new array with all sub-array elements concatenated 
  up to the specified depth. Passing `Infinity` recursively flattens ALL levels.
*/

const complexNestedArray = [1, 2, 3, [4, 5, 6], 7, [6, 7, [4, 5]]];
const fullyFlattenedArray = complexNestedArray.flat(Infinity);

console.log(fullyFlattenedArray); 
// Output: [1, 2, 3, 4, 5, 6, 7, 6, 7, 4, 5]


/*
  ----------------------------------------------------------------------------
  CONCEPT 6: Static Array Construction Methods (`isArray`, `from`, `of`)
  ----------------------------------------------------------------------------
*/

// 1. `Array.isArray()`: Type checking for arrays (returns boolean)
console.log(Array.isArray("Danny")); // Output: false

// 2. `Array.from()`: Converts iterable or array-like objects into true Arrays
console.log(Array.from("Danny")); // Output: ['D', 'a', 'n', 'n', 'y']

// ⚠️ FAMOUS INTERVIEW EDGE CASE: Passing an Object to Array.from()
// If `Array.from()` cannot determine whether to build the array from keys or values, it returns an empty array `[]`!
console.log(Array.from({ name: "Danny" })); // Output: []

// To fix, specify what to convert:
console.log(Array.from(Object.keys({ name: "Danny" }))); // Output: ['name']

// 3. `Array.of()`: Creates a new Array instance from a variable set of arguments
let round1Score = 100;
let round2Score = 200;
let round3Score = 300;

console.log(Array.of(round1Score, round2Score, round3Score)); // Output: [100, 200, 300]


/*
  ----------------------------------------------------------------------------
  BONUS CONCEPT FOR REVISION: Packed vs. Holey Arrays (V8 Engine Optimization)
  ----------------------------------------------------------------------------
  - Continuous / Packed Array: Array with no empty elements (e.g., `[1, 2, 3]`).
    Optimized at the compiler level for fast memory access.
  - Holey Array: Array containing gaps or deleted indices (e.g., `[1, , 3]`).
    Slower because the V8 engine has to perform prototype lookup for missing indices.
*/