const { NODE_ENV = "development" } = process.env;
const express = require("express");
const app = express();

const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");


// Routes
app.get("/zoos/all",  (req, res, next) => {
    const admin = req.query.admin === 'true';
    const zoos = getZoos().join('; ');

    if (admin) {
        res.send(`All zoos: ${zoos}`);
    }
    res.send('You do not have access to that route.');
});

app.get("/check/:zip", validateZip, (req, res, next) => {
    const zip = req.params.zip;
    const zoos = getZoos(zip);
    let message;

    if (zoos) {
        message = `${zip} exists in our records.`;
    } else {
        message = `${zip} does not exist in our records.`;
    }
    res.send(message);
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
    const zip = req.params.zip;
    const zoos = getZoos(zip).join('; ');
    let message;

    if (zoos) {
        message = `${zip} zoos: ${zoos}`;
    } else {
        message = `${zip} has no zoos.`;
    }
    res.send(message);
});


// Error handling
app.use((req, res, next) => {
    next("That route could not be found!");
});

app.use((err, req, res, next) => {
    err = err || "Internal server error!";
    res.send(err);
});

module.exports = app;