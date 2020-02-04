const express = require('express');
const passport = require('passport')

const Usersign = require('../controller/user_auth')

const userRoute = express.Router();

userRoute.get('/users',Usersign.allUsers);
userRoute.post('/user/singup',Usersign.singup);
// userRoute.post('/user/login',Usersign.login)
userRoute.post('/user/login',(req,res,next)=> {
	passport.authenticate('local',{
		successRedirect : '/users/users/property_page',
		failureRedirect: '/users/users/signup_page',
		failureFlash : true
	})(req,res,next);
	
	
});

//property template

userRoute.get('/users/signup_page',Usersign.register_page)
userRoute.get('/users/about_page',Usersign.about_page)
userRoute.get('/users/contact_page',Usersign.contact_page)
userRoute.get('/users/property_page',Usersign.property_page)
userRoute.get('/',Usersign.landing_page)
userRoute.get('/users/logout',Usersign.logout)

module.exports = userRoute;