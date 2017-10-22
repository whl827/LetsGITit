angular.module("KnowItAll").controller('CreateRateCtrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	console.log("in create rating ctrl"); 

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

	$scope.createRating = function () { // handle submit
		console.log("inside function ");
		var validTitle = validate($scope.ratingTitleInput); 
 		var title = $scope.ratingTitleInput; 
		console.log("title: " + title);
		console.log("validTitle: " + validTitle);

		var subtitle = $scope.pollSubtitleInput; 
		console.log("subtitle: " + subtitle);

		var validateDescription = validate($scope.descriptionInput); 
		var description = $scope.descriptionInput; 


		var enteredEndDate = validate($scope.endDateInput); 
		var dateStr_e = $scope.endDateInput; 

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

		// get cookies
		var userID = $cookies.get("userID");
		console.log("this is userID " + userID);


		if (userID == -1) {
			console.log("userID is -1!!");
			$scope.errorMessage = "Please login.";
		}
		else if(!validTitle){
			$scope.errorMessage = "Please provide a title for your rating.";
		} 
		else if (!validateDescription){ // option
			$scope.errorMessage = "Please provide description of your rating.";
		} 
		else if (!validEndDate){
			if(!enteredEndDate && !openForever) { 
				$scope.errorMessage = "Please provide an end date for your rating.";
			}
			else if(enteredEndDate && openForever) {
				$scope.errorMessage = "Please only choose one end date for your rating.";
			}
		} 
		else { // allfields successfully filled in
			// Insert data into SQL



			$http.get('/insertRating?title=' + title + 
				 "&subTitle=" + subtitle +
				  "&description=" + description +
				  "&userID=" + userID +
				  "&endDate=" + endDate
				  ).then(function (response) {
    		console.log("user received from creaitng rating!");
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
		    	console.log("user NOT received from creaing rating");
		    });



			
		}
 }

}]);