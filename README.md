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

Note::
- returned JSON object may have zero or more results from scanned content 


Additional notes:

Add a comment about reason behind regex expression. We are only checking if the search term exists one time in the text with case sensitivity in mind.

Talk about where we could optimize this function! 
- I'd like to pull result out of the function body and pass it in as an argument to make this truly a pure function. maybe rename to initialResult as seen in tests and pass it in as an arg as result = initialResult. 
- We are working with nested json data so cant optimize two loops, even if data struct was flattened 

