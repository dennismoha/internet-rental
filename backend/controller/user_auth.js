const User = require('../model/users_singup');
const bcrypt = require('bcrypt');

//this is the landing page
const landing_page = (req,res) => {
	res.render('landing')
}

//this is the signup pagesignup_page
const register_page = (req,res) => {
	res.render('register')
}

//this is the login page render
const login_page = (req,res) => {
	res.render('login')
}
//contact route
const contact_page =(req,res)=> {
	res.render('contact')
}
//about route
const about_page =(req,res)=> {
	res.render('contact')
}





const singup = (req,res) => {
	
	
	const {firstname, lastname,email,phone_number, password,password2} = req.body;
	let errors = [];

	if(!firstname || !lastname || !email || !phone_number || !password || !password2) {
		errors.push({message: "please fill in all the requirements"})
	}
	
	if(password !== password2) {
		errors.push({message: "password do not match"})
	}

	if(password.length < 6) {
		errors.push({message: "password cannot be less than 6 characters"})
	}

	if(errors.length > 0) {
		res.render('register',{
			errors,firstname,lastname, email,phone_number, password, password2
		})
	} else {
		User.findOne({email:email})
		.then(user => {
			if(user)   {
				errors.push({message:"Email is arleady taken"});
				res.render('register',{
					errors,firstname, lastname,email,phone_number, password, password2
				})
			}else {
				
				bcrypt.hash(req.body.password, 10).then((hash)=> {
					const user = new User({
						firstname,
						lastname,						
						email,
						phone_number,
						password:hash
					});
					console.log('the user is',user)
					user.save().then(
						()=>{
							req.flash('success','your now registered! login')
							res.redirect('/users/users/property_page')
						}).catch((error)=>{
							throw error
						})
				}).catch((error)=> {
					throw error
				})
			}
		})
	}
		
}

const login = (req,res,next)=> {
	passport.authenticate('local',{
		successRedirect : '/users/home_page',
		failureRedirect: '/user/login_page',
		
	})(req,res,next);
	console.log(req.flash)
	
}

//display all users in the database
const allUsers = (req,res)=> {
	User.find().then((users)=>{
		res.status(200).json(users)
	}).catch((error)=> {
		res.status(400).json({
			message: 'no user found'
		})
	})
}



const logout = (req,res)=> {
	req.logout();
	req.flash('sucess',"your are logged out");
	res.redirect('/users/');
}

const property_page = (req,res)=>{
	res.render('property')
}

module.exports = {singup,login,logout,allUsers,login_page,
				landing_page,register_page,contact_page,about_page,property_page}
				 
				 