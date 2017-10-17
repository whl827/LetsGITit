angular.module("KnowItAll").controller('createUser', ['$scope', '$http', '$cookies', '$routeParams', function($scope, $http, $cookies, $routeParams) {
	var username = $routeParams.username.replace(":", "");
	var password = $routeParams.password.replace(":", "");
	console.log("Making new user");
	console.log("Username from param: " + username);
	console.log("password from param: " + password);
	console.log("username from cookie: " + $cookies.get("newUsername"));
	console.log("password from cookie: " + $cookies.get("newPasswordHash"));
	console.log(username.localeCompare($cookies.get("newUsername")));

	if (true /* put security logic here later */) {
		console.log("new user valid creation");
		$http.get("/insertUser?username=" + username + "&passwordHash=" + password).then(
			function (response) {
				console.log("Sucessfully made new user");
			}), function (response) {
				console.log("DID NOT Sucessfully make new user");
			}
	}
}]);