/**
 * ==============================================================================
 * JavaScript Immediately Invoked Function Expressions (IIFE) Guide
 * ==============================================================================
 * Topics Covered:
 * 1. What is an IIFE and why is it used? (Pollution of Global Scope)
 * 2. Named IIFE Syntax
 * 3. Unnamed / Arrow Function IIFE Syntax
 * 4. Passing Arguments to IIFEs
 * 5. The Critical Semicolon `;` Requirement when chaining IIFEs
 * 6. Bonus Concept: Module Pattern / Encapsulation using Private Scope
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. WHAT IS AN IIFE & WHY DO WE NEED IT?
// ------------------------------------------------------------------------------

/*
 * Definition: An IIFE (pronounced "Iffy") is a function that runs as soon as it is defined.
 * 
 * Syntax Breakdown:
 *  ( function definition ) ( invocation arguments );
 *  |____________________|  |__________________|
 *       Grouping Operator   Execution Operator
 * 
 * Primary Reasons to Use an IIFE:
 * 1. Avoid Global Scope Pollution: Prevents variables declared inside from cluttering or 
 *    overriding global namespace variables.
 * 2. Immediate Execution: Executes setup logic (e.g., establishing DB connection, 
 *    initializing state) immediately upon file load.
 * 3. Private Scope / Encapsulation: Creates a private closure for internal variables.
 */


// ------------------------------------------------------------------------------
// 2. NAMED IIFE & THE CRITICAL SEMICOLON (;) RULE
// ------------------------------------------------------------------------------

/**
 * Named IIFE Example:
 * Gives the function an explicit name (`initializePrimaryDatabaseConnection`).
 * 
 * CRITICAL GOTCHA (The Semicolon Rule):
 * You MUST place a semicolon `;` at the end of an IIFE invocation!
 * If you omit the trailing semicolon, JavaScript will not know where the IIFE ends. 
 * Invoking a second IIFE immediately after without a semicolon will throw a `TypeError` 
 * (e.g., `(intermediate value)(...) is not a function`).
 */
(function initializePrimaryDatabaseConnection() {
    // Named IIFE: Has function identifier `initializePrimaryDatabaseConnection`
    console.log("DB CONNECTED: Primary Database established successfully.");
})(); // <-- Mandatory semicolon here to terminate execution context!


// ------------------------------------------------------------------------------
// 3. UNNAMED / ARROW FUNCTION IIFE WITH PARAMETERS
// ------------------------------------------------------------------------------

/**
 * Unnamed (Anonymous) Arrow Function IIFE with Arguments.
 * 
 * @param {string} targetUsername - Passed via invocation parentheses `('hitesh')`
 */
((targetUsername) => {
    // Unnamed IIFE using ES6 Arrow Function syntax
    console.log(`DB CONNECTED TWO: Connection bound to user -> ${targetUsername}`);
})('hitesh'); // Arguments are passed directly into the second pair of parentheses


// ------------------------------------------------------------------------------
// 4. BONUS REVISION CONCEPT: PRIVATE SCOPE / ENCAPSULATION PATTERN
// ------------------------------------------------------------------------------

/**
 * Demonstrates how IIFEs create private variables that cannot be accessed or 
 * tampered with from the outside world.
 */
const databaseModule = (() => {
    // Private variable (Not accessible from global scope):
    const secretConnectionString = "Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword;";

    return {
        // Exposed public method:
        connect: () => {
            console.log("Connecting using private credentials...");
            // Internal access to secretConnectionString is safe via closure
        }
    };
})();

databaseModule.connect(); // Output: Connecting using private credentials...
// console.log(databaseModule.secretConnectionString); // Output: undefined (Protected!)