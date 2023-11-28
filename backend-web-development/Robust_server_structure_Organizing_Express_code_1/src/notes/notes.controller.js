const notes = require("../data/notes-data")

const noteExists = (req, res, next) => {
    const noteId = Number(req.params.noteId);
    const foundNote = notes.find((note) => note.id === noteId);
    if (foundNote) {
        return next();
    } else {
        return next({
            status: 404,
            message: `Note id not found: ${req.params.noteId}`,
        });
    }
};

const hasText = (req, res, next) => {
    const { data: { text } = {} } = req.body;
    if (text) {
        return next();
    }
    return next({ status: 400, message: "A 'text' property is required." });
};

function list(req, res) {
    res.json({ data: notes });
};


function read(req, res) {
    const noteId = Number(req.params.noteId);
    const foundNote = notes.find((note) => note.id === noteId);
    res.json({ data: foundNote });;
};

function create(req, res) {
    const { data: { text } = {} } = req.body;

    const newNote = {
        id: notes.length + 1, // Assign the next ID
        text,
    };
    notes.push(newNote);
    res.status(201).json({ data: newNote });
};

function update(req, res) {
    const { noteId } = req.params;
    const foundNote = notes.find((note) => note.id === Number(noteId));
    const { data: { text } = {} } = req.body;

    // update the paste
    foundNote.text = text;
    res.json({ data: foundNote});
};

function destroy(req, res) {
    const { noteId } = req.params;
    const index = notes.findIndex((note) => note.id === Number(noteId));
    const deletedPastes = notes.splice(index, 1);
    res.sendStatus(204);
}



module.exports = {
    list,
    create: [
        hasText,
        create
    ],
    read: [
        noteExists,
        read
    ],
    update: [
        hasText,
        noteExists,
        update
    ],
    delete: [
        noteExists,
        destroy
    ]
}