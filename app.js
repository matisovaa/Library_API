const Library = require('./data');
const library = new Library['Library']();

const express = require('express');
const bp = require('body-parser');
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Lists all tags in all books
app.get("/book/tags", (req, res) => {
    res.send(library.getAllTags());
});

// Lists all books in book list
app.get("/book", (req, res) => {
    res.send(library.getAllBooks());
});

// Find book by ID
app.get("/book/:id", (req, res) => {

    // test validity of ID
    if (!/^[0-9]+$/.test(req.params.id)) {
        res.status(400).send("Invalid ID format supplied");
        return;
    }

    // ID is valid, we check if we have book with entered ID
    const book = library.getBook(+req.params.id);
    if (book) {
        res.send(book);
    } else {
        res.status(404).send("Book not found");
    }
});

// Create new book
app.post("/book", (req, res) => {
    const book = library.addBook(req.body);
    if (book) {
        res.send(book);
    } else {
        res.status(405).send("New book not valid");
    }
})

// Update book by ID
app.put("/book/:id", (req, res) => {

    // test validity of ID
    if (!/^[0-9]+$/.test(req.params.id)) {
        res.status(400).send("Invalid ID format supplied");
        return;
    }

    // test if we have book with entered ID
    if (!library.getBook(+req.params.id)) {
        res.status(404).send("Book not found");
        return;
    }

    const book = library.updateBook(+req.params.id, req.body);
    if (book) {
        res.send(book);
    } else {
        res.status(405).send("New book not valid");
    }
})

// Deletes a book
app.delete("/book/:id", (req, res) => {

    // test validity of ID
    if (!/^[0-9]+$/.test(req.params.id)) {
        res.status(400).send("Invalid ID format supplied");
        return;
    }

    // ID is valid, we check if we have book with entered ID to delete
    const book = library.deleteBook(+req.params.id);
    if (book) {
        res.send(book);
    } else {
        res.status(404).send("Book not found");
    }
});

app.listen(3005, () => console.log("Server is running"));