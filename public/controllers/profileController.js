angular.module("KnowItAll").controller('ProfileCtrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	var username = null;
	var loggedIn = true;

	console.log("In profile controller");
	if ($cookies.get("user") != null) {
		console.log("Getting user");
		username = $cookies.get("username");
	} else {
		console.log("Not logged in");
		$scope.loggedIn = "You must be logged in to access your profile";
		loggedIn = false;
	}
	
	if (loggedIn) {
		$http.get('/profile?username=' + username).then(function (response) {
		console.log("Got user feed");
		console.log(response.data);
		$scope.questionList = response.data;
		}, function (response) {
			console.log("Failed to get current user, not logged in");
		});
	}
	
}]);