angular.module("KnowItAll").controller('createUser', ['$scope', '$http', '$cookies', '$routeParams', function($scope, $http, $cookies, $routeParams) {



	if (true /* put security logic here later */) {
		$http.get("/insertUser?username=" + username + "&passwordHash=" + password).then(
			function (response) {
				$cookies.put('username', username);
				$cookies.put('userID', response.data[0].userID);
			}), function (response) {
				console.log("DID NOT Sucessfully make new user");
			}
	}
}]);