angular.module("KnowItAll").controller('pollRatingCtrl', ['$scope', '$http', '$cookies', '$routeParams', '$route', function($scope, $http, $cookies, $routeParams, $route) {
	
	var questionID = $routeParams.questionID;
	$scope.userID = $cookies.get("userID");


	$scope.createComment = function(){

		var userID = $cookies.get("userID");

		if(userID !== -1 && typeof(userID) !== 'undefined'){
			var validComment = validate($scope.commentInput); 

			if(!validComment){
				$scope.errorMessageComment = "Please leave a comment";
			}
			else{ 
				var isAnnonymous = $scope.isAnonymousInput;
				var userIDAnnonymous = "";
				var comment =  $scope.commentInput;

				if(isAnnonymous){ userIDAnnonymous = "Anonymous";}
				else{ userIDAnnonymous = userID; }

				if(isAnnonymous){isAnnonymous = 1;}
				else{isAnnonymous = 0;}

				//Insert Comment Only when User haven't submitted
				$http.get("/checkUserExist?questionID=" + questionID + "&userID=" + userID)
					.then(function (response) {
					
						//
						//if(typeof response.data[0] == 'undefined'){
							//&& typeof response[0].userID !== 'undefined' 
							
							$http.get("/insertComment?questionID=" + questionID + "&userID=" + userID
							+ "&description=" + comment + "&isAnnonymous=" + isAnnonymous 
							+ "&userIDAnnonymous=" + userIDAnnonymous + "&pollLike=" + 0 + 
							"&pollDisLike=" + 0)
							.then(function (response) {
								console.log("inser into comment table");
							},function (response) {
						    	console.log("Error");
							});

					 		$route.reload();

						// }else {
						// 	$scope.errorMessageComment = "Already commented. Please press Edit to continue";
						// }

				},function (response) {
				    	console.log("Error");
				});

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

							//$route.reload();


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
								//$route.reload();
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

	$scope.commentLikeOrDislike = function(){
		var likeorDisLike = $scope.commentLikeInput;


		$http.get("/checkUserVoted?questionID=" + questionID + "&userID=" + userID)
			.then(function (response) {
				if(typeof response.data[0] == 'undefined'){
					//&& typeof response[0].userID !== 'undefined' 

					$http.get("/insertQuestionCommentike?questionID=" + questionID + "&userID=" + userID
						+ "&pollLike=" + likeorDisLike)
						.then(function (response) {
							console.log("insert into questionlike table");
					},function (response) {
					    	console.log("Error");
					});
						$route.reload();
				}else {			

					$http.get("/UpdateCommentVote?questionID=" + questionID + "&userID=" + userID
						+ "&pollLike=" + likeorDisLike)
						.then(function (response) {
							console.log("insert into questionlike table");
					},function (response) {
					    	console.log("Error");
					});
						$route.reload();
						//$scope.errorMessageLike = "Already voted. Updating your like/dislike";

				}
			},function (response) {
		    	console.log("Error");
		});
	}

	function validate(input){
		if(input == null || input == ""){
			//alert("error"); 
			return false; 
		}
		return true; // success
	}


}]);