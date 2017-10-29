describe("CreatePollController", function() {

  beforeEach(module('KnowItAll'));

  var $controller, $httpBackend, $cookiesStore;

  beforeEach(inject(function(_$controller_, _$cookieStore_, _$httpBackend_, _$rootScope_){
    $controller = _$controller_;
    $cookieStore = _$cookieStore_;
    //always have the default user logged in before each test
    $cookieStore.put("username", "user1");
    $cookieStore.put("userID", 1);

  }));

  // comment 
  describe('Method: $scope.createPoll', function() {
    
    it('should not allow GUEST user to create a poll', function() {
      var $scope = {};
      var controller = $controller('CreatePollCtrl', { $scope: $scope });

      //change the user as guest for this type of test
      $cookieStore.put("username", null);
      $cookieStore.put("userID", -1);

      $scope.createPoll(); 
      expect($scope.errorMessage).toMatch('Please login to create a poll.');

    });

    it('should not allow the user to create a poll without the TITLE', function() {
      var $scope = {};
      var controller = $controller('CreatePollCtrl', { $scope: $scope });

      //check null
      $scope.pollTitleInput = null;
      $scope.createPoll(); 
      expect($scope.errorMessage).toMatch("Please provide a title for your survey.");

      //check empty (for validate function)
      $scope.pollTitleInput = "";
      $scope.createPoll(); 
      expect($scope.errorMessage).toMatch("Please provide a title for your survey.");

    });

    it('should not allow the user to create a poll without at least 2 OPTIONS', function() {
      var $scope = {};
      var controller = $controller('CreatePollCtrl', { $scope: $scope });

      //Try without any option
      $scope.pollTitleInput = "Title";
      $scope.createPoll(); 
      expect($scope.errorMessage).toMatch("Please provide at least two options for your poll.");
      
      //Try with 1 option filled in
      $scope.option1Input = "option1";
      $scope.createPoll(); 
      expect($scope.errorMessage).toMatch("Please provide at least two options for your poll.");

    });

    it('should not allow the user to create a poll without END DATE OPTION', function() {
      var $scope = {};
      var controller = $controller('CreatePollCtrl', { $scope: $scope });

      //Try without providing end date and open forever unclicked
      $scope.pollTitleInput = "Title";
      $scope.option1Input = "option1";
      $scope.option2Input = "option2";
      $scope.openForeverInput = false;
      $scope.createPoll(); 

      expect($scope.errorMessage).toMatch("Please provide an end date for your poll.");

    });

    it('should not allow the user to provide End Date and click Open Forever', function() {
      var $scope = {};
      var controller = $controller('CreatePollCtrl', { $scope: $scope });

      //Try providing end date and open forever clicked
      $scope.pollTitleInput = "Title";
      $scope.option1Input = "option1";
      $scope.option2Input = "option2";
      $scope.openForeverInput = true;
      $scope.endDateInput = "Thu Oct 26 2017 00:00:00 GMT-0700 (Pacific Daylight Time)";
      $scope.createPoll();

      expect($scope.errorMessage).toMatch("Please only choose one end date for your poll.");

    });

  });

});
