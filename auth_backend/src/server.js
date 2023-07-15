const express = require('express');
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const uuid = require('uuid');


// const UserRoutes = require('./routes/user_routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());


const port = process.env.PORT || 9459;

mongoose.connect("mongodb+srv://disha29082001:piece@cluster0.1sbbadm.mongodb.net/Sample?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
 

});

const UserRoutes= require('./routes/user_routes');
app.use("/api/user",UserRoutes);

const CategoryRoutes = require('./routes/category_routes');
app.use("/api/category",CategoryRoutes);

const productRoutes = require('./routes/product_routes');
app.use("/api/product",productRoutes);

const cartRoutes = require('./routes/cart_routes');
app.use("/api/cart",cartRoutes);

const orderRoutes = require('./routes/order_routes');
app.use("/api/order",orderRoutes);

app.listen(port , ()=>{
  console.log(`Server is running on port ${port}`);
})


