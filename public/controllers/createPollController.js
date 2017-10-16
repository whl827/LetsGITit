angular.module("KnowItAll").controller('CreatePollCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("in create poll ctrl"); 

	function validate(input){
		if(input == null || input == ""){
			//alert("error"); 
			return false; 
		}
		return true; // success
	}


	$scope.createPoll = function () { // handle submit
		console.log("inside function ");

		var validTitle = validate($scope.pollTitleInput); 
		var title = $scope.pollTitleInput; 
		console.log("title: " + title);
		console.log("validTitle: " + validTitle);



		var validateOption1 = validate($scope.option1Input); 
		var validateOption2 = validate($scope.option2Input); 
		var validOption; 
		if(validateOption1 && validateOption2) validOption = true; 
		else validOption - false; 
		// TODO: Go through all 10 options and check if 2 out of any 10 is inputed to validate

		var option1 = $scope.option1Input; 
		console.log("option1: " + option1);
		var option2 = $scope.option2Input; 
		console.log("option2: " + option2);
		var option3 = $scope.option3Input; 
		console.log("option3: " + option3);
		var option4 = $scope.option4Input; 
		console.log("option4: " + option4);
		var option5 = $scope.option5Input; 
		console.log("option5: " + option5);
		var option6 = $scope.option6Input; 
		console.log("option6: " + option6);
		var option7 = $scope.option7Input; 
		console.log("option7: " + option7);
		var option8 = $scope.option8Input; 
		console.log("option8: " + option8);
		var option9 = $scope.option9Input; 
		console.log("option9: " + option9);
		var option10 = $scope.option10Input; 
		console.log("option10: " + option10);
		

		var validStartDate = validate($scope.startDateInput); 
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
		console.log("validStartDate: " + validStartDate);


		var enteredEndDate = validate($scope.endDateInput); 
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
		// TODO: Check if start date comes before end date


		var openForever = $scope.openForeverInput;
		console.log("openForever: " + openForever);

		var validEndDate; 
		if((!enteredEndDate && openForever) || (enteredEndDate && !openForever)){
			validEndDate = true; 
		} 
		else {
			validEndDate = false; 
		}
		





		var isAnonymous = $scope.isAnonymousInput;
		console.log("isAnonymous: " + isAnonymous);


		var tag = $scope.tagInput; 
		console.log("tag: " + tag);




	
		if(!validTitle){
			$scope.errorMessage = "Please provide a title for your survey.";
		} 
		else if (!validOption){ // option
			$scope.errorMessage = "Please provide at least two options for your poll.";
		} 
		else if (!validStartDate){
			$scope.errorMessage = "Please provide a start date for your poll.";
		} 
		else if (!validEndDate){
			if(!enteredEndDate && !openForever) { 
				$scope.errorMessage = "Please provide an end date for your poll.";
			}
			else if(enteredEndDate && openForever) {
				$scope.errorMessage = "Please only choose one end date for your poll.";
			}
		} 
		else { // allfields successfully filled in
			// Insert data into SQL
			

			


		}


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