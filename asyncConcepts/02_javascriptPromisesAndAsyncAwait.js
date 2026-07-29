/**
 * ARCHIVAL REFERENCE: Asynchronous JavaScript - Promises, Async/Await & Microtask Queue
 * 
 * CORE CONCEPTS COVERED:
 * 1. Creating and consuming Promises (Resolve vs. Reject).
 * 2. Method Chaining (.then, .catch, .finally) & value passing between handlers.
 * 3. Consuming Promises with async/await and handling rejections with try...catch.
 * 4. Fetch API microtask priority (Promises vs. setTimeout/Macrotask Queue).
 * 5. Concurrent execution using Promise.all() and Promise.allSettled().
 */

// =============================================================================
// PATTERN 1: Basic Promise Creation and Consumption
// =============================================================================

// Storing a promise instance in a variable
const basicTimerPromise = new Promise(function (resolve, reject) {
  // Simulating an asynchronous operation (e.g., database lookup or network request)
  setTimeout(function () {
    console.log('[Pattern 1]: Basic async task completed in background.');
    resolve(); // Transition state from PENDING -> FULFILLED
  }, 1000);
});

// Consuming the promise using .then()
basicTimerPromise.then(function () {
  console.log('[Pattern 1]: Promise successfully consumed.');
});


// =============================================================================
// PATTERN 2: Anonymous Inline Promise Chaining
// =============================================================================

// You don't always need to store a Promise in a variable if used immediately
new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log('[Pattern 2]: Inline async task completed.');
    resolve();
  }, 1000);
}).then(function () {
  console.log('[Pattern 2]: Inline promise resolved.');
});


// =============================================================================
// PATTERN 3: Passing Data through Resolves
// =============================================================================

const fetchUserProfilePromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    // Data passed into resolve() is made available to the .then() callback
    const mockUserData = { username: 'Chai', email: 'chai@example.com' };
    resolve(mockUserData);
  }, 1000);
});

fetchUserProfilePromise.then(function (userProfile) {
  console.log('[Pattern 3]: User payload received:', userProfile);
});


// =============================================================================
// PATTERN 4: Chaining .then(), Error Rejection (.catch), and Cleanup (.finally)
// =============================================================================

const validateUserCredentialsPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    const hasOperationError = false; // Toggle to test rejection branch

    if (!hasOperationError) {
      resolve({ username: 'danny', role: 'admin' });
    } else {
      reject('ERROR: Failed to validate credentials from database.');
    }
  }, 1000);
});

validateUserCredentialsPromise
  // First .then() receives the resolved object and can return a transformed value
  .then((userData) => {
    console.log('[Pattern 4]: Initial payload:', userData);
    return userData.username; // Returned value is wrapped in a resolved Promise automatically
  })
  // Second .then() receives the value returned by the previous handler
  .then((extractedUsername) => {
    console.log('[Pattern 4]: Extracted username via chain:', extractedUsername);
  })
  // Handles any rejection in the promise or uncaught errors in .then() blocks
  .catch(function (error) {
    console.error('[Pattern 4 Error]:', error);
  })
  // Executes regardless of resolution or rejection (ideal for cleanup/loading spinners)
  .finally(() => {
    console.log('[Pattern 4 Lifecycle]: Operation complete (Resolved or Rejected).');
  });


// =============================================================================
// PATTERN 5: Consuming Promises with Async / Await and Try...Catch
// =============================================================================

const databaseQueryPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    const isDatabaseAvailable = false; // Toggle to test try/catch behavior

    if (isDatabaseAvailable) {
      resolve({ username: 'javascript', status: 'Active' });
    } else {
      reject('ERROR: Database connection timeout!');
    }
  }, 1000);
});

// `async` functions always return a Promise implicitly
async function consumeDatabaseQuery() {
  try {
    // `await` pauses function execution until the promise settles
    const response = await databaseQueryPromise;
    console.log('[Pattern 5 Success]:', response);
  } catch (error) {
    // Rejections in awaited promises are caught in the catch block
    console.error('[Pattern 5 Catch Block]:', error);
  }
}

consumeDatabaseQuery();


// =============================================================================
// PATTERN 6: Modern Network Calls with Fetch API
// =============================================================================

const GITHUB_USER_URL = 'https://api.github.com/users/danish.xvi';

fetch(GITHUB_USER_URL)
  .then((response) => {
    // response.json() returns a Promise that resolves with the parsed JSON body
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }
    return response.json();
  })
  .then((userData) => {
    console.log('[Pattern 6 - Fetch API]: Profile retrieved for', userData.login);
  })
  .catch((error) => {
    console.error('[Pattern 6 - Fetch Error]:', error.message);
  });


// =============================================================================
// PATTERN 7: Concurrent Execution using Promise.all() & Promise.allSettled()
// =============================================================================
// Useful when you need to fetch multiple independent resources in parallel

const fetchUsers = () => new Promise((res) => setTimeout(() => res(['Alice', 'Bob']), 1500));
const fetchPosts = () => new Promise((res) => setTimeout(() => res(['Post 1', 'Post 2']), 1200));
const fetchComments = () => new Promise((_, rej) => setTimeout(() => rej('Comments service down'), 800));

async function executeParallelOperations() {
  console.log('\n--- Concurrent Fetch Operations ---');

  // 1. Promise.all() -> Fails fast: if ANY promise rejects, the whole call rejects immediately.
  try {
    const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);
    console.log('[Promise.all Success]:', { users, posts });
  } catch (error) {
    console.error('[Promise.all Failed]:', error);
  }

  // 2. Promise.allSettled() -> Never rejects; waits for ALL promises to complete regardless of outcome
  const settlementResults = await Promise.allSettled([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);

  console.log('[Promise.allSettled Results]:');
  settlementResults.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(` Task ${index + 1} Success:`, result.value);
    } else {
      console.log(` Task ${index + 1} Rejection:`, result.reason);
    }
  });
}

executeParallelOperations();