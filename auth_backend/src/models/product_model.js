const { Schema , model} = require('mongoose');

const productSchema = new Schema ({

  title: {type:String , required: [true,'title is required']},
  description: {type: String , default: ""},
  price :{ type: Number,required:[ true,"price field can't be empty"] },
  category: {type: Schema.Types.ObjectId, ref: 'Category',required: true},
  images: {type:String , default: ""},
  
});

productSchema.pre('save', function(next) {

  next();
});

productSchema.pre(['update','findOneAndUpdate','UpdateOne'],function(next){
  
  const update = this.getUpdate(); 
  delete update._id;

  next();
});

const productModel = model('product',productSchema);

module.exports = productModel;