var express = require('express');
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "knowitall"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Sucessfully connected to the MySql Database");
});

app.use(express.static(__dirname + '/public'));
app.get('/questionList', function (req, res) {
	console.log("The server recieved the GET request");

	con.query("SELECT p.title FROM Poll p, Tag t, TagToPoll tp WHERE t.tagStr='"
	 + req.query.tagQuery + "' AND tp.tagID = t.tagID AND tp.pollID = p.pollID; ", 
	  function (err, result, fields) {
	  	console.log("Server fetched the data from the db");
	    if (err) throw err;
	    res.json(result);
	});
});

app.get('/profile', function (req, res) {
	con.query("SELECT p.title, p.subTitle, p.description FROM kuser u, poll p, usertopoll up WHERE username='" 
		+ req.query.username + "' AND up.userID = u.userID AND up.pollID = p.pollID;", 
		function (err, result, fields) {
			console.log("Server fetched the profile from the db");
			if(err) throw err;
			res.json(result);
		});
});

app.listen(8080);
console.log("Server running on port 8080");