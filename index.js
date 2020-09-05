require('./models/db');

const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();
const authControllers = require('./controllers/authRouter');

//var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));
app.set('view engine','ejs');
//app.use(express.json());


app.get('/',(req,res) =>{
	res.render('home');
});

app.use(authControllers);

app.listen(3000,() =>{
	console.log('Port Running on 3000');
});
