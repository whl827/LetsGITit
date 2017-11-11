angular.module("KnowItAll").controller('AdminCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

    // $scope.isQuestionList = 1;

    $scope.searchButton = function(){
        var menu = document.querySelector(".drop-down-menu").value;
        switch(menu){
            case "Any Text":{
                $scope.queryQuestionsAnyText(); break;
            }
            case "Tags":{
                $scope.queryQuestions(); break;
            }
            case "User":{
                $scope.queryUsers(); break;
            }
        }
    }

    $scope.queryQuestionsAnyText = function () {

        $http.get('/searchQuestionsAnyText?tagQuery=' + $scope.query).then(function (response) {
            $scope.isQuestionList = 1;
            $scope.questionList = response.data;
        }, 
        function (res) {
            console.log("Question list NOT received");
        });
    }

    $scope.queryQuestions = function () {

        $http.get('/searchQuestions?tagQuery=' + $scope.query).then(function (response) {
            $scope.isQuestionList = 1;
            $scope.questionList = response.data;
        }, 
        function (res) {
            console.log("Question list NOT received");
        });
    }

    $scope.queryUsers = function () {
        $http.get('/searchUsers?userQuery=' + $scope.query).then(function (response) {
            $scope.isQuestionList = 2;
            $scope.userList = response.data;
        });
    }

    $scope.onloadFun = function() {
        $http.get('/onPageLoad').then(function (response) {
            $scope.isQuestionList = 1;
            $scope.questionList = response.data;
            //document.querySelector(".keywords").innerHTML = "Top 5 Popular Tags: ";
        },
        function (res) {
           
        });

        $http.get('/getTopTags').then(function (response) {


            var topTagsStr = "";
            for(var i=0; i<response.data.length; i++){
                topTagsStr = topTagsStr + response.data[i].tagStr;
                if(i<response.data.length-1){
                    topTagsStr += ", ";
                }
            }
            document.querySelector(".keywords").innerHTML = "Popular Tags: " + topTagsStr;
        },
        function (res) {

        });
    }

    $scope.goToLink = function(question) {

        if(question.isPoll){
             $location.path('/poll/' + question.questionID);
        }
        else{
            $location.path('/rating/' + question.questionID);
        }

    };

    $scope.goToUser = function(username) {
        $location.path('/userProfile/' + username);
    }



}]);