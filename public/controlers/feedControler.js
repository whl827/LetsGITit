function FeedControl($scope, $http) {

	$http.get('/feed')

	console.log("Hello World from feedContoler.js");
}