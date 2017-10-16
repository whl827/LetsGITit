angular.module("KnowItAll").controller('ProfileCtrl', ['$scope', '$http', function($scope, $http) {
	var username = "user1"; //$cookies.get("username");

	$http.get('/profile?username=' + username).then(function (response) {
		console.log("Got user feed");
		console.log(response.data);
		$scope.userFeed = response.data;
	}, function (response) {
		console.log("Failed to get current user, not logged in");
	});
}]);