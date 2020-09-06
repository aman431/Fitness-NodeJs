const { Router } = require('express');
const authController = ('../controllers/AuthController');
const User = require('../models/user');
const Signup = require('../models/signup');
const cont_form = require('../models/cont-form');
const router = Router();


router.get('/signup',(req,res) => {
	res.render('signup');
});

router.post('/signup',(req,res,next) => {
	try {
		var signup = new Signup({ 
			email: req.body.email,
			password: req.body.password
		});
		signup
		.save()
		res.render('home');
	}
	catch(err){
		console.log(err);
		res.status(401).send('user is not created');
	}

});

router.get('/login',(req,res) => {
        res.render('login');
});

router.post('/login',(req,res) => {
        res.json('New login Page');
});


router.get('/user',(req,res) =>{
	res.render('user');
});


router.post('/user',(req,res) =>{
	try{
		var user = new User({
			author: req.body.author,
			header: req.body.header,
			subject: req.body.subject,
			content: req.body.content
		});
		user
		.save()
		res.send(user);
	}
	catch(err){
		console.log('doesnot store a information');
		res.status(401).json({
			message: 'Something fault'
		});
	};

});

router.get('/cont-form', (req,res) =>{
	res.render('con_form');
});

router.post('/cont-form', (req,res) => {
	try{
		var client =  new cont_form({
			user_name: req.body.user_name,
			client_Name: req.body.client_Name,
			client_Number: req.body.client_Number,
			now: new Date()
		});
		client
		.save()
		res.send(client);
	}
	catch(err){
		console.log('Something wrong !! please contact to the Owner');
		res.status(401).json({
			message: 'Something Wrong !! Please Contact to the Owner'
		});
	}
});

module.exports = router;
