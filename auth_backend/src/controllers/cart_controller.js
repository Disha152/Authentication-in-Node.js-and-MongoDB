const cartModel = require('./../models/cart_model');

const cartController = {


  addToCart: async function (req, res) {
    try {
      const { product, user, quantity } = req.body;
      const foundCart = await cartModel.findOne({ user: user });
  
      // If cart doesn't exist
      if (!foundCart) {
        const newCart = new cartModel({ user: user });
        newCart.items.push({
          product: product,
          quantity: quantity,
        });
        await newCart.save();
        return res.json({
          success: true,
          data: newCart,
          message: "Product added to cart",
        });
      } else {
        // Cart already exists
        foundCart.items.push({
          product: product,
          quantity: quantity,
        });
        await foundCart.save();
        return res.json({
          success: true,
          data: foundCart,
          message: "Product added to cart",
        });
      }
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  removeFromCart: async function (req, res) {
    try {
      const { user, product } = req.body;
      const updatedCart = await cartModel.findOneAndUpdate(
        { user: user },
        { $pull: { items: { product: product } } },
        { new: true } // To get the new updated version.
      );
      return res.json({
        success: true,
        data: updatedCart,
        message: "Product removed from cart",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  updateCart: async function (req, res) {
    try {
      const { user, product, quantity } = req.body;
      const updatedCart = await cartModel.findOneAndUpdate(
        { user: user, "items.product": product },
        { $set: { "items.$.quantity": quantity } },
        { new: true } // To get the new updated version.
      );

      if (updatedCart) {
        return res.json({
          success: true,
          data: updatedCart,
          message: "Cart updated successfully",
        });
      } else {
        return res.json({
          success: false,
          message: "Product not found in the cart",
        });
      }
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  // getCartForUser: async function (req, res) {
  //   try {
  //     const {user} = req.body;
  //     const foundCart = await cartModel.findOne({ user: user});

  //     if (!foundCart) {
  //       return res.json({ success: true, data: [] });
  //     }

  //     return res.json({ success: true, data: foundCart.items });
  //   } catch (ex) {
  //     return res.json({ success: false, message: ex });
  //   }
  // },

  getCartForUser: async function (req, res) {
    try {
      const { email } = req.query;
      const foundCart = await cartModel.findOne({email:email });
  
      if (!foundCart) {
        return res.json({ success: true, data: [] });
      }
  
      return res.json({ success: true, data: foundCart.items });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
  
};

module.exports = cartController;
