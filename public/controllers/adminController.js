angular.module("KnowItAll").controller('adminCtrl', ['$scope', '$http', '$location', '$cookies',
                                     function($scope, $http, $location, $cookies) {

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

    var auth = false;
    var AdminErrorMessage = "You are not authenticated. Please retype your " + 
    "password to authenticate";

    $scope.adminData = {AdminErrorMessage : AdminErrorMessage, 
                auth, auth};

    $scope.input = {adminPassword : ""};

    $scope.authenticate = function() {
        console.log("password: " + $scope.input.adminPassword);
        console.log("username: " + $cookies.get('username'));
        $http.get('/user?username=' + $cookies.get('username')
            + '&password=' + hashCode($scope.input.adminPassword)).then(function (response) {
                console.log("response: ");
                console.log(response);
                if (response.data.length != 0 && $cookies.get("isAdmin")) {
                    $scope.adminData = {AdminErrorMessage : "You are authenticated", auth : true};
                } else {
                    $scope.adminData = {AdminErrorMessage : "You are not logged in as admin", auth : false};
                }
        });
    }

}]);