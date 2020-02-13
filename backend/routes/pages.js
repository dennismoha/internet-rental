const express = require('express')
const Pages = require('../controller/page');
const roles = require('../controller/checkroles');
const pageRoute = express.Router();

pageRoute.get('/users/login',Pages.login_page);
pageRoute.get('/users/signup_page',Pages.register_page);
pageRoute.get('/users/about_page',roles.allowIfLoggedin,Pages.about_page);
pageRoute.get('/users/contact_page',roles.allowIfLoggedin,Pages.contact_page);
pageRoute.get('/users/property_page', roles.allowIfLoggedin, Pages.property_page);
pageRoute.get('/',Pages.landing_page);
pageRoute.get('/users/dashboard_pagee',roles.allowIfLoggedin,Pages.dashboard_page); //takes us to a users profile id
pageRoute.get('/admin/page',Pages.admin_page)



module.exports = pageRoute;