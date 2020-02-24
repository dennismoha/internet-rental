const Property = require('../model/property');
const Review = require('../model/reviews');

const newReview =(req,res) => {
	Property.findById(req.params.id,function(err,property) {
		
		if(err) {			
			throw err
		}else {

					
			Review.create(req.body,function(err,review){
				
				if(err){
					console.log(err)
				}else {

					property.reviews.push(review);
					property.save();	
					console.log('this is the review',property.reviews.content)				
					res.redirect('/property/property/' + req.params.id +'/show')
				}
			})
			
		}

	})
}



module.exports = {newReview}