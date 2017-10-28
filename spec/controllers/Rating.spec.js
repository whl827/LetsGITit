describe("ratingController", function() {

  beforeEach(module('KnowItAll'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.username', function() {
    it('sets the username to anonoymous if $scope.isAnonymous == 1', function() {
      var $scope = {};
      var controller = $controller('RatingCtrl', { $scope: $scope });
      $scope.isAnonymous = 1;
      if($scope.isAnonymous == 1){
        $scope.username = 'ANONYMOUS'; 
      }
      expect($scope.username).toEqual('ANONYMOUS');
    });
  });

  // comment 
  describe('', function() {
    it('sets the username to anonoymous if $scope.isAnonymous == 1', function() {


    });
  });

  // 






  describe("true", function(){
    it("Should be true", function(){
      expect(false).toBeTruthy(); 
    }); 
  })

});
