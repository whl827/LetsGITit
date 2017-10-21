angular.module("KnowItAll").controller('PollCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("in  poll ctrl"); 

	function validate(input){
		if(input == null || input == ""){
			//alert("error"); 
			return false; 
		}
		return true; // success
	}

	$scope.poll = function () { 
		console.log("inside rating function ");
		
		var validRate = validate($scope.pollInput); 
		var like = $scope.likeInput;
		// var rate = $scope.rateInput;
		// console.log("rate is" +rate);
		var isAnonymous = $scope.isAnonymousInput;
		console.log("isAnonymous: " + isAnonymous);

	}
	
}]);