const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

function bodyDataHas(propertyName) {
    return function (req, res, next) {
        const {data = {}} = req.body;

        // Additional check for Update
        if (propertyName === 'status') {
            const validStatuses = ['pending', 'preparing', 'out-for-delivery', 'delivered'];
            if (!data[propertyName] || !validStatuses.includes(data[propertyName])) {
                next({
                    status: 400,
                    message: `Order must have a status of pending, preparing, out-for-delivery, delivered`
                });
            }
            if (data[propertyName] === '"delivered') {
                next({
                    status: 400,
                    message: `A delivered order cannot be changed`
                });
            }
            return next();
        }

        if (propertyName === 'id') {
            const orderId = req.params.orderId;
            if (orderId && data[propertyName] && orderId !== data[propertyName]) {
                next({
                    status: 400,
                    message: `Order id does not match route id. Order: ${data[propertyName]}, Route: ${orderId}.`
                });
            }
            return next()
        }


        if (!data[propertyName]) {
            next({
                status: 400,
                message: `Order must include a ${propertyName}`
            });
        }

        if (propertyName === 'dishes') {
            const newDishes = data[propertyName];
            if (!Array.isArray(newDishes) || newDishes.length === 0) {
                next({
                    status: 400,
                    message: 'Order must include at least one dish'
                });
            }

            newDishes.forEach((dish, index) => {
                // Check if 'quantity' property is present and is a positive integer
                if (!dish.quantity || !Number.isInteger(dish.quantity) || dish.quantity <= 0) {
                    return next({
                        status: 400,
                        message: `Dish ${index} must have a quantity that is an integer greater than 0`
                    });
                }
            });
        }

        res.locals.newOrder = data;
        return next();
    }
}

function orderExists(req, res, next) {
    const orderId = req.params.orderId;
    const foundOrderIndex =  orders.findIndex((order) => order.id === orderId);

    if (foundOrderIndex !== -1) {
        res.locals.foundOrderIndex = foundOrderIndex
        return next();
    }
    next({
        status: 404,
        message: `Order id ${orderId} not found: ${req.params.urlId}`
    });
}

function isPendingOrder(req, res, next) {
    const foundOrderIndex = res.locals.foundOrderIndex;
    if (orders[foundOrderIndex].status === 'pending') {
        return next();
    }

    next({
        status: 400,
        message: "Order  can not be deleted because it is not in pending state"
    });
}

// TODO: Implement the /orders handlers needed to make the tests pass
function list(req, res) {
    res.json({ data: orders });
}

function create(req, res) {
    const newOrder = res.locals.newOrder;

    newOrder['id'] = nextId();;
    orders.push(newOrder);
    res.status(201).json({ data: newOrder });
}

function read(req, res) {
    const foundOrderIndex = res.locals.foundOrderIndex;
    res.json({ data: orders[foundOrderIndex] });
}

function update(req, res) {
    const foundOrderIndex = res.locals.foundOrderIndex;
    const id = orders[foundOrderIndex].id;
    const newOrder = res.locals.newOrder;

    orders[foundOrderIndex] = { ...newOrder, id }
    res.json({ data:  orders[foundOrderIndex] });
}

function destroy(req, res) {
    const foundOrderIndex = res.locals.foundOrderIndex;
    // Delete the order with the specified id
    orders.splice(foundOrderIndex, 1);
    // Return a 204 status code for a successful deletion
    res.status(204).send();
}

module.exports = {
    list,
    create: [
        bodyDataHas('deliverTo'),
        bodyDataHas('mobileNumber'),
        bodyDataHas('dishes'),
        create,
    ],
    read: [
        orderExists,
        read,
    ],
    update: [
        orderExists,
        bodyDataHas('deliverTo'),
        bodyDataHas('mobileNumber'),
        bodyDataHas('dishes'),
        bodyDataHas('id'),
        bodyDataHas('status'),
        update,
    ],
    delete: [
        orderExists,
        isPendingOrder,
        destroy,
    ],
};