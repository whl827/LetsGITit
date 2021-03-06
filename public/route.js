angular.module("KnowItAll").config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/home.html"
    })
    .when("/profile/", {
        templateUrl : "pages/profile.html",
    })
    .when("/login", {
        templateUrl : "pages/login.html",
    })
    .when("/signup", {
        templateUrl : "pages/signUp.html"
    })
    .when("/createPoll", {
        templateUrl : "pages/createPoll.html"
    })
    .when("/createRating", {
        templateUrl : "pages/createRating.html"
    })
    .when("/newUser/:username/:password", {
          templateUrl : "pages/newUser.html",
          controller : "createUser"
    })
    .when("/userProfile/:username", {
        templateUrl: "pages/otherUserProfile.html"
    })
    .when("/adminPage", {
        templateUrl: "pages/adminPage.html"
    })
    .when("/rating/:questionID", {
        templateUrl : "pages/rating.html",
        controller: "RatingCtrl"
    })
    .when("/poll/:questionID", {
        templateUrl : "pages/poll.html",
        controller : "PollCtrl"
    });
});