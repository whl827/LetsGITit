angular.module("KnowItAll").controller('createUser', ['$scope', '$http', '$cookies', '$routeParams', '$window', function($scope, $http, $cookies, $routeParams, $window) {

	var username = $routeParams.username.replace(":", "");
    var password = $routeParams.password.replace(":", "");
    var email = $cookies.get("newEmail");

	if (username == $cookies.get("newUsername") && password == $cookies.get("newPasswordHash")) {
		$http.get("/insertUser?username=" + username + "&passwordHash=" + password + "&email=" + email).then(
			function (response) {
				$cookies.put('username', username);
				$cookies.put('userID', response.data[0].userID);
				$window.location.replace("../index.html");

			}), function (response) {
				console.log("DID NOT Sucessfully make new user");
			}
	}
}]);