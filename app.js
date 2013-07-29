
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.SchemaTypes.ObjectId;
  
mongoose.connect('mongodb://localhost/test'); 

var conf = require('./config/oauth_providers');
var UserSchema = new Schema({})
    , User;
var mongooseAuth = require('mongoose-auth');

UserSchema.plugin(mongooseAuth, {
  everymodule: {
    everyauth: {
      User: function() {
        return User;
      }
    }
  },
  facebook: {
    everyauth: {
      myHostname: 'http://local.host:3000',
      appId: conf.fb.appId,
      appSecret: conf.fb.appSecret,
      redirectPath: '/'
    }
  },
  twitter: {
    everyauth: {
      myHostname: 'http://local.host:3000',
      consumerKey: conf.twit.consumerKey,
      consumerSecret: conf.twit.consumerSecret,
      redirectPath: '/'
    }
  },
  github: {
    everyauth: {
      myHostname: 'http://local.host:3000',
      appId: conf.github.appId,
      appSecret: conf.github.appSecret,
      redirectPath: '/'
    }
  }
});

mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/example');

User = mongoose.model('User');




var app = express();


// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
  	app.use(express.session({secret: 'secret'}));
  	app.use(mongooseAuth.middleware());
	app.use(express.methodOverride());

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

mongooseAuth.helpExpress(app);

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
	'/' : {
		get: function(req, res){
			res.send("Home!");
		}
	},
	'/username': {
		get: function(req, res) {res.send("all usernames")},
		'/:username':{
			get: function(req, res, next) {
				res.send(req.username + "'s profile");
			}
			
		}
	},
	'/hello': {
		get: function(req, res){
			res.render('sample.jade', {
				title: "Study Buddy"
			});
		}
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
