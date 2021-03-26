const library = [{
        "title": "Robinson Crusoe",
        "author": "Daniel Defoe",
        "pages": 300,
        "tags": [
            "adventure",
            "history"
        ],
        "id": 0
    },
    {
        "title": "The Unbearable Lightness of Being",
        "author": "Milan Kundera",
        "pages": 250,
        "tags": [
            "philosophical",
            "novel"
        ],
        "id": 1
    },
    {
        "title": "Nausea",
        "author": "Jean-Paul Sartre",
        "pages": 120,
        "tags": [
            "philosophical",
            "existentialism",
            "novel"
        ],
        "id": 2
    },
]

let nextID = library.length;

const express = require('express');
const bp = require('body-parser');
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Lists all tags in all books
app.get("/book/tags", (req, res) => {
    res.send(library.map(book => book["tags"]).flat()
        // to remove duplication
        .reduce((acc, tag) => {
            return acc.some(tagFromAcc => tagFromAcc === tag) ?
                acc : [...acc, tag]
        }, [])
    );
});

// Lists all books in book list
app.get("/book", (req, res) => {
    res.send(library);
});

// Find book by ID
app.get("/book/:id", (req, res) => {
    const book = library.find(book => book["id"] == req.params.id);
    if (book) {
        res.send(book);
    } else if (isNaN(req.params.id) || req.params.id < 0) {
        res.status(400).send("Invalid ID format supplied");
    } else {
        res.status(404).send("Book not found");
    }

});

// Create new book
app.post("/book", (req, res) => {
    library.push({...req.body, "id": nextID });
    nextID++;
    res.send(library[library.length - 1]);
})

app.listen(3005, () => console.log("Server is running"));