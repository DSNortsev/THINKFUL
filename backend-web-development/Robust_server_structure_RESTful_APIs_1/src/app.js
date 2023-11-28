const express = require("express");
const app = express();

const notes = require("./data/notes-data");
app.use(express.json());

app.get("/notes/:noteId", (req, res) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote){
    res.status(200).json({ data: foundNote });
  }
  res.status(404).send(`Note id not found: ${req.params.noteId}`);
});

app.get("/notes", (req, res) => {
  res.status(200).json({ data: notes });
});

// TODO: Add ability to create a new note
app.post('/notes', (req, res, next) => {
  const { data: {text} = {} } = req.body;
  if (text) {
    let lastNoteId = notes.reduce((maxId, note) => Math.max(maxId, note.id), 0);
    const newNote = {
      id: ++lastNoteId,
      text,
    };
    notes.push(newNote);
    res.status(201).json({data: newNote});
  }
  res.sendStatus(400);
});


// TODO: Add not-found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});


// TODO: Add error handler
app.use((err, req, res, next) => {
  err = err || "Internal server error!";
  res.status(400).send(err);
});

module.exports = app;
