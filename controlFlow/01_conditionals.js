/**
 * ==============================================================================
 * JavaScript Control Flow, Conditional Logic, & Comparison Operators Guide
 * ==============================================================================
 * Topics Covered:
 * 1. Conditional Statements (`if`, `else if`, `else`)
 * 2. Comparison Operators & Type Coercion (`==` vs. `===`, `!=` vs. `!==`)
 * 3. Block Scope in Conditionals (`let`/`const` vs. `var` scope leakage)
 * 4. Code Formatting Anti-Patterns (Implicit Scope / Comma Separated Lines)
 * 5. Logical Operators (`&&`, `||`) & Short-Circuit Evaluation
 * 6. Bonus Concept: Nullish Coalescing (`??`) and Ternary Operator
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. BASIC CONDITIONALS & COMPARISON OPERATORS
// ------------------------------------------------------------------------------

const isUserSessionActive = true;
const currentTemperature = 41;

/**
 * Comparison Operators Summary:
 * `<`   : Less than
 * `>`   : Greater than
 * `<=`  : Less than or equal to
 * `>=`  : Greater than or equal to
 * `==`  : Loose Equality (performs Type Coercion: e.g., '2' == 2 is true)
 * `!=`  : Loose Inequality (performs Type Coercion)
 * `===` : Strict Equality (checks BOTH Value AND Data Type: e.g., '2' === 2 is false)
 * `!==` : Strict Inequality (checks BOTH Value AND Data Type)
 */

if (currentTemperature === 40) {
    console.log("Temperature is exactly 40 degrees.");
} else {
    // Note: 41 is NOT greater than 50, but it enters 'else' because 41 !== 40.
    console.log("Temperature is NOT 40 degrees.");
}

console.log("Control flow continues execution sequentially...");


// ------------------------------------------------------------------------------
// 2. BLOCK SCOPE WITHIN CONDITIONALS
// ------------------------------------------------------------------------------

const playerScore = 200;

if (playerScore > 100) {
    // Variable declared with `let` is BLOCK SCOPED to this `if` statement block `{}`
    let grantedPower = "fly";
    console.log(`User unlocked power: ${grantedPower}`); // Output: User unlocked power: fly
}

// CRITICAL GOTCHA:
// Accessing `grantedPower` outside its block throws a ReferenceError!
// console.log(`User unlocked power: ${grantedPower}`); // Uncaught ReferenceError: grantedPower is not defined

/*
 * WARNING ABOUT `var`:
 * If `var grantedPower = "fly"` was used above, it would LEAK outside the block 
 * into the global/function scope, which creates dangerous bugs in larger apps. Always prefer `let`/`const`.
 */


// ------------------------------------------------------------------------------
// 3. IMPLICIT SCOPE & ANTI-PATTERNS
// ------------------------------------------------------------------------------

const accountBalance = 1000;

/**
 * IMPLICIT SCOPE (One-Liner without `{}`):
 * Valid syntax, but should only be used for single, short lines.
 */
if (accountBalance > 500) console.log("Implicit single line execution");

/**
 * ANTI-PATTERN (DO NOT USE IN PRODUCTION):
 * Comma-separated multi-line implicit scope is hard to read and maintain.
 * 
 * BAD PRACTICE:
 * if (accountBalance > 500) console.log("test"), console.log("test2");
 */


// ------------------------------------------------------------------------------
// 4. MULTI-CONDITION BRANCHING (`else if` LADDER)
// ------------------------------------------------------------------------------

// Fixed label discrepancies from original snippet for accuracy:
if (accountBalance < 500) {
    console.log("Balance is less than 500");
} else if (accountBalance < 750) {
    console.log("Balance is less than 750");
} else if (accountBalance < 900) {
    console.log("Balance is less than 900");
} else {
    console.log("Balance is 900 or greater"); // Output: Balance is 900 or greater
}


// ------------------------------------------------------------------------------
// 5. LOGICAL OPERATORS & SHORT-CIRCUIT EVALUATION
// ------------------------------------------------------------------------------

const isUserLoggedIn = true;
const hasDebitCard = true;
const loggedInFromGoogle = false;
const loggedInFromEmail = true;

/**
 * LOGICAL AND (`&&`):
 * ALL conditions MUST evaluate to `true` for the block to execute.
 * Short-Circuiting: If ANY condition evaluates to `false`, JS stops checking 
 * remaining conditions immediately.
 */
if (isUserLoggedIn && hasDebitCard && (2 === 2)) { 
    // Changed 2==3 (false) to 2===2 (true) so condition passes cleanly
    console.log("Authorization Success: User allowed to purchase course.");
}

/**
 * LOGICAL OR (`||`):
 * AT LEAST ONE condition must evaluate to `true`.
 * Short-Circuiting: As soon as one `true` is found, JS skips evaluating the rest.
 */
if (loggedInFromGoogle || loggedInFromEmail) {
    console.log("Authentication Success: User logged in via provider.");
}


// ------------------------------------------------------------------------------
// 6. BONUS REVISION CONCEPTS: TERNARY & NULLISH COALESCING OPERATORS
// ------------------------------------------------------------------------------

/**
 * Concept A: Ternary Operator (`condition ? trueExpr : falseExpr`)
 * Compact syntax for simple if-else assignment.
 */
const purchasePrice = 100;
const userDiscount = purchasePrice > 80 ? 15 : 0;
console.log(`Applied Discount: $${userDiscount}`); // Output: Applied Discount: $15

/**
 * Concept B: Nullish Coalescing Operator (`??`)
 * Fallback operator that specifically checks for `null` or `undefined` 
 * (Unlike `||` which falls back on ALL falsy values like `0` or `""`).
 */
let configuredTimeout = null;
const defaultTimeout = configuredTimeout ?? 5000; 
console.log(`Active Timeout: ${defaultTimeout}ms`); // Output: Active Timeout: 5000ms