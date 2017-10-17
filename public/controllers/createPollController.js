angular.module("KnowItAll").controller('CreatePollCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("in create poll ctrl"); 

	function validate(input){
		if(input == null || input == ""){
			//alert("error"); 
			return false; 
		}
		return true; // success
	}

	function twoDigits(d) {
	    if(0 <= d && d < 10) return "0" + d.toString();
	    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
	    return d.toString();
	}

	Date.prototype.toMysqlFormat = function() {
    	return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
	};


	$scope.createPoll = function () { // handle submit
		console.log("inside function ");

		var validTitle = validate($scope.pollTitleInput); 
		var title = $scope.pollTitleInput; 
		console.log("title: " + title);
		console.log("validTitle: " + validTitle);

		//var validSubtitle = validate($scope.pollSubtitleInput); 
		var subtitle = $scope.pollSubtitleInput; 
		console.log("subtitle: " + subtitle);
		//console.log("validSubtitle: " + validSubtitle);

		//var validDescription = validate($scope.pollDescriptionInput); 
		var description = $scope.pollDescriptionInput; 
		console.log("description: " + description);
		//console.log("validDescription: " + validDescription);



		//var validateOption1 = validate($scope.option1Input); 
		//var validateOption2 = validate($scope.option2Input); 
		var validOption; 
		//if(validateOption1 && validateOption2) validOption = true; 
		//else validOption = false; 
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




		


		// var validStartDate = validate($scope.startDateInput); 
		// var dateStr_s = $scope.startDateInput; 
		// console.log(dateStr_s); 
		// var startDate = new Date(dateStr_s).toMysqlFormat();
		// console.log(startDate); 



		// var str = datepicker.formatDate('yy-mm-dd', d);
		// console.log(str); 


		// var day_s   = new Intl.DateTimeFormat("en-GB", {day: "numeric"}).format(dateStr_s); 
		// var month_s = new Intl.DateTimeFormat("en-GB", {month: "numeric"}).format(dateStr_s); 
		// var year_s  = new Intl.DateTimeFormat("en-GB", {year: "numeric"}).format(dateStr_s); 
		// var startDate = {
		// 	day: day_s, 
		// 	month: month_s, 
		// 	year: year_s
		// };
		// console.log("startDate: " + startDate.day + " " + startDate.month + " " + startDate.year);
		// console.log("validStartDate: " + validStartDate);


		var enteredEndDate = validate($scope.endDateInput); 
		var dateStr_e = $scope.endDateInput; 
		console.log(dateStr_e);

		var endDate = new Date(dateStr_e).toMysqlFormat();
		console.log(endDate); 






		// var day_e   = new Intl.DateTimeFormat("en-GB", {day: "numeric"}).format(dateStr_e); 
		// var month_e = new Intl.DateTimeFormat("en-GB", {month: "numeric"}).format(dateStr_e); 
		// var year_e  = new Intl.DateTimeFormat("en-GB", {year: "numeric"}).format(dateStr_e); 
		// var endDate = {
		// 	day: day_e, 
		// 	month: month_e, 
		// 	year: year_e
		// };
		// console.log("endDate: " + endDate.day + " " + endDate.month + " " + endDate.year);
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


		var allOptions = []; 
		if(option1 != null && option1 != "") allOptions.push(option1);
		if(option2 != null && option2 != "") allOptions.push(option2);
		if(option3 != null && option3 != "") allOptions.push(option3);
		if(option4 != null && option4 != "") allOptions.push(option4);
		if(option5 != null && option5 != "") allOptions.push(option5);
		if(option6 != null && option6 != "") allOptions.push(option6);
		if(option7 != null && option7 != "") allOptions.push(option7);
		if(option8 != null && option8 != "") allOptions.push(option8);
		if(option9 != null && option9 != "") allOptions.push(option9);
		if(option10 != null && option10 != "") allOptions.push(option10);

		var allOptionsLen = allOptions.length; 
		var validOption = true; 
		if(allOptionsLen<2){
			validOption = false; 
		}





	
		if(!validTitle){
			$scope.errorMessage = "Please provide a title for your survey.";
		} 
		else if (!validOption){ // option
			$scope.errorMessage = "Please provide at least two options for your poll.";
		} 
		// else if (!validStartDate){
		// 	$scope.errorMessage = "Please provide a start date for your poll.";
		// } 
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

			//var arr = ["asdsa", "asdas", "ssad"];






			// var allOptions = {
			// 	opt1:"Fiat", 
			// 	opt2:"500", 
			// 	opt3:"white"
			// };


			$http.get('/insertPoll?title=' + title + 
				  "&subTitle=" + subtitle +
				  "&description=" + description +
				  "&randomArray[]=" + allOptions +
				  "&option1Input=" + option1
				  ).then(function (response) {
	    		console.log("user received from creaitng poll!");
	    	//console.log(response.data);
	    	
	    	if(response.data.length == 0){
	    		console.log(response.data);
	    		console.log("response = 0");

	    		//insert to the database
	    		//console.log(response.data);
	    		//var username = $scope.userData.username;
	    		//var password = $scope.userData.passwordHash;
	    		//$window.location.href = '../index.html
	    	} 
	    	else {
	    		//user exists already
	    		console.log("this is what we want");
	    		console.log(response.data);
	    	}
		    },
		    function (res) {
		    	console.log("user NOT received from creaing poll");
		    });

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