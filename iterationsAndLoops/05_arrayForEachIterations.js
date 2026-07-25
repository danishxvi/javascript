/**
 * ==============================================================================
 * JAVASCRIPT ARRAY ITERATION: Array.prototype.forEach()
 * ==============================================================================
 * Key Concept: 
 * `.forEach()` is a built-in Array method used to execute a provided function 
 * once for each element in an array.
 * 
 * Important Characteristics to Remember for Interviews/Revision:
 * 1. Return Value: Always returns `undefined` (it does NOT return a new array).
 * 2. Non-chainable: Because it returns `undefined`, you cannot chain `.map()` 
 *    or `.filter()` directly off a `forEach`.
 * 3. Cannot Break/Continue: You CANNOT use `break` or `continue` statements inside 
 *    a `forEach` loop. If you need early termination, use `for...of` or `for` loops.
 * 4. Mutability: It does not mutate the original array by default, though the callback 
 *    can manually modify elements.
 */

// ------------------------------------------------------------------------------
// 1. BASIC ARRAY & DIFFERENT CALLBACK SYNTAXES
// ------------------------------------------------------------------------------
const programmingLanguages = ["js", "ruby", "java", "python", "cpp"];

// --- Pattern A: Standard Anonymous Function Callback ---
// Useful when learning traditional function expressions.
programmingLanguages.forEach(function (languageName) {
    console.log(`Standard Function Output: ${languageName}`);
});

// --- Pattern B: Arrow Function Callback (Most Common in Modern JS) ---
// Shorter syntax introduced in ES6.
programmingLanguages.forEach((language) => {
    console.log(`Arrow Function Output: ${language}`);
});

// --- Pattern C: Passing a Named Function Reference ---
// Useful for clean code and function reusability across multiple files/arrays.
// Note: Pass the function by reference `printLanguage`, DO NOT invoke it like `printLanguage()`.
function printLanguage(language) {
    console.log(`Named Function Output: ${language}`);
}

programmingLanguages.forEach(printLanguage);


// ------------------------------------------------------------------------------
// 2. ACCESSING FULL CALLBACK PARAMETERS
// ------------------------------------------------------------------------------
// The callback function inside `forEach` actually receives 3 arguments automatically:
// 1. currentValue : The element being processed.
// 2. index        : The index of the current element being processed.
// 3. array        : The complete array `forEach` was called upon.

console.log("\n--- Full Parameter Breakdown ---");
programmingLanguages.forEach((currentValue, index, entireArray) => {
    console.log(`Index: ${index} | Value: ${currentValue} | Source Array:`, entireArray);
});


// ------------------------------------------------------------------------------
// 3. ITERATING OVER AN ARRAY OF OBJECTS (REAL-WORLD DATA STRUCTURE)
// ------------------------------------------------------------------------------
// In web development (APIs/JSON responses), data frequently comes as an array of objects.
const programmingLanguagesList = [
    {
        languageName: "JavaScript",
        fileExtension: "js"
    },
    {
        languageName: "Java",
        fileExtension: "java"
    },
    {
        languageName: "Python",
        fileExtension: "py"
    },
];

console.log("\n--- Array of Objects Iteration ---");
programmingLanguagesList.forEach((languageObject) => {
    // Accessing properties via dot notation
    console.log(`Language: ${languageObject.languageName} (Ext: .${languageObject.fileExtension})`);
});


// ------------------------------------------------------------------------------
// 4. RELATED CONCEPT / BONUS: FOR-EACH RETURN VALUE CAVEAT
// ------------------------------------------------------------------------------
// A common mistake in interviews is trying to assign the result of `forEach` to a variable.

const returnResult = programmingLanguages.forEach((item) => {
    return item; // This return statement is ignored by forEach!
});

console.log("\n--- Return Value Demonstration ---");
console.log("Result of forEach assignment:", returnResult); // Output: undefined
// Note: If you need to transform elements and return a new array, use `.map()` instead.