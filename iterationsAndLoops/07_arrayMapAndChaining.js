/**
 * ==============================================================================
 * JAVASCRIPT ARRAY METHODS: Array.prototype.map() & Method Chaining
 * ==============================================================================
 * Key Concepts Covered:
 * 1. `map()` Method: Creates a NEW array populated with the results of calling 
 *    a provided function on EVERY element in the calling array.
 * 2. `map()` vs `filter()`:
 *    - `map()`  -> Transforms data (returns same array length, modified values).
 *    - `filter()` -> Selects data (returns same or smaller array length based on true/false condition).
 * 3. Method Chaining: Passing the output array of one method directly as the input array 
 *    to the next method in a sequential pipeline.
 */

// ------------------------------------------------------------------------------
// 1. BASIC MAP OPERATION
// ------------------------------------------------------------------------------
const baseNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Adding 10 to every element in the array
// Note: Demonstrates explicit return syntax using `{ return ... }`
const numbersPlusTen = baseNumbers.map((number) => { 
    return number + 10; 
});

console.log("Basic Map Result:", numbersPlusTen);
// Output: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]


// ------------------------------------------------------------------------------
// 2. METHOD CHAINING (PIPELINE PROCESSING)
// ------------------------------------------------------------------------------
// Method chaining allows combining multiple array operations cleanly.
// Data flows sequentially from top to bottom through each step.

const processedNumbers = baseNumbers
    // Step 1: Multiply each element by 10
    // [1, 2, 3, ...] becomes [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    .map((number) => number * 10)

    // Step 2: Take the output array from Step 1 and add 1 to each element
    // [10, 20, 30, ...] becomes [11, 21, 31, 41, 51, 61, 71, 81, 91, 101]
    .map((number) => number + 1)

    // Step 3: Take the output array from Step 2 and filter elements >= 40
    // Filters out 11, 21, 31 -> keeps 41, 51, 61, 71, 81, 91, 101
    .filter((number) => number >= 40);

console.log("\nChained Operations Result:", processedNumbers);
// Output: [41, 51, 61, 71, 81, 91, 101]


// ------------------------------------------------------------------------------
// 3. RELATED CONCEPT / COMPARISON FOR REVISION
// ------------------------------------------------------------------------------
/*
 * CORE DIFFERENCE SUMMARY (Common Interview Topic):
 * 
 * Given array: [10, 20, 30]
 * 
 * 1. .map(x => x > 15)   
 *    -> Result: [false, true, true] 
 *    (Evaluates the condition for EACH element and returns boolean outputs)
 * 
 * 2. .filter(x => x > 15) 
 *    -> Result: [20, 30]             
 *    (Keeps ONLY items where the condition evaluates to true)
 */

const conditionTestMap = [10, 20, 30].map((val) => val > 15);
const conditionTestFilter = [10, 20, 30].filter((val) => val > 15);

console.log("\n--- Map vs Filter Condition Behavior ---");
console.log("Using map with a boolean condition:", conditionTestMap);    // [false, true, true]
console.log("Using filter with a boolean condition:", conditionTestFilter); // [20, 30]