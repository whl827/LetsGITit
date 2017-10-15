var myApp = angular.module('myApp', []);
myApp.controller('FeedCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    $scope.submitQuery = function () {

    	console.log("In get query function");
		$http.get('/questionList?query=' + $scope.query).then(function (response) {
	    	console.log("Question list received");
	    	console.log(response);
	    	$scope.questionList = response.data;
	    }, 
	    function (res) {
	    	console.log("Question list NOT received");
	    });

    }

    
}]);