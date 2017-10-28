describe("pollRatingController", function() {

  beforeEach(module('KnowItAll'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));


  // comment 
  describe('Method: $scope.createComment', function() {
    it('should not allow guest users to commment', function() {
      var $scope = {};
      var controller = $controller('pollRatingCtrl', { $scope: $scope });


      // userID = 5; 
      // $cookies.get("userID") = 5; 


      $scope.createComment(); 
      expect($scope.errorMessageComment).toMatch('Please log In to comment');
    });



    it('should only allow logged in users to commment', function() {

    });




    it('should not allow a user to make more than one comment', function() {
       var $scope = {};
       var controller = $controller('pollRatingCtrl', { $scope: $scope });


    });



    
  });



  describe("true", function(){
    it("Should be true", function(){
      expect(true).toBeTruthy(); 
    }); 
  });

});
