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

  const result = {
      "SearchTerm": searchTerm,
      "Results": []
  };
  
  const invalidSearchTerm = typeof searchTerm !== "string";
  if(invalidSearchTerm) return result;

  const invalidScannedTextObj = !Array.isArray(scannedTextObj) || scannedTextObj.length === 0 || scannedTextObj === null || scannedTextObj === undefined;
  if(invalidScannedTextObj) return result;

  /** 
   * If we've reached this point we can infer that we have a valid search term
   * and an array of at least one JSON object
   */
  let searchTermRegex = new RegExp(`\\b${searchTerm}\\b`);
  
  for(const obj of scannedTextObj) {
    if(obj.Content.length === 0) continue;

    for(const item of obj.Content) {
      let match = item.Text.match(searchTermRegex);
        
      if(match !== null) {
        result.Results.push({
          "ISBN": obj.ISBN,
          "Page": item.Page,
          "Line": item.Line
        });
      }
    }
  }
  
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
];
  
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
};

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


/** 
 * `searchTerm` should be a string, if it is an array, object, string, 
 * number, or null/undefined then return the initial result.
 */
const invalidSearchTerm = {
  "Test 3": [], 
  "Test 4": {}, 
  "Test 5": 31, 
  "Test 6": null, 
  "Test 7": undefined
};

for(const key in invalidSearchTerm) {
  /** initial result of `findSearchTermInBooks()`  */
  const initialResult = {
    "SearchTerm": invalidSearchTerm[key],
    "Results": []
  };

  const testResult = findSearchTermInBooks(invalidSearchTerm[key], twentyLeaguesIn);
  if(JSON.stringify(initialResult) === JSON.stringify(testResult)) {
    console.log(`PASS: ${key}`);
  }
  else {
    console.log(`FAIL: ${key}`);
    console.log("Expected:", initialResult);
    console.log("Received:", testResult);
  }
}


/** 
 * An array of JSON objects should be passed into `scannedTextObj`. 
 * If we receive an object, string, number, or null/undefined, 
 * then the initial result should be returned. 
 */
const mockSearchTerm = "the";
const invalidScannedTextObj = {
  "Test 8": {}, 
  "Test 9": "Twenty thousand leagues", 
  "Test 10": 31, 
  "Test 11": null, 
  "Test 12": undefined
};

for(const key in invalidScannedTextObj) {
  /** initial result of `findSearchTermInBooks()`  */
  const initialResult = {
    "SearchTerm": mockSearchTerm,
    "Results": []
  };
  const testResult = findSearchTermInBooks(mockSearchTerm, invalidScannedTextObj[key]);
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
const initialResult = {
  "SearchTerm": "the",
  "Results": []
};
const test13Result = findSearchTermInBooks("the", []); 
if (JSON.stringify(initialResult) === JSON.stringify(test13Result)) {
  console.log("PASS: Test 13");
} else {
  console.log("FAIL: Test 13");
  console.log("Expected:", initialResult);
  console.log("Received:", test13Result);
}


/** 
 * If `scannedTextObj` has three books but one of them has no content,
 * then our output should only have results from two ISBN numbers. 
 */
 const test14MockObj = [
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
  },
  {
    "Title": "Siddhartha",
    "ISBN": "8503845691257",
    "Content": [] 
  },
  {
    "Title": "To Kill a Mockingbird",
    "ISBN": "5894021849573",
    "Content": [
      {
        "Page": 10,
        "Line": 1,
        "Text": "test line 1 the",
      },
      {
        "Page": 10,
        "Line": 2,
        "Text": "The cat jumped over lazy dog"
      },
      {
        "Page": 10,
        "Line": 3,
        "Text": "The cat jumped over the lazy dog"
      },
    ] 
  }
];
  
const test14MockOutput = {
  "SearchTerm": "the",
  "Results": [
      {
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 9
      },
      {
        "ISBN": "5894021849573",
        "Page": 10,
        "Line": 1
      },
      {
        "ISBN": "5894021849573",
        "Page": 10,
        "Line": 3
      }
  ]
};

/** Add each unique ISBN into a set, then confirm if we only have two ISBNs */
const test14Result = findSearchTermInBooks("the", test14MockObj);
const uniqueISBN = new Set();
test14Result.Results.map(result => uniqueISBN.add(result.ISBN));

if (uniqueISBN.size === 2) {
  console.log("PASS: Test 14");
} else {
  console.log("FAIL: Test 14");
  console.log("Expected:", test14MockOutput);
  console.log("Received:", test14Result);
}


/**
 * Function should be case sensitive. A search term of 'The' should not match 'the'.
 */
/** Example input object. */
const test15Input = [
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
];
  
/** Example output object */
const test15Output = {
  "SearchTerm": "The",
  "Results": [
    {
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 8
    }
  ]
};

const test15Result = findSearchTermInBooks("The", test15Input);
if (JSON.stringify(test15Output) === JSON.stringify(test15Result)) {
  console.log("PASS: Test 15");
} else {
  console.log("FAIL: Test 15");
  console.log("Expected:", test15Output);
  console.log("Received:", test15Result);
}




