angular.module("KnowItAll").controller('FeedCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.isQuestionList = 1;

    $scope.queryQuestions = function () {

    	console.log("In get query Questions, tagQuery: " + $scope.query);
		$http.get('/searchQuestions?tagQuery=' + $scope.query).then(function (response) {
	    	console.log("Question list received");
	    	console.log(response.data);
	    	$scope.isQuestionList = 1;
	    	$scope.questionList = response.data;
	    }, 
	    function (res) {
	    	console.log("Question list NOT received");
	    });
    }

    $scope.queryUsers = function () {
    	console.log("In get query Users, uname: " + $scope.query);
    	$http.get('/searchUsers?userQuery=' + $scope.query).then(function (response) {
    		console.log("Users list received");
    		console.log(response.data);
    		$scope.isQuestionList = 0;
    		$scope.userList = response.data;
    	});
    }
}]);