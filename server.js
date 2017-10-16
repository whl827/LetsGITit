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
	console.log("The server recieved the GET request: ");

	con.query("SELECT q.isPoll, q.title, q.subTitle, q.description FROM Question q, Tag t, TagToQuestion tq " + 
	"WHERE t.tagStr='" + req.query.tagQuery + "' AND tq.tagID = t.tagID AND tq.questionID = q.questionID;", 
	  function (err, result, fields) {
	  	console.log("Server fetched the data from the db");
	    if (err) throw err;
	    res.json(result);
	});
});

app.get('/profile', function (req, res) {
	con.query("SELECT q.isPoll, q.title, q.subTitle, q.description " + 
		"FROM KUser u, Question q, UserToQuestion uq WHERE u.username='" +
		req.query.username + "' AND uq.userID = u.userID AND uq.questionID = q.questionID;", 
		function (err, result, fields) {
			console.log("Server fetched the profile from the db");
			if(err) throw err;
			res.json(result);
		});
});

app.listen(8080);
console.log("Server running on port 8080");