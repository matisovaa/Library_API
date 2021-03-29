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

    addBook(book) {
        // check of required parameters
        if (typeof(book) !== "object" || book === null ||
            typeof(book["title"]) !== "string" ||
            typeof(book["author"]) !== "string" ||
            typeof(book["pages"]) !== "number") {
            return null;
        }
        // check of optional parameters
        if ((book["tags"] && !Array.isArray(book["tags"])) ||
            (Array.isArray(book["tags"]) && !book["tags"].every(tag => (typeof(tag) === "string")))) {
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
}

module.exports = { Library }