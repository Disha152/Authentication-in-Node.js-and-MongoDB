// user_controller.js
const UserModel = require('./../models/user_model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const UserController = {
  createAccount: async function(req, res) {
    try {
      const userData = req.body;
      const newUser = new UserModel(userData);
      await newUser.save();

      return res.json({ success: true, data: newUser, message: "User Created" });

    } catch (e) {
      return res.json({ success: false, message: e });
    }
  },

  // login: async function(req, res) {
  //   try {
  //     const { email, password } = req.body;
  //     const foundUser = await UserModel.findOne({ email: email });
  
  //     if (!foundUser) {
  //       return res.json({ success: false, message: "Invalid credentials" });
  //     }
  
  //     const passwordsMatch = bcrypt.compareSync(password, foundUser.password);
  
  //     if (!passwordsMatch) {
  //       return res.json({ success: false, message: "Invalid credentials" });
  //     }
  
  //     return res.json({ success: true, data: foundUser });
  //   } catch (error) {
  //     console.error("Error occurred during login:", error);
  //     return res.json({ success: false, message: "An error occurred" });
  //   }
  // }

 

// ...

login: async function(req, res) {
  try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });

    if (!foundUser) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const passwordsMatch = bcrypt.compareSync(password, foundUser.password);

    if (!passwordsMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: foundUser._id , email:foundUser.email}, "secretKey", { expiresIn: "1h" });

    return res.json({ success: true, data: foundUser, token: token });
  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.json({ success: false, message: "An error occurred" });
  }
}

  


};

module.exports = UserController;
