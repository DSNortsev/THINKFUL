const notes = require("../data/notes-data");

function hasText(req, res, next) {
  const { data: { text } = {} } = req.body;

  if (text) {
    res.locals.text = text;
    return next();
  }
  next({ status: 400, message: "A 'text' property is required." });
}

function noteExists(req, res, next) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    res.locals.note = foundNote
    return next();
  }
  next({
    status: 404,
    message: `Note id not found: ${req.params.noteId}`,
  });
}

function create(req, res) {
  const { data: { text } = {} } = req.body;
  const newNote = {
    id: notes.length + 1,
    text,
  };
  notes.push(newNote);
  res.status(201).json({ data: newNote });
}

function destroy(req, res) {
  const { noteId } = req.params;
  const index = notes.findIndex((note) => note.id === Number(noteId));
  if (index > -1) {
    notes.splice(index, 1);
  }
  res.sendStatus(204);
}

function list(req, res) {
  res.json({ data: notes });
}

function read(req, res) {
  res.json({ data: res.locals.note });
}

function update(req, res) {
  const foundNote = res.locals.note;

  foundNote.text = res.locals.text;
  res.json({ data: foundNote });
}

module.exports = {
  create: [hasText, create],
  list,
  read: [noteExists, read],
  update: [noteExists, hasText, update],
  delete: destroy,
  noteExists
};
