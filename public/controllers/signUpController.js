angular.module("KnowItAll").controller('signUpController', ['$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {
    
    $scope.signupFunction = function () {
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

	    	if(response.data.length == 0){

	    		$cookies.put("newUsername", username);
	    		$cookies.put("newPasswordHash", passwordHash);	
	    		$cookies.put("newEmail", signupEmail);

	    		$http.get("/sendEmail?newUsername=" + username + 
	    			"&newPasswordHash=" + passwordHash +
	    			"&newEmail=" + signupEmail).then(function (response) {
	    				$scope.signupErrorMessage = "Email sent";
	    			}, 
	    			function (response) {
	    				$scope.signupErrorMessage = "Failed to send email, invalid address";
	    			}
	    		);

	    	} 
	    	else {
	    		//user exists already
	    		$scope.signupErrorMessage = "This username already exists";	
	    	}
	    },
	    function (res) {
	    	console.log("user NOT received");
	    });
 
    }
}]);