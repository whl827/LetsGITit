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
		 		$scope.isFollowing = {bool : true, string : "UNFOLLOW"};
		 	} else {
		 		$scope.isFollowing = {bool : false, string : "FOLLOW"};
		 	}
		 });

		 $http.get('/numFollowers?username=' + otherUsername).then(function (response) {
		 	$scope.numFollowers = {num : response.data[0].numFollowers};
		 });
	}
	
	$scope.toggleFollow = function() {
		if ($scope.isFollowing.bool) {
			$http.get('/unfollow?currUser=' + currUsername + "&userToUnfollow=" + otherUsername);
			$scope.isFollowing = {bool : false, string : "FOLLOW"};
			$scope.numFollowers = {num : $scope.numFollowers.num - 1};
			console.log($scope.numFollowers.num);
		} else {
			$http.get('/follow?currUser=' + currUsername + "&userToFollow=" + otherUsername);
			$scope.isFollowing = {bool : true, string : "UNFOLLOW"};
			$scope.numFollowers = {num : $scope.numFollowers.num + 1};
			console.log($scope.numFollowers.num);
		}
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