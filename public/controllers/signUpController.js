angular.module("KnowItAll").controller('signUpController', ['$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {
    
    console.log("logging from signup controller");

    $scope.signupFunction = function () {
    	console.log("In get query function, username: " + $scope.signupUsername);
    	console.log("in get query, function, passwrd: " + $scope.signupPassword);
    	var passwordHash = hashCode($scope.signupPassword);
    	var username = $scope.signupUsername;
    	var signupEmail = $scope.signupEmail;

    	var splitName = signupEmail.split("@");
    	if(splitName[1] != "usc.edu"){
    		$scope.signupErrorMessage = "Please use a usc.edu domain";
    		return; 
    	}
    
		$http.get('/signupFunction?signupUsername=' + username + 
				  "&signupPassword=" + passwordHash +
				  "&signupEmail=" + signupEmail).then(function (response) {
	    	console.log("user received");
	    	//console.log(response.data);
	    	
	    	if(response.data.length == 0){
	    		console.log(response.data);
	    		console.log("user does not exist in database");

	    		$cookies.put("newUsername", username);
	    		$cookies.put("newPasswordHash", passwordHash);	

	    		console.log("Sending Email");

	    		$http.get("/sendEmail?newUsername=" + username + 
	    			"&newPasswordHash=" + passwordHash +
	    			"&newEmail=" + signupEmail).then(function (response) {
	    				$scope.signupErrorMessage = "Email sent";
	    			}, 
	    			function (response) {
	    				console.log("Failed to send email");
	    				$scope.signupErrorMessage = "Failed to send email, invalid address";
	    			}
	    		);

	    	} 
	    	else {
	    		//user exists already
	    		console.log(response.data);
	    		$scope.signupErrorMessage = "This username already exists";	
	    	}
	    },
	    function (res) {
	    	console.log("user NOT received");
	    });
 
    }
}]);