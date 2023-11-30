const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  const movieId = response.locals.movie && response.locals.movie.movie_id;
  const data = await service.list(movieId);
  response.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
