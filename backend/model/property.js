const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/pata_space', {useNewUrlParser: true});

const userSingupSchema = new mongoose.Schema({
	name: {type:String, required:true, trim:true},
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'building_category', required:true},
	house_photo: {data:Buffer, contentType:String},
	description :{type:String, required:true, trim:true, maxLength:},
	quantity: {type: Number , required:true},
	sold:{type: Number, default: 0}
})

module.exports = mongoose.model('userSingup',userSingupSchema)