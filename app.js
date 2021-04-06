const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const moduleBookTags = require("./moduleBookTags");
app.use(moduleBookTags);

const moduleBook = require("./moduleBook");
app.use(moduleBook);

const moduleBookId = require("./moduleBookId");
app.use(moduleBookId);

app.listen(3005, () => console.log("Server is running"));