angular.module("KnowItAll").controller('CreatePollCtrl', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window) {
	$scope.minDate = new Date();

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
		var validTitle = validate($scope.pollTitleInput); 
		var title = $scope.pollTitleInput; 

		//var validSubtitle = validate($scope.pollSubtitleInput); 
		var subtitle = $scope.pollSubtitleInput; 
		
		var description = $scope.pollDescriptionInput; 

		var validOption; 
	
		// TODO: Go through all 10 options and check if 2 out of any 10 is inputed to validate
		var option1 = $scope.option1Input; 
		var option2 = $scope.option2Input; 
		var option3 = $scope.option3Input; 
		var option4 = $scope.option4Input; 
		var option5 = $scope.option5Input; 
		var option6 = $scope.option6Input; 
		var option7 = $scope.option7Input; 
		var option8 = $scope.option8Input; 
		var option9 = $scope.option9Input; 
		var option10 = $scope.option10Input; 

		var enteredEndDate = validate($scope.endDateInput); 
		var dateStr_e = $scope.endDateInput; 

		var endDate = new Date(dateStr_e).toMysqlFormat();

		var openForever = $scope.openForeverInput;

		var validEndDate; 
		if((!enteredEndDate && openForever) || (enteredEndDate && !openForever)){
			validEndDate = true; 
		} 
		else {
			validEndDate = false; 
		}

		var isAnonymous = false
		if($scope.isAnonymousInput == true){
			isAnonymous = true;
		}

		var tag = $scope.tagInput; 
		var tagArray = null;
		if(!(tag == undefined)){
			tagArray = tag.split(",");
		}

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

		//typeof $cookies.get("userID") === 'undefined'
		if(userID == -1 || userID == undefined){
			$scope.errorMessage = "Please login to create a poll.";
		}else if(!validTitle){
			$scope.errorMessage = "Please provide a title for your survey.";
		} 
		else if (!validOption){ // option
			$scope.errorMessage = "Please provide at least two options for your poll.";
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
			$http.get('/insertPoll?title=' + title + 
				  "&subTitle=" + subtitle +
				  "&description=" + description +
				  "&optionArray[]=" + allOptions +
				  "&tag=" + tag +
				  "&userID=" + userID +
				  "&endDate=" + endDate +
				  "&tagArray[]=" + tagArray +
				  "&openForever=" + openForever +
				  "&isAnonymous=" + isAnonymous
				  ).then(function (response) {

	    	//redirect after creating poll
	    	$window.location.href = '../index.html';
	    	
	    	if(response.data.length == 0){
	    		console.log("response = 0");
	    	} 
	    	else {
	    		console.log(response.data);
	    	}
		    },
		    function (res) {
		    	console.log("user NOT received from creating poll");
		    });
		}
	}
}]);