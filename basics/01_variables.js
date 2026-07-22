// ============================================================================
// JavaScript Variables, Declarations, Scope & Hoisting
// ============================================================================

/*
  ----------------------------------------------------------------------------
  CONCEPT 1: Declaration Keywords (`const`, `let`, `var`) & Implicit Globals
  ----------------------------------------------------------------------------
*/

// 1. `const` (Block-scoped, Read-only Binding):
// Must be initialized at declaration. Reassignment is completely forbidden.
const accountId = 606110110015516; 

// 2. `let` (Block-scoped, Reassignable):
// Can be declared without a value (defaults to `undefined`) and reassigned later.
let accountEmail = "danish16112002@gmail.com";

// 3. `var` (Function-scoped / Globally-scoped):
// Legacy keyword. Ignores block scope (`{}` in loops/conditionals), causing scope leaks.
var accountPassword = "12345";

// 4. Implicit Global Variable (Undeclared):
// Assigning a value without `const`, `let`, or `var` attaches it to the global object.
// ❌ BAD PRACTICE: Pollutes global scope, leads to bugs, and throws errors in strict mode.
accountCity = "Delhi";

// 5. Uninitialized Variable:
// Declaring a variable without assigning a value automatically defaults to `undefined`.
let accountState;


/*
  ----------------------------------------------------------------------------
  CONCEPT 2: Reassignment Rules & The `const` Mutability Catch
  ----------------------------------------------------------------------------
*/

// accountId = 2; 
// ❌ Uncaught TypeError: Assignment to constant variable.

accountEmail = "dh@dh.com";
accountPassword = "123456789";
accountCity = "Bengaluru";

// ⚠️ INTERVIEW CONCEPT: `const` protects the VARIABLE BINDING, not the internal VALUE!
// For objects and arrays, you CAN modify properties or push items under `const`.
const userProfile = { name: "Danish", role: "Developer" };
userProfile.role = "Lead Developer"; // ✅ Fully allowed!

// Object.freeze() prevents mutating the contents if true immutability is needed:
Object.freeze(userProfile);
// userProfile.role = "Admin"; // Silent failure (or throws TypeError in strict mode)


/*
  ----------------------------------------------------------------------------
  CONCEPT 3: Scope Comparison (Block Scope vs. Function Scope)
  ----------------------------------------------------------------------------
*/

if (true) {
    var varScoped = "I leak outside this block!";
    let letScoped = "I am safely hidden inside this block!";
    const constScoped = "I am also safely hidden!";
}

console.log(varScoped); // Output: "I leak outside this block!"
// console.log(letScoped);   // ❌ ReferenceError: letScoped is not defined
// console.log(constScoped); // ❌ ReferenceError: constScoped is not defined


/*
  ----------------------------------------------------------------------------
  CONCEPT 4: Hoisting & The Temporal Dead Zone (TDZ)
  ----------------------------------------------------------------------------
  - Hoisting: JS moves variable declarations to the top of their scope during compilation.
  - `var` is hoisted and initialized with `undefined`.
  - `let` and `const` are hoisted BUT placed in the "Temporal Dead Zone" (TDZ) 
    until the execution reaches their actual line of declaration.
*/

console.log(hoistedVar); // Output: undefined (Hoisted, but value isn't assigned yet)
var hoistedVar = "Hello";

// console.log(hoistedLet); // ❌ ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = "World";


/*
  ----------------------------------------------------------------------------
  CONCEPT 5: Logging Methods & Data Inspection
  ----------------------------------------------------------------------------
*/

// Standard log:
console.log(accountId); // Output: 606110110015516

// `console.table()` formats array or object data into a clean, visual grid:
console.table([accountId, accountEmail, accountPassword, accountCity, accountState]);

// Pro Tip: Log multiple variables as an object to see both variable names and values!
console.log({ accountId, accountEmail, accountCity }); 
// Output: { accountId: 606110110015516, accountEmail: 'dh@dh.com', accountCity: 'Bengaluru' }