angular.module("KnowItAll").controller('FeedCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    $scope.submitQuery = function () {

    	console.log("In get query function, tagQuery: " + $scope.tagQuery);
		$http.get('/questionList?tagQuery=' + $scope.tagQuery).then(function (response) {
	    	console.log("Question list received");
	    	console.log(response.data);
	    	$scope.questionList = response.data;
	    }, 
	    function (res) {
	    	console.log("Question list NOT received");
	    });

    }
}]);