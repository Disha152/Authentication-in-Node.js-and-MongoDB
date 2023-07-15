const cartRoutes = require('express').Router();

const cartController = require('./../controllers/cart_controller');

cartRoutes.post("/addToCart",cartController.addToCart);
cartRoutes.delete("/removeFromCart",cartController.removeFromCart);
cartRoutes.put('/cartUpdate', cartController.updateCart);
cartRoutes.get('/getUserCart',cartController.getCartForUser);


module.exports = cartRoutes;