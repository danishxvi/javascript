/**
 * ==============================================================================
 * JavaScript `for` Loops, Nested Iteration, & Loop Control Statements Guide
 * ==============================================================================
 * Topics Covered:
 * 1. Basic `for` Loop Syntax & Iteration Mechanics
 * 2. Scope Safety inside Loop Bodies (`let` vs Block Scope)
 * 3. Nested `for` Loops (Grid/Matrix iteration & Multiplication Table pattern)
 * 4. Iterating over Arrays using Index Counters & Bounds Checking
 * 5. Loop Control Statements: `break` (Immediate Termination)
 * 6. Loop Control Statements: `continue` (Skipping Iteration)
 * ==============================================================================
 */


// ------------------------------------------------------------------------------
// 1. BASIC `for` LOOP & BLOCK SCOPE SAFETY
// ------------------------------------------------------------------------------

/**
 * Basic `for` Loop Breakdown:
 * for (initialization; condition; increment/decrement) { ... }
 * 
 * Execution Flow:
 * 1. Initialization: `let count = 0` runs ONCE before loop starts.
 * 2. Condition Check: `count <= 10` evaluates before every iteration.
 * 3. Body Execution: Code inside `{}` runs if condition is true.
 * 4. Increment/Update: `count++` executes after every iteration.
 */

for (let count = 0; count <= 10; count++) {
    const currentElement = count;
    
    if (currentElement === 5) {
        console.log("Special condition triggered: 5 is reached!");
    }
    // console.log(`Current Count: ${currentElement}`);
}

// SCOPE SAFETY CHECK:
// Accessing `count` or `currentElement` outside the loop block throws a ReferenceError.
// console.log(currentElement); // ReferenceError: currentElement is not defined


// ------------------------------------------------------------------------------
// 2. NESTED `for` LOOPS (MULTIPLICATION TABLE GENERATOR)
// ------------------------------------------------------------------------------

/**
 * Nested Loops: A loop inside another loop.
 * The inner loop completes ALL of its iterations for EVERY single iteration of the outer loop.
 * Total execution cycles = (Outer iterations) * (Inner iterations)
 */

console.log("--- Multiplication Table (1 to 10) ---");

for (let outerValue = 1; outerValue <= 10; outerValue++) {
    // console.log(`Outer Table Heading: ${outerValue}`);
    
    for (let innerValue = 1; innerValue <= 10; innerValue++) {
        // console.log(`Inner Value: ${innerValue} of Outer: ${outerValue}`);
        
        const product = outerValue * innerValue;
        // console.log(`${outerValue} * ${innerValue} = ${product}`);
    }
}


// ------------------------------------------------------------------------------
// 3. ARRAY ITERATION USING `for` LOOP
// ------------------------------------------------------------------------------

const superheroList = ["flash", "batman", "superman"];

/**
 * Array Iteration Mechanics:
 * - Arrays are zero-indexed (First element is at index 0).
 * - Condition must be `itemIndex < array.length` (Strictly less than) to prevent index out-of-bounds!
 */
console.log("\n--- Superhero List Iteration ---");
console.log(`Total Superheroes: ${superheroList.length}`);

for (let itemIndex = 0; itemIndex < superheroList.length; itemIndex++) {
    const heroName = superheroList[itemIndex];
    console.log(`Hero at index ${itemIndex}: ${heroName}`);
}


// ------------------------------------------------------------------------------
// 4. LOOP CONTROL STATEMENTS: `break` VS `continue`
// ------------------------------------------------------------------------------

/**
 * CASE A: `break` Statement
 * Instantly TERMINATES the entire loop execution and jumps control outside the loop block.
 */

console.log("\n--- Demonstrating `break` Statement ---");

for (let counter = 1; counter <= 20; counter++) {
    if (counter === 5) {
        console.log(`Detected target value: ${counter} -> Exiting loop completely.`);
        break; // Loop terminates here! Numbers 5 through 20 will NOT be processed.
    }
    console.log(`Processing item: ${counter}`);
}


/**
 * CASE B: `continue` Statement
 * SKIPS the current iteration's remaining code and jumps straight to the next iteration step (increment).
 */

console.log("\n--- Demonstrating `continue` Statement ---");

for (let counter = 1; counter <= 20; counter++) {
    if (counter === 5) {
        console.log(`Detected target value: ${counter} -> Skipping this specific iteration.`);
        continue; // Skips logging below for 5, then continues execution at counter = 6!
    }
    console.log(`Processing item: ${counter}`);
}