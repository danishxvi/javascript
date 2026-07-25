/**
 * ==============================================================================
 * JAVASCRIPT ARRAY METHODS: forEach vs filter & Arrow Function Scope Rules
 * ==============================================================================
 * Key Concepts Covered:
 * 1. `forEach` Limitations: Always returns `undefined`, making it unsuitable for 
 *    transforming or filtering data into new arrays directly.
 * 2. `filter()` Method: Creates a new array filled with elements that pass a 
 *    test provided by a callback function. Returns an empty array if no elements match.
 * 3. Implicit vs Explicit Returns in Arrow Functions:
 *    - `() => expression`  -> Implicit return (no curly braces `{}`)
 *    - `() => { return expression }` -> Explicit return (curly braces `{}` REQUIRE `return`)
 */

// ------------------------------------------------------------------------------
// 1. WHY forEach() DOES NOT RETURN VALUES
// ------------------------------------------------------------------------------
const programmingLanguages = ["js", "ruby", "java", "python", "cpp"];

// Attempting to return a value from forEach:
const forEachResult = programmingLanguages.forEach((language) => {
    return language; // ❌ This return statement is ignored!
});

console.log("Result of forEach return attempt:", forEachResult); 
// Output: undefined


// ------------------------------------------------------------------------------
// 2. FILTERING ARRAYS: filter() vs manual forEach()
// ------------------------------------------------------------------------------
const numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// --- Approach A: Using Array.prototype.filter() (Preferred & Cleaner) ---
// Method 1: Explicit return with Block Body `{}`
const filteredNumbersExplicit = numbersList.filter((num) => {
    return num > 4; // Must use `return` keyword inside curly braces
});

// Method 2: Implicit return with Concise Body (One-liner syntax)
const filteredNumbersImplicit = numbersList.filter((num) => num > 4);

console.log("Filtered Numbers (filter method):", filteredNumbersExplicit);
// Output: [5, 6, 7, 8, 9, 10]


// --- Approach B: Achieving the same result manually with forEach() ---
// Useful to understand what filter() does under the hood!
const manualFilteredNumbers = [];

numbersList.forEach((num) => {
    if (num > 4) {
        manualFilteredNumbers.push(num);
    }
});

console.log("Filtered Numbers (manual forEach method):", manualFilteredNumbers);
// Output: [5, 6, 7, 8, 9, 10]


// ------------------------------------------------------------------------------
// 3. REAL-WORLD DATA FILTERING (ARRAY OF OBJECTS)
// ------------------------------------------------------------------------------
// In frontend development, filtering database results or API endpoints is common.

const bookCollection = [
    { title: 'Book One', genre: 'Fiction', publishYear: 1981, editionYear: 2004 },
    { title: 'Book Two', genre: 'Non-Fiction', publishYear: 1992, editionYear: 2008 },
    { title: 'Book Three', genre: 'History', publishYear: 1999, editionYear: 2007 },
    { title: 'Book Four', genre: 'Non-Fiction', publishYear: 1989, editionYear: 2010 },
    { title: 'Book Five', genre: 'Science', publishYear: 2009, editionYear: 2014 },
    { title: 'Book Six', genre: 'Fiction', publishYear: 1987, editionYear: 2010 },
    { title: 'Book Seven', genre: 'History', publishYear: 1986, editionYear: 1996 },
    { title: 'Book Eight', genre: 'Science', publishYear: 2011, editionYear: 2016 },
    { title: 'Book Nine', genre: 'Non-Fiction', publishYear: 1981, editionYear: 1989 },
];

// --- Single Condition Filter (Implicit Return) ---
// Query: Fetch all books in the 'History' genre
const historyBooks = bookCollection.filter((book) => book.genre === 'History');

console.log("\n--- History Books ---");
console.log(historyBooks);


// --- Multiple Condition Filter (Explicit Return with Logical Operators) ---
// Query: Fetch books published in or after 1995 AND belong to the 'History' genre
const modernHistoryBooks = bookCollection.filter((book) => { 
    return book.publishYear >= 1995 && book.genre === "History";
});

console.log("\n--- Modern History Books (>= 1995) ---");
console.log(modernHistoryBooks);


// ------------------------------------------------------------------------------
// 4. RELATED CONCEPT / INTERVIEW TIP: COMMON ARROW FUNCTION PITFALL
// ------------------------------------------------------------------------------
/*
 * GOTCHA ALERT:
 * If you write curly braces `{}` in an arrow function, JavaScript opens a BLOCK SCOPE.
 * If you omit `return` inside a block scope, the function implicitly returns `undefined`.
 * 
 * Example:
 * const wrong = myNums.filter((num) => { num > 4 }); 
 * // Output: [] (Empty array, because returning undefined is falsy for every item)
 */