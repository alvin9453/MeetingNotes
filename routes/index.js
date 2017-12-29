var express = require('express');
var router = express.Router();
var PPTURLs = require('../models/ppt_url');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* GET Home Page */

	router.get('/home', isAuthenticated, function(req, res){
		PPTURLs.find( function (err, data ){
				if (err) return console.error(err);
				res.render('home' , {
						user : req.user,
						ppt_data : data
				 });
		});

		//res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.post('/add_ppt_url', function(req,res){
		var url = req.body.ppt_url;
		var ppt_title = req.body.ppt_title;
		var speaker = req.body.ppt_speaker;
		var date = req.body.ppt_date;

		var ppt = new PPTURLs();
		ppt.url = url;
		ppt.ppt_title = ppt_title;
		ppt.speaker = speaker;
		ppt.date = date;
		console.log("Date : " + date);
		ppt.save(function (err , result){
			if(err) return console.error(err);

		});
		res.redirect("home");

	});

	/* Get meeting page */
	router.post('/meeting',isAuthenticated,function(req, res,next) {
		res.locals.username = req.session.username;
		res.locals.authenticated = req.session.logined;

		var ppt = new PPTURLs();
		var title = req.body.input_ppt_title;

		PPTURLs.find( { ppt_title : title } , function(err, data){
			console.log("Data :",data);
			console.log("User :",req.user)
			res.render('meeting',
					{
							user : req.user,
							data : data
					});
		});


	});

	return router;
}
