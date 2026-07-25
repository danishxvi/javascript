/**
 * ==============================================================================
 * JavaScript `while` & `do-while` Loops Guide
 * ==============================================================================
 * Topics Covered:
 * 1. `while` Loop Mechanics & Counter Management
 * 2. Iterating over Arrays using `while` Loops
 * 3. Preventing Infinite Loops (Termination Conditions)
 * 4. `do-while` Loop Mechanics
 * 5. Edge Case: "Execute At Least Once" Guarantee in `do-while` Loops
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. BASIC `while` LOOP MECHANICS
// ------------------------------------------------------------------------------

/**
 * `while` Loop Syntax:
 * while (condition) {
 *     // Code to execute
 *     // Increment / State change (Crucial to prevent infinite loops!)
 * }
 * 
 * Execution Flow:
 * Checks the condition FIRST. If true, runs the block. If false, skips it entirely.
 */

let counterValue = 0;

console.log("--- Standard `while` Loop (Step by 2) ---");

while (counterValue <= 10) {
    console.log(`Current Index Value: ${counterValue}`);
    
    // State Mutation: Increment counter by 2
    counterValue = counterValue + 2; // Equivalent to: counterValue += 2
}


// ------------------------------------------------------------------------------
// 2. ARRAY TRAVERSAL USING `while` LOOP
// ------------------------------------------------------------------------------

const superheroRoster = ["flash", "batman", "superman"];

let arrayIndex = 0;

console.log("\n--- Array Traversal via `while` Loop ---");

while (arrayIndex < superheroRoster.length) {
    const currentHero = superheroRoster[arrayIndex];
    console.log(`Hero at position ${arrayIndex}: ${currentHero}`);
    
    // Increment index to move to next item
    arrayIndex++; // Equivalent to: arrayIndex = arrayIndex + 1
}

/*
 * CRITICAL GOTCHA (Infinite Loops):
 * If you forget to update the iterator variable (`arrayIndex++`) inside a `while` loop,
 * the condition remains `true` forever, freezing your program/browser tab!
 */


// ------------------------------------------------------------------------------
// 3. `do-while` LOOP & THE "AT LEAST ONCE" GUARANTEE
// ------------------------------------------------------------------------------

/**
 * `do-while` Loop Syntax:
 * do {
 *     // Code to execute
 * } while (condition);
 * 
 * Execution Flow:
 * Runs the code block FIRST, and checks the condition AFTERWARDS.
 * 
 * Key Difference:
 * A `while` loop executes 0 or more times.
 * A `do-while` loop ALWAYS executes AT LEAST ONCE, even if the condition is initially false!
 */

console.log("\n--- `do-while` Loop Edge Case Demonstration ---");

let playerScore = 11;

do {
    // This block executes ONCE before checking if playerScore <= 10
    console.log(`Player Score is: ${playerScore}`);
    playerScore++;
} while (playerScore <= 10);

console.log(`Final Player Score after loop exit: ${playerScore}`);

/*
 * Explanation for output above:
 * Even though `11 <= 10` is FALSE from the start, the loop body executes once:
 * 1. Logs: "Player Score is: 11"
 * 2. Increments `playerScore` to 12
 * 3. Evaluates condition: `12 <= 10` (false) -> Exits loop!
 */