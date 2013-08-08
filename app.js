
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , util = require('util')
  , FacebookStrategy= require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "532629850094137"
var FACEBOOK_APP_SECRET = "03e0c0e52c7d3b1987c219c27d30c9a0";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

var app = express();

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'pikachu' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// 404 page redirect
	app.use(function(req, res){
		res.send(404, "four-oh-four");

	});
	// specified error responder 
	app.use(function(err, req, res, next){
		res.status(err.status || 404);
		res.send(err.message);
	})


});

// development only
if ('development' == app.get('env')) { 
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);
// ---------- Test code



// ---------- Parameter Intercepters 
app.param('username', function(req, res, next, username){
	if(username != 'hello'){
		req.username = username;
		next();
	} else {
			// var err = new Error('username does not exist');
			// pass error to next
			// err.status = 'something-error' - can use case statement 
			// next(err);
		next(new Error("no username found"));
	}
})



app.get('/', ensureAuthenticated, function(req, res){
	//console.log("Session: %j", req.user);
	//console.log(req.user)
  res.render('index', { user: req.user, hello: JSON.stringify(req.user)});
});

app.get('/login', function(req, res){
	if(req.user != undefined){
		res.redirect('/');
	} else {
	  res.render('login', {user: req.user });
	}
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_status', 'user_checkins']}));
app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', {
		failureRedirect: '/login'
	}), function(req, res){
		res.redirect('/');
	}	
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// ---------- Map Routes
app.map = function(obj, route){
	route = route || '';
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			switch(typeof obj[key]){
				case "object":
					app.map(obj[key], route + key);
					break;
				case "function":
					app[key](route, obj[key]);
					break;
			}
		}
	}
}
app.map({
	'/username': {
		get: function(req, res) {res.send("all usernames")},
		'/:username':{
			get: function(req, res, next) {
				res.send(req.username + "'s profile");
			}
			
		}
	}
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}