const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
	firstname:{
		type: String,
		required: 'This field is required'
	},
	lastname:{
		type:String,
		required: 'This field is required'
	},
	email:{
		type: String,
		required: 'This field is required',
		unique: true
	},
	number:{
		type: String,
		required: 'This field is required'
	},
	password:{
		type: String,
		required: 'This field is required'
	},
	retype_password:{
		type: String,
		required: 'This field is required'
	}
});


const Signup = mongoose.model('signup',signupSchema);
module.exports = Signup;
