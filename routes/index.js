
/*

 * GET home page.
 */

exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
 // res.send(req.param( ' ', 'default') +  req.host + req.ip + req.route.path);
 // console.log(req.route);
 	//res.json({message: "something"})
 //	res.type('image/png').send('');
 // res.format({
 //	html: function() { res.send("<h1> body </h1>"); },
 //	json: function() { res.json({ message: "body" }); },
 //	text: function() { res.send("body"); }
 // });

// res.status(302).redirect('/');

// res.set / res.header / res.get to see what header values are
// other methods - sendfile download attachment links clearCookie cookies
  res.render('home', {
  	title: "sup bitches",
  	second: "blahhhh"
  });

};