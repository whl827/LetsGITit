angular.module("KnowItAll").controller('RatingCtrl', ['$scope', '$http', '$cookies', '$routeParams', '$location', function($scope, $http, $cookies, $routeParams, $location) {
	

	var questionID = $routeParams.questionID;
	var userID = $cookies.get("userID");
	var getRating = true;

	if (getRating) {
		console.log("getting rating");

		$http.get('/getQuestion?questionID=' + questionID).then(function (response) {
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
			if(response.data[0].endDate == "0000-00-00 00:00:00" ||
				response.data[0].endDate == null){
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

			console.log("ave rating is " + response.data[0].num);
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
	
}]);