/**
 * ==============================================================================
 * JavaScript `this` Keyword & Arrow Functions Guide
 * ==============================================================================
 * Topics Covered:
 * 1. Implicit Binding (`this` inside object methods)
 * 2. Global Context Behavior (`this` in Node.js vs. Browser)
 * 3. Standard Functions & `this` (Why local variables aren't on `this`)
 * 4. Arrow Functions & Lexical `this` Binding
 * 5. Arrow Function Syntax Variations (Explicit vs. Implicit Return)
 * 6. Returning Objects Implicitly from Arrow Functions
 * 7. Bonus: Arrow Functions in Higher-Order Array Methods (`forEach`)
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. IMPLICIT BINDING (`this` INSIDE OBJECT METHODS)
// ------------------------------------------------------------------------------

const userProfile = {
    username: "hitesh",
    subscriptionPrice: 999,

    /**
     * Method using standard function syntax.
     * `this` refers to the object invoking the method (the calling context).
     */
    displayWelcomeMessage: function () {
        // `this.username` dynamically accesses property of current object
        console.log(`${this.username}, welcome to website`);
        
        // Logs the entire current context (`userProfile` object):
        console.log("Current Object Context (`this`):", this);
    }
};

// Initial Call:
userProfile.displayWelcomeMessage(); 
// Output: "hitesh, welcome to website"

// Mutating state:
userProfile.username = "sam";

// Second Call (Reflects modified state because `this` reads current context dynamically):
userProfile.displayWelcomeMessage(); 
// Output: "sam, welcome to website"


// ------------------------------------------------------------------------------
// 2. GLOBAL CONTEXT BEHAVIOR
// ------------------------------------------------------------------------------

/**
 * In Node.js environment:
 * `this` in the global module context refers to an empty object `{}` (module.exports).
 * 
 * In Browser environment:
 * `this` in global context refers to the `window` object.
 */
console.log("Global Context `this`:", this); // Node.js Output: {}


// ------------------------------------------------------------------------------
// 3. STANDARD FUNCTIONS & `this`
// ------------------------------------------------------------------------------

/**
 * Standard Function Declaration
 * Variables declared inside a function (`let`, `const`, `var`) are local to its scope
 * and are NOT attached to its `this` context!
 */
function inspectRegularFunctionThis() {
    let username = "hitesh";
    
    // In strict mode or standard calls, `this.username` evaluates to `undefined` 
    // because `this` refers to global object/undefined, NOT function's local scope.
    console.log("Regular function `this.username`:", this.username); // Output: undefined
}

inspectRegularFunctionThis();


// ------------------------------------------------------------------------------
// 4. ARROW FUNCTIONS & LEXICAL `this`
// ------------------------------------------------------------------------------

/**
 * Arrow Functions DO NOT have their own `this` binding.
 * Instead, they inherit `this` lexically from their enclosing (parent) scope.
 */
const inspectArrowFunctionThis = () => {
    let username = "hitesh";
    
    // Lexically inherits `this` from outer scope (Global / module scope in this case -> {})
    console.log("Arrow Function `this`:", this); // Output: {}
    console.log("Arrow Function `this.username`:", this.username); // Output: undefined
};

inspectArrowFunctionThis();


// ------------------------------------------------------------------------------
// 5. ARROW FUNCTION SYNTAX VARIATIONS (EXPLICIT VS. IMPLICIT RETURN)
// ------------------------------------------------------------------------------

// Syntax A: Explicit Return (Requires `{}` block and `return` keyword)
const addNumbersExplicit = (firstNumber, secondNumber) => {
    return firstNumber + secondNumber;
};

// Syntax B: Implicit Return (Single statement, NO `{}` and NO `return` keyword)
const addNumbersImplicitOneLiner = (firstNumber, secondNumber) => firstNumber + secondNumber;

// Syntax C: Implicit Return with Parentheses `()` (Recommended for readability)
const addNumbersImplicitWithParentheses = (firstNumber, secondNumber) => (
    firstNumber + secondNumber
);

console.log("Explicit Return:", addNumbersExplicit(3, 4));                 // Output: 7
console.log("Implicit One-Liner:", addNumbersImplicitOneLiner(3, 4));       // Output: 7
console.log("Implicit Parentheses:", addNumbersImplicitWithParentheses(3, 4)); // Output: 7


// ------------------------------------------------------------------------------
// 6. RETURNING OBJECT LITERALS IMPLICITLY
// ------------------------------------------------------------------------------

/**
 * CRITICAL GOTCHA:
 * To return an object implicitly from an arrow function, you MUST wrap 
 * the object literal in parentheses `({})`.
 * 
 * Without parentheses `()`, JavaScript treats `{}` as function scope block boundaries,
 * NOT as an object literal, resulting in `undefined`.
 */

// WRONG WAY:
// const createAccount = () => { username: "hitesh" }; // Returns `undefined`

// CORRECT WAY:
const createAccount = (firstNumber, secondNumber) => ({
    username: "hitesh",
    computedTotal: firstNumber + secondNumber
});

console.log("Returned Object:", createAccount(3, 4)); 
// Output: { username: "hitesh", computedTotal: 7 }


// ------------------------------------------------------------------------------
// 7. BONUS REVISION CONCEPT: ARROW FUNCTIONS IN HIGHER-ORDER METHODS
// ------------------------------------------------------------------------------

const numberList = [2, 5, 3, 7, 8];

/**
 * Arrow functions are commonly used as concise callbacks in array methods like `forEach`, `map`, and `filter`.
 */
numberList.forEach((element, index) => {
    // console.log(`Index ${index}: ${element}`);
});