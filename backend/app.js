const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');
const ejs = require('ejs')
const app 	= express();

 app.use(express.static(__dirname + "/public"));
 app.use(express.static(__dirname + '/public/js'));
//user routes
const user = require('./routes/user_auth')

require('./config/passport')(passport);
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/pata_space', {useNewUrlParser: true});
app.use(session({
	secret: "secretstringauth",
	resave: true,
	saveUninitialized: true,
	
}))

//body-parser middleware but in express
app.use(express.urlencoded({extended:false}));

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash())

//global variables
app.use((req,res,next)=> {
	res.locals.currentUser = req.user;
	res.locals.sucess = req.flash('sucess');
	res.locals.error =  req.flash('error');
	res.locals.error_login =  req.flash('error_login');
	next();
});

app.set('view engine','ejs');


//user routes
app.use('/users',user)

const port =  process.env.PORT || 8000

app.listen(port,(err)=> {
	if(err) {
		console.log('server starting error!')
	}
	console.log(`successfully started serve ${port}`)

})