angular.module("KnowItAll").controller('PollCtrl', ['$scope', '$http', function($scope, $http, $cookies) {
	
	console.log("inside of poll controller");

	var questionID = "1";
	var getPoll = true; //check if poll is selected
	//when true, get info from database
	//getting information from search page (Home)
	//(search result controller)

//Set Question ID as URL, and read it when pulling poll / rating information 

	if (getPoll) {
		console.log("getting poll");
		$http.get('/getQuestion?questionID=' + questionID).then(function (response) {
			console.log("Got poll info");
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

	//On click create comment, insert data into SQL
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

	// function validate(input){
	// 	if(input == null || input == ""){
	// 		//alert("error"); 
	// 		return false; 
	// 	}
	// 	return true; // success
	// }

	// $scope.poll = function () { 
	// 	console.log("inside rating function ");
		
	// 	var validRate = validate($scope.pollInput); 
	// 	var like = $scope.likeInput;
	// 	// var rate = $scope.rateInput;
	// 	// console.log("rate is" +rate);
	// 	var isAnonymous = $scope.isAnonymousInput;
	// 	console.log("isAnonymous: " + isAnonymous);

	// }
	
}]);