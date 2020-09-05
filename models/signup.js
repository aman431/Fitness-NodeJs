const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
	email:{
		type: String,
		required: 'This field is required',
		unique: true
	},
	password:{
		type: String,
		required: true
	}
});

const Signup = mongoose.model('signup',signupSchema);
module.exports = Signup;
