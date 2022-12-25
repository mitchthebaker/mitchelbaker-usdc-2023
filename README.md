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

At this point in my code, I can confidently infer that if a valid `searchTerm` and `scannedTextObj` are passed in, then I can begin iterating over each book object. 

After completing the validation logic, we can then safely begin iterating over books. But before we do this, we need to check if the book contains content. If a book has no content then there's nothing more to do, simply go to the next book in the list. To verify this we can write a unit test with a list that contains three books. One book will have no content, the other two will have content. After the function has completed running, our output should only have results from two unique ISBN's. 

At this point we are only working with books that have content. So we can safely iterate over the contents of each book. However, note that a loop within a loop is O(n^2) time complexity, which is extremely inefficient. For example, if we had 100 books, each with 100 lines, our solution would have to run 100^2, or 10,000 times. That being said, let's focus on finishing this brute force solution so at a minimum we know it returns the correct output for a small sample size of data. Once we have achieved this, we can then optimize it further. 

Let's go back to iterating over the contents of each book. The problem statement asks that our function returns a single JSON object with the search term used and zero or more results from the search. We've already initialized `result` with the search term, so now we're filling out what `result.Results` should contain. 

So for each item in a book's content, it has the page number, the line number, and the text corresponding to each line. The problem statement asks us to return lines that match the search term. In other words, if the line contains our search term, then we return that line. To match our search term, we will be using a regular expression to check for the first occurrence of our search term. I won't go in depth into how regular expressions work, because what matters is if a line has a match with our search term. This is indicated with the .match() function. If there is a match, then .match() will tell us the word matched and other metadata. If there is no match, then .match() returns null. Therefore, if .match() does not return null, we add a new result into `result.Results` with the book ISBN, page number, and line number. 
