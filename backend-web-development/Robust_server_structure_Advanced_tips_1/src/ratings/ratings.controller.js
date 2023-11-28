const ratings = require("../data/ratings-data");

function list(req, res) {
  const noteId = Number(req.params.noteId);
  res.json({ data: ratings.filter(noteId ? rating => rating.noteId === noteId: () => true) });
}

function ratingExists(req, res, next) {
  const ratingId = Number(req.params.ratingId);
  const foundRating = ratings.find((rating) => rating.id === ratingId);
  if (foundRating) {
    res.locals.rating = foundRating;
    return next();
  }
  next({
    status: 404,
    message: `Note id not found: ${req.params.ratingId}`,
  });
}

function read(req, res) {
  res.json({ data: res.locals.rating });
}

module.exports = {
  list,
  read: [ratingExists, read]
};
