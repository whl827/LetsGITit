var app = angular.module("KnowItAll", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/home.html"
    })
    .when("/profile", {
        templateUrl : "pages/profile.html"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });
});