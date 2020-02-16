const User = require('../model/users_singup');
const About = require('../model/about')


//this is the landing page
const landing_page = (req,res) => {
	res.render('home/landing')
}

//this is the signup pagesignup_page
const register_page = (req,res) => {
	res.render('home/register')
}

//this is the login page render
const login_page = (req,res) => {
	res.render('home/login')
}
//contact route
const contact_page =(req,res)=> {
	res.render('home/contact')
}
//about route
const home_about_page =(req,res)=> {
	About.find().then((about)=> {
		if(about) {
			res.render('partials/landing_page_menus/about',{about:about})
		}else {
			throw error;
			console.log('unable to render home_page menu')
		}
	}).catch((error)=> {
		throw error
	})
}

//finding a user's profile
const dashboard_page =(req,res)=> {
	res.render('home/dashboard',{user:req.user})
}

const property_page = (req,res)=>{
	res.render('home/property')
}

const admin_page = (req,res)=> {
	res.render('Admin/dashboard')
}

const admin_contactPage = (req,res) => {
	res.render('Admin/contact')
}

const admin_aboutPage = (req,res) => {
	res.render('Admin/about')
}

const about_page = (req,res) => {
	res.render('Admin/about')
}



module.exports = {login_page,
				landing_page,register_page,contact_page,
				about_page,property_page,dashboard_page,admin_page
,admin_contactPage,admin_aboutPage,home_about_page}
