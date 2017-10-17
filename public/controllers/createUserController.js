angular.module("KnowItAll").controller('createUser', ['$scope', '$http', '$cookies', '$routeParams', function($scope, $http, $cookies, $routeParams) {
	var username = $routeParams.username.replace(":", "");
	var password = $routeParams.password.replace(":", "");
	console.log("Username from param: " + username);
	console.log("password from param: " + password);
	console.log("username from cookie: " + $cookies.get("newUsername"));
	console.log("password from cookie: " + $cookies.get("newPasswordHash"));
}]);