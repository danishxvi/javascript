/**
 * ==============================================================================
 * JavaScript Functions Fundamentals & Parameters Guide
 * ==============================================================================
 * Topics Covered:
 * 1. Function Declaration & Execution
 * 2. Parameters, Arguments, and Return Values vs. Side Effects
 * 3. Default Parameters & Truthy/Falsy Evaluation
 * 4. Rest Operator (`...`) for Variable Arguments (and Rest vs. Spread)
 * 5. Passing Objects to Functions (Type Safety & Optional Chaining)
 * 6. Passing Arrays to Functions & Boundary Edge Cases
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. BASIC FUNCTION DECLARATION & EXECUTION
// ------------------------------------------------------------------------------

/**
 * Prints a name character-by-character to the console.
 * Key Concept: A function declaration defines code that executes only when called.
 */
function printNameSpelledOut() {
    console.log("H");
    console.log("I");
    console.log("T");
    console.log("E");
    console.log("S");
    console.log("H");
}

// Function Execution (Uncomment to run):
// printNameSpelledOut();


// ------------------------------------------------------------------------------
// 2. PARAMETERS, RETURN VALUES, & SIDE EFFECTS
// ------------------------------------------------------------------------------

/**
 * BAD PRACTICE (for reference):
 * Function that logs a result but does NOT return it.
 * Calling `const output = addTwoNumbersWithoutReturn(3, 5)` would result in `output === undefined`.
 * 
 * function addTwoNumbersWithoutReturn(firstNumber, secondNumber) {
 *     console.log(firstNumber + secondNumber);
 * }
 */

/**
 * GOOD PRACTICE:
 * Calculates and returns the sum of two numbers.
 * 
 * @param {number} firstNumber - The first addend
 * @param {number} secondNumber - The second addend
 * @returns {number} The calculated sum
 */
function calculateSum(firstNumber, secondNumber) {
    // Note: Implicit type coercion occurs if strings are passed (e.g., calculateSum("3", 5) yields "35").
    return firstNumber + secondNumber;
}

const additionResult = calculateSum(3, 5);
console.log("Addition Result:", additionResult); // Output: Addition Result: 8


// ------------------------------------------------------------------------------
// 3. DEFAULT PARAMETERS & FALSY EVALUATION
// ------------------------------------------------------------------------------

/**
 * Generates a login message for a given user.
 * 
 * Key Concepts:
 * - Default Parameters: `username = "sam"` acts as a fallback if `undefined` is passed or if no argument is provided.
 * - Truthy/Falsy Check: `!username` evaluates to true for falsy values (`""`, `null`, `undefined`, `NaN`, `0`, `false`).
 * 
 * @param {string} username - Name of the user (Defaults to "sam")
 * @returns {string} Status message
 */
function generateLoginMessage(username = "sam") {
    // Defensive check: Catch explicitly passed empty strings or null values
    if (!username) {
        console.log("Warning: Please provide a valid username.");
        return "Authentication Failed";
    }
    
    // Template Literal string interpolation
    return `${username} successfully logged in.`;
}

console.log(generateLoginMessage("hitesh")); // Output: hitesh successfully logged in.
console.log(generateLoginMessage());         // Output: sam successfully logged in. (uses default)
console.log(generateLoginMessage(""));       // Triggers warning due to falsy check


// ------------------------------------------------------------------------------
// 4. REST PARAMETERS (`...`) VS SPREAD OPERATOR
// ------------------------------------------------------------------------------

/**
 * Calculates item totals using the Rest Parameter syntax.
 * 
 * Key Concept: Rest vs. Spread
 * - Rest Operator (`...` in function parameters): Gathers multiple individual arguments into a single Array.
 * - Spread Operator (`...` in function calls/literals): Expands an Array/Object into individual elements.
 * 
 * @param {number} firstItemPrice - Assigned directly to 1st positional argument
 * @param {number} secondItemPrice - Assigned directly to 2nd positional argument
 * @param {...number} remainingItemPrices - Rest array containing all remaining arguments
 * @returns {number[]} Array of remaining prices
 */
function extractRemainingCartPrices(firstItemPrice, secondItemPrice, ...remainingItemPrices) {
    // Example call: extractRemainingCartPrices(200, 400, 500, 2000)
    // firstItemPrice = 200
    // secondItemPrice = 400
    // remainingItemPrices = [500, 2000]
    return remainingItemPrices;
}

const remainingCartItems = extractRemainingCartPrices(200, 400, 500, 2000);
console.log("Remaining Cart Items:", remainingCartItems); // Output: [500, 2000]


// ------------------------------------------------------------------------------
// 5. PASSING OBJECTS TO FUNCTIONS & SAFELY ACCESSING PROPERTIES
// ------------------------------------------------------------------------------

const sampleUserAccount = {
    username: "hitesh",
    price: 199 // Fixed typo from original code ("prices" -> "price")
};

/**
 * Logs details about a user account.
 * 
 * Key Concepts:
 * - Property Mismatch Risk: Accessing non-existent properties yields `undefined`.
 * - Optional Chaining (`?.`): Prevents runtime errors if `userObj` itself is null/undefined.
 * 
 * @param {Object} userObj - The user object to process
 */
function displayProductSummary(userObj) {
    // Optional chaining safeguard: userObj?.username avoids errors if userObj is null
    const name = userObj?.username || "Guest";
    const cost = userObj?.price ?? "N/A"; // Nullish coalescing fallback

    console.log(`Username is ${name} and price is ${cost}.`);
}

displayProductSummary(sampleUserAccount);
displayProductSummary({
    username: "sam",
    price: 399
});


// ------------------------------------------------------------------------------
// 6. PASSING ARRAYS TO FUNCTIONS & BOUNDS CHECKING
// ------------------------------------------------------------------------------

const numericList = [200, 400, 100, 600];

/**
 * Extracts the second element (index 1) from an array.
 * 
 * Key Concepts:
 * - Zero-based Indexing: Arrays start at index 0 (`targetArray[0]`).
 * - Boundary Checks: Always verify array length before accessing specific indices.
 * 
 * @param {Array} targetArray - Source array
 * @returns {*} Element at index 1, or undefined if unavailable
 */
function getSecondElement(targetArray) {
    if (!Array.isArray(targetArray) || targetArray.length < 2) {
        console.log("Warning: Provided argument is not a valid array or lacks sufficient elements.");
        return undefined;
    }
    return targetArray[1];
}

console.log("Second Element (Variable):", getSecondElement(numericList));          // Output: 400
console.log("Second Element (Inline):", getSecondElement([200, 400, 500, 1000])); // Output: 400