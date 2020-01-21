const User = require('../model/users_singup');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

//this is the normal users login and signup form.

const Signup = (req,res)=> {
	bcrypt.hash(req.body.password,10).then(
		(hash)=> {
			const user = new User({
				firstname: req.body.firstname,
				lastname:  req.body.lastname,
				email	:  req.body.email,
				phone_number: req.body.phone_number,
				password : hash
			});

			user.save().then(
				()=>{
					res.status(201).json({message: "Successfully Signed up"})
				})
				.catch((error)=> {
					throw error
					res.status(500).json({message: "!error in signing up"})
				})
		})
			.catch((error)=> {
				throw error
			})

}

const login = (req,res)=> {
	User.findOne({(req.body.email}).then((user)=> {
		if(!user) {
			res.json({message: 'user with that email does not exist'})
		}
	})

	bcrypt.compare(req.body.password, user.password).then((valid)=> {
		if(!valid)=> {
			res.status(400).json({message: "incorrect password"})
		}

		const token = jwt.sign({userId: user._id},'RANDOM USER SECRET STRING')
		res.cookie('t', token,{expire: new Date() + 9999})

		const{_id,firstname, lastname,email} = user;
		return res.json({token, user: {_id, firstname,lastname, email}})

		res.status(200).json({
			userId: user._id,
			token: 'token'
		})
	}).catch((error)=> {
		throw error
	}).catch((error)=> {
		throw error
		res.status(500).json({
			error: error
		})
	})
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

const signout = (req, res)=> {
	res.clearCookie('t')
	res.json({message: 'Signout Successfully!!'})
}

module.exports = {signup,login,signout,allUsers}