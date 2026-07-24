// ============================================================================
// JavaScript Objects: Literals, Symbols, Nesting, Merging & Destructuring
// ============================================================================

/*
  ----------------------------------------------------------------------------
  CONCEPT 1: Object Creation (Literal vs Constructor/Singleton)
  ----------------------------------------------------------------------------
  - Object Literal (`const obj = {}`): Non-singleton instance.
  - Constructor Method (`Object.create()` or `new Object()`): Creates a Singleton object.
*/

// Using Symbol as an Object Key (INTERVIEW MUST-KNOW!):
// To use a Symbol as an object key, it MUST be wrapped in square brackets `[uniqueUserKey]`.
// Otherwise, JS will treat it as a standard string key `"uniqueUserKey"`.
const uniqueUserKey = Symbol("userIdentifier");

const platformUser = {
    userName: "Danny",
    "full name": "Danny Husain", // Key with spaces MUST be accessed via bracket notation
    [uniqueUserKey]: "secretKey123", // Correct Symbol key implementation
    userAge: 18,
    primaryLocation: "Jaipur",
    contactEmail: "danny@google.com",
    isAccountActive: false,
    recentLogins: ["Monday", "Saturday"]
};

// Accessing Object Properties:
console.log(platformUser.contactEmail);        // Output: "danny@google.com" (Dot notation)
console.log(platformUser["contactEmail"]);      // Output: "danny@google.com" (Bracket notation)
console.log(platformUser["full name"]);        // Output: "Danny Husain" (Required for string keys with spaces)
console.log(platformUser[uniqueUserKey]);      // Output: "secretKey123" (Required for accessing Symbol keys)


/*
  ----------------------------------------------------------------------------
  CONCEPT 2: Object Reassignment & Immutability (`Object.freeze`)
  ----------------------------------------------------------------------------
*/

platformUser.contactEmail = "danny@chatgpt.com"; // Modifies email value

// Object.freeze(platformUser); 
// Prevents any addition, deletion, or modification of properties.

platformUser.contactEmail = "danny@microsoft.com"; // Silently fails (or throws Error in strict mode)
// console.log(platformUser);


/*
  ----------------------------------------------------------------------------
  CONCEPT 3: Adding Methods & The `this` Keyword Context
  ----------------------------------------------------------------------------
  Functions assigned to object properties become object methods.
  The `this` keyword references the current object context.
*/

platformUser.greeting = function() {
    console.log("Hello JS User");
};

platformUser.greetingTwo = function() {
    console.log(`Hello JS User, ${this.userName}`); // `this` references platformUser properties
};

platformUser.greeting();    // Output: "Hello JS User"
platformUser.greetingTwo(); // Output: "Hello JS User, Danny"


/*
  ----------------------------------------------------------------------------
  CONCEPT 4: Singleton Object & Deeply Nested Structure Access
  ----------------------------------------------------------------------------
*/

// Singleton construction:
const appUserProfile = new Object(); // or const appUserProfile = {};
appUserProfile.id = "123abc";
appUserProfile.displayName = "Sammy";
appUserProfile.isLoggedIn = false;

// Nested Object Structures:
const detailedUserProfile = {
    email: "some@gmail.com",
    personalInfo: {
        fullName: {
            firstName: "Danny",
            lastName: "Husain"
        }
    }
};

// Accessing deeply nested properties:
console.log(detailedUserProfile.personalInfo.fullName.firstName); // Output: "Danny"

// 💡 PRO TIP (Optional Chaining `?.`): Protects against TypeError if a property is null/undefined
// console.log(detailedUserProfile.personalInfo?.fullName?.firstName);


/*
  ----------------------------------------------------------------------------
  CONCEPT 5: Merging Objects (`Object.assign()` vs Spread Operator)
  ----------------------------------------------------------------------------
*/

const sourceObject1 = { 1: "a", 2: "b" };
const sourceObject2 = { 3: "c", 4: "d" };
const sourceObject3 = { 5: "e", 6: "f" };

// ❌ TRAP: `{ sourceObject1, sourceObject2 }` creates nested objects inside a new object.

// ✅ METHOD 1: `Object.assign(target, ...sources)`
// Merges sources into target. Providing `{}` as first param ensures sourceObject1 isn't mutated.
// const mergedObject = Object.assign({}, sourceObject1, sourceObject2, sourceObject3);

// ✅ METHOD 2: Modern Spread Operator (`...`) - PREFERRED
const mergedObject = { ...sourceObject1, ...sourceObject2, ...sourceObject3 };
console.log(mergedObject); // Output: { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e', '6': 'f' }


/*
  ----------------------------------------------------------------------------
  CONCEPT 6: Handling Arrays of Objects & Utility Methods
  ----------------------------------------------------------------------------
*/

const activeUserSessionList = [
    { id: 1, email: "danny1@gmail.com" },
    { id: 2, email: "danny2@gmail.com" },
    { id: 3, email: "danny3@gmail.com" }
];

console.log(activeUserSessionList[1].email); // Output: "danny2@gmail.com"

// Inspecting Object Keys, Values, and Entries:
console.log(Object.keys(appUserProfile));   // Output: [ 'id', 'displayName', 'isLoggedIn' ] (Array of keys)
console.log(Object.values(appUserProfile)); // Output: [ '123abc', 'Sammy', false ] (Array of values)
console.log(Object.entries(appUserProfile));// Output: Key-value pairs as nested arrays `[ [ 'id', '123abc' ], ... ]`

// Safe property verification:
console.log(appUserProfile.hasOwnProperty('isLoggedIn')); // Output: true


/*
  ----------------------------------------------------------------------------
  CONCEPT 7: Object Destructuring & Property Aliasing
  ----------------------------------------------------------------------------
  Extracts properties from objects and assigns them to distinct variables.
*/

const courseDetails = {
    courseTitle: "JS in Hindi",
    coursePrice: "999",
    courseInstructor: "Danny"
};

// Standard access: courseDetails.courseInstructor
// Destructuring with property renaming (Aliasing `courseInstructor` -> `instructor`):
const { courseInstructor: instructor } = courseDetails;

console.log(instructor); // Output: "Danny"


/*
  ----------------------------------------------------------------------------
  BONUS CONCEPT FOR REVISION: API JSON Structure Format
  ----------------------------------------------------------------------------
  JSON (JavaScript Object Notation) is a text format used to exchange data.
  Unlike JS Objects, JSON KEYS and STRING VALUES MUST be enclosed in double quotes `""`.

  // Example JSON Object API Response:
  // {
  //     "name": "Danny",
  //     "courseTitle": "JS in Hindi",
  //     "price": "free"
  // }

  // Example JSON Array API Response:
  // [
  //     { "id": 1 },
  //     { "id": 2 }
  // ]
*/