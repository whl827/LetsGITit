angular.module("KnowItAll").controller('ProfileCtrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	var username = null;
	var loggedIn = true;

	console.log("In profile controller");

	if ($cookies.get("user") != null) {
		username = $cookies.get("username");
	} else {
		$scope.loggedIn = "You must be logged in to access your profile";
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