const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	author:{
		type: String,
		required: 'This field is required'
	},
	header:{
		type: String,
		required: 'This field is required'
	},
	subject:{
		type: String,
		required: 'This field is required'
	},
	content:{
		type: String,
		required: 'This field is required'
	}
});

const User = mongoose.model('user',userSchema);
module.exports = User;
