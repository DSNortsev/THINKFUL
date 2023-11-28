const express = require("express");

const app = express();

const path = require("path");
const urls = require(path.resolve("src/data/urls-data"));
const uses = require(path.resolve("src/data/uses-data"));
const urlsRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");

app.use(express.json());

// TODO: Add code to meet the requirements and make the tests pass.
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);


// app.get("/urls/:urlId/uses", urlExists, (req, res) => {
//     const foundUrl = req.foundUrl;
//     const urlId = foundUrl.id;
//
//     // Filter use records based on the URL ID
//     const urlUses = uses.filter((use) => use.urlId === urlId);
//
//     res.json({ data: urlUses });
// });

// Not found handler
app.use((req, res, next) => {
    next({status: 404, message: `Not found: ${req.originalUrl}`});
});

// Error handler
app.use((error, req, res, next) => {
    console.error(error);
    const {status = 500, message = "Something went wrong!"} = error;
    res.status(status).send({error: message});
});

module.exports = app;
