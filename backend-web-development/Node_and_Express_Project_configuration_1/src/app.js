const express = require("express");
const app = express();

app.get("/ping", (req, res) => {
    res.send("pong!");
});

app.get("/welcome", (req, res) => {
    res.send("Welcome to my server.");
});

module.exports = app;