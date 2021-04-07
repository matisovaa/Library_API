const express = require("express");

const library = require('./data');

const routerBookTags = express.Router();
routerBookTags.route("/book/tags")
    // Lists all tags in all books
    .get(async(req, res) => {
        res.send(library.getAllTags());
    })

module.exports = routerBookTags;