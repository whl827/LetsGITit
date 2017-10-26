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

// Get Question Search from navbar
app.get('/searchQuestions', function (req, res) {
	console.log("The server recieved the questionList GET request");

	con.query("SELECT q.questionID, q.isPoll, q.title, q.subtitle, q.description, q.startDate, q.endDate, q.totalVotes, q.positiveVotes " + 
		"FROM Question q, Tag t, TagToQuestion tq WHERE " + 
		"t.tagStr='" + req.query.tagQuery + "' AND tq.tagID = t.tagID AND" + 
		" tq.questionID = q.questionID;",
	  function (err, result, fields) {
	  	console.log("Server fetched the questionList from the db");
	    if (err) throw err;
	    res.json(result);
	});
});

app.get('/onPageLoad', function (req, res){

	console.log("SELECT q.isPoll, q.title, q.subtitle, q.description, q.startDate, " +
					" q.endDate, q.totalVotes, q.positiveVotes " +
			 " FROM Question q " +
			 " ORDER BY q.startdate desc");

	con.query("SELECT q.isPoll, q.title, q.subtitle, q.description, q.startDate, " +
					" q.endDate, q.totalVotes, q.positiveVotes " +
			 " FROM Question q " +
			 " ORDER BY q.startdate desc",
	  function (err, result, fields) {
	  	console.log("server fetched from onPageLoad");
	    if (err) throw err;
	    res.json(result);
	});
});

// Get user search from navbar (It selects all user that have userinput in their name)
app.get('/searchUsers', function (req, res) {
	console.log("The server recieved the userList GET request");

	con.query("SELECT u.username FROM KUser u WHERE u.username like '%" 
		+ req.query.userQuery + "%';", 
		function (err, result, fields) {
			console.log("Server fetched user from the db");
			if (err) throw err;
			console.log(result[0]);
			res.json(result);
		});
});

//log in
app.get('/user', function (req, res) {
	
	console.log("The server recieved the GET request for user: in log in");
	console.log("SELECT u.userID, u.username, u.passwordHash FROM KUser u " +
		"WHERE u.username='"+ req.query.username + 
		"' and u.passwordHash=" + req.query.password);

	con.query("SELECT u.userID, u.username, u.passwordHash FROM KUser u " +
		"WHERE u.username='"+ req.query.username + 
		"' and u.passwordHash=" + req.query.password,
	  function (err, result, fields) {
	  	console.log("Server fetched the user from db");
	    if (err) throw err;
	    res.json(result);
	});
});

//sign up
app.get('/signupFunction', function (req, res) {
	console.log("The server recieved the GET request for user: sign up");
	
	console.log("id: ", req.query.signupUsername);
	console.log('pw: ', req.query.signupPassword);
	console.log('email: ', req.query.signupEmail);

	con.query("SELECT u.username FROM KUser u " +
		"WHERE u.username='" + req.query.signupUsername + "'",
	  function (err, result, fields) {
	  	console.log("Server fetched the user from db in sign up");
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

	console.log("EMAIL IS SENT TO: " + email);

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
	console.log("The server recieved the GET request for user (for inserting user)");
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

	console.log("userID: " + req.query.userID);
	console.log("sub: " + req.query.subTitle.trim());
	console.log("title: " + req.query.title.trim());
	console.log("des: " + req.query.description.trim());
	console.log("enddate: " + req.query.endDate);


	// var endDate;
	// console.log("open forever:" + req.query.openForever);
	// if(req.query.openForever){
	// 	endDate = "NaN-NaN-NaN NaN:NaN:NaN";
	// 	console.log("end date is pen forever");
	// }else{
	// 	endDate = req.query.endDate;
	// }

	//insert the questions
	con.query("INSERT INTO Question(userID, isPoll, title, subTitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
		"values(" + req.query.userID + "," + 1 + ", '" + req.query.title.trim() + "' , '" + req.query.subTitle.trim() + "', '" + req.query.description.trim() 
		+ "', '" + req.query.endDate + "', " + 0 + "," + 0 + "," + req.query.isAnonymous + ")",

		function (err, result, fields) {
			console.log("Server fetched the profile from the db from Creating Poll!!");
		});

	//insert options
	con.query("SELECT questionID from Question where title='" + req.query.title.trim() + "'",
		function (err, result, fields) {
			console.log("QuestionID is fetched from SQL (in Insert Poll)");
			
			var questionID =  result[0].questionID;

			//connect user to question
			con.query("INSERT INTO userToQuestion(userID, questionID) values( " +
			req.query.userID + "," + questionID + ")");
			console.log("connecting user and question (insert poll)\n");

			//insert all options
			var optionArray = req.query.optionArray[0].split(",");
			console.log("size: " + optionArray.length ); 
			for(var i=0; i<optionArray.length; i++){
				console.log(optionArray[i]);
				con.query("INSERT INTO pollOption(questionID, title, votes) values (" +
				questionID + " , '" + optionArray[i].trim() + " ', " + 0 + ")");
			}
			console.log("inserting into poll option completed (insert poll)\n");

			//split tags by comma an insert
			var tagArray = req.query.tagArray[0].split(",");

			//insert tags (only if it doesnt exists in tag table already)
			for (var i = 0; i < tagArray.length; i++) {

				if(tagArray[i].trim() != 'null' && tagArray[i].trim() != ""){
					con.query("INSERT INTO Tag (tagStr) " +
							"SELECT '" + tagArray[i].trim() + "' " +
							"FROM tag WHERE NOT EXISTS( SELECT tagStr FROM tag " +
							"WHERE tagStr = '" + tagArray[i].trim() + "') LIMIT 1");
				}
			};
			console.log("inserting into tag completed (insert poll)\n");

			//connect tags and question
			for (var i = 0; i < tagArray.length; i++) {
				
				if(tagArray[i].trim() != 'null' && tagArray[i].trim() != ""){
					con.query("Select tagID from Tag where tagStr = '" +
					tagArray[i].trim() + "'",
					function (err, result, fields) {
						var tagID = result[0].tagID;

						console.log("INSERT INTO TagToQuestion (tagID, questionID) values( " + 
							tagID + "," + questionID + ")");

						con.query("INSERT INTO TagToQuestion (tagID, questionID) values( " + 
								tagID + "," + questionID + ")");
					});
				}
			};
			console.log("connecting tags and question ID completed (insert poll)\n");

			res.json(result);
	});

});

app.get('/insertRating', function (req, res) {


	console.log("INSERT INTO Question(userID, isPoll, title, subtitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
		"values(" + req.query.userID + "," + 0 + ", '" + req.query.title + "' , '" + req.query.subTitle + "', '"+ req.query.description 
		+ "', '" + req.query.endDate + "', " + 0 + "," + 0 + "," + req.query.isAnonymous + ")");

	// insert the questions
	con.query("INSERT INTO Question(userID, isPoll, title, subtitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
		"values(" + req.query.userID + "," + 0 + ", '" + req.query.title + "' , '" + req.query.subTitle + "', '"+ req.query.description 
		+ "', '" + req.query.endDate + "', " + 0 + "," + 0 + "," + req.query.isAnonymous + ")", 
		function (err, result, fields) {
			console.log("Server fetched the profile from the db from Creating Poll!!");
		});
	//insert the questions
	con.query("SELECT questionID from Question where title='" + req.query.title + "'",
		function (err, result, fields) {
			console.log("Server fetched the profile from the db from Creating Rating!!");
			var questionID =  result[0].questionID;
			console.log("HERE!!!: " + questionID);

			//con.query("INSERT INTO RatingQuestionOption(questionID) values (" + questionID + ") ");

			//connect user to question
			con.query("INSERT INTO userToQuestion(userID, questionID) values( " +
			req.query.userID + "," + questionID + ")");
			console.log("connecting user and question (insert poll)\n");

			//split tags by comma an insert
			var tagArray = req.query.tagArray[0].split(",");

			//insert tags (only if it doesnt exists in tag table already)
			for (var i = 0; i < tagArray.length; i++) {

				if(tagArray[i].trim() != 'null' && tagArray[i].trim() != ""){
					con.query("INSERT INTO Tag (tagStr) " +
							"SELECT '" + tagArray[i].trim() + "' " +
							"FROM tag WHERE NOT EXISTS( SELECT tagStr FROM tag " +
							"WHERE tagStr = '" + tagArray[i].trim() + "') LIMIT 1");
				}
			};
			console.log("inserting into tag completed (insert poll)\n");

			//connect tags and question
			for (var i = 0; i < tagArray.length; i++) {
				
				if(tagArray[i].trim() != 'null' && tagArray[i].trim() != ""){
					con.query("Select tagID from Tag where tagStr = '" +
					tagArray[i].trim() + "'",
					function (err, result, fields) {
						var tagID = result[0].tagID;

						console.log("INSERT INTO TagToQuestion (tagID, questionID) values( " + 
							tagID + "," + questionID + ")");

						con.query("INSERT INTO TagToQuestion (tagID, questionID) values( " + 
								tagID + "," + questionID + ")");
					

					});
				}
			};
		res.json(result);

			
	});
});

app.get('/getQuestion', function (req, res) {
	con.query("SELECT q.title, q.userID, q.description, q.endDate " + 
		"FROM Question q WHERE q.questionID='" +
		req.query.questionID + "';", 
		function (err, result, fields) {
			console.log("Server fetched the poll from the db");
			if(err) throw err;
			res.json(result);
		});
});

app.get('/pollList', function (req, res) {
	con.query("SELECT po.title " + 
		"FROM PollOption po inner join Question q on po.questionID = q.questionID WHERE q.questionID='" +
		req.query.questionID + "';", 
		function (err, result, fields) {
			console.log("Server fetched the poll from the db");
			//if(err) throw err;
			res.json(result);
		});
});

app.get('/commentList', function (req, res) {
	console.log("The server recieved the GET request: ");

	con.query("SELECT qc.userID, qc.description "+
		"FROM QuestionComment qc WHERE " + 
		"qc.questionID='" + req.query.questionID + "';",
	  	function (err, result, fields) {
	  	console.log("Server fetched the data from the db haha");
	    if (err) throw err;
	    res.json(result);
	});
});

app.get('/insertComment', function (req, res) {
	console.log("In server insert Comment");
	var questionID = req.query.questionID;
	var userID = req.query.userID;
	var description = req.query.description;

	con.query("INSERT INTO QuestionComment (questionID, userID, description) " +
			"VALUES('" + questionID + "', '" + userID + "', '" + description + "');",
	  	function (err, result, fields) {
	  	console.log("Server fetched the data from the db hah");
	});
});

app.get('/isFollowing', function(req, res) {
	console.log("In server isFollowing");
	var user1 = req.query.user1;
	var user2 = req.query.user2;

	con.query("SELECT uf.mainUserID FROM KUser u, userToFollowing uf WHERE " + 
		"uf.mainUserID=(SELECT u.userID FROM KUser u WHERE u.username='" + user1 + "') AND " +
		"uf.followingUserID=(SELECT u.userID FROM KUser u WHERE u.username='" + user2 + "');",
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		}
	);
});

app.get('/follow', function(req, res) {
	console.log("In server follow");
	var currUser = req.query.currUser;
	var userToFollow = req.query.userToFollow;

	console.log("currUser: " + currUser);
	console.log("userToFollow: " + userToFollow);

	// WILL NOT WORK IF USER APPEARS MULTIPLE TIMES
	con.query("INSERT INTO userToFollowing (mainUserID, followingUserID) " + 
		"VALUES( (SELECT u.userID FROM KUser u WHERE u.username ='" + currUser +"'), " +
		"(SELECT u.userID FROM KUser u WHERE u.username='" + userToFollow + "') );", 
		function(err, result, fields) {
			if (err) throw err;
		}
	);
})

app.get('/unfollow', function(req, res) {
	console.log("In server follow");
	var currUser = req.query.currUser;
	var userToUnfollow = req.query.userToUnfollow;

	console.log("currUser: " + currUser);
	console.log("userToUnfollow: " + userToUnfollow);

	// WILL NOT WORK IF USER APPEARS MULTIPLE TIMES
	con.query("DELETE FROM userToFollowing " + 
		"WHERE mainUserID = (SELECT u.userID FROM KUser u WHERE u.username ='" + currUser +"') " +
		"AND followingUserID = (SELECT u.userID FROM KUser u WHERE u.username='" + userToUnfollow + "');", 
		function(err, result, fields) {
			if (err) throw err;
		}
	);
});

app.get('/insertRatingValue', function (req, res) {
	console.log("In server insert rating value ");
	var questionID = req.query.questionID;
	var userID = req.query.userID;
	var ratingValue = req.query.ratingValue;
	console.log("ratingvalue in server is " + ratingValue);

	//console.log("insert comment:", req.query.questionID);
	con.query("INSERT INTO RatingQuestionOption (questionID, userID, rating) " +
			"VALUES('" + questionID + "', '" + userID + "', '" + ratingValue + "');",
	  	function (err, result, fields) {
	  	console.log("Server fetched the data from the db hah");
	    // if (err) throw err;
	    //res.json(result);
	});
});

app.get('/QuestionLike', function (req, res) {
	console.log("In server insert rating value ");
	var questionID = req.query.questionID;
	var userID = req.query.userID;
	var ratingValue = req.query.pollLike;
	console.log("ratingvalue in server is " + ratingValue);

	con.query("INSERT INTO QuestionLike (questionID, userID, rating) " +
			"VALUES('" + questionID + "', '" + userID + "', '" + ratingValue + "');",
	  	function (err, result, fields) {
	  	console.log("Server fetched the data from the db hah");
	    // if (err) throw err;
	    //res.json(result);
	});
});

app.listen(8080);
console.log("Server running on port 8080");