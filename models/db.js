const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aman431:ride4respect@cluster0.1vvgg.mongodb.net/gym?retryWrites=true&w=majority',{ useNewUrlParser: true },(err) =>{
	if(!err){
		console.log("DB is Successfully Connect...");
	}
	else{
		console.log("Find a Error"+err);
	}
});

//require('./News.model');
