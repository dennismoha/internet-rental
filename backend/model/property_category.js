const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pata_space', {useNewUrlParser: true});

const buildingCategorySchema = new mongoose.Schema({
	name : {type:String,required:true, trim:true}
	
},{timestamps:true})

module.exports = mongoose.model('buildingCategory',buildingCategorySchema)