angular.module("KnowItAll").controller('PollCtrl', ['$scope', '$http','$cookies', '$routeParams', function($scope, $http, $cookies, $routeParams) {
	
	console.log("inside of poll controller"); 
	var userID = $cookies.get("userID");
	var questionID = $routeParams.questionID;
	console.log("question ID is " + questionID);
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


			$scope.isAnonymous = response.data[0].isAnonymous;
			$scope.username = null;

			if($scope.isAnonymous == 1){
				
				$scope.username = "ANONYMOUS";
				//console.log("ANONYMOUS: " + $scope.username);
			}else{
				$scope.username = response.data[0].username;
			}

			$scope.endDate = null;
			if(response.data[0].endDate == "0000-00-00 00:00:00"){
				$scope.endDate = "(Open Forever)";
			}else{
				$scope.endDate = response.data[0].endDate;
			}
			console.log("End DATE::::: " + $scope.endDate);
		
			if(response.data.length == 0){
				console.log("response = 0");
			}
		},function (res) {
		    	console.log("Error");
		});

		$http.get('/getLike??questionID=' + questionID).then(function (response) {

			$scope.totalLikeCount = response.data[0].num;

		}, function (response) {
			console.log("Error");
		});	

		$http.get('/getDislike??questionID=' + questionID).then(function (response) {

			$scope.totalDislikeCount = response.data[0].num;

		}, function (response) {
			console.log("Error");
		});	
		

		$http.get('/commentList?questionID=' + questionID).then(function (response) {
			$scope.totalComment = response.data.length;
			$scope.commentList = response.data;
		}, function (response) {
			
		});	

		console.log("question ID is " + questionID);

		$http.get('/pollList?questionID=' + questionID).then(function (response) {
			$scope.pollList = response.data;
		}, function (response) {

		});	


	}
	
}]);