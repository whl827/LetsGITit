angular.module("KnowItAll").controller('otherUserProfile', ['$scope', '$http', '$cookies', '$routeParams', '$location', function($scope, $http, $cookies, $routeParams, $location) {

	var otherUsername = $routeParams.username.replace(":", "");
	var currUsername = $cookies.get("username");

	var isLoggedIn = currUsername != "null"; // Because javascript is werid
	$scope.isLoggedIn = isLoggedIn;	
	$scope.otherUsername = otherUsername

	if (isLoggedIn) {

		$http.get('/profile?username=' + otherUsername).then(function (response) {
			$scope.questionList = response.data;
		}, function (response) {
			console.log("Failed to get current user, not logged in");
		});

		$http.get('/isFollowing?user1=' + currUsername +
		 "&user2=" + otherUsername).then(function (response) {
		 	if(response.data.length > 0) {
		 		$scope.isFollowing = true;
		 	} else {
		 		$scope.isFollowing = false;
		 	}
		 });

		 $http.get('/numFollowers?username=' + otherUsername).then(function (response) {
		 	$scope.numFollowers = response.data[0].numFollowers;
		 });
	}

	$scope.follow = function() {
		$http.get('/follow?currUser=' + currUsername + "&userToFollow=" + otherUsername)
		.then(function (response) {
			$scope.isFollowing = true;
		}, function (response) {
			console.log("Failed to follow: " + username);
		});
	}

	$scope.unfollow = function() {
		$http.get('/unfollow?currUser=' + currUsername + "&userToUnfollow=" + otherUsername)
		.then(function (response) {
			$scope.isFollowing = false;
		}, function (response) {
			console.log("Failed to follow: " + username);
		});
	}
	
	$scope.goToLink = function(question) {

        if(question.isPoll){
             $location.path('/poll/' + question.questionID);
        }
        else{
            $location.path('/rating/' + question.questionID);
        }

    };


}]);