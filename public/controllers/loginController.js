angular.module("KnowItAll").controller('loginController', ['$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {

    console.log("logging from logincontroller");


    $scope.userQuery = function () {
    	var password = $scope.password.hashCode();
    	console.log("password hash: " + password);

		$http.get('/user?username=' + $scope.username + "&password=" + 
									  password).then(function (response) {
	    	console.log("user received");
	    	console.log(response.data);
	    	
	    	if(response.data.length == 0){
	    		$scope.errorMessage = "The username and password combination is incorrect."
	    		console.log(response.data[0]);
	    	} else {
	    		console.log("before setting cookies");
	    		$scope.userData = response.data[0];
	    		console.log("user data");
	    		console.log(response.data[0]);
	    		console.log("PASSWORD HASH IS: " + response.data[0].passwordHash);
	    		$cookies.put('username', response.data[0].username);
	    		$cookies.put('userID', response.data[0].userID);

	    		$window.location.href = '../index.html';
	    	}	    	
	    },
	    function (res) {
	    	console.log("user NOT received");
	    	$scope.errorMessage = "The username and password combination is incorrect."
	    });

		//$scope.errorMessage = "The username and password combination is incorrect."
    }

    $scope.logout = function () {
    	var currUsername = $cookies.get('username');
    	var currUserID = $cookies.get('userID');
    	$cookies.put("username", null);
    	$cookies.put("userID", -1);
    	console.log("curr Username: " + currUsername);
    	if (currUsername === undefined || currUserID == undefined) {
    		$scope.errorMessage = "You were not logged in origonally";
    	}
    	else {
    		console.log("The user has logged out");
    		$scope.errorMessage = "You have logged out";
    	}
    }
    
}]);