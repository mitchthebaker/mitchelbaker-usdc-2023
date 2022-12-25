/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and 
   * return the appropriate object here. */

  const result = {
      "SearchTerm": searchTerm,
      "Results": []
  };

  if(!Array.isArray(scannedTextObj)) return result;
  if(scannedTextObj.length === 0) return result;
  
  return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
  {
      "Title": "Twenty Thousand Leagues Under the Sea",
      "ISBN": "9780000528531",
      "Content": [
          {
              "Page": 31,
              "Line": 8,
              "Text": "now simply went on by her own momentum.  The dark-"
          },
          {
              "Page": 31,
              "Line": 9,
              "Text": "ness was then profound; and however good the Canadian\'s"
          },
          {
              "Page": 31,
              "Line": 10,
              "Text": "eyes were, I asked myself how he had managed to see, and"
          } 
      ] 
  }
]
  
/** Example output object */
const twentyLeaguesOut = {
  "SearchTerm": "the",
  "Results": [
      {
          "ISBN": "9780000528531",
          "Page": 31,
          "Line": 9
      }
  ]
}

/*
_   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
\___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                    
*/

/* We have provided two unit tests. They're really just `if` statements that 
* output to the console. We've provided two tests as examples, and 
* they should pass with a correct implementation of `findSearchTermInBooks`. 
* 
* Please add your unit tests below.
* */

/** We can check that, given a known input, we get a known output. */
const test1Result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1Result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1Result);
}

/** We could choose to check that we get the right number of results. */
const test2Result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2Result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2Result.Results.length);
}

/** initial result of `findSearchTermInBooks()`  */
const initialResult = {
  "SearchTerm": "the",
  "Results": []
};

/** 
 * An array of JSON objects should be passed into `scannedTextObj`. 
 * If we receive an object, string, number, or null/undefined, 
 * then the initial `result` should be returned. 
 */
const invalidScannedTextObj = {
  "Test 3": {}, 
  "Test 4": "Twenty thousand leagues", 
  "Test 5": 31, 
  "Test 6": null, 
  "Test 7": undefined
};

for(const key in invalidScannedTextObj) {
  const testResult = findSearchTermInBooks("the", invalidScannedTextObj[key]);
  if(JSON.stringify(initialResult) === JSON.stringify(testResult)) {
    console.log(`PASS: ${key}`);
  }
  else {
    console.log(`FAIL: ${key}`);
    console.log("Expected:", initialResult);
    console.log("Received:", testResult);
  }
}

/** If `scannedTextObj` has a length of zero, then return the initial result */
const test8Result = findSearchTermInBooks("the", []); 
if (JSON.stringify(initialResult) === JSON.stringify(test8Result)) {
  console.log("PASS: Test 8");
} else {
  console.log("FAIL: Test 8");
  console.log("Expected:", initialResult);
  console.log("Received:", test8Result);
}





