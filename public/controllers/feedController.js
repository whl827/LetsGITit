angular.module("KnowItAll").controller('FeedCtrl', ['$scope', '$http', function($scope, $http) {

    // $scope.isQuestionList = 1;

    $scope.searchButton = function(){
        var menu = document.querySelector(".drop-down-menu").value;
        switch(menu){
            case "Tags":{
                $scope.queryQuestions(); break;
            }
            case "User":{
                $scope.queryUsers(); break;
            }
        }
    }

    $scope.queryQuestions = function () {

        console.log("In get query Questions, tagQuery: " + $scope.query);
        $http.get('/searchQuestions?tagQuery=' + $scope.query).then(function (response) {
            console.log("Question list received");
            console.log(response.data);
            $scope.isQuestionList = 1;
            $scope.questionList = response.data;
        }, 
        function (res) {
            console.log("Question list NOT received");
        });
    }

    $scope.queryUsers = function () {
        console.log("In get query Users, uname: " + $scope.query);
        $http.get('/searchUsers?userQuery=' + $scope.query).then(function (response) {
            console.log("Users list received");
            console.log(response.data);
            $scope.isQuestionList = 2;
            $scope.userList = response.data;
        });
    }

    $scope.onloadFun = function() {
        console.log("THIS FUNCTION IS CALLED ONPAGELOAD");
        $http.get('/onPageLoad').then(function (response) {
                // $window.location.href = '../index.html';
            $scope.isQuestionList = 1;
            $scope.questionList = response.data;
        },
        function (res) {
           
        });
    }

}]);