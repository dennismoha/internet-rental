const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	
	content :{type:String,Trim:true},
	author:{type:String,Trim:true}
})

module.exports = mongoose.model('reviews',reviewSchema);