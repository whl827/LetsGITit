angular.module("KnowItAll").controller('CreatePollCtrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
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



		console.log("FIRST CURRENT USER ID: " + $cookies.get("userID"));
		console.log("FIRST CURRENT USER name: " + $cookies.get("username"));

		var validTitle = validate($scope.pollTitleInput); 
		var title = $scope.pollTitleInput; 
		console.log("title: " + title);
		console.log("validTitle: " + validTitle);

		//var validSubtitle = validate($scope.pollSubtitleInput); 
		var subtitle = $scope.pollSubtitleInput; 
		console.log("subtitle: " + subtitle);
		
		var description = $scope.pollDescriptionInput; 
		console.log("description: " + description);

		var validOption; 
	
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
		var tagArray = null;
		if(!(tag == undefined)){
			tagArray = tag.split(",");
		}
		console.log(tagArray);

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

		var userID = $cookies.get("userID");
		console.log("this is userID " + userID);
		//if($cookies.get("userID") === n)

		//typeof $cookies.get("userID") === 'undefined'
		if(userID == -1){
			console.log("user id is null");
			$scope.errorMessage = "Please login to create a poll.";
		}else if(!validTitle){
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

			$http.get('/insertPoll?title=' + title + 
				  "&subTitle=" + subtitle +
				  "&description=" + description +
				  "&optionArray[]=" + allOptions +
				  "&tag=" + tag +
				  "&userID=" + userID +
				  "&endDate=" + endDate +
				  "&tagArray[]=" + tagArray +
				  "&openForever=" + openForever
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