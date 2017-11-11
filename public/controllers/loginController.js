angular.module("KnowItAll").controller('loginController', ['$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {

    hashCode = function(str) {
	  var hash = 0, i, chr;
	  if (str.length === 0) return hash;
	  for (i = 0; i < str.length; i++) {
	    chr   = str.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; // Convert to 32bit integer
	  }
	  return hash;
	};

    $scope.userQuery = function () {

    	var password = hashCode($scope.password);
    	var newUsername = null;
    	var newUserID = -1;

		$http.get('/user?username=' + $scope.username + "&password=" + 
									  password).then(function (response) {
	    	
	    	if(response.data.length == 0){
	    		$scope.errorMessage = "The username and password combination is incorrect."
	    	} else {
	    		$scope.userData = response.data;
	    		newUsername = "" + response.data[0].username;
	    		newUserID = response.data[0].userID;
                isAdmin = response.data[0].isAdmin;

				$cookies.put('username', newUsername);
			    $cookies.put('userID', newUserID);
                $cookies.put('isAdmin', isAdmin);
			    // $scope.errorMessage = "Successfully logged in";
			    //redirect to home page
			    $window.location.replace("../index.html");
	    	}
	    },
	    function (res) {
	    	$scope.errorMessage = "The username and password combination is incorrect."
	    });
    }

    $scope.logout = function () {
    	// var currUsername = $cookies.get('username');
    	// var currUserID = $cookies.get('userID');
    	$cookies.put("username", null);
    	$cookies.put("userID", -1);
    	
    	// if (currUsername === undefined || currUserID == undefined) {
    	// 	$scope.errorMessage = "You were not logged in origonally";
    	// } else if (currUsername == null || currUserID == -1) {
    	// 	$scope.errorMessage = "You were not logged in origonally";
    	// }
    	// else {
    	// 	$scope.errorMessage = "You have logged out";
    	// }
    }

    $scope.userIsLoggedIn = function(){
    	if($cookies.get('userID') != -1 && $cookies.get('userID') != undefined){
    		$scope.username = $cookies.get('username');
    		return true;
    	}
    	return false;
    }

    $scope.userIsAdmin = function() {
        if ($cookies.get('isAdmin') != undefined && $cookies.get('isAdmin') == 1) {
            return true;
        }
        return false;
    }


    
}]).
directive('ngConfirmClick', [
function(){
    return {
        link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || "Are you sure?";
            var clickAction = attr.confirmedClick;
            element.bind('click',function (event) {
                if ( window.confirm(msg) ) {
                    scope.$eval(clickAction)
                }
            });
        }
    };
}]);