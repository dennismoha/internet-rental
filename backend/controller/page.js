const User = require('../model/users_singup');


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
	res.render('about')
}

//finding a user's profile
const dashboard_page =(req,res)=> {
	res.render('dashboard',{user:req.user})
}

const property_page = (req,res)=>{
	res.render('property')
}

const admin_page = (req,res)=> {
	res.render('Admin/dashboard')
}



module.exports = {login_page,
				landing_page,register_page,contact_page,
				about_page,property_page,dashboard_page,admin_page}

