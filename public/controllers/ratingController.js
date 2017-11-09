angular.module("KnowItAll").controller('RatingCtrl', ['$scope', '$http', '$cookies', '$routeParams', '$location', '$route', function($scope, $http, $cookies, $routeParams, $location, $route) {
	
	function twoDigits(d) {
	    if(0 <= d && d < 10) return "0" + d.toString();
	    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
	    return d.toString();
	}

	Date.prototype.toMysqlFormat = function() {
    	return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + 
    		   twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + 
    		   twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
	};

	var loggedInuserID = $cookies.get("userID");
	$scope.loggedInuserID=loggedInuserID;
	var questionID = $routeParams.questionID;
	var getRating = true;

	if (getRating) {
		$http.get('/getQuestion?questionID=' + questionID).then(function (response) {
			$scope.title = response.data[0].title;
			$scope.userID = response.data[0].userID;
			$scope.description = response.data[0].description;

			$scope.isAnonymous = response.data[0].isAnonymous;
			$scope.username = null;

			if($scope.isAnonymous == 1){
				
				$scope.username = "ANONYMOUS";
			}else{
				$scope.username = response.data[0].username;
			}
			
			$scope.endDate = null;
			if(response.data[0].endDate == null){
				$scope.endDate = "(Open Forever)";
			}else{
				
				//get current time
				var date = new Date();

				var finalCloseDate = new Date(response.data[0].endDate);


				//convert close time to match convert time format
				// var closeDate = (response.data[0].endDate).replace(".000Z", "");
				// var finalCloseDate = closeDate.replace("T", " ");
				console.log("now date: " + date);
				console.log("close date: " + finalCloseDate);
				//compare and check
				if(date < finalCloseDate){
					console.log("ITS NOT CLOSED YET");
					$scope.endDate = response.data[0].endDate;
				}else{
					console.log("IT' CLOSED");
					$scope.endDate = "(CLOSED)";
					//disable everything when it's closed
					var nodes = document.querySelector(".comments-cont").getElementsByTagName('*');
					for(var i = 0; i < nodes.length; i++){
					     nodes[i].disabled = true;
					}
					var nodes = document.querySelector(".rank-cont").getElementsByTagName('*');
					for(var i = 0; i < nodes.length; i++){
					     nodes[i].disabled = true;
					}					
					var nodes = document.querySelector(".vote-cont").getElementsByTagName('*');
					for(var i = 0; i < nodes.length; i++){
					     nodes[i].disabled = true;
					}
				}

			}
			if(response.data.length == 0){
				console.log("response = 0");
			}
		},function (res) {
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
			if(response.data[0].num == null){
				$scope.averageRating = 0;
			}
			else{
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
	}

	$scope.editComment = function(comment){

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
			},function (response) {
		    	console.log("Error");
		});
	}

	$scope.deleteComment = function(comment){
		var currentComment = angular.copy(comment).description;
		var questionCommentID = angular.copy(comment).questionCommentID;

		$http.get('/deleteComment?&questionID=' + questionID + "&userID=" + loggedInuserID +
			"&description=" + currentComment + "&questionCommentID=" + questionCommentID)
			.then(function (response) {
					$route.reload();
					console.log("comment succesfully deleted");
				},function (response) {
			    	console.log("Error");
		});

	}

		//User likes the comment 
	$scope.commentLike = function(comment){
		var questionCommentID = angular.copy(comment).questionCommentID;
		var userID = $cookies.get("userID");
		if(userID !== -1 && typeof(userID) !== 'undefined'){

			//Check if user already voted
			$http.get("/checkUserVotedComment?questionCommentID=" + questionCommentID + "&userID=" + userID
				)
				.then(function (response) {
					if(typeof response.data[0] == 'undefined'){
						//&& typeof response[0].userID !== 'undefined' 
						//if user clicked Like 
						$http.get("/UpdateCommentLike?questionCommentID=" + questionCommentID + "&questionID=" + questionID+ "&userID=" + userID)
							.then(function (response) {
								console.log("insert into questionlike table");
						},function (response) {
						    	console.log("Error");
						});

							$route.reload();
					}else {			
						//
						// $http.get("/UpdateCommentVote?questionCommentID=" + questionCommentID + "&userID=" + userID
						// 	+ "&pollLike=" + likeorDisLike)
						// 	.then(function (response) {
						// 		console.log("insert into questionlike table");
						// },function (response) {
						//     	console.log("Error");
						// });
						// 	//$route.reload();
						 	$scope.errorMessageCommentLike = "Already voted.";

					}
				},function (response) {
			    	console.log("Error");
			});
		}else{
			$scope.errorMessageCommentLike = "Please log In to vote comment";
		}

	}

	//User Disliked the comment
	$scope.commentDislike = function(comment){
		var questionCommentID = angular.copy(comment).questionCommentID;
		var userID = $cookies.get("userID");
		if(userID !== -1 && typeof(userID) !== 'undefined'){

			//Check if user already voted
			$http.get("/checkUserVotedComment?questionCommentID=" + questionCommentID + "&userID=" + userID
				)
				.then(function (response) {
					if(typeof response.data[0] == 'undefined'){
						//&& typeof response[0].userID !== 'undefined' 

						//If user clicked Dislike
						$http.get("/UpdateCommentDisLike?questionCommentID=" + questionCommentID + "&questionID=" + questionID + "&userID=" + userID)
							.then(function (response) {
								console.log("insert into questionlike table");
						},function (response) {
						    	console.log("Error");
						});
							$route.reload();
					}else {			
						// $http.get("/UpdateCommentVote?questionCommentID=" + questionCommentID + "&userID=" + userID
						// 	+ "&pollLike=" + likeorDisLike)
						// 	.then(function (response) {
						// 		console.log("insert into questionlike table");
						// },function (response) {
						//     	console.log("Error");
						// });
						// 	//$route.reload();
						//$scope.errorMessageCommentLike = "Already voted. ";

					}
				},function (response) {
			    	console.log("Error");
			});
		}else{
			$scope.errorMessageCommentLike = "Please log In to vote comment";
		}
	}	


	
}]);