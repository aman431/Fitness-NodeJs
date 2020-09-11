const mongoose = require('mongoose');
const dietSchema = new mongoose.Schema({
	morning_eat:{
		type: String,
		// required: [true, 'This field is required']
	},
	morning_quantity:{
		type: String,
		// required:[true,'This field is required']
	},
	breakfast_eat:{
		type: String,
		// required: [true, 'This field is required']
	},
	breakfast_quantity:{
		type: String,
		// required: [true, 'This field is required']
	},
	Inbetween_eat:{
		type: String,
		// required: [true, 'This field is required']
	},
	Inbetween_quantity:{
		type: String,
		// required: [true, 'This field is required']
	},
	lunch_eat:{
		type: String,
		// required: [true, 'This field is required']
	},
	lunch_quantity:{
		type: String,
		// required: [true, 'This field is required']
	},
	snacks_eat:{
		type: String,
		// required: [true, 'This field is required']
	},
	snacks_quantity:{
		type: String,
		// required: [true, 'This field is required']
	},
	dinner_eat:{
		type: String,
		// required: [true, 'This field is required']
	},
	dinner_quantity:{
		type: String,
		// required: [true, 'This field is required']
	},
	water_intake:{
		type: String,
	//	required: [true, 'This field is required']
	},
	cooking_medium:{
		type: String,
	//	required: [true, 'This field is required']
	},
	health_reason:{
		type: String,
		//required: [true, 'This field is required']
	},
	cultural_reason:{
		type: String,
		//required: [true, 'This field is required']	
	},
	religious_reason:{
		type: String,
		//required: [true, 'This field is required']
	},
	intense_dislike:{
		type: String,
		required: [true, 'This field is required']
	},
	highly_senstitive:{
		type: String,
		required: [true, 'This field is required']
	},
	intolerance:{
		type: String,
		required: [true, 'This field is required']
	},
	allergies:{
		type: String,
		required: [true, 'This field is required']
	}
});

const Diet = mongoose.model('diet', dietSchema);
module.exports = Diet