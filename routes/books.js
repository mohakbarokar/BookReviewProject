const express = require('express');
const router = express.Router();
const books = require('./booksdata.js');


// GET request: Retrieve all books
router.get("/", (req, res) => {
  res.send(books)
});

// GET by specific boo with isbn ID request
router.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let filtered_books = books.filter((book) => book.isbn === isbn);
  if (filtered_books.length > 0) {
    res.send(filtered_books);
  } else {
    res.status(404).send("Book not found");
  }
});

router.get("/authorname/:authorName", (req, res) => {
  const authorName = req.params.authorName;
  let filtered_books = books.filter((book) => book.author === authorName);
  if (filtered_books.length > 0) {
    res.send(filtered_books);
  } else {
    res.status(404).send("Book not found");
  }
});

router.get("/title/:title", (req, res) => {
  const title = req.params.title;
  let filtered_books = books.filter((book) => book.title === title);
  if (filtered_books.length > 0) {
    res.send(filtered_books);
  } else {
    res.status(404).send("Book not found");
  }
});

router.get("/review/:title", (req, res) => {
  const title = req.params.title;
  let filtered_books = books.filter((book) => book.title === title);
  if (filtered_books.length > 0) {
    let filtered_reviews = [];
    filtered_books.forEach(function (book) {
      console.log(book.review);
      filtered_reviews.push({ "BookName": book.title, "review": book.review });
    });
    res.send(filtered_reviews);
  } else {
    res.status(404).send("Book not found");
  }
});

module.exports = router;
