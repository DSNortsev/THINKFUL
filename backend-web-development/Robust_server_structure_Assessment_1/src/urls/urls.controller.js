const path = require("path");
const urls = require(path.resolve("src/data/urls-data"));
const uses = require(path.resolve("src/data/uses-data"));

let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);
let lastUsesId = uses.reduce((maxId, use) => Math.max(maxId, use.id), 0);

// Middleware
function bodyHasHrefProperty(req, res, next) {
    const { data: { href } = {} } = req.body;
    if (href) {
        req.href = href;
        return next();
    }
    next({
        status: 400,
        message: 'A \'href\' property is required.'
    });
}

function urlExists(req, res, next) {
    const urlId = Number(req.params.urlId)
    const foundUrl = urls.find((url) => url.id === urlId);
    if (foundUrl) {
        req.foundUrl = foundUrl;
        return next();
    }
    next({
        status: 404,
        message: `Url id not found: ${req.params.urlId}`
    });
}

function createUseRecord(req, res, next) {
    const foundUrl = req.foundUrl;

    const useRecord = {
        id: lastUsesId, // Make sure to generate a unique ID as needed
        urlId: foundUrl.id,
        time: Date.now(),
    };

    // Assuming `uses` is defined globally or in a shared scope
    uses.push(useRecord);

    // Attach useRecord to the req object for further use if needed
    req.useRecord = useRecord;

    // Call the next middleware or route handler
    next();
}

function list(req, res) {
    res.json({ data: urls });
}

function create(req, res) {
    const href = req.href;
    const newUrl = {
        id: ++lastUrlId, // Increment last id then assign as the current ID
        href,
    };
    urls.push(newUrl);
    res.status(201).json({ data: newUrl });
}

function read(req, res) {
    const foundUrl = req.foundUrl;
    res.json({ data: foundUrl });
}

function update(req, res) {
    const foundUrl = req.foundUrl;
    const href = req.href;

    foundUrl.href = href;
    res.json({ data: foundUrl });
}

function destroy(req, res) {
    const urlId = Number(req.params.urlId);

    res.status(405).json({ error: `DELETE method not allowed on /url/${urlId}`, allowedMethods: ['GET', 'PUT'] });
}

module.exports = {
    list,
    create: [
        bodyHasHrefProperty,
        create
    ],
    read: [
        urlExists,
        createUseRecord,
        read],
    update: [
        urlExists,
        bodyHasHrefProperty,
        update
    ],
    delete: [destroy],
    urlExists,
};




