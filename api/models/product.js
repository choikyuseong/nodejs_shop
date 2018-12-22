const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _idt : mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number
});

module.exports = mongoose.model('product' , productSchema);
