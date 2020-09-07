const mongoose = require('mongoose');
const parqSchema = new mongoose.Schema({
	question1:{
		type:String
	},
	question2:{
		type:String
	},
	question3:{
		type:String
	},
	question4:{
		type:String
	},
	question5:{
		type:String
	}
});

const Parq = mongoose.model('parq',parqSchema);
module.exports = Parq;