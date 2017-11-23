var express = require('express');
var app = express();
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');

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

function emailUser(email, description) {

		if (email != null) {

			var mailOptions = {
				from: 'knowitall857@gmail.com',
				to: email,
				subject: 'A notification From KnowItAll',
				text: description
			};

			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log("In send email ERROR");
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
					res.json(info);
				}
			});
		}
	}

// Notifies every hour on the hour
var notifier = schedule.scheduleJob('00 * * * *', function(){
  console.log('Notifing everyone');

  con.query('SELECT * FROM KUser WHERE notifyHourly = true',
  	function (err, result, feilds) {
  		if (err) throw err;
  		len = result.length
  		for (i = 0; i < len; ++i) {
  			var userID = result[i].userID;
  			var email = result[i].email;
  			con.query('SELECT * FROM UserNotification WHERE isEmailed = false AND userID = ' + userID, 
  				function (err, result, feilds) {
  					var notificationID = result[0].userNotificaitonID;
  					con.query('UPDATE UserNotification SET isEmailed = true, isRead = true WHERE userNotificaitonID = ' + notificationID);
  					emailUser(email, result[0].description);
  				});
  		}
  	});
});

app.get('/getNotifications', function (req, res) {

	console.log("getting notifications: ");
	console.log("SELECT * FROM UserNotification WHERE userID = " + req.query.userID 
		+ " AND isRead = " + req.query.read);

	con.query("SELECT * FROM UserNotification WHERE userID = " + req.query.userID 
		+ " AND isRead = " + req.query.read, 
		function (err, result, feilds) {
			if (err) throw err;
			res.json(result);
		});
});

app.get('/toggleNotificaitons', function (req, res) {
	var userID = req.query.userID;
	var notifyHourly = req.query.notifyHourly;

	console.log("Toggeling notification settings");

	con.query("UPDATE KUser SET notifyHourly = " + notifyHourly + " WHERE userID = " + userID, 
		function (err, result, feilds) {
			if (err) throw err;
		});
});

app.get('/markNotificationAsRead', function (req, res) {
	con.query("UPDATE UserNotification SET isRead = 1 WHERE userNotificaitonID = " + req.query.id, 
		function (err, result, feilds) {
			if (err) throw err;
		});
});

app.get('/notifyFollowing', function (req, res) {

	var currUser = req.query.currUser;
	var otherUser = req.query.userToNotify;
	var action = req.query.action;
	var description = "null notification";

	console.log("in notifyFollowing");

	if (action == 'unfollow') {
		description = currUser + " has unfollowed you";
	} else if (action == 'follow') {
		description = currUser + " has followed you";
	}


	var email = null;
	var isEmailed = false;
	con.query('SELECT * FROM KUser WHERE username="' + otherUser + '"',
		function (err, result, feilds) {
			if (err) throw err;
			email = result[0].email;
			hourly = result[0].notifyHourly;
			if (!hourly) {
				emailUser(email, description);
				isEmailed = true;
			}
		});

	con.query('INSERT UserNotification(userID, description, isEmailed) VALUES((SELECT userID FROM KUser where username="' + otherUser + 
		'"), "' + description + '", ' + isEmailed + ');', 
		function (err, result, feilds) {
			if (err) throw err;
		});
});

// Get Question Search from navbar (ANY TEXT)
app.get('/searchQuestionsAnyText', function (req, res) {

	con.query("SELECT q.questionID,  q.userID, q.isAnonymous, q.isPoll, q.title, q.subtitle, q.description, " +
			          " q.startDate, q.endDate, q.totalVotes, q.positiveVotes, q.numLikes, q.deactivated " + 
		"FROM Question q WHERE (q.deactivated = 0) and (" + 
		"q.title LIKE '%" + req.query.tagQuery + "%' or " +
		"q.subTitle LIKE '%" + req.query.tagQuery + "%' or " + 
		"q.description LIKE '%" + req.query.tagQuery + "%') order by q.numLikes desc;",
	  function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
});

// Get Question Search from navbar
app.get('/searchQuestions', function (req, res) {

	con.query("SELECT q.questionID, q.userID, q.isAnonymous, q.isPoll, q.title, q.subtitle, q.description, q.startDate, q.endDate, q.totalVotes, q.positiveVotes, q.numLikes, q.deactivated " + 
		"FROM Question q, Tag t, TagToQuestion tq WHERE q.deactivated = 0 AND " + 
		"t.tagStr='" + req.query.tagQuery + "' AND tq.tagID = t.tagID AND" + 
		" tq.questionID = q.questionID ORDER BY q.numLikes DESC;",
	  function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
});
//load questions by dates on page load
app.get('/onPageLoad', function (req, res){


	con.query("SELECT q.questionID, q.userID, q.isAnonymous, q.isPoll, q.title, q.subtitle, q.description, q.startDate, " +
					" q.endDate, q.totalVotes, q.positiveVotes, q.numLikes, q.deactivated " +
			 " FROM Question q " +
			 " WHERE q.deactivated=false" +
			 " ORDER BY q.numLikes desc",
	function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
});

app.get('/getFlaggedQuestions', function (req, res) {
	con.query("SELECT * FROM Question WHERE isFlagged = 1", 
	function(err, result, response) {
		if (err) throw err;
		res.json(result);
	});
});

app.get('/getFlaggedComments', function(req, res) {
	con.query("SELECT * FROM QuestionComment WHERE isFlagged = 1", 
	function(err, result, response) {
		if (err) throw err;
		res.json(result);
	});
});

app.get('/getQuestionTags', function (req, res){
	con.query("SELECT t.tagID, t.tagStr FROM Tag t INNER JOIN TagToQuestion ttq" +
			" ON t.tagID = ttq.tagID WHERE ttq.questionID='" +
			req.query.questionID + "';", 
	function (err, result, fields) {
		if(err) throw err;
		res.json(result);
	});
});



//get array of 5 top popular tags
app.get('/getTopTags', function (req, res){

	con.query("SELECT tq.tagID, t.tagStr, count(tq.questionID) as NumberOfQuestions " +
			  "FROM tag t " +
			  "JOIN tagToQuestion tq " +
			  "ON t.tagId = tq.tagID " + 
			  "GROUP BY tagID " +
			  "ORDER BY NumberOfQuestions DESC " + 
			  "LIMIT 5",
	  function (err, result, fields) {
	   res.json(result);
	});
});

// Get user search from navbar (It selects all user that have userinput in their name)
app.get('/searchUsers', function (req, res) {

	con.query("SELECT u.username FROM KUser u WHERE u.username like '%" 
		+ req.query.userQuery + "%' AND u.deactivated=0;", 
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

app.get('/toggleFlag', function (req, res) {
	console.log('UPDATE question SET isFlagged =' + req.query.flag + ' WHERE questionID=' + req.query.questionID);
	con.query('UPDATE question SET isFlagged =' + req.query.flag + ' WHERE questionID=' + req.query.questionID, 
		function(err, result, feilds) {
			if (err) throw err;
		});
});

app.get('/toggleCommentFlag', function(req, res) {
	var id = req.query.questionCommentID;
	var flag = req.query.flag;
	
	con.query("UPDATE QuestionComment SET isFlagged = " + flag + " WHERE questionCommentID = " + id);
});

//log in
app.get('/user', function (req, res) {

	con.query("SELECT * FROM KUser " +
		"WHERE username='"+ req.query.username + 
		"' and passwordHash=" + req.query.password,
	  function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
});

// reactivating user under login
app.get('/reactivateUser', function (req, res) {
	console.log("Trying to reactivate user...");
	con.query("UPDATE KUser k " +
			  "SET deactivated=false " +
			  "WHERE k.username='" + req.query.username +
			  "' AND k.passwordHash=" + req.query.password,
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

// reactivating questions
app.get('/reactivateQuestions', function (req, res) {
	console.log("Try to reactivate questions...");
	con.query("UPDATE Question q " +
			  "SET deactivated=false " +
			  "WHERE q.userID=" + req.query.userID +
			  " AND q.deactivated=true",
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

// reactivating comments
app.get('/reactivateComments', function (req, res) {
	con.query("UPDATE QuestionComment qc " +
			  "SET deactivated=false " +
			  "WHERE qc.userID=" + req.query.userID +
			  " AND qc.deactivated=true",
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
			res.json(info);
		}
	});
});

//insert user to the database
app.get('/insertUser', function (req, res) {
	var username = req.query.username;
	var password = req.query.passwordHash;

	con.query("INSERT INTO KUser(username, passwordHash, email) " +
			"values('" + username + "', " + password + ", '" + email + "');",
	  function (err, result, fields) {
	  	if (err) throw err;
	});
	con.query("SELECT * FROM KUser WHERE username = '" + username + "'",
	  function (err,result,fields){
		if(err)throw err;
		console.log(result);
		res.json(result);
	});
});

// Get a users profile
app.get('/profile', function (req, res) {
	con.query("SELECT q.questionID, q.userID, q.isAnonymous, q.isPoll, q.title, q.subtitle, q.description, q.startDate, q.endDate, q.totalVotes, q.positiveVotes, q.numLikes  " + 
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

	//check the imageURL
	var imageURL = req.query.image;

	if(imageURL == null){
		//insert the questions
		con.query("INSERT INTO Question(userID, isPoll, title, subTitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
			"values(" + req.query.userID + "," + 1 + ", '" + req.query.title.trim() + "' , '" + req.query.subTitle.trim() + "', '" + req.query.description.trim() 
			+ "', '" + req.query.endDate + "' , " + 0 + "," + 0 + "," + req.query.isAnonymous + ")",

			function (err, result, fields) {
			});
	}else{
		//insert the questions
		con.query("INSERT INTO Question(userID, isPoll, title, subTitle, description, endDate, totalVotes, positiveVotes, isAnonymous, image) " +
			"values(" + req.query.userID + "," + 1 + ", '" + req.query.title.trim() + "' , '" + req.query.subTitle.trim() + "', '" + req.query.description.trim() 
			+ "', '" + req.query.endDate + "' , " + 0 + "," + 0 + "," + req.query.isAnonymous + ", '" + imageURL + "' " + ")",

			function (err, result, fields) {
			});
	}

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

app.get('/insertPollWithoutEndDate', function (req, res) {

	//check the imageURL
	var imageURL = req.query.image;

	if(imageURL == null){
		//insert the questions
		con.query("INSERT INTO Question(userID, isPoll, title, subTitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
			"values(" + req.query.userID + "," + 1 + ", '" + req.query.title.trim() + "' , '" + req.query.subTitle.trim() + "', '" + req.query.description.trim() 
			+ "', " + req.query.endDate + ", " + 0 + "," + 0 + "," + req.query.isAnonymous + ")",

			function (err, result, fields) {
			});
	}else{
		//insert the questions
		con.query("INSERT INTO Question(userID, isPoll, title, subTitle, description, endDate, totalVotes, positiveVotes, isAnonymous, image) " +
			"values(" + req.query.userID + "," + 1 + ", '" + req.query.title.trim() + "' , '" + req.query.subTitle.trim() + "', '" + req.query.description.trim() 
			+ "', " + req.query.endDate + ", " + 0 + "," + 0 + "," + req.query.isAnonymous + ", '" + imageURL + "' " + ")",

			function (err, result, fields) {
			});
	}

	//insert options
	con.query("SELECT questionID from Question where title='" + req.query.title.trim() + "'",
		function (err, result, fields) {			
			var questionID =  result[0].questionID;

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

		//check the imageURL
	var imageURL = req.query.image;

	if(imageURL == null){
		// insert the questions
		con.query("INSERT INTO Question(userID, isPoll, title, subtitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
			"values(" + req.query.userID + "," + 0 + ", '" + req.query.title + "' , '" + req.query.subTitle + "', '"+ req.query.description 
			+ "', '" + req.query.endDate + "', " + 0 + "," + 0 + "," + req.query.isAnonymous + ")", 
			function (err, result, fields) {
			});
	}else{
		// insert the questions
		con.query("INSERT INTO Question(userID, isPoll, title, subtitle, description, endDate, totalVotes, positiveVotes, isAnonymous, image) " +
			"values(" + req.query.userID + "," + 0 + ", '" + req.query.title + "' , '" + req.query.subTitle + "', '"+ req.query.description 
			+ "', '" + req.query.endDate + "', " + 0 + "," + 0 + "," + req.query.isAnonymous + ", '" + imageURL + "' " + ")", 
			function (err, result, fields) {
			});
	}

		// // insert the questions
		// con.query("INSERT INTO Question(userID, isPoll, title, subtitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
		// 	"values(" + req.query.userID + "," + 0 + ", '" + req.query.title + "' , '" + req.query.subTitle + "', '"+ req.query.description 
		// 	+ "', '" + req.query.endDate + "', " + 0 + "," + 0 + "," + req.query.isAnonymous + ")", 
		// 	function (err, result, fields) {
		// 	});


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

app.get('/insertRatingWithoutEndDate', function (req, res) {

	//check the imageURL
	var imageURL = req.query.image;

	if(imageURL == null){
		// insert the questions
		con.query("INSERT INTO Question(userID, isPoll, title, subtitle, description, endDate, totalVotes, positiveVotes, isAnonymous) " +
			"values(" + req.query.userID + "," + 0 + ", '" + req.query.title + "' , '" + req.query.subTitle + "', '"+ req.query.description 
			+ "', " + req.query.endDate + ", " + 0 + "," + 0 + "," + req.query.isAnonymous + ")", 
			function (err, result, fields) {
			});
	}else{
		// insert the questions
		con.query("INSERT INTO Question(userID, isPoll, title, subtitle, description, endDate, totalVotes, positiveVotes, isAnonymous, image) " +
			"values(" + req.query.userID + "," + 0 + ", '" + req.query.title + "' , '" + req.query.subTitle + "', '"+ req.query.description 
			+ "', " + req.query.endDate + ", " + 0 + "," + 0 + "," + req.query.isAnonymous + ", '" + imageURL + "' " + ")", 
			function (err, result, fields) {
			});
	}


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
	con.query("SELECT q.title, q.userID, u.username, q.isPoll, q.description, q.endDate, q.isAnonymous, q.isFlagged, q.image " + 
		"FROM Question q " +
		"JOIN kuser u on q.userID = u.userID " +
		"WHERE q.questionID=" + req.query.questionID, 

		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/pollList', function (req, res) {
	con.query("SELECT po.title, po.pollOptionID " + 
		"FROM PollOption po inner join Question q on po.questionID = q.questionID WHERE q.questionID='" +
		req.query.questionID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/commentList', function (req, res) {

	con.query("SELECT qc.questionCommentID, qc.userID, qc.userIDAnnonymous, qc.description, qc.commentLikeCount, qc.commentDislikeCount, qc.image, u.imageURL, qc.deactivated "+
		"FROM QuestionComment qc, KUser u WHERE " + 
		"qc.questionID='" + req.query.questionID + "' and qc.userID = u.userID AND qc.deactivated=false;",
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
	var image = req.query.image;

	if(image == null){
		console.log("image is null");
	}
	else{
		console.log("image is NOT null");
		console.log(image);
	}
	//console.log(questionID, userID, description, isAnnonymous, userIDAnnonymous, commentLikeCount, commentDislikeCount , req.query.image);
	if(image == null){
		con.query("INSERT INTO QuestionComment (questionID, userID, description, isAnnonymous, userIDAnnonymous, commentLikeCount, commentDislikeCount) " +
				"VALUES('" + questionID + "', '" + userID + "', '" + description + "', '"
				+ isAnnonymous + "', '" + userIDAnnonymous + "', '" + req.query.commentLikeCount+ "', '" + req.query.commentDislikeCount + "');",
			function (err, result, fields) {
		});
	}else{
		con.query("INSERT INTO QuestionComment (questionID, userID, description, isAnnonymous, userIDAnnonymous, commentLikeCount, commentDislikeCount, image) " +
		"VALUES('" + questionID + "', '" + userID + "', '" + description + "', '"
		+ isAnnonymous + "', '" + userIDAnnonymous + "', '" + req.query.commentLikeCount+ "', '" + req.query.commentDislikeCount + "', '" + req.query.image + "');",
		function (err, result, fields) {
		});
	}

});


// app.get('/deleteComment', function (req, res) {

// 	con.query("DELETE FROM QuestionToComment WHERE questionCommentID='" + req.query.questionCommentID +
// 		   "'; DELETE FROM QuestionComment " + "WHERE questionCommentID='" + req.query.questionCommentID +
// 													      "' questionID='" + req.query.questionID + 
// 													     "'' and userID='" + req.query.userID +
// 											    "' and userIDAnnonymous='" + req.query.userIDAnnonymous +
// 											 	     "' and description='" + req.query.description + "';" +
// 			", ALTER TABLE QuestionComment AUTO_INCREMENT = 1;",
// 		function (err, result, fields) {
// 			if(err) throw err;
// 			res.json(result);
// 		});
// });

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

app.get('/getUserInfo', function(req, res) {
	var username = req.query.username;
	con.query("SELECT bio, imageURL FROM KUser WHERE username='" + username + "'", 
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

app.get('/updateBio', function(req, res) {
	con.query("UPDATE KUser SET bio = '" + req.query.bio + "'WHERE userID='" + req.query.userID + "'", 
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

app.get('/updateProfilePic', function(req, res) {
	con.query("UPDATE KUser SET imageURL = '" + req.query.imageURL + "'WHERE userID='" + req.query.userID + "'", 
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

app.get('/numFollowers', function(req, res) {
	var username = req.query.username;

	con.query("SELECT numFollowers FROM KUser WHERE username='" + username + "'", 
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
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

	con.query("UPDATE KUser SET numFollowers = numFollowers + 1 WHERE username='" + userToFollow + "'");
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

	con.query("UPDATE KUser SET numFollowers = numFollowers - 1 WHERE username='" + userToUnfollow + "'");

});

app.get('/insertRatingValue', function (req, res) { // also inserts poll optionvote
	var questionID = req.query.questionID;
	var userID = req.query.userID;
	var ratingValue = req.query.rating;

	con.query("INSERT INTO RatingQuestionOption (questionID, userID, rating) " +
			"VALUES('" + questionID + "', '" + userID + "', '" + ratingValue + "');",
	  	function (err, result, fields) {
	    	if (err) throw err;
	    	res.json(result);
		}
	);
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

	if (likeDislikeValue) {
		con.query("UPDATE question SET numLikes = numLikes + 1 WHERE questionID = " + questionID, 
		function (err, result, fields) {
			if (err) throw err;
		});
	} else {
		con.query("UPDATE question SET numLikes = numLikes - 1 WHERE questionID = " + questionID, 
		function (err, result, fields) {
			if (err) throw err;
		});
	}
});

// app.get('/insertQuestionCommentike', function (req, res) {
// 	var questionID = req.query.questionID;
// 	var userID = req.query.userID;
// 	var likeDislikeValue = req.query.pollLike;

// 	//convert boolean value 
// 	if(likeDislikeValue == 'true'){likeDislikeValue = 1;}
// 	else{likeDislikeValue = 0;}

// 	con.query("INSERT INTO QuestionLike (questionID, userID, pollLike) " +
// 		"VALUES('" + questionID + "', '" + userID + "', '" + likeDislikeValue + "');",
// 	  	function (err, result, fields) {
// 	    if (err) throw err;
// 	});

// 	if (likeDislikeValue) {
// 		con.query("UPDATE QuestionComment SET commentLikeCount = commentLikeCount + 1 WHERE questionID = " + questionID, 
// 		function (err, result, fields) {
// 			if (err) throw err;
// 		});
// 	} else {
// 		con.query("UPDATE QuestionComment SET commentLikeCount = commentLikeCount - 1 WHERE questionID = " + questionID, 
// 		function (err, result, fields) {
// 			if (err) throw err;
// 		});
// 	}
// });

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





app.get('/getPollResults', function (req, res) {
	con.query("SELECT title, votes FROM PollOption WHERE questionID='" +
		req.query.questionID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
	});
});

app.get('/addPollVote', function (req, res) {
	con.query("UPDATE PollOption SET votes=votes+1 WHERE questionID='" +
		req.query.questionID + "' AND pollOptionID='" + req.query.pollOptionID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
	});
});

app.get('/findPrevVote', function (req, res) {
	con.query("SELECT rating FROM RatingQuestionOption WHERE questionID='" +
		req.query.questionID + "' AND userID='" + req.query.userID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
	});
});

app.get('/removePollVote', function (req, res) {
	con.query("UPDATE PollOption SET votes=votes-1 WHERE questionID='" +
		req.query.questionID + "' AND pollOptionID='" + req.query.pollOptionID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
	});
});

app.get('/checkQuestionDate', function (req, res) {
	con.query("SELECT endDate FROM Question WHERE questionID='" +
		req.query.questionID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
	});
});

app.get('/UpdateVote', function (req, res) {

	var likeDislikeValue = req.query.pollLike;
	//convert boolean value 
	if(likeDislikeValue == 'true'){likeDislikeValue = 1;}
	else{likeDislikeValue = 0;}

	if(likeDislikeValue == 1){
		con.query("UPDATE Question " + 
		"SET numLikes= numLikes+1 WHERE questionID='" +
		req.query.questionID + "' and userID='" + req.query.userID + "';");
	}
	
	con.query("UPDATE QuestionLike " + 
		"SET pollLike='"+ likeDislikeValue + "' WHERE questionID='" +
		req.query.questionID + "' and userID='" + req.query.userID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/editComment', function (req, res) {

	var newComment = req.query.newComment;
	var newImage = req.query.newImage;

	if(newImage != 'undefined'){
		if(newComment != 'undefined'){
			con.query("UPDATE QuestionComment " + 
			"SET description='"+ newComment + "', image='"+ newImage + "' WHERE questionCommentID='" +
			req.query.questionCommentID +"';", 
			function (err, result, fields) {
				if(err) throw err;
				res.json(result);
			});
		}
		else{
			con.query("UPDATE QuestionComment " + 
			"SET image='"+ newImage + "' WHERE questionCommentID='" +
			req.query.questionCommentID +"';", 
			function (err, result, fields) {
				if(err) throw err;
				res.json(result);
			});

		}
	}else{
		if(newComment != 'undefined'){
			con.query("UPDATE QuestionComment " + 
			"SET description='"+ newComment + "' WHERE questionCommentID='" +
			req.query.questionCommentID +"';", 
			function (err, result, fields) {
				if(err) throw err;
				res.json(result);
			});
		}
	}
});

app.get('/deleteComment', function (req, res) {

	con.query("DELETE FROM CommentLike WHERE questionCommentID='" + req.query.questionCommentID + "';");

	con.query("DELETE FROM QuestionComment WHERE questionCommentID='" 
		+ req.query.questionCommentID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});


app.get('/UpdateCommentLike', function (req, res) {

	con.query("UPDATE QuestionComment " + 
		"SET commentLikeCount= commentLikeCount+1 WHERE questionID='" +
		req.query.questionID + "' and questionCommentID='" + req.query.questionCommentID + "';");

	con.query("INSERT INTO CommentLike (questionCommentID, userID, pollLike)" +
		"VALUES('" + req.query.questionCommentID + "', '" + req.query.userID + "', 1);",
	  	function (err, result, fields) {
	    // if (err) throw err;
	    //res.json(result);
	});
});

app.get('/UpdateCommentDisLike', function (req, res) {

	con.query("UPDATE QuestionComment " + 
		"SET commentDislikeCount= commentDislikeCount+1 WHERE questionID='" +
		req.query.questionID + "' and questionCommentID='" + req.query.questionCommentID + "';");

	con.query("INSERT INTO CommentLike (questionCommentID, userID, pollLike)" +
		"VALUES('" + req.query.questionCommentID + "', '" + req.query.userID + "', 0);",
	  	function (err, result, fields) {
	    // if (err) throw err;
	    //res.json(result);
	});
});

app.get('/getUserName', function (req, res) {

	con.query("SELECT u.username FROM KUser u WHERE u.userID='" + req.query.userID + "';",  
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

/*** Comment Like/Dislike Functions ***/

app.get('/checkUserVotedComment', function (req, res) {

	con.query("SELECT cl.userID, cl.pollLike " + 
		"FROM CommentLike cl WHERE cl.questionCommentID='" +
		req.query.questionCommentID + "' and cl.userID='" + req.query.userID + "';", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/UpdateCommentLike', function (req, res) {

	con.query("UPDATE QuestionComment " + 
		"SET commentLikeCount= commentLikeCount+1 WHERE questionID='" +
		req.query.questionID + "' and questionCommentID='" + req.query.questionCommentID + "';");

	con.query("INSERT INTO CommentLike (questionCommentID, userID, pollLike)" +
		"VALUES('" + req.query.questionCommentID + "', '" + req.query.userID + "', 1);",
	  	function (err, result, fields) {
	    // if (err) throw err;
	    //res.json(result);
	});
});

app.get('/UpdateCommentDisLike', function (req, res) {

	con.query("UPDATE QuestionComment " + 
		"SET commentDislikeCount= commentDislikeCount+1 WHERE questionID='" +
		req.query.questionID + "' and questionCommentID='" + req.query.questionCommentID + "';");

	con.query("INSERT INTO CommentLike (questionCommentID, userID, pollLike)" +
		"VALUES('" + req.query.questionCommentID + "', '" + req.query.userID + "', 0);",
	  	function (err, result, fields) {
	    // if (err) throw err;
	    //res.json(result);
	});
});


app.get('/UpdateCommentVote', function (req, res) {

	var pollLike = req.query.pollLike;
	/*
	When poll like is 0 , dislike -= 1, like += 1
	WHen poll like is 1, like += 1, dislike -= 1
	*/
	if(pollLike == 0){

		con.query("UPDATE QuestionComment " + 
			"SET commentDislikeCount= commentDislikeCount-1, commentlikeCount = commentlikeCount+1 WHERE questionID='" +
			req.query.questionID + "' and questionCommentID='" + req.query.questionCommentID + "';");

		con.query("UPDATE CommentLike " + 
			"SET pollLike= 1 WHERE userID='" + req.query.userID + "' and questionCommentID='" + req.query.questionCommentID + "';",
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});

	}
	else{


		con.query("UPDATE QuestionComment " + 
			"SET commentlikeCount= commentlikeCount-1, commentDislikeCount = commentDislikeCount+1 WHERE questionID='" +
			req.query.questionID + "' and questionCommentID='" + req.query.questionCommentID + "';");
	
		con.query("UPDATE CommentLike " + 
			"SET pollLike= 0 WHERE userID='" + req.query.userID + "' and questionCommentID='" + req.query.questionCommentID + "';",
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	}
});

app.get('/UndoCommentVote', function (req, res) {

	var pollLike = req.query.pollLike;
	/*
	When poll like is 0 , dislike -1 
	When poll like is 1, like -1 
	*/

	if(pollLike == 0){
		con.query("UPDATE QuestionComment " + 
			"SET commentDislikeCount= commentDislikeCount-1 WHERE questionID='" +
			req.query.questionID + "' and questionCommentID='" + req.query.questionCommentID + "';");

		con.query("DELETE FROM CommentLike WHERE questionCommentID='" +
			req.query.questionCommentID + "' and userID='" + req.query.userID + "';",
		  	function (err, result, fields) {
		    // if (err) throw err;
		    //res.json(result);
		});
	}
	else{
		con.query("UPDATE QuestionComment " + 
			"SET commentlikeCount= commentlikeCount-1 WHERE questionID='" +
			req.query.questionID + "' and questionCommentID='" + req.query.questionCommentID + "';");

		con.query("DELETE FROM CommentLike WHERE questionCommentID='" +
			req.query.questionCommentID + "' and userID='" + req.query.userID + "';",
		  	function (err, result, fields) {
		    // if (err) throw err;
		    //res.json(result);
		});

	}
});

app.get('/getTag', function (req, res) {

	con.query("SELECT t.tagStr FROM Tag t INNER JOIN TagToQuestion ttq" +
		" ON t.tagID = ttq.tagID WHERE ttq.questionID='" +
		req.query.questionID + "' LIMIT 1;", 
		function (err, result, fields) {
			if(err) throw err;
			res.json(result);
		});
});

app.get('/getRecommendedQuestion', function (req, res) {

	con.query("SELECT q.questionID, q.isPoll, q.title, q.description " + 
		"FROM Question q, Tag t, TagToQuestion tq WHERE " + 
		"t.tagStr='" + req.query.tagQuery + "' AND tq.tagID = t.tagID AND" + 
		" tq.questionID = q.questionID AND tq.questionID <> '"+ req.query.questionID +
		"' ORDER BY q.numLikes DESC;",
	  function (err, result, fields) {
	    if (err) throw err;
	    res.json(result);
	});
	
});

app.get('/deactivateUser', function (req, res) {

	con.query("UPDATE KUser k SET deactivated=" + req.query.deactivated +
			 " WHERE k.userID=" + req.query.userID + " AND k.username='" + req.query.username + "';",
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
	});
});

app.get('/deactivateQuestions', function (req, res) {

	con.query("UPDATE Question q SET deactivated=true" +
			 " WHERE q.userID=" + req.query.userID + " AND q.deactivated=false",
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
	});
});

app.get('/deactivateComments', function (req, res) {

	con.query("UPDATE QuestionComment qc SET deactivated=true" +
			  " WHERE qc.userID=" + req.query.userID + " AND qc.deactivated=false",
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

app.get('/getProfilePic', function (req, res) {
		con.query("SELECT u.imageURL FROM KUser u " +
			"WHERE u.userID='" + req.query.userID + "'",
		  function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
	});

app.get('/deleteCommentImage', function(req, res) {

	con.query("UPDATE QuestionComment SET image = null WHERE questionCommentID='" + req.query.questionCommentID + "';", 
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

app.get('/deletePost', function(req, res) {

	var questionID = req.query.questionID;
	con.query("DELETE from question where questionID = " + questionID, 
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});

app.get('/deleteAllPosts', function(req, res) {

	var userID = req.query.userID;

	con.query("DELETE from question where userID = " + userID, 
		function (err, result, fields) {
			if (err) throw err;
			res.json(result);
		});
});


app.listen(8080);
console.log("Server running on port 8080");