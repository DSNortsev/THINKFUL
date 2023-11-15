const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
function dishExists(req, res, next) {
    const dishId = req.params.dishId;
    const foundDishIndex = dishes.findIndex((dish) => dish.id === dishId);

    if (foundDishIndex !== -1) {
        res.locals.foundDishIndex = foundDishIndex
        return next();
    }
    next({
        status: 404,
        message: `Dish id not found: ${req.params.urlId}`
    });
}

function bodyDataHas(propertyName) {
    return function (req, res, next) {
        const { data = {} } = req.body;
        if (data[propertyName]) {
            if(propertyName === 'price' && (!Number.isInteger(data[propertyName]) || data[propertyName] <= 0)){
                next({
                    status: 400,
                    message: `Dish must include a ${propertyName} that is an integer greater than 0`
                });
            }

            res.locals.newDish = data;
            return next();
        }

        next({
            status: 400,
            message: `Dish must include a ${propertyName}`
        });
    };
}

function isIdMatchesParams(req, res, next) {
    const newDish = res.locals.newDish
    const dishId = req.params.dishId;


    if (!newDish.id || newDish.id === dishId) {
        return next();
    }
    next({
        status: 400,
        message: `Dish id does not match route id. Dish: ${newDish.id}, Route: ${dishId}`
    });
}

function list(req, res) {
    res.json({ data: dishes });
}

function create(req, res) {
    const newDish = res.locals.newDish;

    newDish['id'] = nextId();;
    dishes.push(newDish);
    res.status(201).json({ data: newDish });
}

function read(req, res) {
    const foundDishIndex = res.locals.foundDishIndex;
    res.json({ data: dishes[foundDishIndex] });
}

function update(req, res) {
    const foundDishIndex = res.locals.foundDishIndex;
    const id = dishes[foundDishIndex].id
    const newDish = res.locals.newDish;

    dishes[foundDishIndex] = { ...newDish, id }
    res.json({ data:  dishes[foundDishIndex] });
}

module.exports = {
    list,
    create: [
        bodyDataHas('name'),
        bodyDataHas('description'),
        bodyDataHas('price'),
        bodyDataHas('image_url'),
        create,
    ],
    read: [
        dishExists,
        read,
    ],
    update: [
        dishExists,
        bodyDataHas('name'),
        bodyDataHas('description'),
        bodyDataHas('price'),
        bodyDataHas('image_url'),
        isIdMatchesParams,
        update,
    ],
};