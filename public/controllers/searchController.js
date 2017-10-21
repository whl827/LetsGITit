angular.module("KnowItAll").controller('searchResultCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

$http.get('/signupFunction?signupUsername=' + $scope.signupUsername + 
				  "&signupPassword=" + $scope.signupPassword +
				  "&signupEmail=" + $scope.signupEmail).then(function (response) {
	    	console.log("user received");
	    	//console.log(response.data);
	    	
	    	if(response.data.length == 0){
	    		console.log(response.data);
	    		console.log("user does not exist in database");

	    		//insert to the database
	    		//console.log(response.data);
	    		//var username = $scope.userData.username;
	    		//var password = $scope.userData.passwordHash;
	    		//$window.location.href = '../index.html
	    	} 
	    	else {
	    		//user exists already
	    		console.log(response.data);
	    		$scope.signupErrorMessage = "The username exists";	
	    	}
	    },
	    function (res) {
	    	console.log("user NOT received");
	    });

}]);