/**
 * ==============================================================================
 * JavaScript `for...of` Loops & Map Data Structures Guide
 * ==============================================================================
 * Topics Covered:
 * 1. `for...of` Loop Mechanics on Iterables (Arrays & Strings)
 * 2. Introduction to the `Map` Data Structure (Key-Value Pairs & Uniqueness)
 * 3. Iterating over Maps with Array Destructuring `[key, value]`
 * 4. CRITICAL GOTCHA: Why Plain Objects are NOT Iterable with `for...of`
 * 5. Common Iteration Data Formats: `[value, value]` vs `[{}, {}, {}]`
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. `for...of` LOOP OVER ARRAYS & STRINGS
// ------------------------------------------------------------------------------

/**
 * `for...of` Syntax:
 * for (const element of iterable) { ... }
 * 
 * Key Advantage:
 * Directly provides the VALUE of each element without needing an index counter or length check!
 * Works natively on all Built-in Iterables (Array, String, Map, Set, NodeList).
 */

// Format A: Array of Primitive Values -> [1, 2, 3, 4, 5]
const numericSequence = [1, 2, 3, 4, 5];

console.log("--- `for...of` Over Array ---");
for (const currentNumber of numericSequence) {
    console.log(`Current Number: ${currentNumber}`);
}


// Format B: String Character Iteration
const welcomeGreeting = "Hello world!";

console.log("\n--- `for...of` Over String ---");
for (const character of welcomeGreeting) {
    // Ignores spaces or logs them depending on logic
    if (character === " ") continue; // Skip space character
    console.log(`Character: ${character}`);
}


// ------------------------------------------------------------------------------
// 2. THE `Map` OBJECT & MAP ITERATION
// ------------------------------------------------------------------------------

/**
 * What is a `Map`?
 * A `Map` is a collection of key-value pairs that remembers the original insertion order of keys.
 * 
 * Key Features:
 * - UNIQUE KEYS: Duplicate keys are overwritten (e.g., setting 'IN' twice keeps only one entry).
 * - ANY DATA TYPE: Unlike plain objects (where keys are coerced to strings/symbols), Map keys can be 
 *   objects, functions, or primitives.
 * - NATIVELY ITERABLE: Maps can be directly looped through with `for...of`.
 */

const countryCodeMap = new Map();

// Inserting Key-Value pairs:
countryCodeMap.set('IN', "India");
countryCodeMap.set('USA', "United States of America");
countryCodeMap.set('Fr', "France");

// Duplicate Key Addition (Ignored/Overwritten):
countryCodeMap.set('IN', "India"); // Does NOT duplicate key 'IN'

console.log("\n--- Map Collection ---");
console.log(countryCodeMap);


// ITERATING OVER A MAP USING ARRAY DESTRUCTURING:
// Each entry in a Map is yielded as a two-element array: [key, value]
console.log("\n--- `for...of` Over Map with Destructuring ---");

for (const [countryKey, countryName] of countryCodeMap) {
    console.log(`${countryKey} :- ${countryName}`);
}


// ------------------------------------------------------------------------------
// 3. COMMON ITERATION STRUCTURES: ARRAY OF OBJECTS
// ------------------------------------------------------------------------------

// Format C: Array of Objects -> [{}, {}, {}]
const userDatabase = [
    { userId: 1, userName: "hitesh" },
    { userId: 2, userName: "sam" },
    { userId: 3, userName: "alex" }
];

console.log("\n--- Iterating Array of Objects ---");
for (const userRecord of userDatabase) {
    console.log(`User ID: ${userRecord.userId}, Name: ${userRecord.userName}`);
}


// ------------------------------------------------------------------------------
// 4. CRITICAL GOTCHA: PLAIN OBJECTS ARE NOT ITERABLE WITH `for...of`
// ------------------------------------------------------------------------------

const favoriteGames = {
    game1: 'NFS',
    game2: 'Spiderman'
};

/**
 * ERROR EXAMPLE (Uncommenting throws runtime error):
 * 
 * for (const [key, value] of favoriteGames) {
 *     console.log(key, ':-', value);
 * }
 * 
 * WHY IT FAILS:
 * Plain JavaScript Objects `{}` are NOT built-in iterables! 
 * Executing `for...of` directly on a plain object throws:
 * `TypeError: favoriteGames is not iterable`
 * 
 * (Note: To iterate plain objects, use `for...in`, `Object.keys()`, `Object.values()`, or `Object.entries()`).
 */