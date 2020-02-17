const express = require('express');
const properties = require('../controller/property');
const propRoute = express.Router();


propRoute.post('/property/new_property',properties.new_property)

propRoute.get('/property/all_properties',properties.properties);
propRoute.get('/property/user_property_page',properties.user_property_page);




module.exports = propRoute;