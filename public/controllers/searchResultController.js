angular.module("KnowItAll").controller('searchResultCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    
    console.log("logging from search result controller");

    $scope.searchResult = function () {
    	var searchInput = $scope.searchInput;
    	// with sesarch Input, need to direct to 
    	//either poll or rating. 
    	//depends on type. 
    }
}]);


