angular.module("KnowItAll").controller('otherUserProfile', ['$scope', '$http', '$cookies', '$routeParams', function($scope, $http, $cookies, $routeParams) {
	console.log("Entering otherUserProfileController.js");

	var otherUsername = $routeParams.username.replace(":", "");
	var currUsername = $cookies.get("username");
	console.log("Other user username: " + otherUsername);
	console.log("Curr user: " + currUsername);

	var isLoggedIn = currUsername != "null"; // Because javascript is werid
	$scope.isLoggedIn = isLoggedIn;	

	if (isLoggedIn) {

		$http.get('/profile?username=' + otherUsername).then(function (response) {
			console.log("Got other user feed");
			console.log(response.data);
			$scope.questionList = response.data;
		}, function (response) {
			console.log("Failed to get current user, not logged in");
		});

		$http.get('/isFollowing?user1=' + currUsername +
		 "&user2=" + otherUsername).then(function (response) {
		 	console.log("got other user is isFollowing");
		 	if(response.data.length > 0) {
		 		$scope.isFollowing = true;
		 	} else {
		 		$scope.isFollowing = false;
		 	}
		 });
	}

	$scope.follow = function() {
		$http.get('/follow?currUser=' + currUsername + "&userToFollow=" + otherUsername)
		.then(function (response) {
			console.log("Followed: " + otherUsername);
			$scope.isFollowing = true;
		}, function (response) {
			console.log("Failed to follow: " + username);
		});
	}

	$scope.unfollow = function() {
		$http.get('/unfollow?currUser=' + currUsername + "&userToUnfollow=" + otherUsername)
		.then(function (response) {
			console.log("Followed: " + otherUsername);
			$scope.isFollowing = false;
		}, function (response) {
			console.log("Failed to follow: " + username);
		});
	}
	
}]);