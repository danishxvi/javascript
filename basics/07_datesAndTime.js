// ============================================================================
// JavaScript Dates, Timestamps, Formatting, & Modern Localization
// ============================================================================

/*
  ----------------------------------------------------------------------------
  CONCEPT 1: The `Date` Object & String Conversion Methods
  ----------------------------------------------------------------------------
  - JavaScript `Date` objects represent a single moment in time.
  - They are measured in milliseconds since the Unix Epoch (Jan 1, 1970, 00:00:00 UTC).
  - Data Type: `typeof Date` returns "object".
*/

const currentSystemDate = new Date();

// console.log(currentSystemDate.toString());     // Output: "Thu Jul 23 2026 10:11:38 GMT+0530 (India Standard Time)"
// console.log(currentSystemDate.toDateString()); // Output: "Thu Jul 23 2026" (Only date part)
// console.log(currentSystemDate.toISOString());  // Output: "2026-07-23T04:41:38.000Z" (Standard ISO Format)
// console.log(currentSystemDate.toLocaleString());// Output: "23/7/2026, 10:11:38 am" (Formatted to local system preferences)

console.log(typeof currentSystemDate); // Output: "object"


/*
  ----------------------------------------------------------------------------
  CONCEPT 2: Custom Date Instantiation & Parsing Rules
  ----------------------------------------------------------------------------
  ⚠️ CRITICAL INTERVIEW TRAP: Month Indexing!
  - When passing parameters as numbers `(Year, Month, Day)`: Months are ZERO-INDEXED! 
    (0 = January, 1 = February, ..., 11 = December).
  - When passing a String `"YYYY-MM-DD"` or `"MM-DD-YYYY"`: Months are ONE-INDEXED!
    ("01" = January).
*/

// Passing parameters as numbers: (Year, MonthIndex, Date, Hours, Minutes)
// const eventStartDate = new Date(2023, 0, 23);       // Jan 23, 2023
// const eventStartDate = new Date(2023, 0, 23, 5, 3); // Jan 23, 2023 at 05:03 AM

// Passing formatted Date Strings:
// const eventStartDate = new Date("2023-01-14");    // YYYY-MM-DD
const eventStartDate = new Date("01-14-2023");        // MM-DD-YYYY (Common US Format)

console.log(eventStartDate.toLocaleString()); // Output: "14/1/2023, 12:00:00 am"


/*
  ----------------------------------------------------------------------------
  CONCEPT 3: Timestamps & Millisecond Comparisons
  ----------------------------------------------------------------------------
  Timestamps are fundamental for calculating time differences, booking systems, 
  and timer functionality.
*/

// Returns current timestamp in milliseconds (from Jan 1, 1970):
const currentMillisecondStamp = Date.now();
console.log(currentMillisecondStamp); // e.g., 1784782298000

// Converting a specific Date object into a timestamp in milliseconds:
console.log(eventStartDate.getTime()); // Output: 1673634600000

// 💡 Converting Milliseconds to Seconds (Common in API tokens & expiry checks):
// Math.floor() removes the decimal places created by division.
const timestampInSeconds = Math.floor(Date.now() / 1000);
console.log(timestampInSeconds);


/*
  ----------------------------------------------------------------------------
  CONCEPT 4: Extracting Specific Date Components
  ----------------------------------------------------------------------------
*/

const activeDateSession = new Date();

console.log(activeDateSession);

// Month extraction (Add +1 because months are 0-indexed: Jan = 0):
console.log(activeDateSession.getMonth() + 1); // Output: 7 (July)

// Day of the week extraction (0-indexed: 0 = Sunday, 1 = Monday, ..., 4 = Thursday):
console.log(activeDateSession.getDay()); // Output: 4 (Thursday)

// String template usage:
const formattedTimeExcerpt = `Today is day ${activeDateSession.getDay()} of the week.`;
console.log(formattedTimeExcerpt);


/*
  ----------------------------------------------------------------------------
  CONCEPT 5: Advanced Custom Date Formatting (`toLocaleString` Options)
  ----------------------------------------------------------------------------
  `Intl.DateTimeFormat` options allow full customization of human-readable 
  date/time representations without relying on third-party libraries (like Moment.js).
*/

const customFormattedDateString = activeDateSession.toLocaleString('default', {
    weekday: "long",   // "Thursday" (full name)
    year: "numeric",   // "2026"
    month: "short",    // "Jul"
    day: "numeric"     // "23"
});

console.log(customFormattedDateString); // Output: "Thursday, Jul 23, 2026"