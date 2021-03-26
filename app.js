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
const bp = require('body-parser');
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/introduction", (req, res) => {
    res.send("Hello World ");
});

app.post("/introduction", (req, res) => {
    res.send("Hello World by post");
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.headers);
    console.log(req.headers.header3);
})

app.listen(3005, () => console.log("Server is running"));