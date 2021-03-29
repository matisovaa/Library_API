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
        // check of required parameters
        if (typeof(book) !== "object" || book === null ||
            typeof(book["title"]) !== "string" ||
            typeof(book["author"]) !== "string" ||
            typeof(book["pages"]) !== "number") {
            return false;
        }
        // check of optional parameters
        if ((book["tags"] && !Array.isArray(book["tags"])) ||
            (Array.isArray(book["tags"]) && !book["tags"].every(tag => (typeof(tag) === "string")))) {
            return false;
        }

        return true;
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

        this.library[idBook]["title"] = book["title"];
        this.library[idBook]["author"] = book["author"];
        this.library[idBook]["pages"] = book["pages"];
        if (book["tags"]) {
            this.library[idBook]["tags"] = book["tags"]
        }

        return this.library[idBook];
    }

    deleteBook(idBook) {
        const idxBook = this.library.findIndex(book => book["id"] === idBook);
        // book with entered ID is not in list
        if (idxBook === -1) {
            return null;
        }

        const deletedBook = this.library.splice(idxBook, 1);
        return deletedBook[0];
    }
}

module.exports = { Library }