const express = require('express');
const bodyParser = require('body-parser')
const app 	= express();
require('dotenv').config();

//user routes
const user = require('./routes/user_auth')


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());





//user routes
app.use('/users',user)

const port =  process.env.PORT || 8000

app.listen(port,(err)=> {
	if(err) {
		console.log('server starting error!')
	}
	console.log(`successfully started serve ${port}`)

})