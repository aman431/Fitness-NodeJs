const mongoose = require('mongoose');
const parqSchema = new mongoose.Schema({
	question1: {
		type:String,
		required: [true,'This Field is required']
	},
	question2:{
		type:String,
		required: [true,'This Field is required']
	},
	question3:{
		type:String,
		required: [true,'This Field is required']
	},
	question4:{
		type:String,
		required: [true,'This Field is required']
	},
	question5:{
		type:String,
		required: [true,'This Field is required']
	},
	age:{
		type:String,
		required: [true,'This Field is required']
	},
	gender:{
		type:String,
		required: [true,'This Field is required']
	},
	height:{
		type:String,
		required: [true,'This Field is required']
	},
	weight:{
		type:String,
		required: [true,'This Field is required']
	},
	training_type:{
		type:String,
		// required: [true,'This Field is required']
	},
	training_week:{
		type:String,
		// required: [true,'This Field is required']
	},
	training_duration:{
		type:String,
		// required: [true,'This Field is required']
	},
	cardio_type:{
		type:String,
		// required: [true,'This Field is required']
	},
	cardio_week:{
		type:String,
		// required: [true,'This Field is required']
	},
	cardio_duration:{
		type:String,
		// required: [true,'This Field is required']
	},
	stretching_type:{
		type:String,
		// required: [true,'This Field is required']
	},
	stretching_week:{
		type:String,
		// required: [true,'This Field is required']
	},
	stretching_duration:{
		type:String,
		// required: [true,'This Field is required']
	},
	sports_type:{
		type:String,
		// required: [true,'This Field is required']
	},
	sports_week:{
		type:String,
		// required: [true,'This Field is required']
	},
	sports_duration:{
		type:String,
		// required: [true,'This Field is required']
	},
	other_type:{
		type:String,
		// required: [true,'This Field is required']
	},
	other_week:{
		type:String,
		// required: [true,'This Field is required']
	},
	other_duration:{
		type:String,
		// required: [true,'This Field is required']
	}
});

const Parq = mongoose.model('parq',parqSchema);
module.exports = Parq;