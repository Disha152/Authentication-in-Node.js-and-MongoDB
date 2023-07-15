const { Schema , model} = require('mongoose');

const categorySchema = new Schema ({
  title: {type:String , required: [true,'title is required']},
  description: {type: String , default: ""},
  
});

categorySchema.pre('save', function(next) {

  next();
});

categorySchema.pre(['update','findOneAndUpdate','UpdateOne'],function(next){
  
  const update = this.getUpdate(); 
  delete update._id;

  next();
});

const CategoryModel = model('Category',categorySchema);

module.exports = CategoryModel;