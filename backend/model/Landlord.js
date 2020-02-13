const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pata_space', {useNewUrlParser: true});


const landlordSchema = new mongoose.Schema({
	first_name :{type:String, required:true, trim:true, maxLength:32},
	last_name  :{type:String, required:true, trim:true, maxLength:32},
	email 	   :{type:String, unique:true, trim:true},
	phone_number: {type:Number, unique:true, required:true, maxLength:10},
	password :{type:String,required:true, trim:true},
	//role : {}
	photo: { data: Buffer, contentType: String}



})

module.exports = mongoose.model('landlord',landlordSchema);