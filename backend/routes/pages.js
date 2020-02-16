const express = require('express')
const Pages = require('../controller/page');
const roles = require('../controller/checkroles');
const Admin = require('../controller/admin')
const content_page = require('../controller/content_page');
const pageRoute = express.Router();

pageRoute.get('/users/login',Pages.login_page);
pageRoute.get('/users/signup_page',Pages.register_page);
pageRoute.get('/users/about_page',roles.allowIfLoggedin,Pages.home_about_page);
pageRoute.get('/users/contact_page',roles.allowIfLoggedin,Pages.contact_page);
pageRoute.get('/users/property_page', roles.allowIfLoggedin, Pages.property_page);
pageRoute.get('/',Pages.landing_page);
pageRoute.get('/users/dashboard_pagee',roles.allowIfLoggedin,Pages.dashboard_page); //takes us to a users profile id
pageRoute.get('/admin/page',Pages.admin_page);
pageRoute.get('/admin/registerUser',Admin.regForm);
pageRoute.get('/admin/contactPage',Pages.admin_contactPage);
pageRoute.get('/admin/adminAboutPage',Pages.admin_aboutPage);

pageRoute.get('/about',Pages.about_page)
pageRoute.post('/about/add_content',content_page.about_page);






module.exports = pageRoute;