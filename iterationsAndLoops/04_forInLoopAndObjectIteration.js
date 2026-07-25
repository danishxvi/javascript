/**
 * ==============================================================================
 * JavaScript `for...in` Loops & Object Enumeration Guide
 * ==============================================================================
 * Topics Covered:
 * 1. `for...in` Loop Mechanics (Enumerating Enumerable Keys/Properties)
 * 2. Iterating over Plain Object Keys and Values
 * 3. `for...in` over Arrays (Indices vs Values Pitfall)
 * 4. `for...in` vs `for...of` Comparison Matrix
 * 5. CRITICAL GOTCHA: Why `for...in` Does NOT Work on `Map` Data Structures
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. `for...in` OVER PLAIN OBJECTS
// ------------------------------------------------------------------------------

/**
 * `for...in` Syntax:
 * for (const key in object) { ... }
 * 
 * Primary Purpose:
 * Iterates over all enumerable string properties (keys) of an object.
 * To access values: Use bracket notation `object[key]`.
 */

const languageExtensionsMap = {
    js: 'javascript',
    cpp: 'C++',
    rb: 'ruby',
    swift: 'swift by apple'
};

console.log("--- `for...in` Over Plain Object ---");

for (const fileExtension in languageExtensionsMap) {
    const fullLanguageName = languageExtensionsMap[fileExtension];
    console.log(`${fileExtension} shortcut is for ${fullLanguageName}`);
}


// ------------------------------------------------------------------------------
// 2. `for...in` OVER ARRAYS (INDEX VS VALUE GOTCHA)
// ------------------------------------------------------------------------------

const programmingLanguagesList = ["js", "rb", "py", "java", "cpp"];

/**
 * CRITICAL DISTINCTION:
 * - `for...in` iterates over the KEYS (Indices) of an Array as String types ("0", "1", "2").
 * - `for...of` iterates over the VALUES of an Array directly ("js", "rb", "py").
 * 
 * Best Practice:
 * ALWAYS prefer `for...of` or standard `for` loops for arrays. Use `for...in` primarily for Objects.
 */

console.log("\n--- `for...in` Over Array (Yields Indices as Strings) ---");

for (const arrayIndex in programmingLanguagesList) {
    // `arrayIndex` holds "0", "1", "2" (String representation of index)
    const languageValue = programmingLanguagesList[arrayIndex];
    console.log(`Index ${arrayIndex} stores value: ${languageValue}`);
}


// ------------------------------------------------------------------------------
// 3. CRITICAL GOTCHA: `for...in` SILENTLY FAILS ON `Map`
// ------------------------------------------------------------------------------

const countryCodeMap = new Map();
countryCodeMap.set('IN', "India");
countryCodeMap.set('USA', "United States of America");
countryCodeMap.set('Fr', "France");

/**
 * WHY IT FAILS:
 * `Map` entries are not stored as enumerable object properties! 
 * Therefore, `for...in` will produce NO OUTPUT (it fails silently without throwing an error).
 * 
 * Correct Approach: Use `for...of` for Maps!
 */

console.log("\n--- Attempting `for...in` on Map (Produces Nothing) ---");

for (const mapKey in countryCodeMap) {
    // This code block NEVER executes because Map keys are not enumerable object properties!
    console.log("Map key:", mapKey);
}

console.log("(Notice above: Nothing was printed from the Map using `for...in`)");


// ------------------------------------------------------------------------------
// 4. SUMMARY COMPARISON: `for...in` VS `for...of`
// ------------------------------------------------------------------------------

/*
 * ==============================================================================
 * SUMMARY CHEAT-SHEET FOR REVISION:
 * ==============================================================================
 * Operator   | Primary Target           | Yields What?         | Example
 * -----------+--------------------------+----------------------+--------------------
 * for...in   | Objects {}               | Keys / Properties    | "js", "cpp"
 * for...in   | Arrays []                | Array Indices        | "0", "1", "2"
 * for...of   | Arrays [] / Iterables    | Array Values         | "js", "rb"
 * for...of   | Map / Set                | Entries [key, value] | ['IN', 'India']
 * for...of   | Objects {}               | TypeError!           | Not Iterable
 * for...in   | Map / Set                | Nothing (Silent)     | Non-enumerable
 * ==============================================================================
 */