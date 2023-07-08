const express = require('express');
const router = express.Router();
let books = require('./booksdata.js');

router.post("/addreview", (req, res) => {
    const username = req.session.authorization['username'];
    const isbn = req.query.isbn;
    const title = req.query.title;
    const authorname = req.query.authorname;
    const review = req.query.review;
    if (review && isbn && title && authorname) {
        books.push({
            "isbn": isbn,
            "title": title,
            "author": authorname,
            "review": review,
            "reviewUser": username
        })
        res.send("Review Added")
    } else {
        res.send("Please enter all the mandatory details such as isbn, title, authorname, review")
    }
});

router.put("/editreview", (req, res) => {
    const username = req.session.authorization['username'];
    const title = req.query.title;
    const newreview = req.query.review;
    let filtered_books = books.filter((book) => book.title === title);

    if (filtered_books.length > 0) {
        let filtered_book;

        for (let i = 0; i < filtered_books.length; i++) {
            console.log(filtered_books[i].title);
            if (filtered_books[i].title === title && filtered_books[i].reviewUser === username) {
                filtered_book = filtered_books[i];
                filtered_book.review = newreview;
                res.send("Review updated for book : " + title)
                break;
            } else {
                res.status(401).send("Review not added by logged in user")
            }
        }

    } else {
        res.status(404).send("Book not found");
    }

});

router.delete("/deletereview", (req, res) => {
    const username = req.session.authorization['username'];
    const title = req.query.title;
    let filtered_books = books.filter((book) => book.title === title);

    if (filtered_books.length > 0) {
        let filtered_book;

        for (let i = 0; i < filtered_books.length; i++) {
            console.log(filtered_books[i].title);
            if (filtered_books[i].title === title && filtered_books[i].reviewUser === username) {
                filtered_book = filtered_books[i];
                delete filtered_book.review;
                res.send("Deleted book : " + title)
                break;
            } else {
                res.status(401).send("Book Review not added by logged in user")
            }
        }

    } else {
        res.status(404).send("Book not found");
    }

});


// // POST request: Create a new user
// router.post("/",(req,res)=>{
//   // Copy the code here
//   res.send("Yet to be implemented")//This line is to be replaced with actual return value
// });


// // PUT request: Update the details of a user by email ID
// router.put("/:email", (req, res) => {
//   // Copy the code here
//   res.send("Yet to be implemented")//This line is to be replaced with actual return value
// });


// // DELETE request: Delete a user by email ID
// router.delete("/:email", (req, res) => {
//   // Copy the code here
//   res.send("Yet to be implemented")//This line is to be replaced with actual return value
// });

module.exports = router;
