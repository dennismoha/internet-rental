const express = require('express');
const Properties = require('../controller/property');
const roles = require('../controller/checkroles');
// const crypto = require('crypto');
// const multer = require('multer');
// const multerGridFs = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const propRoute = express.Router();



// const storage = multer.diskStorage({
// 	destination: function(req,file,cb) {
// 		cb(null,'public/images')
// 	},
// 	filename: function(req,file,cb) {
// 		cb(null,Date.now() + '_' + file.originalname);
// 	}
// });

// const imagefilter = (req,file,cb)=> {
// 	if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
// 		return cb(new Error('only image files are allowed',false))
// 	}
// 	cb(null, true);
// }

// const upload = multer({storage:storage,imagefilter:imagefilter});







propRoute.post('/property/new_property',Properties.new_property)

propRoute.get('/property/all_properties',Properties.properties);
propRoute.get('/property/user_property_page',roles.allowIfLoggedin,Properties.user_property_page);
//landing page property
propRoute.get('/property/user_landing_property_page',Properties.user_landing_property_page);




module.exports = propRoute;