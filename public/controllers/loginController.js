angular.module("KnowItAll").controller('loginController', ['$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {

    console.log("logging from logincontroller");

    hashCode = function(str) {
	  var hash = 0, i, chr;
	  if (str.length === 0) return hash;
	  for (i = 0; i < str.length; i++) {
	    chr   = str.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; // Convert to 32bit integer
	  }
	  return hash;
	};

    $scope.userQuery = function () {
    	console.log('In user query');

    	var password = hashCode($scope.password);
    	console.log("QUERY: " + '/user?username=' + $scope.username + "&password=" + 
									  password);

    	var newUsername = null;
    	var newUserID = -1;

		$http.get('/user?username=' + $scope.username + "&password=" + 
									  password).then(function (response) {
	    	console.log("RESPONSE");
	    	console.log(response);
	    	console.log("Length: " + response.data.length);
	    	
	    	if(response.data.length == 0){
	    		$scope.errorMessage = "The username and password combination is incorrect."
	    		console.log("NOT logged in!");
	    	} else {
	    		console.log("Is logged in and setting cookies");
	    		$scope.userData = response.data;
	    		console.log("user data");
	    		console.log(response.data);
	    		newUsername = "" + response.data[0].username;
	    		newUserID = response.data[0].userID;

				console.log("Setting cookies to : " + newUsername + ", " + newUserID);
				$cookies.put('username', newUsername);
			    $cookies.put('userID', newUserID);
	    		//$window.location.href = '../index.html';
	    	}
	    },
	    function (res) {
	    	console.log("user NOT received");
	    	$scope.errorMessage = "The username and password combination is incorrect."
	    });
    }

    $scope.logout = function () {
    	var currUsername = $cookies.get('username');
    	var currUserID = $cookies.get('userID');
    	$cookies.put("username", null);
    	$cookies.put("userID", -1);
    	console.log("curr Username: " + currUsername);
    	if (currUsername === undefined || currUserID == undefined) {
    		$scope.errorMessage = "You were not logged in origonally";
    	} else if (currUsername == null || currUserID == -1) {
    		$scope.errorMessage = "You were not logged in origonally";
    	}
    	else {
    		console.log("The user has logged out");
    		$scope.errorMessage = "You have logged out";
    	}
    }
    
}]);