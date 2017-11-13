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

        $http.get('/searchQuestionsAnyText?tagQuery=' + $scope.query).then(function (response) {
            $scope.isQuestionList = 1;
            $scope.questionList = response.data;

            str = JSON.stringify(response.data, null, 4); // (Optional) beautiful indented output.
            console.log(str);

        }, 
        function (res) {
            console.log("Question list NOT received");
        });
    }

    $scope.queryQuestions = function () {

        $http.get('/searchQuestions?tagQuery=' + $scope.query).then(function (response) {
            $scope.isQuestionList = 1;
            $scope.questionList = response.data;

            str = JSON.stringify(response.data, null, 4); 
            console.log(str);

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
        $http.get('/onPageLoad')
            .then(function (response) {
                    $scope.isQuestionList = 1;
                    $scope.questionList = response.data;
                    return response.data; 
                }, function (res) { 
                    console.log("FAILED onPageLoad");
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
                            current.endDateDisplay = "Closes on " + current.endDate ; 
                        } else { 
                            current.endDateDisplay = "CLOSED"; 
                        }
                    }

                    // tags


                } // end of for loop
             }).then(function(response){ 
        });


        $http.get('/getTopTags').then(function (response) {
            var topTagsStr = "";
            for(var i=0; i<response.data.length; i++){
                topTagsStr = topTagsStr + response.data[i].tagStr;
                if(i<response.data.length-1){
                    topTagsStr += ", ";
                }
            }
            document.querySelector(".keywords").innerHTML = topTagsStr;
        },
        function (res) {

        });
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