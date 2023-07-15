const { Schema , model} = require('mongoose');


const orderItemSchema = new Schema({
  product: {type:Map, required: true},
  quantity: {type:Number, default: 1}
});

const orderSchema = new Schema ({
 user: {type: Map ,required:true},
 items: { type: [orderItemSchema], default:[]},
//  totalPrice:{type : Number },
// //  paymentMethod: String,
// //  status:String,
//  orderedON:{type:Date}
});

orderSchema.pre('save', function(next) {

  next();
});

orderSchema.pre(['update','findOneAndUpdate','UpdateOne'],function(next){
  
  const update = this.getUpdate(); 
  delete update._id;

  next();
});



const orderModel = model('order',orderSchema);


module.exports = orderModel;