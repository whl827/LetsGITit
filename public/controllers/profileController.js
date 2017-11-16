angular.module("KnowItAll").controller('ProfileCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	var username = null;
	var loggedIn = true;

	var userID = $cookies.get("userID");

	// $scope.createProfilePic = function() {
	// 	console.log("ITS CALLED");
	// 	var picURL = document.querySelector("#pictureURL").value;
	// 	document.querySelector("#profile-pic").src = picURL;
	// }

	if ($cookies.get("username") != null && $cookies.get("username") != 'null') {
		$scope.loggedInMessage = "";
		username = $cookies.get("username");
		$scope.username = username
	} else {
		// $scope.loggedInMessage = "You must be logged in to access your profile";
		// loggedIn = false;
		// var image = document.getElementById("profile-pic");
		// image.style.display = "none";
		// var imageTextField = document.getElementById("pictureURL");
		// imageTextField.style.display = "none";
		// var imageButton = document.getElementById("imageButton");
		// imageButton.style.display = "none";
	}
	


	if (loggedIn) {
		var image = document.getElementById("profile-pic");
		image.style.display = "intial";
		var imageTextField = document.getElementById("pictureURL");
		imageTextField.style.display = "initial";
		// var imageButton = document.getElementById("imageButton");
		// imageButton.style.display = "initial";

		//console.log("You are logged in");

		// feed
		$http.get('/profile?username=' + username)
			.then(function (response) {
					$scope.questionList = response.data;
					return response.data; 
				}, function (response) {
					console.log("Failed to get current user, not logged in");
			}).then(function(response){ 
				var list = response;
                for(var i=0; i<list.length; i++){
                    var current = list[i]; 
                    // username
                    if(current.isAnonymous == 1) current.username = "anonymous";
                    else getUsername(current);
                    // end date
                    if (current.endDate == null) {
                        current.endDateDisplay = "Open Forever"; 
                    } else {
                        var date = new Date();
                        var finalCloseDate = new Date(current.endDate);
                        if (date < finalCloseDate) { 
                             current.endDateDisplay = "Open until " + convertDay(finalCloseDate) ; 
                        } else { 
                            current.endDateDisplay = "CLOSED"; 
                        }
                    }
                    // tags
                    getTags(current); 
                } // end of for loop
			}
		);

		$http.get('/numFollowers?username=' + username).then(function(response) {
			$scope.numFollowers = response.data[0].numFollowers;
		});

		// bio and imageURL
		$http.get('/getUserInfo?username=' + username).then(function(response) {
    		var bio = response.data[0].bio; 
    		if(bio) $scope.bio = bio; 
    
    		var imageURL = response.data[0].imageURL; 
    		if(imageURL) $scope.imageURL = imageURL;
    		else $scope.imageURL = "img/blankprofile.png";
		});

		function convertDay(endDate){
	        var month = endDate.getUTCMonth() + 1; 
	        var day = endDate.getUTCDate();
	        var year = endDate.getUTCFullYear();
	        newdate = month + "/" + day + "/" + year;
	        return newdate
	    }

	    function getUsername(current){
	        $http.get('/getUserName?userID=' + current.userID)
	            .then(function (response) {
	                    current.username = response.data[0].username;
	                }, function (response) {
	                    console.log("FAILED getting username");
	            }
	        );
	    }

	    function getTags(current){
	        $http.get('/getQuestionTags?questionID=' + current.questionID)
	            .then(function (response) {
	                    var tags = [];
	                    for(var i=0; i<response.data.length; i++){
	                        tags.push({
	                            tagStr: response.data[i].tagStr
	                        });
	                    }
	                    current.allTags = tags; 
	                }, function (response) {
	                    console.log("FAILED getting tags");
	            }
	        );
	    }
	}

	$scope.goToLink = function(question) {
		console.log("In go to link in ProfileCtrl");
        if(question.isPoll){
             $location.path('/poll/' + question.questionID);
        }
        else{
            $location.path('/rating/' + question.questionID);
        }
    };

    $scope.editProfile = function () { 
    	// update bio 
    	var newBio = $scope.updatedBioInput; 
    	if(newBio){
    		// check if new Bio wthin character limit
    		var len = newBio.toString().length; 
    		if(len > 100){
    			console.log("new bio has more than 100 characters");
    		} else {
    			document.getElementById("bio").innerHTML = newBio;
		    	$http.get('/updateBio?userID=' + userID + "&bio=" + newBio).then(function (response) {
		            }, function (response) { console.log("FAILED updateBio");}
			    );
    		}
    	}

    	var newImageURL = $scope.updatedImageURLInput; 
    	if(newImageURL){ 
    		document.querySelector("#profile-pic").src = newImageURL
	    	$http.get('/updateProfilePic?userID=' + userID + "&imageURL=" + newImageURL).then(function (response) {
	            }, function (response) { console.log("FAILED updateProfilePic");}
		    );
    	}
    }

}]);