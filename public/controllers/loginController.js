angular.module("KnowItAll").controller('loginController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    
	

    console.log("logging from logincontroller");


    $scope.userQuery = function () {
    	console.log("In get query function, username: " + $scope.username);
    	console.log("in get query, function, passwrd: " + $scope.password);


		$http.get('/user?username=' + $scope.username + "&password=" + 
									  $scope.password).then(function (response) {
	    	console.log("user received");
	    	console.log(response.data);
	    	
	    	if(response.data.length == 0){
	    		$scope.errorMessage = "The username and password combination is incorrect."
	    	} else {
	    		$scope.userData = response.data[0];

	    		console.log(response.data);

	    		var username = $scope.userData.username;
	    		var password = $scope.userData.passwordHash;
	    		//var passwordHash = hashCode(password);
	    		//console.log("hashed pw: " + passwordHash);
	    		//console.log("username: " + username);


	    		//var hash = CryptoJS.SHA512("Message");
	    		//sconsole.log(hash);

	   //  		var myuser = [];
	   //  		password_(password).hash(function(error, hash) {
				// 	myuser.hash = hash;
				// 	console.log(myuser.hash); 
				// });



	    		$window.location.href = '../index.html';
	    	}




	    	


	    	
	    },
	    function (res) {
	    	console.log("user NOT received");
	    	$scope.errorMessage = "The username and password combination is incorrect."
	    });


		//$scope.errorMessage = "The username and password combination is incorrect."


    }



    
}]);


