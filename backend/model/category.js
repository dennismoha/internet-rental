const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name:{type:String,trim:true,required:true,maximum:30, min:5}

})

module.exports = mongoose.model('category',categorySchema)