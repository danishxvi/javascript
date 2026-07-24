/**
 * ==============================================================================
 * JavaScript Scope, Lexical Environment, & Hoisting Guide
 * ==============================================================================
 * Topics Covered:
 * 1. Scope Types: Global vs. Block Scope (`var` vs. `let` / `const`)
 * 2. Lexical Scope & Nested Functions (Scope Chain)
 * 3. Scope inside Block Statements (`if`/`else`)
 * 4. Hoisting Mechanics: Function Declarations vs. Function Expressions
 * 5. Temporal Dead Zone (TDZ)
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. GLOBAL SCOPE VS. BLOCK SCOPE (`var` vs `let` / `const`)
// ------------------------------------------------------------------------------

// `globalScopeValue` is declared in the Global Scope.
// It is accessible anywhere in this file.
let globalScopeValue = 300;

// Uncommenting the line below creates a global variable attached to `window` (in browsers) 
// or `global` (in Node.js). `var` does NOT obey block scope!
// var globalLegacyVar = 300;

if (true) {
    // Block Scope: Variables declared with `let` and `const` inside `{}` 
    // exist ONLY within these curly braces.
    let blockScopedValue = 10;
    const blockScopedConstant = 20;

    // Shadowing: This `globalScopeValue` shadows (overrides locally) the global one.
    let globalScopeValue = 10;

    console.log("INNER (Block Scope):", globalScopeValue); // Output: 10
    console.log("INNER (Block Constant):", blockScopedConstant); // Output: 20
}

// Global scope variable remains unchanged outside the block:
console.log("OUTER (Global Scope):", globalScopeValue); // Output: 300

// ERROR EXAMPLES (Uncomment to test):
// console.log(blockScopedValue);   // ReferenceError: blockScopedValue is not defined
// console.log(blockScopedConstant); // ReferenceError: blockScopedConstant is not defined

/*
 * KEY TAKEAWAY:
 * - `let` / `const`: Block-scoped `{}`. Safe from variable leaking.
 * - `var`: Function-scoped or Globally-scoped. Ignores `{}` block boundaries (except functions)!
 */


// ------------------------------------------------------------------------------
// 2. LEXICAL SCOPE & NESTED FUNCTIONS (THE SCOPE CHAIN)
// ------------------------------------------------------------------------------

/**
 * Demonstrates how nested functions access variables from outer parent scopes.
 * 
 * Key Concept: Lexical Scope
 * Inner functions have access to variables defined in their parent (outer) scope,
 * but outer functions CANNOT access variables defined inside inner functions.
 */
function outerFunction() {
    const parentUsername = "hitesh";

    function innerFunction() {
        const childWebsite = "youtube";
        
        // Inner function CAN access outer/parent variables:
        console.log("Inner function accessing parent variable:", parentUsername); // Output: hitesh
    }

    // Outer function CANNOT access inner/child variables:
    // console.log(childWebsite); // ReferenceError: childWebsite is not defined

    // Execute the inner function:
    innerFunction();
}

outerFunction();


// ------------------------------------------------------------------------------
// 3. LEXICAL SCOPE IN BLOCK STATEMENTS
// ------------------------------------------------------------------------------

if (true) {
    const currentUsername = "hitesh";

    if (currentUsername === "hitesh") {
        const targetWebsite = " youtube";
        // Accessing local variable + parent block variable:
        console.log("Combined string:", currentUsername + targetWebsite); // Output: hitesh youtube
    }

    // Block 2 variable is destroyed here:
    // console.log(targetWebsite); // ReferenceError: targetWebsite is not defined
}

// Block 1 variable is destroyed here:
// console.log(currentUsername); // ReferenceError: currentUsername is not defined


// ------------------------------------------------------------------------------
// 4. HOISTING: FUNCTION DECLARATIONS VS. FUNCTION EXPRESSIONS
// ------------------------------------------------------------------------------

/**
 * CASE A: Function Declaration
 * Function declarations are fully hoisted to the top of their scope during parsing.
 * You CAN execute them BEFORE they appear in the code!
 */
console.log("Hoisted Declaration Result:", addOneValue(5)); // Output: 6

function addOneValue(numberInput) {
    return numberInput + 1;
}


/**
 * CASE B: Function Expression (Variable Assignment)
 * When assigning a function to a variable (`const`/`let`), ONLY the variable declaration 
 * is hoisted—NOT its assignment.
 * 
 * Calling `addTwoValues(5)` before this line will throw a ReferenceError due to 
 * the Temporal Dead Zone (TDZ).
 */

// addTwoValues(5); // ReferenceError: Cannot access 'addTwoValues' before initialization

const addTwoValues = function (numberInput) {
    return numberInput + 2;
};

// Valid call (AFTER declaration):
console.log("Function Expression Result:", addTwoValues(5)); // Output: 7


// ------------------------------------------------------------------------------
// 5. BONUS REVISION CONCEPT: TEMPORAL DEAD ZONE (TDZ)
// ------------------------------------------------------------------------------
/*
 * What is the Temporal Dead Zone (TDZ)?
 * The period of execution between entering a scope and the point where a variable 
 * (`let` or `const`) is declared and initialized.
 * 
 * Accessing the variable during TDZ results in a ReferenceError, unlike `var` 
 * which yields `undefined`.
 * 
 * Example:
 * console.log(tdzVar); // ReferenceError: Cannot access 'tdzVar' before initialization
 * let tdzVar = "I am safe now";
 */