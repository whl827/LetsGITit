var express = require('express');
var app = express();
var mysql = require('mysql');
var nodemailer = require('nodemailer');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "knowitall"
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'knowitall857@gmail.com',
    pass: 'knowitallPwd'
  }, 
  tls: { rejectUnauthorized: false }
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

	con.query("SELECT u.userID, u.username, u.passwordHash FROM KUser u " +
		"WHERE u.username='"+ req.query.username + 
		"' and u.passwordHash=" + req.query.password,
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

//send email sign up
app.get('/sendEmail', function (req, res) {
	console.log("In send email function in server");
	var email = req.query.newEmail;
	var password = req.query.newPasswordHash;
	var username = req.query.newUsername;
	var link = "localhost:8080/#!newUser/:" + username + "/:" + password;

	var mailOptions = {
		from: 'knowitall857@gmail.com',
		to: email,
		subject: 'The link to create you new account',
		text: 'Link: ' + link
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log("In send email ERROR");
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
});

//insert user to the database
app.get('/insertUser', function (req, res) {
	console.log("The server recieved the GET request for user");
	var username = req.query.username;
	var password = req.query.passwordHash
	console.log("id: ", username);
	console.log('pw: ', password);
	console.log("INSERT INTO KUser(username, passwordHash) " +
			"values('" + username + "', " + password + ");");

	con.query("INSERT INTO KUser(username, passwordHash) " +
			"values('" + username + "', " + password + ");",
	  function (err, result, fields) {
	  	if (err) throw err;
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


app.get('/insertPoll', function (req, res) {

	console.log("ENDDATE in str!!!! : " + (req.query.endDate).toString());


	//insert the questions
	con.query("INSERT INTO Question(userID, isPoll, title, subTitle, description, totalVotes, positiveVotes) " +
		"values(" + req.query.userID + "," + 1 + ", '" + req.query.title + "' , '" + req.query.subTitle + "', '" + req.query.description 
		+ "' ," + 0 + "," + 0 + ")",
		function (err, result, fields) {
			console.log("Server fetched the profile from the db from Creating Poll!!");
			//if(err) throw err;
			//res.json(result);
		});

	//insert the questions
	con.query("SELECT questionID from Question where title='" + req.query.title + "'",
		function (err, result, fields) {
			console.log("Server fetched the profile from the db from Creating Poll!!");
			var questionID =  result[0].questionID;
			console.log("HERE!!!: " + questionID);


			console.log(req.query.randomArray); 
			// console.log(req.query.randomArray[0].opt1);
			console.log(req.query.randomArray.length);

			var splitArr = req.query.randomArray[0].split(",");
			console.log("size: " + splitArr.length ); 
			for(var i=0; i<splitArr.length; i++){
				console.log(splitArr[i]);
				con.query("INSERT INTO pollOption(questionID, title, votes) values (" +
				questionID + " , '" + splitArr[i] + " ', " + 0 + ")");
			}
			//ng-repeat option in req.query.optionArray

		});

	

});





app.listen(8080);
console.log("Server running on port 8080");