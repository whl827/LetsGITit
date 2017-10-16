angular.module("KnowItAll").controller('CreatePollCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("in create poll ctrl"); 


	$scope.createPoll = function () { // handle submit
		console.log("inside function ");


		if($scope.pollTitleInput == undefined)

		var title = $scope.pollTitleInput; 
		console.log("title: " + title);


		var option1 = $scope.option1Input; 
		console.log("option1: " + option1);
		var option2 = $scope.option2Input; 
		console.log("option2: " + option2);
		var option3 = $scope.option3Input; 
		console.log("option3: " + option3);

		var dateStr_s = $scope.startDateInput; 
		var day_s   = new Intl.DateTimeFormat("en-GB", {day: "numeric"}).format(dateStr_s); 
		var month_s = new Intl.DateTimeFormat("en-GB", {month: "numeric"}).format(dateStr_s); 
		var year_s  = new Intl.DateTimeFormat("en-GB", {year: "numeric"}).format(dateStr_s); 
		var startDate = {
			day: day_s, 
			month: month_s, 
			year: year_s
		};
		console.log("startDate: " + startDate.day + " " + startDate.month + " " + startDate.year);


		var dateStr_e = $scope.endDateInput; 
		var day_e   = new Intl.DateTimeFormat("en-GB", {day: "numeric"}).format(dateStr_e); 
		var month_e = new Intl.DateTimeFormat("en-GB", {month: "numeric"}).format(dateStr_e); 
		var year_e  = new Intl.DateTimeFormat("en-GB", {year: "numeric"}).format(dateStr_e); 
		var endDate = {
			day: day_e, 
			month: month_e, 
			year: year_e
		};
		console.log("endDate: " + endDate.day + " " + endDate.month + " " + endDate.year);


		var isAnonymous = $scope.isAnonymousInput;
		console.log("isAnonymous: " + isAnonymous);


		var tag = $scope.tagInput; 
		console.log("tag: " + tag);


		



		// Insert into SQL


		// $http.get('/questionList?tagQuery=' + $scope.tagQuery).then(function (response) {
	 //    	console.log("Question list received");
	 //    	console.log(response.data);
	 //    	$scope.questionList = response.data;
	 //    }, 
	 //    function (res) {
	 //    	console.log("error");
	 //    });
	}

}]);