const restaurantsService = require("./restaurants.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasOnlyValidProperties = require("../errors/hasOnlyValidProperties");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("restaurant_name", "cuisine", "address");

async function restaurantExists(req, res, next) {
  const { restaurantId } = req.params;

  const restaurant = await restaurantsService.read(restaurantId);

  if (restaurant) {
    res.locals.restaurant = restaurant;
    return next();
  }
  next({ status: 404, message: `Restaurant cannot be found.` });
}

async function list(req, res, next) {
  const data = await restaurantsService.list();
  res.json({ data });
}

async function create(req, res, next) {
  // Your solution here
  const data = await restaurantsService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res, next) {
  const updatedRestaurant = {
    ...res.locals.restaurant,
    ...req.body.data,
    restaurant_id: res.locals.restaurant.restaurant_id,
  };

  const data = await restaurantsService.update(updatedRestaurant);

  res.json({ data });
}

async function destroy(req, res, next) {
  // your solution here
  const data = await restaurantsService.delete(res.locals.restaurant.restaurant_id);
  res.status(204).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(hasOnlyValidProperties), asyncErrorBoundary(hasRequiredProperties), asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(restaurantExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(restaurantExists), asyncErrorBoundary(destroy)],
};
