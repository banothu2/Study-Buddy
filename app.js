
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();


// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
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
