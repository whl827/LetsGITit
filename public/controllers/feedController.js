var myApp = angular.module('myApp', []);
myApp.controller('FeedCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    $http.get('/questionList').then(function (response) {
    	console.log("Question list received");
    	console.log(response);
    	$scope.questionList = response.data;
    }, 
    function (res) {
    	console.log("Question list NOT received");
    });
}]);