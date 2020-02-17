const Category = require('../model/category');

const createCategory = (req,res) => {

	const category = new Category({
		name : req.body.name
	});

	category.save().then(
		(category)=> {
			if(category){
				res.render('Admin/view_categories',{category:category})
			}
			res.status(400).json({message: "error adding categories"})
		}).catch((error)=> {
			throw error;
			console.log('error in adding categories')
		})
}

const getCategories = (req,res) => {
	Category.find().then(
		(category)=> {
			if(category) {
				console.log('category')
				res.render("Admin/all_categories",{category:category})
			}
		}).catch(
		(error)=> {
			throw error;
			console.log('error getting all categories',error)
		})
}


module.exports = {createCategory,getCategories}
