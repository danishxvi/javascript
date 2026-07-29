/**
 * ARCHIVAL REFERENCE: Asynchronous JavaScript - XMLHttpRequest (XHR) & State Lifecycle
 * 
 * CORE CONCEPTS COVERED:
 * 1. XMLHttpRequest (XHR) lifecycle and readyState transitions (0 to 4).
 * 2. Manual JSON parsing of network response strings using JSON.parse().
 * 3. Modern alternative: Fetch API (Promises & Async/Await).
 * 4. Error handling across traditional and modern AJAX patterns.
 */

// -----------------------------------------------------------------------------
// 1. CONFIGURATION & STATE MAP
// -----------------------------------------------------------------------------

// Descriptive variable naming for API endpoint
const GITHUB_USER_API_URL = 'https://api.github.com/users/danish.xvi';

/**
 * XHR Lifecycle States Reference Map:
 * -----------------------------------|
 * Value | State            | Description
 * 0     | UNSENT           | Client created, open() not called yet.
 * 1     | OPENED           | open() called, request configured.
 * 2     | HEADERS_RECEIVED | send() called, headers & HTTP status available.
 * 3     | LOADING          | Downloading response body; responseText has partial data.
 * 4     | DONE             | Operation complete (Success or Failure).
 */
const XHR_READY_STATE_DESCRIPTIONS = {
  0: '0 - UNSENT: Client created.',
  1: '1 - OPENED: Request initialized.',
  2: '2 - HEADERS_RECEIVED: Headers & Status available.',
  3: '3 - LOADING: Downloading payload...',
  4: '4 - DONE: Request finished.'
};


// -----------------------------------------------------------------------------
// 2. CLASSIC XHR IMPLEMENTATION (Legacy / Fundamental Approach)
// -----------------------------------------------------------------------------

function fetchGitHubUserDataXHR(apiEndpoint) {
  // Instantiating the XHR object (readyState = 0)
  const xhrRequest = new XMLHttpRequest();

  // Configure request type and URL (readyState becomes 1)
  xhrRequest.open('GET', apiEndpoint);

  // Event handler fired every time readyState changes
  xhrRequest.onreadystatechange = function () {
    // Log state transitions for deep-dive revision
    const currentState = xhrRequest.readyState;
    console.log(`[XHR State Change]: ${XHR_READY_STATE_DESCRIPTIONS[currentState]}`);

    // State 4 indicates the HTTP operation is fully complete
    if (currentState === XMLHttpRequest.DONE /* equivalent to 4 */) {
      
      // CRITICAL CHECK: HTTP Status validation (200-299 indicates successful response)
      if (xhrRequest.status >= 200 && xhrRequest.status < 300) {
        try {
          // XHR returns raw text; must be parsed manually into a JS object
          const userProfileData = JSON.parse(this.responseText);

          console.log('\n--- XHR Success ---');
          console.log(`Data Type: ${typeof userProfileData}`);
          console.log(`User Name: ${userProfileData.name}`);
          console.log(`Followers Count: ${userProfileData.followers}\n`);
        } catch (parseError) {
          console.error('[XHR Error]: Failed to parse JSON response.', parseError);
        }
      } else {
        console.error(`[XHR HTTP Error]: Received status ${xhrRequest.status}`);
      }
    }
  };

  // Handle network-level errors (e.g., disconnected internet, CORS failure)
  xhrRequest.onerror = function () {
    console.error('[XHR Network Error]: The request failed to reach the server.');
  };

  // Dispatch the HTTP request (readyState transitions to 2, then 3, then 4)
  xhrRequest.send();
}


// -----------------------------------------------------------------------------
// 3. MODERN FETCH API EQUIVALENT (Modern Reference for GitHub)
// -----------------------------------------------------------------------------
// XHR is rarely used in modern codebases. Below is how you achieve the same result
// using Async/Await and the Fetch API (Promise-based).

async function fetchGitHubUserDataModern(apiEndpoint) {
  try {
    // fetch() returns a Promise resolving to a Response object
    const httpResponse = await fetch(apiEndpoint);

    // Fetch does NOT auto-reject on 404/500 HTTP errors; check `ok` flag manually
    if (!httpResponse.ok) {
      throw new Error(`HTTP Error status: ${httpResponse.status}`);
    }

    // .json() parses JSON response directly into a JavaScript object
    const userProfileData = await httpResponse.json();

    console.log('--- Modern Fetch API Success ---');
    console.log(`User Name: ${userProfileData.name}`);
    console.log(`Followers Count: ${userProfileData.followers}\n`);
  } catch (error) {
    console.error('[Fetch API Error]:', error.message);
  }
}


// -----------------------------------------------------------------------------
// 4. EXECUTION
// -----------------------------------------------------------------------------

console.log('=== Starting XHR Demonstration ===');
fetchGitHubUserDataXHR(GITHUB_USER_API_URL);

// Uncomment below to compare with modern Async/Await Fetch:
// fetchGitHubUserDataModern(GITHUB_USER_API_URL);