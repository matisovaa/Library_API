const express = require("express");

const Library = require('./data');
const library = new Library();

const routerBookId = express.Router();
routerBookId.route("/book/:bookId")
    // Find book by ID
    .get(async(req, res) => {
        // test validity of ID
        if (!/^[0-9]+$/.test(req.params.bookId)) {
            res.status(400).send("Invalid ID format supplied");
            return;
        }
        // ID is valid, we check if we have book with entered ID
        const book = library.getBook(+req.params.bookId);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send("Book not found");
        }
    })
    // Update book by ID
    .put(async(req, res) => {
        // test validity of ID
        if (!/^[0-9]+$/.test(req.params.bookId)) {
            res.status(400).send("Invalid ID format supplied");
            return;
        }
        // test if we have book with entered ID
        if (!library.getBook(+req.params.bookId)) {
            res.status(404).send("Book not found");
            return;
        }
        const book = library.updateBook(+req.params.bookId, req.body);
        if (book) {
            res.send(book);
        } else {
            res.status(405).send("New book not valid");
        }
    })
    // Deletes a book
    .delete(async(req, res) => {
        // test validity of ID
        if (!/^[0-9]+$/.test(req.params.bookId)) {
            res.status(400).send("Invalid ID format supplied");
            return;
        }
        // ID is valid, we check if we have book with entered ID to delete
        const book = library.deleteBook(+req.params.bookId);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send("Book not found");
        }
    })

module.exports = routerBookId;