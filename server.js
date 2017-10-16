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

// Get Search from navbar
app.get('/questionList', function (req, res) {
	console.log("The server recieved the GET request: ");

	console.log("hi:", req.query.tagQuery);

	con.query("SELECT q.isPoll, q.title, q.subtitle, q.description " + 
		"FROM Question q, Tag t, TagToQuestion tq WHERE " + 
		"t.tagStr='" + req.query.tagQuery + "' AND tq.tagID = t.tagID AND" + 
		" tq.questionID = q.questionID;",
	  function (err, result, fields) {
	  	console.log("Server fetched the data from the db haha");
	    if (err) throw err;
	    res.json(result);
	});
});

//log in
app.get('/user', function (req, res) {
	console.log("The server recieved the GET request for user: in log in");
	
	console.log("SELECT u.username, u.passwordHash FROM KUser u " +
		"WHERE u.username='"+ req.query.username + 
		"' and u.passwordHash=" + req.query.password);

	con.query("SELECT u.username, u.passwordHash FROM KUser u " +
		"WHERE u.username='"+ req.query.username + 
		"' and u.passwordHash=" + req.query.password + ";",
	  function (err, result, fields) {
	  	console.log("Server fetched the data from the db !!!!!");
	    //if (err) throw err;
	    res.json(result);
	});
});

//sign up
app.get('/signupFunction', function (req, res) {
	console.log("The server recieved the GET request for user");
	
	console.log("id: ", req.query.signupUsername);
	console.log('pw: ', req.query.signupPassword);
	console.log('email: ', req.query.signupEmail);

	con.query("SELECT u.username FROM KUser u " +
		"WHERE u.username='" + req.query.signupUsername + "'",
	  function (err, result, fields) {
	  	console.log("Server fetched the data from the db !!!!!");
	    if (err) throw err;
	    res.json(result);
	});
});

//insert user to the database
app.get('/insertUser', function (req, res) {
	console.log("The server recieved the GET request for user");
	
	console.log("id: ", req.query.signupUsername);
	console.log('pw: ', req.query.signupPassword);

	con.query("INSERT INTO KUser(username, passwordHash) " +
			+ "values('" + req.query.signupUsername + "', " + 
			req.query.signupPassword + ")",
	  function (err, result, fields) {
	  	console.log("Server fetched the data from the db !!!!!");
	    // if (err) throw err;
	    res.json(result);
	});
});

// Get a users profile
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