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

const express = require('express');
const app = express();

app.get("/introduction", (req, res) => {
    res.send("Hello World ");
});

app.listen(3005, () => console.log("Server is running"));