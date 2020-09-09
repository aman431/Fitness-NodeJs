const { Router } = require('express');
const authController = ('../controllers/AuthController');
const User = require('../models/user');
const Signup = require('../models/signup');
const cont_form = require('../models/cont-form');
const Parq = require('../models/parq');
const { check, validationResult } = require('express-validator');

const router = Router();


router.get('/signup',(req,res) => {
	res.render('signup');
});

router.post('/signup', [
		check('firstname', 'This username must be more than 3 character')
			.exists()
			.isLength({ min: 3}),
		check('lastname', 'This lastname must be more than 3 character')
			.exists()
			.isLength({min: 3}),
		check('email', 'This email is not valid')
			.isEmail()
			.normalizeEmail(),
		check('number','Please Enter the valid Number ')
			.exists()
			.isLength({min: 10}),
		check('retype_password','Password must be between 4 to 16 character')
			.trim()
			.isLength({min: 4,max: 16})
			.custom(async (retype_password , {req}) => {
				const password = req.body.password

				if(password !== retype_password){
					throw new Error('Password doesnot Match')
				}
			})
	] , (req,res,next) => {

	try	{

		const errors = validationResult(req)
		console.log(errors);
		if(!errors.isEmpty()) {
			const alert = errors.array();
			res.render('signup',{ alert });
		}
		else{
			var signup = new Signup({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				number: req.body.number,
				password: req.body.password,
				retype_password: req.body.retype_password
			});
			signup
			.save((err,doc) => {
				res.render('login')
			})
		}
	}
	catch(err){
		console.log(err);
		res.status(401).send('user is not created');
	}
});

// function Authpassword(password,retype_password,req,res){
// 	if(password === retype_password){
// 		console.log('Successfully Match')
// 	}
// 	else{
// 		return res.status(400).json({'message':'Password doesnot match'});
// 	}
// }

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
		.save((err,doc) => {
			if(err){
				res.status(400).json({message:'Something is Wrong'})
			}
			else{
				res.redirect('parq');
			}
		})
	}
	catch(err){
		console.log('Something wrong !! please contact to the Owner');
		res.status(401).json({
			message: 'Something Wrong !! Please Contact to the Owner'
		});
	}
});


router.get('/parq',(req,res) => {
	res.render('parq');
});



router.post('/parq',(req,res) => {
	try{

		var parq = new Parq({

			question1: req.body.question1,
			question2: req.body.question2,
			question3: req.body.question3,
			question4: req.body.question4,
			question5: req.body.question5,
			age: req.body.age,
			gender: req.body.gender,
			height: req.body.height,
			weight: req.body.weight
		});

		parq
		.save((err,doc) => {
			if(err){
				res.status(400).json({message:'Something is wrong'});
			}
			else{
				res.redirect('parq');
			}
		})
	}
	catch(err){
		console.log(err);
		res.status(401).json({message:'Something wrong'});
	}
});

router.get('/login',(req,res) => {
	res.render('login');
});

module.exports = router;
