/**
 * ==============================================================================
 * JavaScript Execution Context (JEC) & Call Stack Deep Dive
 * ==============================================================================
 * Core Concepts:
 * 1. Single-Threaded, Synchronous Execution Model
 * 2. Execution Context Types: Global Execution Context (GEC) & Function Execution Context (FEC)
 * 3. Execution Lifecycle:
 *    - Phase 1: Memory Creation Phase (Creation Phase)
 *    - Phase 2: Code Execution Phase (Execution Phase)
 * 4. Nested Functions: New Executional Environments & Return Keyword Flow
 * 5. Memory Cleanup: Garbage Collection / Deletion of Execution Contexts
 * 6. The Call Stack Mechanics (LIFO: Last In, First Out)
 * ==============================================================================
 */


// ==============================================================================
// STEP-BY-STEP CODE EXAMPLE FOR EXECUTION TRACING
// ==============================================================================

// Global Variable Declarations:
let firstVal = 10;
let secondVal = 5;

/**
 * Calculates the sum of two numbers.
 * @param {number} num1 
 * @param {number} num2 
 * @returns {number} Sum of numbers
 */
function addTwoNumbers(num1, num2) {
    let totalSum = num1 + num2;
    return totalSum;
}

/**
 * Calculates total by performing nested function calls.
 * Demonstrates Call Stack behavior with function-inside-function execution.
 * @param {number} baseVal 
 * @returns {number}
 */
function computeTotal(baseVal) {
    let multiplier = 2;
    let intermediateResult = addTwoNumbers(baseVal, multiplier); // Function call inside function!
    return intermediateResult * 10;
}

// Global Execution Statements:
let result1 = addTwoNumbers(firstVal, secondVal);
let result2 = computeTotal(result1);

console.log("Result 1:", result1); // Output: 15
console.log("Result 2:", result2); // Output: 170


/*
 ==============================================================================
 DETAILED THEORETICAL BREAKDOWN (FOR GITHUB REVISION)
 ==============================================================================

 ------------------------------------------------------------------------------
 1. JAVASCRIPT EXECUTION ENVIRONMENT
 ------------------------------------------------------------------------------
 JavaScript is a Single-Threaded, Synchronous language.
 - Single-Threaded: Executes one command/statement at a time on a single main thread.
 - Synchronous: Executes line-by-line in strict sequence (top-to-bottom).

 Everything in JS runs inside an EXECUTION CONTEXT (EC). You can think of an 
 Execution Context as a container/wrapper that holds the code currently running 
 and manages its variables, scope, and `this` reference.


 ------------------------------------------------------------------------------
 2. THE THREE MAIN EXECUTION CONTEXT TYPES
 ------------------------------------------------------------------------------
 A. Global Execution Context (GEC):
    - Created automatically as soon as the JS file starts running.
    - Bound to the global scope (`window` in browsers, `global` in Node.js, or `{}` in module files).
    - `this` keyword points to the Global Object in GEC.
    - There is ONLY ONE Global Execution Context per program.

 B. Function Execution Context (FEC):
    - Created dynamic EVERY TIME a function is invoked (called).
    - Each function call gets its own brand-new Execution Context.

 C. Eval Execution Context:
    - Created inside code executed via `eval()` (rarely used due to security risks).


 ------------------------------------------------------------------------------
 3. PHASES OF AN EXECUTION CONTEXT (THE 2-PHASE LIFECYCLE)
 ------------------------------------------------------------------------------
 Every Execution Context (both Global and Function) goes through TWO PHASES:

 Phase 1: Memory Creation Phase (Creation Phase)
 ------------------------------------------------
 - JavaScript scans the code line-by-line BEFORE executing any actual statements.
 - Allocates memory space for all variables and function declarations:
   * Variables (`var`): Allocated memory and set to `undefined`.
   * Variables (`let` & `const`): Allocated memory in Temporal Dead Zone (uninitialized).
   * Function Declarations: Stored in memory with their complete function definitions.
   * Function Parameters: Allocated in memory as arguments inside FEC.

 Phase 2: Code Execution Phase (Execution Phase)
 ----------------------------------------------
 - JavaScript re-reads the code from top to bottom and actually EXECUTES statements:
   * Assigns actual values to variables (e.g., `firstVal = 10`).
   * Evaluates expressions and calculations.
   * Invokes functions (which creates NEW Function Execution Contexts).


 ------------------------------------------------------------------------------
 4. STEP-BY-STEP TRACE OF OUR EXAMPLE CODE
 ------------------------------------------------------------------------------

 [STEP 1]: Creation of Global Execution Context (GEC)
 ---------------------------------------------------
 1. Memory Creation Phase (GEC):
    - `firstVal`            --> Allocated (uninitialized / TDZ)
    - `secondVal`           --> Allocated (uninitialized / TDZ)
    - `addTwoNumbers`       --> Stored whole function definition
    - `computeTotal`        --> Stored whole function definition
    - `result1`             --> Allocated (uninitialized / TDZ)
    - `result2`             --> Allocated (uninitialized / TDZ)

 2. Code Execution Phase (GEC):
    - `firstVal = 10`       --> Assigned 10
    - `secondVal = 5`       --> Assigned 5
    - Reaches line: `let result1 = addTwoNumbers(firstVal, secondVal)`
      * Encounters function call `addTwoNumbers(10, 5)`!
      * Pauses GEC execution and creates a NEW Function Execution Context (FEC 1).


 [STEP 2]: Execution of `addTwoNumbers(10, 5)` (FEC 1)
 ----------------------------------------------------
 Creates a brand-new Sandbox / Executional Environment:

 1. Memory Creation Phase (FEC 1):
    - `num1` (param)        --> `undefined`
    - `num2` (param)        --> `undefined`
    - `totalSum`            --> Allocated (uninitialized)

 2. Code Execution Phase (FEC 1):
    - `num1 = 10`, `num2 = 5` (Arguments assigned)
    - `totalSum = 10 + 5`   --> `totalSum = 15`
    - Reaches `return totalSum`:
      * Handover: Returns the calculated value `15` back to the Parent Context (GEC).
      * Cleanup: FEC 1 is DELETED/DESTROYED immediately from memory!

 Back in GEC:
 - `result1` is assigned the returned value: `15`.


 [STEP 3]: Execution of `computeTotal(result1)` (FEC 2 -> Nested FEC 3)
 ----------------------------------------------------------------------
 Reaches line: `let result2 = computeTotal(15)`
 - Creates a NEW Function Execution Context (FEC 2).

 1. Memory Creation Phase (FEC 2):
    - `baseVal`             --> `undefined`
    - `multiplier`          --> Allocated
    - `intermediateResult`  --> Allocated

 2. Code Execution Phase (FEC 2):
    - `baseVal = 15`
    - `multiplier = 2`
    - Reaches line: `addTwoNumbers(15, 2)` (Nested Function Call!)
      * Pauses FEC 2 execution and creates a NEW Function Execution Context (FEC 3).

      ======================================================
      [NESTED CALL]: `addTwoNumbers(15, 2)` (FEC 3)
      ------------------------------------------------------
      - Memory Phase: `num1`, `num2`, `totalSum` allocated.
      - Execution Phase: `num1 = 15`, `num2 = 2`, `totalSum = 17`.
      - Returns `17` back to parent context (FEC 2).
      - FEC 3 is DELETED/DESTROYED from memory!
      ======================================================

 Back in FEC 2:
 - `intermediateResult = 17`
 - Evaluates: `return 17 * 10` --> `return 170`
 - Handover: Returns `170` back to Global Execution Context (GEC).
 - FEC 2 is DELETED/DESTROYED from memory!

 Back in GEC:
 - `result2` is assigned `170`.
 - Logs results to console.
 - Program ends -> GEC is finally popped and destroyed!


 ------------------------------------------------------------------------------
 5. THE CALL STACK MECHANICS (LIFO STRUCTURE)
 ------------------------------------------------------------------------------
 The Call Stack is a data structure used by the JavaScript engine to keep track 
 of function calls and execution context hierarchy.

 Stack Rule: LIFO (Last In, First Out)

 Visualization of Call Stack State during nested execution:

 |                              |
 |                              |
 |  addTwoNumbers() [FEC 3]     |  <-- Push when inner function is called (Active)
 |  computeTotal()  [FEC 2]     |  <-- Paused (Waiting for inner call to finish)
 |  Global Execution Context    |  <-- Base layer (Always at bottom of stack)
 +------------------------------+

 Execution Sequence in Call Stack:
 1. `GEC` is pushed to stack bottom.
 2. `computeTotal()` is called -> Pushed onto stack: [GEC, computeTotal]
 3. Inside `computeTotal`, `addTwoNumbers()` is called -> Pushed: [GEC, computeTotal, addTwoNumbers]
 4. `addTwoNumbers()` completes & returns -> Popped off: [GEC, computeTotal]
 5. `computeTotal()` completes & returns -> Popped off: [GEC]
 6. Whole program finishes -> `GEC` popped off stack (Stack empty).
 */