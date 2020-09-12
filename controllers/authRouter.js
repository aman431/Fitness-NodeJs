const { Router } = require('express');
const authController = ('../controllers/AuthController');
const User = require('../models/user');
const Signup = require('../models/signup');
const cont_form = require('../models/cont-form');
const Parq = require('../models/parq');
const Diet = require('../models/diet');
const Interview = require('../models/interview');

const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const router = Router();

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
	return jwt.sign({ id }, 'rathod secret',{
		expiresIn: maxAge
	});
}

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
			const token = createToken(signup._id);
			res.cookie('jwt', token , { httpOnly: true, maxAge: maxAge * 1000 });
			res.status(200).json({ signup: signup._id });
			signup
			.save((err,doc) => {
				res.render('con_form');
			})
		}
	}
	catch(err){
		console.log(err);
		res.status(401).send('user is not created');
	}
});

router.get('/login',(req,res) => {
        res.render('login');
});

router.post('/login', async (req,res) => {

		const email = req.body.email;
		const password = req.body.password;

		try{
			const user = await Signup.login(email,password);
			const token = createToken(user._id);
			res.cookie('jwt', token , { httpOnly: true, maxAge: maxAge * 1000 });
			// res.status(200).json({ user: user._id });
			res.redirect('cont-form')
			
		}
		catch(err){
			console.log(err);
			res.status(400).json('Please check your email and password');
		}
});


router.get('/user',(req,res) =>{
	res.render('user');
});


router.post('/user',(req,res) =>{
	try{
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			const alert = errors.array();
			res.render('signup',{ alert });
		}
		else{
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

router.post('/cont-form',[
		check('user_name', 'This username must be more than 3 character')
			.exists()
			.isLength({ min: 3}),
		check('client_Name', 'This username must be more than 3 character')
			.exists()
			.isLength({ min: 3}),
		check('client_Number','Please Enter the valid Number ')
			.exists()
			.isLength({min: 10})
	],(req,res,next) => {
	try{
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			const alert = errors.array();
			res.render('con_form',{ alert });
		}
		else{
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



router.post('/parq',[
		check('question1', 'Field should not be empty')
			.exists(),
		check('question2', 'Field should not be empty')
			.exists(),
		check('question3', 'Field should not be empty')
			.exists(),
		check('question4', 'Field should not be empty')
			.exists(),
		check('question5', 'Field should not be empty')
			.exists(),
		check('age', 'Please Enter Valid Age')
			.exists()
			.isLength({min:1 , max:3}),
		check('gender', 'Please Enter valid Gender')
			.exists()
			.isLength({min:1 , max:6}),
		check('height', 'Please Enter Valid height')
			.exists()
			.isLength({min:1 , max:6}),
		check('weight', 'Please Enter Valid weight')
			.exists()
			.isLength({min:1 , max:5})

	],(req,res,next) => {
	try{

		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			const alert = errors.array();
			res.render('parq',{ alert });
		}
		else{
			var parq = new Parq({

				question1: req.body.question1,
				question2: req.body.question2,
				question3: req.body.question3,
				question4: req.body.question4,
				question5: req.body.question5,
				age: req.body.age,
				gender: req.body.gender,
				height: req.body.height,
				weight: req.body.weight,
				training_type: req.body.training_type,
				training_week: req.body.training_week,
				training_duration: req.body.training_duration,
				cardio_type: req.body.cardio_type,
				cardio_week: req.body.cardio_week,
				cardio_duration: req.body.cardio_duration,
				stretching_type: req.body.stretching_type,
				stretching_week: req.body.stretching_week,
				stretching_duration: req.body.stretching_duration,
				sports_type: req.body.sports_type,
				sports_week: req.body.sports_week,
				sports_duration: req.body.sports_duration,
				other_type: req.body.other_type,
				other_week: req.body.other_week,
				other_duration: req.body.other_duration,
			});

			parq
			.save((err,doc) => {
				if(err){
					console.log(err);
					res.status(400).json({message:'Something is wrong'});
				}
				else{
					res.redirect('diet');
				}
			})
		}
	}
	catch(err){
		console.log(err);
		res.status(401).json({message:'Something wrong'});
	}
});

router.get('/diet',(req,res) => {
	res.render('diet');
});

router.post('/diet',(req,res) => {
	try{
	var diet = new Diet({
		morning_eat: req.body.morning_eat,
		morning_quantity: req.body.morning_quantity,
		breakfast_eat: req.body.breakfast_eat,
		breakfast_quantity: req.body.breakfast_quantity,
		Inbetween_eat: req.body.Inbetween_eat,
		Inbetween_quantity: req.body.Inbetween_quantity,
		lunch_eat: req.body.lunch_eat,
		lunch_quantity: req.body.lunch_quantity,
		snacks_eat: req.body.snacks_eat,
		snacks_quantity: req.body.snacks_quantity,
		dinner_eat: req.body.dinner_eat,
		dinner_quantity: req.body.dinner_quantity,
		water_intake: req.body.water_intake,
		cooking_medium: req.body.cooking_medium,
		health_reason: req.body.health_reason,
		cultural_reason: req.body.cultural_reason,
		religious_reason: req.body.religious_reason,
		intense_dislike: req.body.intense_dislike,
		highly_senstitive: req.body.highly_senstitive,
		intolerance: req.body.intolerance,
		allergies: req.body.allergies,
		box11: req.body.box11,
		box12: req.body.box12,
		box21: req.body.box21,
		box22: req.body.box22,
		box31: req.body.box31,
		box32: req.body.box32,
		box41: req.body.box41,
		box42: req.body.box42,
		box51: req.body.box51,
		box52: req.body.box52,
		box61: req.body.box61,
		box62: req.body.box62,
	})
	 diet
	 	.save((err,doc) => {
	 		if(err){
	 			console.log(err);
	 			res.status(400).json('Not Insert')
	 		}
	 		else{
	 			res.redirect('interview');
	 			// res.send('it is working');
	 		}
	 	})
	 }
	 catch(err){
	 	console.log(err);
	 	res.status(401).json('Something wrong');
	 } 
});

router.get('/interview', (req,res) => {
	 	res.render('interview');
	 });


router.post('/interview', (req,res) => {
	try{
	var interview = new Interview({
		name: req.body.name,
		gender: req.body.gender,
		height: req.body.height,
		weight: req.body.weight,
		age: req.body.age,
		health_risk: req.body.health_risk,
		medical_history: req.body.medical_history,
		medications: req.body.medications,
		occupation: req.body.occupation,
		time_availability: req.body.time_availability,
		lifestyle: req.body.lifestyle,
		phy_activity: req.body.phy_activity,
		exercise_training: req.body.exercise_training,
		exercise_contradicition: req.body.exercise_contradicition,
		likes: req.body.likes,
		dislikes: req.body.dislikes,
		barr_to_exer: req.body.barr_to_exer,
		soln_to_over: req.body.soln_to_over,
		motivation_strategies: req.body.motivation_strategies,
		exercise_programm: req.body.exercise_programm,
		short_term: req.body.short_term,
		medium_term: req.body.medium_term,
		long_term: req.body.long_term,
		consent_complete: req.body.consent_complete,
		clearance_letter: req.body.clearance_letter
 	});

	interview
		.save((err, doc) => {
			if (err) {
				console.log(err);
				res.status(400).json('Something went wrong');
			}
			else{
				res.redirect('submit');
				// res.status(200).json('successfully');
			}
		});
	}
	catch(err){
		console.log(err);
		res.status(401).json('Something wrong');
	}
});

router.get('/submit',(req,res) => {
	res.render('submit');
})

module.exports = router;
