
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


// Get Question Search from navbar (ANY TEXT)
app.get('/searchQuestionsAnyText', function (req, res) {

	con.query("SELECT q.questionID, q.isPoll, q.title, q.subtitle, q.description, " +
			          " q.startDate, q.endDate, q.totalVotes, q.positiveVotes " + 
		"FROM Question q WHERE " + 
		"q.title LIKE '%" + req.query.tagQuery + "%' or " +
		"q.subTitle LIKE '%" + req.query.tagQuery + "%' or " + 
		"q.description LIKE '%" + req.query.tagQuery + "%' order by positiveVotes desc;",
	  function (err, result, fields) {
	  	console.log("Server fetched the questionList from the db");
	    if (err) throw err;
	    res.json(result);
	});
});

// Get Question Search from navbar
app.get('/searchQuestions', function (req, res) {

	con.query("SELECT q.questionID, q.isPoll, q.title, q.subtitle, q.description, q.startDate, q.endDate, q.totalVotes, q.positiveVotes " + 
		"FROM Question q, Tag t, TagToQuestion tq WHERE " + 
		"t.tagStr='" + req.query.tagQuery + "' AND tq.tagID = t.tagID AND" + 
		" tq.questionID = q.questionID Order by positiveVotes desc;",
	  function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
});
//load questions by dates on page load
app.get('/onPageLoad', function (req, res){


	con.query("SELECT q.questionID, q.isPoll, q.title, q.subtitle, q.description, q.startDate, " +
					" q.endDate, q.totalVotes, q.positiveVotes " +
			 " FROM Question q " +
			 " ORDER BY q.startdate desc",
	  function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
});
//get array of 5 top popular tags
app.get('/getTopTags', function (req, res){

	con.query("SELECT tq.tagID, t.tagStr, count(tq.questionID) as NumberOfQuestions from tag t " +
			  "JOIN tagToQuestion tq on t.tagId = tq.tagID GROUP BY tagID LIMIT 5",
	  function (err, result, fields) {
	   res.json(result);
	});
});

// Get user search from navbar (It selects all user that have userinput in their name)
app.get('/searchUsers', function (req, res) {

	con.query("SELECT u.username FROM KUser u WHERE u.username like '%" 
		+ req.query.userQuery + "%';", 
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

//log in
app.get('/user', function (req, res) {

	con.query("SELECT u.userID, u.username, u.passwordHash FROM KUser u " +
		"WHERE u.username='"+ req.query.username + 
		"' and u.passwordHash=" + req.query.password,
	  function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
});

//sign up
app.get('/signupFunction', function (req, res) {

	con.query("SELECT u.username FROM KUser u " +
		"WHERE u.username='" + req.query.signupUsername + "'",
	  function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
});

//send email sign up
app.get('/sendEmail', function (req, res) {
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
	var username = req.query.username;
	var password = req.query.passwordHash

	con.query("INSERT INTO KUser(username, passwordHash) " +
			"values('" + username + "', " + password + ");",
	  function (err, result, fields) {
	  	if (err) throw err;
	});
});

// Get a users profile
app.get('/profile', function (req, res) {
	con.query("SELECT q.questionID, q.isPoll, q.title, q.subtitle, q.description, q.startDate, q.endDate, q.totalVotes, q.positiveVotes  " + 
		"FROM KUser u, Question q, UserToQuestion uq WHERE u.username='" +
		req.query.username + "' AND uq.userID = u.userID AND uq.questionID = q.questionID ORDER BY q.startDate desc, q.questionID desc;", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/checkExistingTitle', function (req, res){
	//insert the questions
	con.query("SELECT * FROM Question where title ='" + req.query.title + "'",
		function (err, result, fields) {
		res.json(result);
	});
});


app.get('/insertPoll', function (req, res) {

	//insert the questions
	con.query("INSERT INTO Question(userID, isPoll, title, subTitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
		"values(" + req.query.userID + "," + 1 + ", '" + req.query.title.trim() + "' , '" + req.query.subTitle.trim() + "', '" + req.query.description.trim() 
		+ "', '" + req.query.endDate + "', " + 0 + "," + 0 + "," + req.query.isAnonymous + ")",

		function (err, result, fields) {
		});

	//insert options
	con.query("SELECT questionID from Question where title='" + req.query.title.trim() + "'",
		function (err, result, fields) {			
			var questionID =  result[0].questionID; // Undefined 

			//connect user to question
			con.query("INSERT INTO userToQuestion(userID, questionID) values( " +
			req.query.userID + "," + questionID + ")");
			//insert all options
			var optionArray = req.query.optionArray[0].split(",");
			for(var i=0; i<optionArray.length; i++){
				con.query("INSERT INTO pollOption(questionID, title, votes) values (" +
				questionID + " , '" + optionArray[i].trim() + " ', " + 0 + ")");
			}

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

			//connect tags and question
			for (var i = 0; i < tagArray.length; i++) {
				
				if(tagArray[i].trim() != 'null' && tagArray[i].trim() != ""){
					con.query("Select tagID from Tag where tagStr = '" +
					tagArray[i].trim() + "'",
					function (err, result, fields) {
						var tagID = result[0].tagID;

						con.query("INSERT INTO TagToQuestion (tagID, questionID) values( " + 
								tagID + "," + questionID + ")");
					});
				}
			};

			res.json(result);
	});

});

app.get('/insertRating', function (req, res) {

	

	// insert the questions
	con.query("INSERT INTO Question(userID, isPoll, title, subtitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
		"values(" + req.query.userID + "," + 0 + ", '" + req.query.title + "' , '" + req.query.subTitle + "', '"+ req.query.description 
		+ "', '" + req.query.endDate + "', " + 0 + "," + 0 + "," + req.query.isAnonymous + ")", 
		function (err, result, fields) {
		});
	//insert the questions
	con.query("SELECT questionID from Question where title='" + req.query.title + "'",
		function (err, result, fields) {
			var questionID =  result[0].questionID;
			//con.query("INSERT INTO RatingQuestionOption(questionID) values (" + questionID + ") ");

			//connect user to question
			con.query("INSERT INTO userToQuestion(userID, questionID) values( " +
			req.query.userID + "," + questionID + ")");

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

			//connect tags and question
			for (var i = 0; i < tagArray.length; i++) {
				
				if(tagArray[i].trim() != 'null' && tagArray[i].trim() != ""){
					con.query("Select tagID from Tag where tagStr = '" +
					tagArray[i].trim() + "'",
					function (err, result, fields) {
						var tagID = result[0].tagID;

						con.query("INSERT INTO TagToQuestion (tagID, questionID) values( " + 
								tagID + "," + questionID + ")");
					

					});
				}
			};
		res.json(result);

			
	});
});

app.get('/getQuestion', function (req, res) {
	//fixed con qeury
	con.query("SELECT q.title, q.userID, u.username, q.description, q.endDate, q.isAnonymous " + 
		"FROM Question q " +
		"JOIN kuser u on q.userID = u.userID " +
		"WHERE q.questionID=" + req.query.questionID, 

		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/pollList', function (req, res) {
	con.query("SELECT po.title " + 
		"FROM PollOption po inner join Question q on po.questionID = q.questionID WHERE q.questionID='" +
		req.query.questionID + "';", 
		function (err, result, fields) {
			//if(err) throw err;
			res.json(result);
		});
});

app.get('/commentList', function (req, res) {

	con.query("SELECT qc.userIDAnnonymous, qc.description "+
		"FROM QuestionComment qc WHERE " + 
		"qc.questionID='" + req.query.questionID + "';",
	  	function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
});

app.get('/insertComment', function (req, res) {
	var questionID = req.query.questionID;
	var userID = req.query.userID;
	var description = req.query.description;
	var isAnnonymous = req.query.isAnnonymous;
	var userIDAnnonymous = req.query.userIDAnnonymous;
	
	con.query("INSERT INTO QuestionComment (questionID, userID, description, isAnnonymous, userIDAnnonymous) " +
			"VALUES('" + questionID + "', '" + userID + "', '" + description + "', '" + isAnnonymous + "', '" + userIDAnnonymous + "');",
	  	function (err, result, fields) {
	});
});

app.get('/isFollowing', function(req, res) {
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
	var currUser = req.query.currUser;
	var userToFollow = req.query.userToFollow;

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
	var currUser = req.query.currUser;
	var userToUnfollow = req.query.userToUnfollow;

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
	var questionID = req.query.questionID;
	var userID = req.query.userID;
	var ratingValue = req.query.rating;

	con.query("INSERT INTO RatingQuestionOption (questionID, userID, rating) " +
			"VALUES('" + questionID + "', '" + userID + "', '" + ratingValue + "');",
	  	function (err, result, fields) {
	    // if (err) throw err;
	    //res.json(result);
	});
});


app.get('/insertQuestionLike', function (req, res) {
	var questionID = req.query.questionID;
	var userID = req.query.userID;
	var likeDislikeValue = req.query.pollLike;

	//convert boolean value 
	if(likeDislikeValue == 'true'){likeDislikeValue = 1;}
	else{likeDislikeValue = 0;}

	con.query("INSERT INTO QuestionLike (questionID, userID, pollLike) " +
			"VALUES('" + questionID + "', '" + userID + "', '" + likeDislikeValue + "');",
	  	function (err, result, fields) {
	    // if (err) throw err;
	    //res.json(result);
	});
});

app.get('/getLike', function (req, res) {


	con.query("SELECT COUNT(*) as num " + 
		"FROM QuestionLike ql WHERE ql.questionID='" +
		req.query.questionID + "' and ql.pollLike = 1;", 
		function (err, result, fields) {
			//if(err) throw err;
			res.json(result);

		});
});

app.get('/getDislike', function (req, res) {
	con.query("SELECT COUNT(*) as num " + 
		"FROM QuestionLike ql WHERE ql.questionID='" +
		req.query.questionID + "' and ql.pollLike = 0;", 
		function (err, result, fields) {
			//if(err) throw err;
			res.json(result);
		});
});

app.get('/checkUserExist', function (req, res) {
var userID = req.query.userID;
var questionID = req.query.questionID;

	con.query("SELECT qc.userID " + 
		"FROM QuestionComment qc WHERE qc.questionID='" +
		req.query.questionID + "' and qc.userID='" + req.query.userID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/checkUserRated', function (req, res) {
var userID = req.query.userID;
var questionID = req.query.questionID;

	con.query("SELECT rq.userID " + 
		"FROM RatingQuestionOption rq WHERE rq.questionID='" +
		req.query.questionID + "' and rq.userID='" + req.query.userID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/checkUserVoted', function (req, res) {
var userID = req.query.userID;
var questionID = req.query.questionID;

	con.query("SELECT ql.userID " + 
		"FROM QuestionLike ql WHERE ql.questionID='" +
		req.query.questionID + "' and ql.userID='" + req.query.userID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/UpdateRating', function (req, res) {

	con.query("UPDATE RatingQuestionOption " + 
		"SET rating='"+ req.query.rating + "' WHERE questionID='" +
		req.query.questionID + "' and userID='" + req.query.userID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/getAvgRating', function (req, res) {

	con.query("SELECT AVG(rating) as num " + 
		"FROM RatingQuestionOption WHERE questionID='" +
		req.query.questionID + "';", 
		function (err, result, fields) {
			//if(err) throw err;
			res.json(result);
		});
});


app.get('/UpdateVote', function (req, res) {

	var likeDislikeValue = req.query.pollLike;
	//convert boolean value 
	if(likeDislikeValue == 'true'){likeDislikeValue = 1;}
	else{likeDislikeValue = 0;}

	con.query("UPDATE QuestionLike " + 
		"SET pollLike='"+ likeDislikeValue + "' WHERE questionID='" +
		req.query.questionID + "' and userID='" + req.query.userID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});


app.listen(8080);
console.log("Server running on port 8080");