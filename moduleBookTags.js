const express = require("express");

const Library = require('./data');
const library = new Library();

const routerBookTags = express.Router();
routerBookTags.route("/book/tags")
    // Lists all tags in all books
    .get((req, res) => {
        res.send(library.getAllTags());
    })

module.exports = routerBookTags;