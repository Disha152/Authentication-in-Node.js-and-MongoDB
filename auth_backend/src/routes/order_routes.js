const OrderRoutes = require('express').Router();

const OrderController = require('./../controllers/order_controller');

OrderRoutes.post("/createOrder",OrderController.createOrder);

OrderRoutes.get("/:userId",OrderController.fetchOrdersForUser);

module.exports = OrderRoutes;