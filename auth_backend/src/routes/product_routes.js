const productRoutes = require('express').Router();

const productController =  require("./../controllers/product_controller");

productRoutes.get("/getProducts", productController.getProducts);

productRoutes.post("/createProduct", productController.createProduct);

productRoutes.get("/category/:id", productController.getAllProductsByCategory);

module.exports = productRoutes;