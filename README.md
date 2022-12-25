# Software Engineering project assessment for the U.S. Digital Corps

### Initial notes from documentation:

1. Organization utilizes chracter recognition service to scan the content of a number of books. 
- High-level task is to write a function which searches for a word in the scanned book content. 

Write a JS function `findSearchTermInBooks()`
- two arguments: 

1. a search term (string)
2. a JSON object containing phrases from books

i.e. 
[
  {
    "Title": string,
    "ISBN": string,
    "Content": [
      {
        "Page": integer,
        "Line": integer,
        "Text": string
      },
      ...
    ]
  },
  ...
]

Note: 
- JSON object may have zero or more books
- A book may have zer or more scanned content

- returns: 

1. a JSON object containing lines that match the search word 

i.e. 

{
  "SearchTerm": string,
  "Results": [
    {
      "ISBN": string,
      "Page": integer,
      "Line": integer,
    },
    ...
  ]
}

Note:
- returned JSON object may have zero or more results from scanned content 

After laying out what I'm being asked to implement, going over the arguments the function should take in, and what its return value should be, I dive right into test-driven development. By writing unit tests in tandem with a new feature you can effectively catch errors ahead of time before its too late. 

My first thought when handling JSON data would be a recursive technique, but we are not working with deeply nested data. Plus, within "Content" we won't be finding sub objects that contain more "Content" objects. Therefore, I think an iterative solution will work well for this problem. 

Second, we should always check if the data being passed into our function is correct or not. We are requesting a string for `searchTerm`. For test case 3-7, if we don't receive a string then lets return the initial result. We should also be receiving an array for `scannedTextObj`. So for test cases 8-12 lets check that the initial result is returned for object, string, number, null, or undefined values. 

Next, I know that `scannedTextObj` will have zero or many books. This will be our next test case. If we have no books, then there are is no content to parse, so we'd simply return the initial result. 

After writing up these initial tests, I realized that my conditional statements were getting lengthy, which was making the if blocks difficult to read. As a result, I've moved these conditions to their own lines and assigned them to variables `validSearchTerm` and `validScannedTextObj` to make it more legible. 

