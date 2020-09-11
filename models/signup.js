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

signupSchema.statics.login = async function(email,password){
	const user = await this.findOne({email});
	if(user){
		const auth = await this.findOne({password});
		if(auth){
			return user;
		}
		throw Error('Incorrect password');
	}
	throw Error('Incorrect email');
}

const Signup = mongoose.model('signup',signupSchema);
module.exports = Signup;
