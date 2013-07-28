
/*
 * GET users listing.
 */

exports.list = function(req, res){
  // res.send("respond with a resource");
  res.render('home', {
  	title: "sup bitches",
  	second: "blahhhh"
  });

};