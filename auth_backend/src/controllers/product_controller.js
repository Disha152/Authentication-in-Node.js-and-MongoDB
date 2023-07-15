const productModel = require('../models/product_model');

const productController = {

  createProduct : async function(req,res) {

    try{
      const productData = req.body;
      const newProduct = new productModel(productData);
      await newProduct.save();

      return res.json({success: true, data: newProduct,message: "Product created"});
    }

    catch(ex){
      return res.json({ success: false, message: ex});
    }
  },

  getProducts : async function(req,res) {

    try{
      const products = await productModel.find();
      return res.json({success: true, data:products});
    }
    catch(ex){
      return res.json({success: false, message:ex });
    }
  },

  getAllProductsByCategory : async function(req,res) {

    try{
      const categoryId = req.params.id;

      const products = await productModel.find({category:categoryId});
      return res.json({success: true, data:products});
    }
    catch(ex){
      return res.json({success: false, message:ex });
    }
  }
}


module.exports = productController;