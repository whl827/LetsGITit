angular.module("KnowItAll").controller('otherUserProfile', ['$scope', '$http', '$cookies', '$routeParams', '$location', function($scope, $http, $cookies, $routeParams, $location) {

	var otherUsername = $routeParams.username.replace(":", "");
	var currUsername = $cookies.get("username");

	var isLoggedIn = currUsername != "null"; // Because javascript is werid

	var isDeactivated = true;

	$http.get('/findUser?username=' + otherUsername)
	.then(function (response) {
		isDeactivated = response.data[0].deactivated;
		console.log("isDeactivated: " + isDeactivated);

		$scope.errorSignal = 0;

		if (isDeactivated) {
			$scope.errorSignal = 2;
		}
		if (!isLoggedIn) {
			$scope.errorSignal = 1;
		}
	});

	$scope.otherUsername = otherUsername
	$scope.isAdmin = $cookies.get("isAdmin");

	if (isLoggedIn) {

		// feed
		$http.get('/profile?username=' + otherUsername)
			.then(function (response) {
					$scope.questionList = response.data;
					return response.data; 
				}, function (response) {
					console.log("Failed to get current user, not logged in");
			}).then(function(response){ 
				var list = response;
                for(var i=0; i<list.length; i++){
                    var current = list[i]; 
                    // username
                    if(current.isAnonymous == 1) current.username = "anonymous";
                    else getUsername(current);
                    // end date
                    if (current.endDate == null) {
                        current.endDateDisplay = "Open Forever"; 
                    } else {
                        var date = new Date();
                        var finalCloseDate = new Date(current.endDate);
                        if (date < finalCloseDate) { 
                             current.endDateDisplay = "Open until " + convertDay(finalCloseDate) ; 
                        } else { 
                            current.endDateDisplay = "CLOSED"; 
                        }
                    }
                    // tags
                    getTags(current); 
                } // end of for loop
			}
		);

		// bio and imageURL
		$http.get('/getUserInfo?username=' + otherUsername).then(function(response) {
    		var bio = response.data[0].bio; 
    		if(bio) $scope.bio = bio; 
    
    		var imageURL = response.data[0].imageURL; 
    		if(imageURL) $scope.imageURL = imageURL;
    		else $scope.imageURL = "img/blankprofile.png";
		});

		function convertDay(endDate){
	        var month = endDate.getUTCMonth() + 1; 
	        var day = endDate.getUTCDate();
	        var year = endDate.getUTCFullYear();
	        newdate = month + "/" + day + "/" + year;
	        return newdate
	    }

	    function getUsername(current){
	        $http.get('/getUserName?userID=' + current.userID)
	            .then(function (response) {
	                    current.username = response.data[0].username;
	                }, function (response) {
	                    console.log("FAILED getting username");
	            }
	        );
	    }

	    $scope.deactivateAccount = function () {

	    	var otherUsername = $routeParams.username.replace(":", "");

	    	var deactivated = true;

	    	console.log("username: " + otherUsername);

	    	$http.get('/findUser?username=' + otherUsername)
	    		.then(function (response) {
	    			var userID = response.data[0].userID;

	    			console.log("Found user");
	    			console.log("User id: " + userID);

			    	$http.get('/deactivateUser?deactivated=' + deactivated + '&userID=' + userID + "&username=" + otherUsername)
			    		.then(function (response) {
			    		}
			    	);
			    	$http.get('/deactivateQuestions?userID=' + userID)
			    		.then(function (response) {
			    		}
			    	);
			    	$http.get('/deactivateComments?userID=' + userID)
			    		.then(function (response) {
			    		}
			    	);
	    		});

	        // After redirected to login page and after it loads, display a modal for the user with a message
			// $(document).ready(function () {
			//     $("#deactivateLoginModal").modal('show');
			// });
	    }

	    function getTags(current){
	        $http.get('/getQuestionTags?questionID=' + current.questionID)
	            .then(function (response) {
	                    var tags = [];
	                    for(var i=0; i<response.data.length; i++){
	                        tags.push({
	                            tagStr: response.data[i].tagStr
	                        });
	                    }
	                    current.allTags = tags; 
	                }, function (response) {
	                    console.log("FAILED getting tags");
	            }
	        );
	    }

		$http.get('/isFollowing?user1=' + currUsername +
		 "&user2=" + otherUsername).then(function (response) {
		 	if(response.data.length > 0) {
		 		$scope.isFollowing = {bool : true, string : "UNFOLLOW"};
		 	} else {
		 		$scope.isFollowing = {bool : false, string : "FOLLOW"};
		 	}
		 });

		 $http.get('/numFollowers?username=' + otherUsername).then(function (response) {
		 	$scope.userStats = {numFollowers : response.data[0].numFollowers, numFollowing : response.data[0].numFollowing};
		 });
	}
	
	$scope.toggleFollow = function() {
		var otherUsername = $routeParams.username.replace(":", "");


		if ($scope.isFollowing.bool) {
			$http.get('/unfollow?currUser=' + currUsername + "&userToUnfollow=" + otherUsername);
			$http.get('/notifyFollowing?currUser=' + currUsername + '&userToNotify=' + otherUsername + '&action=unfollow');
			$scope.isFollowing = {bool : false, string : "FOLLOW"};
			$scope.userStats.numFollowers = $scope.userStats.numFollowers - 1;
			console.log($scope.numFollowers.num);
		} else {
			$http.get('/follow?currUser=' + currUsername + "&userToFollow=" + otherUsername);
			$http.get('/notifyFollowing?currUser=' + currUsername + '&userToNotify=' + otherUsername + '&action=follow');
			$scope.isFollowing = {bool : true, string : "UNFOLLOW"};
			$scope.userStats.numFollowers = $scope.userStats.numFollowers + 1;
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