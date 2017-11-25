angular.module("KnowItAll").controller('FeedCtrl', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies) {

    // $scope.isQuestionList = 1;

    // console.log("THIS IS QUESTIONLIST:");
    // console.log($scope.questionList);

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

        $http.get('/searchQuestionsAnyText?tagQuery=' + $scope.query)
            .then(function (response) {
                    $scope.isQuestionList = 1;
                    $scope.questionList = response.data;
                    return response.data; 
                }, function (res) {
                    console.log("Question list NOT received");
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
    }

    $scope.queryQuestions = function () {

        console.log($scope.query);

        $http.get('/searchQuestions?tagQuery=' + $scope.query)
            .then(function (response) {
                    $scope.isQuestionList = 1;
                    $scope.questionList = response.data;
                    return response.data; 
                }, function (res) {
                    console.log("Question list NOT received");
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
    }

    $scope.queryUsers = function () {
        $http.get('/searchUsers?userQuery=' + $scope.query).then(function (response) {
            $scope.isQuestionList = 2;
            $scope.userList = response.data;
        });
    }


    $scope.onloadFun = function() {
        // console.log($cookies.get("newUserIDmsg"));
        // console.log($cookies.get('test'));
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
                            // var month = finalCloseDate.getUTCMonth() + 1; 
                            // var day = finalCloseDate.getUTCDate();
                            // var year = finalCloseDate.getUTCFullYear();
                            // newdate = month + "/" + day + "/" + year;
                            //current.endDateDisplay = "Open until " + newdate ; 
                            current.endDateDisplay = "Open until " + convertDay(finalCloseDate) ; 
                        } else { 
                            current.endDateDisplay = "Closed"; 
                        }
                    }
                    // tags
                    getTags(current); 
                } // end of for loop
            }
        );


        $http.get('/getTopTags').then(function (response) {
            var topTagsStr = "";
            for(var i=0; i<response.data.length; i++){
                topTagsStr = topTagsStr + response.data[i].tagStr;
                if(i<response.data.length-1){
                    topTagsStr += ", ";
                }
            }
            //document.querySelector(".keywords").innerHTML = topTagsStr;
            $scope.topTagsList = response.data;
            
        },
        function (res) {

        });
    }

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

/*
    str = JSON.stringify(response.data, null, 4); 
    console.log(str);
*/

    $scope.goToLink = function(question) {

        if(question.isPoll){
             $location.path('/poll/' + question.questionID);
        }
        else{
            $location.path('/rating/' + question.questionID);
        }

    };

    $scope.goToUser = function(username) {
        //go to profile page
        if(username==$cookies.get('username')){
            $location.path('/profile');
        }else{
            //go to other profile page
            $location.path('/userProfile/' + username);
        }
        
    }

    $scope.searchClickedTag = function(tag){
        $scope.query = tag.tagStr;
        document.querySelector("#TagUserDropDown").value = "Tags";
        $scope.queryQuestions();
    }

}]);