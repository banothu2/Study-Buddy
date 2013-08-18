// ---------- Module dependencies

var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    hash = require("./pass").hash,
    flash = require("connect-flash"),
    ObjectID = require("./node_modules/mongoose/node_modules/mongodb").ObjectID;
    

var app = express();

// ---------- Database and Models 
    mongoose.connect("mongodb://localhost/myapp");

// ---------- Local Users Schema
    var UserSchema = new mongoose.Schema({
        username: String,
        salt: String,
        hash: String
    });

    var Users = mongoose.model('userauths', UserSchema);

// ---------- Facebook Users Schema 
    var FacebookUserSchema = new mongoose.Schema({
        fbId: String,
        email: { type : String , lowercase : true},
        name : String,
    });
    var FbUsers = mongoose.model('fbs', FacebookUserSchema);

// ---------- Configuration and Middlewares

    passport.use(new LocalStrategy(function(username, password,done){
        Users.findOne({ username : username},function(err,user){
            if(err) { return done(err); }
            if(!user){
                return done(null, false, { message: 'Incorrect username.' });
            }

            hash( password, user.salt, function (err, hash) {
                if (err) { return done(err); }
                if (hash == user.hash) return done(null, user);
                done(null, false, { message: 'Incorrect password.' });
            });
        });
    }));

    passport.use(new FacebookStrategy({
            clientID: "532629850094137",
            clientSecret: "03e0c0e52c7d3b1987c219c27d30c9a0",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
          },
          function(accessToken, refreshToken, profile, done) {
            FbUsers.findOne({fbId : profile.id}, function(err, oldUser){
                if(oldUser){
                    done(null, oldUser, profile);
                }else{
                    var newUser = new FbUsers({
                        fbId : profile.id ,
                        email : profile.emails[0].value,
                        name : profile.displayName
                    }).save(function(err,newUser){
                        if(err) throw err;
                        done(null, newUser, profile);
                    });
                }
            }); 
          }
        ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        FbUsers.findById(id,function(err,user){
            if(err) done(err);
            if(user){
                done(null,user);
            }else{
                Users.findById(id, function(err,user){
                    if(err) done(err);
                    done(null,user);
                });
            }
        });
    });
// ---------- App Configuration
    app.configure(function () {
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({ secret: 'God Of War' }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(express.methodOverride());
        app.use(flash());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
    });

    app.configure('development', function () {
        app.use(express.errorHandler());
    });

// ---------- Error Handling
    app.use(function(req, res, next){
      res.status(404);
      if (req.accepts('html')) {
        res.render('error/404', { url: req.url });
        return;
      }
      if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
      }
      res.type('txt').send('Not found');
    });

    app.use(function(err, req, res, next){
      res.status(err.status || 500);
      res.render('error/500', { error: err });
    });

// ---------- Helpers
    function authenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect("/login");
        }
    }

    function notAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            res.redirect("/");
        } else {
            return next();
        }
    }

    function userExist(req, res, next) {
        Users.count({
            username: req.body.username
        }, function (err, count) {
            if (count === 0) {
                next();
            } else {
                res.redirect("/signup");
            }
        });
    }


// ---------- Routes - Get Requests
app.get("/", authenticated, function(req, res){ 
    res.render('index', {user: req.user})
});

app.get("/login", function(req, res){
    res.render('auth/login');
});

app.get("/signup", notAuthenticated, function(req, res){
    res.render("auth/signup");
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

app.get("/auth/facebook", passport.authenticate("facebook", { scope : "email" }));

app.get("/auth/facebook/callback", 
    passport.authenticate("facebook",{ failureRedirect: '/login'}),
    function(req,res){
        res.redirect("/");
    }
);

// ---------- Routes - Post Requests 

app.post("/login" 
    ,passport.authenticate('local',{
        successRedirect : "/",
        failureRedirect : "/login",
    }) 
);

app.post("/signup", userExist, function (req, res, next) {
    var user = new Users();
    hash(req.body.password, function (err, salt, hash) {
        if (err) throw err;
        var user = new Users({
            username: req.body.username,
            salt: salt,
            hash: hash,
            _id : new ObjectID
        }).save(function (err, newUser) {
            if (err) throw err;
            req.login(newUser, function(err) {
              if (err) { return next(err); }
              return res.redirect('/');
            });
        });
    });
});

// ---------- Initialize server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
