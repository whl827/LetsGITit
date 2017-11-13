angular.module("KnowItAll").controller('RatingCtrl', ['$scope', '$http', '$cookies', '$routeParams', '$location', '$route', function ($scope, $http, $cookies, $routeParams, $location, $route) {

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

	var loggedInuserID = $cookies.get("userID");
	$scope.loggedInuserID = loggedInuserID;
	var questionID = $routeParams.questionID;
	var getRating = true;

	if (getRating) {
		$http.get('/getQuestion?questionID=' + questionID).then(function (response) {
			$scope.title = response.data[0].title;
			$scope.userID = response.data[0].userID;
			$scope.description = response.data[0].description;

			$scope.isAnonymous = response.data[0].isAnonymous;
			$scope.username = null;

			if ($scope.isAnonymous == 1) {

				$scope.username = "ANONYMOUS";
			} else {
				$scope.username = response.data[0].username;
			}

			$scope.endDate = null;
			if (response.data[0].endDate == null) {
				$scope.endDate = "(Open Forever)";
			} else {

				//get current time
				var date = new Date();

				var finalCloseDate = new Date(response.data[0].endDate);


				//convert close time to match convert time format
				// var closeDate = (response.data[0].endDate).replace(".000Z", "");
				// var finalCloseDate = closeDate.replace("T", " ");
				console.log("now date: " + date);
				console.log("close date: " + finalCloseDate);
				//compare and check
				if (date < finalCloseDate) {
					console.log("ITS NOT CLOSED YET");
					$scope.endDate = response.data[0].endDate;
				} else {
					console.log("IT' CLOSED");
					$scope.endDate = "(CLOSED)";
					//disable everything when it's closed
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


		$http.get('/getAvgRating?questionID=' + questionID).then(function (response) {
			if (response.data[0].num == null) {
				$scope.averageRating = 0;
			}
			else {
				$scope.averageRating = response.data[0].num;
			}

		}, function (response) {
			console.log("Error");
		});

		$http.get('/commentList?questionID=' + questionID).then(function (response) {
			$scope.totalComment = response.data.length;
			$scope.commentList = response.data;
		}, function (response) {
			console.log("Failed to get current user, not logged in");
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
			}
			else{
				$scope.errorMessageRecommendedQuestion = "There is no recommended Poll or Rating"
			}
		},
			function (res) {
				console.log("Question list NOT received");
			});
	}

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

	$scope.userIsLoggedIn = function(){
    	if($cookies.get('userID') != -1 && $cookies.get('userID') != undefined){
    		return true;
    	}
    	return false;
    }

	$scope.toggleFlag = function (flag) {
		console.log('flagging question: ' + questionID);
		$http.get('/toggleFlag?questionID=' + questionID + '&flag=' + flag);
	}

	$scope.loadQFlag = function () {

        var questionID = $routeParams.questionID;
        $scope.flag = {flagInfo : "", isFlagged : false};

        console.log("is Admin: " + ($cookies.get('isAdmin') == true));

        if ($cookies.get('isAdmin') == true) {
        	console.log("Entering the admin only if condition");
        	$http.get('/getQuestion?questionID=' + questionID)
        		.then( function(response) {
        			if (response.data.length == 1 && response.data[0].isFlagged) {
        				$scope.flag = {flagInfo : "This Content Is FLAGGED", isFlagged : true};
        			}
        		}
        	);
        }
    }

	$scope.createComment = function(){

		var userID = $cookies.get("userID");

		if(userID !== -1 && typeof(userID) !== 'undefined'){
			var validComment = validate($scope.commentInput); 

			if(!validComment){
				$scope.errorMessageComment = "Please leave a comment";
			}
			else{ 

				//getting UserName
				$http.get("/getUserName?userID=" + userID)
					.then(function (response) {

						var username = response.data[0].username;
						var isAnnonymous = $scope.isAnonymousInput;
						var userIDAnnonymous = "";
						var comment =  $scope.commentInput;

						if(isAnnonymous){ userIDAnnonymous = "Anonymous";}
						else{ userIDAnnonymous = username; }
						debugger;

						if(isAnnonymous){isAnnonymous = 1;}
						else{isAnnonymous = 0;}


						console.log(questionID, userID, username, isAnnonymous,userIDAnnonymous, comment);

						$http.get("/insertComment?questionID=" + questionID + "&userID=" + userID
						+ "&description=" + comment + "&isAnnonymous=" + isAnnonymous 
						+ "&userIDAnnonymous=" + userIDAnnonymous + "&commentLikeCount=0" + 
						"&commentDislikeCount=0")
						.then(function (response) {
							console.log("inser into comment table");
						},function (response) {
					    	console.log("Error");
						});

		 				$route.reload();
					
					console.log("Getting userName");
				},function (response) {
			    	console.log("Error");
				});



				//Insert Comment Only when User haven't submitted
				// $http.get("/checkUserExist?questionID=" + questionID + "&userID=" + userID)
				// 	.then(function (response) {
					
						
				// 		if(typeof response.data[0] == 'undefined'){
				// 			&& typeof response[0].userID !== 'undefined' 
							
					

				// 		}else {
				// 			$scope.errorMessageComment = "Already commented. Please press Edit to continue";
				// 		}

				// },function (response) {
				//     	console.log("Error");
				// });

				//Inser comment only when user have not commentent
			}
		}
		else{
			$scope.errorMessageComment = "Please log In to comment";
		}
	}

	$scope.selectRate = function(){

		var userID = $cookies.get("userID");
		if(userID !== -1 && typeof(userID) !== 'undefined'){

			var validRating = validate($scope.rateInput); 
			if(!validRating){
				$scope.errorMessageRate = "Please choose the rating value";
			}
			else{
				var ratingValue = $scope.rateInput;
				//find Rating and put the value into RatingQuestionOption
				//check if user already rated
				$http.get("/checkUserRated?questionID=" + questionID + "&userID=" + userID
					)
					.then(function (response) {
					
						if(typeof response.data[0] == 'undefined'){

							$http.get("/insertRatingValue?questionID=" + questionID + "&userID=" + userID
								+ "&rating=" + ratingValue)
								.then(function (response) {
									console.log("inser into rating table");
							},function (response) {
							    	console.log("Error");
							});

							$route.reload();

						}else {
							

							$http.get("/UpdateRating?questionID=" + questionID + "&userID=" + userID
								+ "&rating=" + ratingValue)
								.then(function (response) {
									console.log("inser into rating table");
							},function (response) {
							    	console.log("Error");
							});

							$scope.errorMessageRate = "Already rated. Updating your rating" ;

							$route.reload();


						}
					},function (response) {
				    	console.log("Error");
				});
			}
		}
		else{
			$scope.errorMessageRate = "Please log In to rate";
		}
	}



	$scope.selectPollOption = function(index, pollList){
		var userID = $cookies.get("userID");
		console.log("userID is " + userID); 

		if(userID !== -1 && typeof(userID) !== 'undefined' && userID !== "-1"){
			// Check if user already voted
			$http.get("/checkUserRated?questionID=" + questionID + "&userID=" + userID)
			 	.then(function (response) {
			 	// str = JSON.stringify(pollList);
				// console.log(str); 
			 	// console.log("index is: " + index); 
				// console.log("option title is: " + pollList[index].title);
				// console.log("optionID is: " + pollList[index].pollOptionID);
				var optionID = pollList[index].pollOptionID; 

		 		if(typeof response.data[0] == 'undefined'){
		 			//console.log("hasnt voted yet");
		 			// Insert into database
		 			$http.get("/insertRatingValue?questionID=" + questionID + "&userID=" + userID + "&rating=" + optionID)
						.then(function (response) {
							//console.log("Inserted into RatingQuestionOption Table");
						}, function (response) {
						    console.log("FAILED Inserted into RatingQuestionOption Table");
		 			});

					// update PollOption table: for polloptionID and questionID, increment vote
					$http.get("/addPollVote?questionID=" + questionID + "&pollOptionID=" + optionID)
						.then(function (response) {
							//console.log("Updated PollOption Table");
						}, function (response) {
						    console.log("FAILED Updated PollOption Table");
		 			});


			 		$route.reload();

		 		} else {
		 			// Update vote input
					//console.log("already voted");
					$http.get("/findPrevVote?questionID=" + questionID + "&userID=" + userID)
					 	.then(function (response) { 
					 		var prevVoteOptionID = response.data[0].rating; 
							//console.log("prevVoteOptionID: " + prevVoteOptionID);
							//console.log("Selected from PollOption Table");
							return $http.get("/removePollVote?questionID=" + questionID + "&pollOptionID=" + prevVoteOptionID);
					 	}, function (response) {
					 	    console.log("Selection failed");
		 				})

					 	.then(function (response) {
							//console.log("Updated PollOption Table: removed vote");
							return $http.get("/UpdateRating?questionID=" + questionID + "&userID=" + userID + "&rating=" + optionID); 
						}, function (response) {
						    console.log("FAILED Updated PollOption Table: removed vote");
		 				})

					 	.then(function (response) {
		 					//console.log("Update: Inserted into RatingQuestionOption Table");
		 					return $http.get("/addPollVote?questionID=" + questionID + "&pollOptionID=" + optionID); 
		 				},function (response) {
		 			    	console.log("FAILED Update: Inserted into RatingQuestionOption Table");
		 				})

					 	.then(function (response) {
							//console.log("Updated PollOption Table: added vote");
							$route.reload();
							//$scope.errorMessagePoll = "Already voted. Updating your vote" ; // doesnt show up for some reason
							
						}, function (response) {
						    console.log("FAILED Updated PollOption Table: added vote");
		 			});
				}
				
			}, function (response) { console.log("Error"); });

		} else { $scope.errorMessagePoll = "Please log in to vote"; }
	}

	$scope.selectLikeOrDislike = function(){

		var userID = $cookies.get("userID");
		if(userID !== -1 && typeof(userID) !== 'undefined'){

			var validLike = validate($scope.likeInput); 

			if(!validLike){
				$scope.errorMessageLike = "Please choose the like/dislike value";
			}
			else{
				var likeorDisLike = $scope.likeInput;
				//like ans true and dislike as false
				//var userID = 1; //needs to be the current logged in User 

				//Check if user already voted
				$http.get("/checkUserVoted?questionID=" + questionID + "&userID=" + userID
					)
					.then(function (response) {
						if(typeof response.data[0] == 'undefined'){
							//&& typeof response[0].userID !== 'undefined' 

							$http.get("/insertQuestionLike?questionID=" + questionID + "&userID=" + userID
								+ "&pollLike=" + likeorDisLike)
								.then(function (response) {
									console.log("insert into questionlike table");
							},function (response) {
							    	console.log("Error");
							});

								$route.reload();
						}else {			

							$http.get("/UpdateVote?questionID=" + questionID + "&userID=" + userID
								+ "&pollLike=" + likeorDisLike)
								.then(function (response) {
									console.log("insert into questionlike table");
							},function (response) {
							    	console.log("Error");
							});
								$route.reload();
								$scope.errorMessageLike = "Already voted. Updating your like/dislike";

						}
					},function (response) {
				    	console.log("Error");
				});
			}
		}else{
			$scope.errorMessageLike = "Please log In to like/dislike";
		}
	}


	function validate(input){
		if(input == null || input == ""){
			//alert("error"); 
			return false; 
		}
		return true; // success
	}


	


}]);