//inital list all the questions
angular.module("KnowItAll").controller('pageLoadAppController', ["$scope", "$http", function($http, $scope) {
    
    $scope.onloadFun = function() {
    	console.log("THIS FUNCTION IS CALLED ONPAGELOAD");
        $http.get('/onPageLoad').then(function (response) {
	    		// $window.location.href = '../index.html';
	    		    	
	    },
    	function (res) {
			console.log("user NOT received");
    		$scope.errorMessage = "The username and password combination is incorrect."
	    });
  	}
}]);