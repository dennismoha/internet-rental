const Property = require('../model/property');

const properties = (req,res) => {
	Property.find().then(
		(property)=> {
			if(property) {
				 res.render('landlord/all_properties',{property: property})

			}
			
		}).catch((error)=> {
			throw error
			console.log('error in the find all property route',error)
		})
}

const new_property = (req,res) => {
	
	const property = new  Property({
		title : req.body.title,
		description : req.body.description,
		price : req.body.price,
		// category : req.body.category,
		quantity : req.body.quantity,
		sold : req.body.sold

	})
	property.save().then(
		(property)=> {
			if(property){
				res.render('landlord/property_show',{property:property})
			}
			
		}).catch((error)=> {
			throw error;
			console.log('error in adding new property');
		})

}


const user_property_page = (req,res) => {
	Property.find().then(
		(property)=> {
			if(property) {
				 res.render('home/property',{property: property})

			}
			
		}).catch((error)=> {
			throw error
			console.log('error in the find all property route',error)
		})
}

module.exports = {properties,new_property,user_property_page }



