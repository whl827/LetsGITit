angular.module("KnowItAll").controller('CreateRateCtrl', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window) {

	$scope.minDate = new Date();
	$scope.minDate.setDate($scope.minDate.getDate() + 1);

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
    	return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + 
    			twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":"
    			twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
	};

	var imageUploadURL = null;

	$scope.preview = function(){

		var imageURL = document.querySelector("#image_input").value;
		var image = document.querySelector("#question_image");

		// var imageUrl = 'http://www.google.com/images/srpr/nav_logo14.png';
		// imageExists(imageUrl, function(exists) {
		//   console.log('RESULT: url=' + imageUrl + ', exists=' + exists);
		// });

		//check if it's a image url
		if(checkURL(imageURL)){

			if(imageURL.length > 2000){
				imageUploadURL = null;
				console.log("IMAGE URL IS TOO LONG");
				return;
			};

			image.onerror = function() {
				this.onerror = function(){
					return;
				}
				image.src = "";
				image.style.display = "none";
				imageUploadURL = null;
				console.log("ERROR LOADING IMAGE: HIDE IMAGE");

			};
			image.onload = function(){
				this.onload = function(){
					return;
				}
				image.style.display = "inline";
				imageUploadURL = imageURL;
				console.log("VALID IMAGE: IMAGE LOADED");
			}
			image.src = imageURL;
		}else{ //if not, hide
			console.log("NOT IMAGE URL: HIDE IMAGE");
			image.src = "";
			image.style.display = "none";
			imageUploadURL = null;
		}
	}
	//check the type of url
	function checkURL(url) {
	    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
	}




	$scope.createRating = function () { // handle submit
		var validTitle = validate($scope.ratingTitleInput); 
 		var title = $scope.ratingTitleInput; 
		var subtitle = $scope.pollSubtitleInput; 
		var validateDescription = validate($scope.descriptionInput); 
		var description = $scope.descriptionInput; 
		


		console.log("FIRST ENDDATE: " + $scope.endDateInput);
		if($scope.endDateInput == undefined){
			console.log("UNCLICKED DATE IS UNDEFINED");
		}

		var enteredEndDate = validate($scope.endDateInput); 


		var endDate = null;
		if($scope.endDateInput != null && $scope.endDateInput != undefined){
			console.log("NOT NULL OR NOT UNDEFINED");
			endDate = new Date($scope.endDateInput).toMysqlFormat();
			console.log("CONVERTED ENDDATE: " + endDate);
		}
		console.log("FINAL ENDDATE: " + endDate);

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

		// get cookies
		var userID = $cookies.get("userID");

		if (userID == -1 || userID == undefined) {
			$scope.errorMessage = "Please login to create a rating.";
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


			//check if title exsits
			$http.get('/checkExistingTitle?title='+title
				).then(function (response){
			    	if(response.data.length != 0){
			    		console.log("TITLE EXISTS");
			    		$scope.errorMessage = "Title already exists. Please choose another one.";
			    		return;
			    	}

			    	else{

			    		if(endDate == null)

			    		{
		    				// Insert data into SQL
							$http.get('/insertRatingWithoutEndDate?title=' + title + 
								 "&subTitle=" + subtitle +
								  "&description=" + description +
								  "&userID=" + userID +
								  "&endDate=" + endDate +
								  "&isAnonymous=" + isAnonymous +
								  "&tagArray[]=" + tagArray +
								  "&image=" + imageUploadURL
								  ).then(function (response) {
					    	//$window.location.href = '../index.html';
					    	$window.location.replace("../index.html");
					    	
					    	if(response.data.length == 0){
					    		console.log("response = 0");
					    	} 
					    	else {
					    		console.log(response.data);
					    	}
						    },
						    function (res) {
						    	console.log("user NOT received from creating rating");
						    });

			    		}

			    		else

			    		{
			    			// Insert data into SQL
							$http.get('/insertRating?title=' + title + 
								 "&subTitle=" + subtitle +
								  "&description=" + description +
								  "&userID=" + userID +
								  "&endDate=" + endDate +
								  "&isAnonymous=" + isAnonymous +
								  "&tagArray[]=" + tagArray +
								  "&image=" + imageUploadURL
								  ).then(function (response) {
					    	$window.location.href = '../index.html';
					    	
					    	if(response.data.length == 0){
					    		console.log("response = 0");
					    	} 
					    	else {
					    		console.log(response.data);
					    	}
						    },
						    function (res) {
						    	console.log("user NOT received from creating rating");
						    });

			    		}
						
			    	}
			    },
			    function (res) {
			    	console.log("did not recevie from check exsitn title");
		   		});
		}
 	}
}]);