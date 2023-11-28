const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));

// Middleware
function useRecordExists(req, res, next) {
    const useId = Number(req.params.useId);
    const urlId = req.foundUrl && req.foundUrl.id;
    let foundUseRecordIndex;

    if (urlId) {
        foundUseRecordIndex = uses.findIndex((use) => use.id === useId && use.urlId === urlId);
    } else {
        foundUseRecordIndex = uses.findIndex((use) => use.id === useId);
    }

    if (foundUseRecordIndex !== -1) {
        req.foundUseRecordIndex = foundUseRecordIndex;
        req.foundUseRecord = uses[foundUseRecordIndex];;
        return next();
    }

    return res.status(404).json({ error: `Use record with id ${useId} not found for URL with id ${urlId}` });
}

function list(req, res) {
    const foundUrl = req.foundUrl;
    let urlUses;

    if (foundUrl)
        // Filter use records based on the URL ID
        urlUses = uses.filter((use) => use.urlId === foundUrl.id);
    res.json({ data: urlUses ? urlUses :  uses });
}
function read(req, res) {
    const foundUseRecord = req.foundUseRecord;
    res.json({ data: foundUseRecord });
}

function destroy(req, res) {
    const foundUseRecordIndex = req.foundUseRecord;
    uses.splice(foundUseRecordIndex, 1);

    res.status(204).send();
}

module.exports = {
    list,
    read: [
        useRecordExists,
        read],
    delete: [
        useRecordExists,
        destroy,
    ],
};




