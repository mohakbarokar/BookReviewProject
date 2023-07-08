const express = require('express');
const router = express.Router();
let books = require('./booksdata.js');

//method to add review by logged in user
router.post("/addreview", (req, res) => {
    const username = req.session.authorization['username'];
    const isbn = req.query.isbn;
    const title = req.query.title;
    const authorname = req.query.authorname;
    const review = req.query.review;

    let filtered_books = books.filter((book) => book.title === title);

    if (filtered_books.length > 0) {
        let filtered_book = filtered_books[0];
        filtered_book.reviews.push({ "review": review, "reviewUser": username })
        res.send("Review Added in Existing Book Data")
    } else if (review && isbn && title && authorname) {
        books.push({
            "isbn": isbn,
            "title": title,
            "author": authorname,
            "reviews": [{ "review": review, "reviewUser": username }]
        })
        res.send("Review Added")
    } else {
        res.send("Please enter all the mandatory details such as isbn, title, authorname, review")
    }
});

//method to edit review given by logged in user
router.put("/editreview", (req, res) => {
    const username = req.session.authorization['username'];
    const title = req.query.title;
    const newreview = req.query.review;
    let filtered_books = books.filter((book) => book.title === title);

    if (filtered_books.length > 0) {
        let filtered_book;

        for (let i = 0; i < filtered_books.length; i++) {
            console.log(filtered_books[i].title);
            //&& filtered_books[i].reviewUser === username
            if (filtered_books[i].title === title) {
                for (let j = 0; j < filtered_books[i].reviews.length; j++) {
                    if (filtered_books[i].reviews[j].reviewUser === username) {
                        filtered_book = filtered_books[i];
                        filtered_book.reviews[j].review = newreview;
                        res.send("Review updated for book : " + title)
                        break;
                    } else {
                        res.send("No Review found that was added by logged in user")
                    }
                }

            } else {
                res.status(401).send("Review not added by logged in user")
            }
        }

    } else {
        res.status(404).send("Book not found");
    }
});

//method to delete review by logged in user
router.delete("/deletereview", (req, res) => {
    const username = req.session.authorization['username'];
    const title = req.query.title;
    let filtered_books = books.filter((book) => book.title === title);

    if (filtered_books.length > 0) {
        let filtered_book = filtered_books[0];
        let filtered_review;

        for (let i = 0; i < filtered_book.reviews.length; i++) {
            console.log(filtered_book.title);
            //&& filtered_books[i].reviewUser === username
            if (filtered_book.reviews[i].reviewUser === username) {
                filtered_review = filtered_book.reviews[i];
                break;
            }
            else {
                filtered_review === 0;
            }
        }
        if (filtered_review != undefined) {
            delete filtered_review.review;
            delete filtered_review.reviewUser;
            res.send("Deleted review added by user : " + username)
        } else {
            res.send("No review found tha was added by user : " + username);
        }
    }
    else {
        res.status(404).send("Book not found");
    }

});

module.exports = router;
