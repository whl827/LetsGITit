angular.module("KnowItAll").controller('createUser', ['$scope', '$http', '$cookies', '$routeParams', function($scope, $http, $cookies, $routeParams) {
	console.log("username: " + $routeParams.username);
	console.log("passwordHash: " + $routeParams.password);



	if (true /* put security logic here later */) {
		console.log("new user valid creation");
		$http.get("/insertUser?username=" + username + "&passwordHash=" + password).then(
			function (response) {
				console.log("Sucessfully made new user");
				$cookies.put('username', username);
				$cookies.put('userID', response.data[0].userID);
			}), function (response) {
				console.log("DID NOT Sucessfully make new user");
			}
	}
}]);