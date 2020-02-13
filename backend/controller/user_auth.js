const User = require('../model/users_singup');
const bcrypt = require('bcrypt');
// const {roles} = require('../roles')
const jwt = require('jsonwebtoken')
const AccessControl = require('accesscontrol');
const ac = new AccessControl();


	ac.grant('user')
	  .readOwn('profile')
	  .updateOwn('profile')
	  .readAny('property')
	  .readAny('user')

	.grant('landlord')
	  .extend('user')
	  .readAny('profile')
	  .createOwn('property')
	  .deleteOwn('property')

	.grant('admin')
	  .extend('user')
	  .extend('landlord')
	  .updateAny('profile')
	  .deleteAny('profile')



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

					const accessToken = jwt.sign({userId:user._id},"secret string",{
						expiresIn:"24h"
					})
					user.accessToken = accessToken
					console.log('the user is',user)
					user.save().then(
						()=>{
							req.flash('success','your now registered! login')							
							 // res.redirect('/users/home_page')
							 console.log(user)
							 res.render('property')
							
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

	//display all users in the database
	const allUsers = (req,res)=> {
		console.log(req.user)
		const permission = ac.can(req.user.role).readAny('profile');
		if(permission.granted) {
			User.find().then((users)=>{
			res.status(200).render('contact',{users})
		}).catch((error)=> {
			res.status(400).json({
				message: 'no user found'
			})
		})

		} else {
			res.status(403).end();
		}		
	}


	
const getUser =(req,res) => {
	console.log(req.role);
	//const permission = ac.can(req.user.role).readAny('profile');
	//if(permission.granted) {
		User.findById(req.params.id,(err,userFound)=> {
	 		if(err) {
	 			//use and error handler here
	 			res.status(400).json({message: "user not found"})
	 		}
	 	
	 		res.send(userFound)
	 		// res.render('show page',{user})
	 	})


	// }else {
	// 	console.log('permission denied')
	// 	res.status(403).end();
	// }
	 	

	 }

//updating a single user
const updateUser = (req,res) => {
	//const permission = ac.can(req.user.ro)
	
	User.findByIdAndUpdate(req.params.id,(err,user)=> {
		if(err) {
			//
			console.log("can't uodate this user")
			throw error
		}
		console.log(user)

		// res.render('allusers page',{user})
	})
}

//deleting a single user
const deleteUser = (req, res) => {
	User.findByIdAndRemove(req.params.id,(err,removeUser)=> {
		if(err) {
			console.log('error deleting user');
			throw err
		}
			console.log('user successfully deleted')
		// res.redirect('/')
	})
}

//logout module
const logout = (req,res)=> {
	req.logout();
	req.flash('sucess',"your are logged out");
	res.redirect('/page');
}


module.exports = {singup,logout,allUsers,getUser,deleteUser,updateUser
				}
				 
				 