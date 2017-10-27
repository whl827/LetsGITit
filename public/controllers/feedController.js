angular.module("KnowItAll").controller('FeedCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

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

        console.log("In get query Questions Any Text, tagQuery: " + $scope.query);
        $http.get('/searchQuestionsAnyText?tagQuery=' + $scope.query).then(function (response) {
            console.log("Question list received");
            console.log(response.data);
            $scope.isQuestionList = 1;
            $scope.questionList = response.data;
        }, 
        function (res) {
            console.log("Question list NOT received");
        });
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
            document.querySelector(".keywords").innerHTML = "Top 5 Popular Tags: ";
        },
        function (res) {
           
        });

        $http.get('/getTopTags').then(function (response) {

            console.log(response.data[0]);

            var topTagsStr = "";
            for(var i=0; i<response.data.length; i++){
                topTagsStr = topTagsStr + response.data[i].tagStr;
                if(i<response.data.length-1){
                    topTagsStr += ", ";
                }
                console.log(response.data[i].tagStr);
            }
            console.log(topTagsStr);
            document.querySelector(".keywords").innerHTML = "Popular Tags: " + topTagsStr;
        },
        function (res) {

        });
    }

    $scope.goToLink = function(question) {

        console.log("In feed controller");
        console.log(question.isPoll);
        console.log(question.questionID);

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