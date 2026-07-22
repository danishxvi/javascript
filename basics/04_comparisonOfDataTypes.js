// ============================================================================
// JavaScript Comparisons, Loose vs. Strict Equality, & Type Coercion Quirks
// ============================================================================

/*
  ----------------------------------------------------------------------------
  CONCEPT 1: Standard Numeric Comparisons
  ----------------------------------------------------------------------------
  When comparing numbers of the same type, JavaScript evaluates directly and
  returns a boolean (`true` or `false`).
*/

console.log(2 > 1);  // Output: true
console.log(2 >= 1); // Output: true
console.log(2 < 1);  // Output: false
console.log(2 == 1); // Output: false
console.log(2 != 1); // Output: true


/*
  ----------------------------------------------------------------------------
  CONCEPT 2: Implicit Type Coercion in Comparisons
  ----------------------------------------------------------------------------
  When comparing values of different types (e.g., String vs. Number), JavaScript
  implicitly converts the string to a Number before evaluating.
*/

console.log("2" > 1);  // Output: true  ("2" coerces to 2)
console.log("02" > 1); // Output: true  ("02" coerces to 2)


/*
  ----------------------------------------------------------------------------
  CONCEPT 3: The `null` Comparison Paradox (Interview Favorite!)
  ----------------------------------------------------------------------------
  ⚠️ CRITICAL DISTINCTION:
  Equality check (`==`) and Relational Comparisons (`>`, `<`, `>=`, `<=`) work differently in JS!
  
  - Relational operators (`>=`, `>`, `<`) convert `null` to a NUMBER (0).
  - Equality checks (`==`) treat `null` specially: `null` ONLY equals `undefined` or itself.
    It does NOT convert `null` to 0.
*/

console.log(null > 0);  // Output: false (null becomes 0 -> 0 > 0 is false)
console.log(null == 0); // Output: false (Equality check does NOT convert null to 0)
console.log(null >= 0); // Output: true  (null becomes 0 -> 0 >= 0 is true)


/*
  ----------------------------------------------------------------------------
  CONCEPT 4: `undefined` Comparisons
  ----------------------------------------------------------------------------
  When `undefined` is used in relational comparisons (`>`, `<`, `>=`), it coerces 
  to `NaN` (Not-a-Number). Any comparison with `NaN` ALWAYS returns `false`.
*/

console.log(undefined == 0); // Output: false (`undefined` only equals `null` or itself in loose equality)
console.log(undefined > 0);  // Output: false (undefined becomes NaN -> NaN > 0 is false)
console.log(undefined < 0);  // Output: false (undefined becomes NaN -> NaN < 0 is false)


/*
  ----------------------------------------------------------------------------
  CONCEPT 5: Loose Equality (`==`) vs. Strict Equality (`===`)
  ----------------------------------------------------------------------------
  - Abstract Equality (`==`): Performs implicit TYPE COERCION before checking value equality.
  - Strict Equality (`===`): Checks BOTH the VALUE and the DATA TYPE. No coercion allowed.
*/

console.log("2" == 2);  // Output: true  (String "2" coerces to Number 2)
console.log("2" === 2); // Output: false (Types differ: String vs Number)


/*
  ----------------------------------------------------------------------------
  BONUS CONCEPT FOR REVISION: Object.is() Comparison Method
  ----------------------------------------------------------------------------
  ES6 introduced `Object.is(a, b)` for same-value equality without coercion.
  It behaves mostly like `===`, except for two edge cases where `===` fails:
*/

// 1. NaN handling:
console.log(NaN === NaN);        // Output: false (The only value in JS not equal to itself!)
console.log(Object.is(NaN, NaN));// Output: true  (Correctly identifies same value)

// 2. Signed zero handling:
console.log(-0 === +0);          // Output: true
console.log(Object.is(-0, +0));  // Output: false