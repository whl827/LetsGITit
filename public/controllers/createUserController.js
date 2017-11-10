angular.module("KnowItAll").controller('createUser', ['$scope', '$http', '$cookies', '$routeParams', '$window', function($scope, $http, $cookies, $routeParams, $window) {

	var username = $routeParams.username.replace(":", "");
    var password = $routeParams.password.replace(":", "");
    console.log("ITS CALLED");

	if (true /* put security logic here later */) {
		$http.get("/insertUser?username=" + username + "&passwordHash=" + password).then(
			function (response) {
				$cookies.put('username', username);
				$cookies.put('userID', response.data[0].userID);
				 console.log("ITS CALLED");
				$window.location.replace("../index.html");

			}), function (response) {
				console.log("DID NOT Sucessfully make new user");
			}
	}
}]);