angular.module("KnowItAll").controller('RatingCtrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	
	console.log("in rate ctrl"); 
	var questionID = "1";
	var getRating = true;
	var userID = $cookies.get("userID");


	if (getRating) {
		console.log("getting rating");
		$http.get('/getQuestion?questionID=' + questionID).then(function (response) {
			console.log("Got rating info");
			console.log(response.data[0]);
			$scope.title = response.data[0].title;
			$scope.userID = response.data[0].userID;
			$scope.description = response.data[0].description;
			$scope.endDate = response.data[0].endDate;

			if(response.data.length == 0){
				console.log("response = 0");
			}
		},function (res) {
		    	console.log("Error");
		});

		$http.get('/commentList?questionID=' + questionID).then(function (response) {
		console.log("got comments ");
		console.log(response.data);
		$scope.commentList = response.data;
		}, function (response) {
			console.log("Failed to get current user, not logged in");
		});
	
	}

	$scope.createComment = function(){
		console.log("in comment");
		console.log("question ID:" + questionID);
		var description =  $scope.descriptionInput;
		console.log("description:"+ description);
 		var userID = 1; //needs to be the current logged in User 

		$http.get("/insertComment?questionID=" + questionID + "&userID=" + userID
			+ "&description=" + description)
			.then(function (response) {
				console.log("inser into comment table");
 
		},function (response) {
		    	console.log("Error");
		});

	}

	$scope.selectRate = function(){
		console.log("rating submitted");
		var ratingValue = $scope.rateInput;
		console.log("rating value is " + ratingValue);

		//find Rating and put the value into RatingQuestionOption
		$http.get("/insertRatingValue?questionID=" + questionID + "&userID=" + userID
			+ "&rating=" + ratingValue)
			.then(function (response) {
				console.log("inser into comment table");
 
		},function (response) {
		    	console.log("Error");
		});
	


	}

//NEED TO WORK ON THIS 
	$scope.selectLikeOrDislike = function(){
		console.log("in like dislike");
		// var likeorDisLike = $scope.likeInput;
		// //like ans true and dislike as false
		// console.log("rating value is " + likeorDisLike);

		$http.get("/QuestionLike?questionID=" + questionID + "&userID=" + userID
			+ "&pollLike=" + pollLike)
			.then(function (response) {
				console.log("insert into questionlike table");
		},function (response) {
		    	console.log("Error");
		});
	}


	// function validate(input){
	// 	if(input == null || input == ""){
	// 		//alert("error"); 
	// 		return false; 
	// 	}
	// 	return true; // success
	// }

	// $scope.Rating = function () { 
	// 	console.log("inside rating function ");
		
	// 	var validRate = validate($scope.rateInput); 

	// 	var like = $scope.likeInput;
	// 	var rate = $scope.rateInput;
	// 	console.log("rate is" +rate);
	// 	var isAnonymous = $scope.isAnonymousInput;
	// 	console.log("isAnonymous: " + isAnonymous);

	// }
	
}]);