angular.module("KnowItAll").controller('ProfileCtrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	var username = null;
	var loggedIn = true;

	console.log("In profile controller");

	if ($cookies.get("username") != null && $cookies.get("username") != 'null') {
		$scope.loggedInMessage = "";
		username = $cookies.get("username");
	} else {
		$scope.loggedInMessage = "You must be logged in to access your profile";
		loggedIn = false;
	}
	
	if (loggedIn) {
	
		console.log("You are logged in");

		$http.get('/profile?username=' + username).then(function (response) {
		$scope.questionList = response.data;
		}, function (response) {
			console.log("Failed to get current user, not logged in");
		});
	}
	
}]);