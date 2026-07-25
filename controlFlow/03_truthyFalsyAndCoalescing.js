/**
 * ==============================================================================
 * JavaScript Truthy / Falsy Values, Type Validation, & Special Operators
 * ==============================================================================
 * Topics Covered:
 * 1. Truthy vs. Falsy Values Exhaustive List
 * 2. Truthy Gotchas (Empty Arrays, Empty Objects, '0', 'false', Whitespace)
 * 3. Safe Validation Techniques (Checking Empty Arrays & Objects)
 * 4. Nullish Coalescing Operator (`??`) Mechanics & Chaining
 * 5. Ternary Operator Syntax & Best Practices
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. TRUTHY VS. FALSY VALUES EXHAUSTIVE REFERENCE
// ------------------------------------------------------------------------------

/*
 * FALSY VALUES (Values that evaluate to `false` in a boolean context):
 * 1. false
 * 2. 0 (Numeric zero)
 * 3. -0 (Negative zero)
 * 4. 0n (BigInt zero)
 * 5. "" (Empty string)
 * 6. null (Intentional absence of value)
 * 7. undefined (Uninitialized variable)
 * 8. NaN (Not a Number)
 *
 * TRUTHY VALUES (Surprising values that evaluate to `true` in a boolean context):
 * 1. "0" (Non-empty string containing zero)
 * 2. 'false' (Non-empty string containing the word "false")
 * 3. " " (Non-empty string containing whitespace)
 * 4. [] (Empty Array — Objects/Arrays are truthy references!)
 * 5. {} (Empty Object — Truthy reference!)
 * 6. function(){} (Empty Function / Function Expression)
 */

const userEmailList = [];

// CRITICAL GOTCHA:
// An empty array `[]` is TRUTHY because it is an object reference in memory!
if (userEmailList) {
    console.log("Evaluation Result: Got user email array (Truthy evaluation).");
} else {
    console.log("Evaluation Result: Don't have user email.");
}


// ------------------------------------------------------------------------------
// 2. VALIDATING EMPTY ARRAYS & OBJECTS SAFELY
// ------------------------------------------------------------------------------

/**
 * Technique A: Validating Empty Arrays
 * Check the `.length` property instead of evaluating the array truthiness directly.
 */
if (userEmailList.length === 0) {
    console.log("Array Status: Array is empty (Length === 0).");
}

/**
 * Technique B: Validating Empty Objects
 * `Object.keys(obj)` returns an Array of keys.
 * Checking `.length` on the resulting array determines if the object has properties.
 */
const profileDataContainer = {};

if (Object.keys(profileDataContainer).length === 0) {
    console.log("Object Status: Object is empty (Keys count === 0).");
}


// ------------------------------------------------------------------------------
// 3. NULLISH COALESCING OPERATOR (`??`)
// ------------------------------------------------------------------------------

/**
 * The Nullish Coalescing Operator (`??`) is a logical operator that returns its 
 * right-hand side operand when its left-hand side operand is strictly `null` or `undefined`.
 * 
 * Key Difference from Logical OR (`||`):
 * - `||` falls back on ALL falsy values (`0`, `""`, `false`, `null`, `undefined`).
 * - `??` ONLY falls back on `null` or `undefined` (Preserves `0`, `""`, and `false` as valid values!).
 */

let evaluatedValue;

// Case 1: Standard Fallback
// evaluatedValue = 5 ?? 10;            // Result: 5 (Left side is valid)
// evaluatedValue = null ?? 10;          // Result: 10 (Left side is null)
// evaluatedValue = undefined ?? 15;     // Result: 15 (Left side is undefined)

// Case 2: Multi-level Chaining (Evaluates left to right, returning first non-nullish value)
evaluatedValue = null ?? 10 ?? 20;

console.log("Nullish Coalescing Result:", evaluatedValue); // Output: 10


// ------------------------------------------------------------------------------
// 4. TERNARY OPERATOR (`condition ? expressionIfTrue : expressionIfFalse`)
// ------------------------------------------------------------------------------

/**
 * Concise inline conditional assignment/execution operator.
 */

const icedTeaPrice = 100;

// Basic Inline Condition Execution:
icedTeaPrice <= 80 
    ? console.log("Price Alert: Price is less than or equal to 80") 
    : console.log("Price Alert: Price is greater than 80");

// Preferred Clean Pattern: Assignment via Ternary Operator
const priceCategoryLabel = icedTeaPrice <= 80 ? "Affordable" : "Premium";
console.log(`Product Classification: ${priceCategoryLabel}`); // Output: Product Classification: Premium