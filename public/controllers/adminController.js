angular.module("KnowItAll").controller('adminCtrl', ['$scope', '$http', '$location', '$cookies', '$routeParams',
                                     function($scope, $http, $location, $cookies, $routeParams) {

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
    $scope.flagged = {questionList : []};

    $scope.authenticate = function() {
        $http.get('/user?username=' + $cookies.get('username')
            + '&password=' + hashCode($scope.input.adminPassword)).then(function (response) {
                if (response.data.length != 0 && $cookies.get("isAdmin")) {
                    $scope.adminData = {AdminErrorMessage : "You are authenticated", auth : true};
                } else {
                    $scope.adminData = {AdminErrorMessage : "You are not logged in as admin", auth : false};
                }
        });
    }

    $scope.loadFlagged = function() {
        $http.get('/getFlaggedQuestions').then(function (response) {
          console.log("Question list is of size: " + response.data.length);
          $scope.flagged.questionList = response.data;
        });
    }

}]);