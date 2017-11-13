angular.module("KnowItAll").controller('PollCtrl', ['$scope', '$http', '$cookies', '$routeParams', '$route', '$location', function ($scope, $http, $cookies, $routeParams, $route, $location) {

	function twoDigits(d) {
		if (0 <= d && d < 10) return "0" + d.toString();
		if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
		return d.toString();
	}

	Date.prototype.toMysqlFormat = function () {
		return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" +
			twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" +
			twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
	};

	// var questionCommentID = $routeParams.questionCommentID;
	// var userID = $routeParams.userID;
	// var userIDAnnonymous = $routeParams.userIDAnnonymous;

	var loggedInuserID = $cookies.get("userID");
	$scope.loggedInuserID = loggedInuserID;
	var questionID = $routeParams.questionID;
	var getPoll = true; //check if poll is selected
	var title;
	//when true, get info from database
	//getting information from search page (Home)
	//(search result controller)


	//Set Question ID as URL, and read it when pulling poll / rating information 

	if (getPoll) {
		$http.get('/getQuestion?questionID=' + questionID).then(function (response) {
			$scope.title = response.data[0].title;
			title = response.data[0].title;
			$scope.userID = response.data[0].userID;

			$scope.description = null;
			if (response.data[0].description != 'undefined') {
				$scope.description = response.data[0].description;

			}

			$scope.isAnonymous = response.data[0].isAnonymous;
			$scope.username = null;


			//check if it image exists, and if it does, show
			var image = document.querySelector("#image_in_rating");
			var imageURL = response.data[0].image;
			console.log("IMAGE URL: " + imageURL);
			if(imageURL==null){
				console.log("IMAGE DOES NOT EXIST: hiding image");
				image.src = "";
				image.style.display = "none";
			}else{
				console.log("IMAGE EXISTS: Showing image");
				image.src = imageURL;
				image.style.display = "inline";
			}


			if ($scope.isAnonymous == 1) {

				$scope.username = "ANONYMOUS";
			} else {
				$scope.username = response.data[0].username;
			}

			$scope.endDate = null;
			if (response.data[0].endDate == null) {
				$scope.endDate = "(Open Forever)";
			} else {


				console.log("NOW: " + new Date());
				console.log("CLOSING: " + new Date(response.data[0].endDate));

				//get current time
				var date = new Date();
				//convert close time to match convert time format
				var finalCloseDate = new Date(response.data[0].endDate);
				//newEndDate.setHours(newEndDate.getHours() - newEndDate.getTimezoneOffset() / 60);
				//console.log("NEW END DATE (A): " + newEndDate);
				//var closeDate = (response.data[0].endDate).replace(".000Z", "");
				//var finalCloseDate = closeDate.replace("T", " ");

				console.log("now date: " + date);
				console.log("close date: " + finalCloseDate);
				//compare and check
				if (date < finalCloseDate) {
					console.log("ITS NOT CLOSED YET");
					$scope.endDate = response.data[0].endDate;

				} else {
					console.log("IT' CLOSED");
					$scope.endDate = "(CLOSED)";
					// This will disable all the children of the div
					// var nodes = document.querySelector(".comments-cont").getElementsByTagName('*');
					// for (var i = 0; i < nodes.length; i++) {
					// 	nodes[i].disabled = true;
					// }
					// var nodes = document.querySelector(".rank-cont").getElementsByTagName('*');
					// for (var i = 0; i < nodes.length; i++) {
					// 	nodes[i].disabled = true;
					// }
					// var nodes = document.querySelector(".vote-cont").getElementsByTagName('*');
					// for (var i = 0; i < nodes.length; i++) {
					// 	nodes[i].disabled = true;
					// }
				}
			}

			if (response.data.length == 0) {
				console.log("response = 0");
			}
		}, function (res) {
			console.log("Error");
		});

		$http.get('/getLike?questionID=' + questionID).then(function (response) {
			$scope.totalLikeCount = response.data[0].num;

		}, function (response) {
			console.log("Error");
		});
		$http.get('/getDislike?questionID=' + questionID).then(function (response) {

			$scope.totalDislikeCount = response.data[0].num;

		}, function (response) {
			console.log("Error");
		});


		$http.get('/commentList?questionID=' + questionID).then(function (response) {
			$scope.totalComment = response.data.length;
			$scope.commentList = response.data;
		}, function (response) {

		});
		$http.get('/pollList?questionID=' + questionID).then(function (response) {
			$scope.pollList = response.data;
		}, function (response) {

		});

		$http.get('/getPollResults?questionID=' + questionID).then(function (response) {
			$scope.pollResults = response.data;
		}, function (response) {
			console.log("FAILED getting poll results");
		});

		$http.get('/getTag?questionID=' + questionID).then(function (response) {
			if((response.data).length !== 0){
				var tag = response.data[0].tagStr;
				$http.get('/getRecommendedQuestion?tagQuery=' + tag + "&questionID=" + questionID).then(function (response) {
					var questionList = response.data;
					$scope.questionList = response.data;

					if(questionList == null || questionList.length == 0){
						$scope.errorMessageRecommendedQuestion = "There is no recommended Poll or Rating"
					}
				},
					function (res) {
						console.log("Question list NOT received");
					});
				}else{
					$scope.errorMessageRecommendedQuestion = "There is no recommended Poll or Rating"
				}
		},
			function (res) {
				console.log("Question list NOT received");
			});

	}//If


	$scope.editComment = function (comment) {

		console.log("in edit comment");
		//var original = $scope.commentList.indexOf(field);
		var currentComment = angular.copy(comment).description;
		var newComment = comment.newComment;
		console.log(" currentComment is " + currentComment);
		console.log("New comment is " + newComment);

		$http.get("/editComment?questionID=" + questionID + "&userID=" + loggedInuserID
			+ "&currentComment=" + currentComment + "&newComment=" + newComment)
			.then(function (response) {
				$route.reload();
				console.log("inser into edit comment table");
			}, function (response) {
				console.log("Error");
			});

	}

	$scope.deleteComment = function (comment) {
		var currentComment = angular.copy(comment).description;
		var questionCommentID = angular.copy(comment).questionCommentID;

		$http.get('/deleteComment?&questionID=' + questionID + "&userID=" + loggedInuserID +
			"&description=" + currentComment + "&questionCommentID=" + questionCommentID)
			.then(function (response) {
				$route.reload();
				console.log("comment succesfully deleted");
			}, function (response) {
				console.log("Error");
			});

	}


	//User likes the comment 
	$scope.commentLike = function (comment) {
		var questionCommentID = angular.copy(comment).questionCommentID;
		var userID = $cookies.get("userID");
		if (userID !== -1 && typeof (userID) !== 'undefined') {

			//Check if user already voted
			$http.get("/checkUserVotedComment?questionCommentID=" + questionCommentID + "&userID=" + userID
			)
				.then(function (response) {
					if (typeof response.data[0] == 'undefined') {
						//&& typeof response[0].userID !== 'undefined' 
						//if user clicked Like 
						$http.get("/UpdateCommentLike?questionCommentID=" + questionCommentID + "&questionID=" + questionID + "&userID=" + userID)
							.then(function (response) {
								console.log("insert into questionlike table");
							}, function (response) {
								console.log("Error");
							});

						$route.reload();
					} else {

						var pollLike = response.data[0].pollLike;
						if (pollLike == 0) { //if previous poll was DisLike, update to Like
							//dislike value -= 1  like value += 1
							$http.get("/UpdateCommentVote?questionCommentID=" + questionCommentID + "&questionID=" + questionID
								+ "&userID=" + userID + "&pollLike=" + pollLike)
								.then(function (response) {
									console.log("insert into questionlike table");
								}, function (response) {
									console.log("Error");
								});

							$route.reload();
						}
						else { //undo poll 

							$http.get("/UndoCommentVote?questionCommentID=" + questionCommentID
								+ "&questionID=" + questionID + "&userID=" + userID
								+ "&pollLike=" + pollLike)
								.then(function (response) {
									console.log("insert into questionlike table");
								}, function (response) {
									console.log("Error");
								});

							$route.reload();
						}
					}
				}, function (response) {
					console.log("Error");
				});
		} else {
			$scope.errorMessageCommentLike = "Please log In to vote comment";
		}

	}
	//User Disliked the comment
	$scope.commentDislike = function (comment) {
		var questionCommentID = angular.copy(comment).questionCommentID;
		var userID = $cookies.get("userID");
		if (userID !== -1 && typeof (userID) !== 'undefined') {
			//Check if user already voted
			$http.get("/checkUserVotedComment?questionCommentID=" + questionCommentID + "&userID=" + userID
			)
				.then(function (response) {
					if (typeof response.data[0] == 'undefined') {
						//&& typeof response[0].userID !== 'undefined' 

						//If user clicked Dislike
						$http.get("/UpdateCommentDisLike?questionCommentID=" + questionCommentID + "&questionID=" + questionID + "&userID=" + userID)
							.then(function (response) {
								console.log("insert into questionlike table");
							}, function (response) {
								console.log("Error");
							});
						$route.reload();
					} else {

						var pollLike = response.data[0].pollLike;
						//if previous poll was Like, update to dislike 
						if (pollLike == 1) {

							$http.get("/UpdateCommentVote?questionCommentID=" + questionCommentID
								+ "&questionID=" + questionID + "&userID=" + userID
								+ "&pollLike=" + pollLike)
								.then(function (response) {
									console.log("insert into questionlike table");
								}, function (response) {
									console.log("Error");
								});

							$route.reload();
						}
						else { //else undo poll 

							$http.get("/UndoCommentVote?questionCommentID=" + questionCommentID
								+ "&questionID=" + questionID + "&userID=" + userID
								+ "&pollLike=" + pollLike)
								.then(function (response) {
									console.log("insert into questionlike table");
								}, function (response) {
									console.log("Error");
								});

							$route.reload();

						}
					}
				}, function (response) {
					console.log("Error");
				});
		} else {
			$scope.errorMessageCommentLike = "Please log In to vote comment";
		}
	}

	$scope.goToLink = function (question) {
		if (question.isPoll) {
			$location.path('/poll/' + question.questionID);
		}
		else {
			$location.path('/rating/' + question.questionID);
		}

	};


}]);