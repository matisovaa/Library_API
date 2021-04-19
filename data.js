const Joi = require('joi');

class Library {

    constructor() {
        this.library = [{
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
    }

    nextID = (function() {
        let lastID = 2; // we start from last ID in initial Array
        return function() { lastID++; return lastID; }
    })();

    getAllBooks() { return this.library }

    getAllTags() {
        return this.library.map(book => book["tags"]).flat()
            // to remove duplication
            .reduce((acc, tag) => {
                return acc.some(tagFromAcc => tagFromAcc === tag) ?
                    acc : [...acc, tag]
            }, [])
    }

    getBook(idBook) {
        return this.library.find(book => book["id"] === idBook);
    }

    isValidBook(book) {

        const bookSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().required(),
            pages: Joi.number().required(),
            tags: Joi.array().items(Joi.string())
        })

        return bookSchema.validate(book).error ? false : true;
    }

    addBook(book) {
        if (!this.isValidBook(book)) {
            return null;
        }

        const newBook = {
            "title": book["title"],
            "author": book["author"],
            "pages": book["pages"],
            "tags": book["tags"] || [],
            "id": this.nextID()
        };
        this.library.push(newBook);
        return newBook;
    }

    updateBook(idBook, book) {
        if (!this.isValidBook(book)) {
            return null;
        }

        const updatedBook = this.getBook(idBook);
        updatedBook["title"] = book["title"];
        updatedBook["author"] = book["author"];
        updatedBook["pages"] = book["pages"];
        if (book["tags"]) {
            updatedBook["tags"] = book["tags"]
        }

        return updatedBook;
    }

    deleteBook(idBook) {
        const idxBook = this.library.findIndex(book => book["id"] === idBook);
        // book with entered ID is not in list
        if (idxBook === -1) {
            return null;
        }

        return this.library.splice(idxBook, 1)[0];
    }
}

const library = new Library();
module.exports = library;