const mongoose = require('mongoose');
const interviewSchema = new mongoose.Schema({
	name:{
		type: String,
		//required:[true,'this field is required']
	},
	gender:{
		type: String,
		// required:[true,'this field is required']
	},
	height:{
		type: String,
		// required:[true,'this field is required']
	},
	weight:{
		type: String,
		// required:[true,'this field is required']
	},
	age:{
		type: String,
		// required:[true,'this field is required']
	},
	health_risk:{
		type: String,
		// required: [true,'This field is required']
	},
	medical_history:{
		type: String
	},
	medications:{
		type:String
	},
	occupation:{
		type: String
	},
	time_availability:{
		type: String
	},
	lifestyle:{
		type: String
	},
	phy_activity:{
		type: String
	},
	exercise_training:{
		type: String
	},
	exercise_contradicition:{
		type: String
	},
	likes:{
		type: String
	},
	dislikes:{
		type: String
	},
	barr_to_exer:{
		type: String
	},
	soln_to_over:{
		type: String
	},
	motivation:{
		type: String
	},
	motivation_strategies:{
		type: String
	},
	exercise_programm:{
		type: String
	},
	short_term:{
		type: String
	},
	medium_term:{
		type: String
	},
	long_term:{
		type: String
	},
	consent_complete:{
		type: String
	},
	consent_complete:{
		type: String
	},
	clearance_letter:{
		type: String
	},
	clearance_letter:{
		type: String
	}
});

const Interview = mongoose.model('Client_Interview', interviewSchema);
module.exports = Interview;
