const express = require('express');

const Usersign = require('../controller/user_auth')

const userRoute = express.Router();

userRoute.get('/users',Usersign.allUsers);
userRoute.post('/user',Usersign.singup);
userRoute.post('/user',Usersign.login)

module.exports = userRoute;