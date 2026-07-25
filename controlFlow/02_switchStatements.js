/**
 * ==============================================================================
 * JavaScript Switch-Case Statements & Control Flow Guide
 * ==============================================================================
 * Topics Covered:
 * 1. Basic Switch Syntax & Key-Matching Mechanism
 * 2. Case Evaluation & Strict Equality (`===`)
 * 3. The `break` Keyword & Fallthrough Trap
 * 4. The `default` Fallback Case
 * 5. String-based vs Numeric Switches
 * 6. Bonus Concept: Switch Alternatives (Object Literals / Lookup Tables)
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. BASIC SWITCH SYNTAX & STRICT EQUALITY
// ------------------------------------------------------------------------------

/**
 * Switch Syntax Template:
 * 
 * switch (expression) {
 *     case value1:
 *         // Code block
 *         break;
 *     case value2:
 *         // Code block
 *         break;
 *     default:
 *         // Fallback code block
 *         break;
 * }
 */

const targetMonthKey = "march";

/**
 * KEY CONCEPT: Strict Equality (`===`)
 * Switch statements evaluate cases using STRICT EQUALITY.
 * This means data types MUST match!
 * Example: `switch (2)` will NOT match `case "2":`.
 */
switch (targetMonthKey) {
    case "jan":
        console.log("Matched: January");
        break;
    case "feb":
        console.log("Matched: February");
        break;
    case "march":
        console.log("Matched: March"); // Output: Matched: March
        break;
    case "april":
        console.log("Matched: April");
        break;

    default:
        console.log("Default case matched: No valid month key found.");
        break;
}


// ------------------------------------------------------------------------------
// 2. THE `break` KEYWORD & FALLTHROUGH TRAP
// ------------------------------------------------------------------------------

/**
 * CRITICAL GOTCHA: Fallthrough
 * If you omit the `break` statement inside a matching case, JavaScript will 
 * continue executing all subsequent cases sequentially WITHOUT checking their 
 * conditions until it encounters a `break` or reaches the end of the switch block!
 * 
 * Note: The `default` block is only skipped if a `break` occurs before it.
 */

const userAccessLevel = 2;

console.log("\n--- Demonstrating Intentional Fallthrough ---");

switch (userAccessLevel) {
    case 1:
        console.log("Level 1: Basic View Access");
        // Omitted break intentionally to grant cumulative permissions:
    case 2:
        console.log("Level 2: Edit Access");
        // Omitted break intentionally!
    case 3:
        console.log("Level 3: Admin Delete Access");
        break; // Stops here
    default:
        console.log("Unknown Level");
        break;
}
/*
 * Output for userAccessLevel = 2:
 * Level 2: Edit Access
 * Level 3: Admin Delete Access
 */


// ------------------------------------------------------------------------------
// 3. MULTI-CASE GROUPING (INTENTIONAL FALLTHROUGH PATTERN)
// ------------------------------------------------------------------------------

const selectedDay = "Saturday";

switch (selectedDay) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        console.log("Weekday: Time to work!");
        break;

    case "Saturday":
    case "Sunday":
        console.log("Weekend: Time to relax!"); // Output: Weekend: Time to relax!
        break;

    default:
        console.log("Invalid day provided.");
        break;
}


// ------------------------------------------------------------------------------
// 4. BONUS REVISION CONCEPT: OBJECT LOOKUP TABLES (SWITCH ALTERNATIVE)
// ------------------------------------------------------------------------------

/**
 * In modern JS, Object Literals are often preferred over complex switch statements 
 * for simple key-value mappings. They offer cleaner syntax and O(1) performance lookup.
 */

const monthDisplayNames = {
    jan: "January",
    feb: "February",
    march: "March",
    april: "April"
};

const activeMonth = "march";
const resolvedMonthName = monthDisplayNames[activeMonth] || "Default case matched: No valid month key found.";

console.log("\n--- Object Lookup Alternative ---");
console.log("Resolved Month Name:", resolvedMonthName); // Output: March