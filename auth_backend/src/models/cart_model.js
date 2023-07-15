const { Schema , model} = require('mongoose');


const cartItemSchema = new Schema({
  product: {type: Schema.Types.ObjectId, ref: 'Product'},
  quantity: {type:Number, default: 1}
});

const cartSchema = new Schema ({
 user: {type: Schema.Types.ObjectId,ref: 'User',required:true},
 items: { type: [cartItemSchema], default:[]},

});

cartSchema.pre('save', function(next) {
  
  next();
});

cartSchema.pre(['update','findOneAndUpdate','UpdateOne'],function(next){
  
  const update = this.getUpdate(); 
  delete update._id;

  next();
});



const cartModel = model('cart',cartSchema);


module.exports = cartModel;