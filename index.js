require('./models/db');

const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();
const authControllers = require('./controllers/authRouter');

//var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('public'));
app.set('view engine','ejs');
//app.use(express.json());


app.get('/',(req,res) =>{
	res.render('home');
});

app.get('/cont-form', requireAuth , (req,res) => res.render('con_form'));
app.get('/parq', requireAuth , (req,res) => res.render('parq'));
app.get('/diet', requireAuth , (req,res) => res.render('diet'));
app.get('/interview', requireAuth , (req,res) => res.render('interview'));
app.get('/submit', requireAuth , (req,res) => res.render('submit'));
app.use(authControllers);

const port = process.env.PORT || 3000;
app.listen(port,() =>{
	console.log('Port Running on 3000');
});
