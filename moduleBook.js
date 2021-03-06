const express = require("express");

const HTTPResponseStatusCodes = require("./HTTPResponseStatusCodes");
const library = require('./data');

const routerBook = express.Router();
routerBook.route("/book")
    // Lists all books in book list
    .get(async(req, res) => {
        res.send(library.getAllBooks());
    })
    // Create new book
    .post(async(req, res) => {
        const book = library.addBook(req.body);
        if (book) {
            res.send(book);
        } else {
            res.status(HTTPResponseStatusCodes.METHOD_NOT_ALLOWED)
                .send("New book not valid");
        }
    })

module.exports = routerBook;