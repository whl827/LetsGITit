angular.module("KnowItAll").controller('RatingCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("in rate ctrl"); 

	function validate(input){
		if(input == null || input == ""){
			//alert("error"); 
			return false; 
		}
		return true; // success
	}

	$scope.Rating = function () { 
		console.log("inside rating function ");
		
		var validRate = validate($scope.rateInput); 

		var like = $scope.likeInput;
		var rate = $scope.rateInput;
		console.log("rate is" +rate);
		var isAnonymous = $scope.isAnonymousInput;
		console.log("isAnonymous: " + isAnonymous);

	}
	
}]);