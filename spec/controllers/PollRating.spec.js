describe("pollRatingController", function() {

   var $httpBackend, $cookiesStore, $rootScope, createController, authRequestHandeler;

   beforeEach(module('KnowItAll'));

   beforeEach(inject(function(_$controller_, _$cookieStore_, _$httpBackend_, _$rootScope_){
      var $controller = _$controller_;
      $cookieStore = _$cookieStore_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      authRequestHandeler = $httpBackend.when('GET', '/checkUserExist?questionID=1&userID=1')
                                    .respond([{userID: null}]); // when user not commented yet

      badRequestHandeler = $httpBackend.when('GET', '/checkUserExist?questionID=1&userID=1')
                                    .respond([{userID: 1}]);  // user commented already

      $cookieStore.put('username', 'user1'); 
      $cookieStore.put('userID', 1); 


      createController = function () {
      return $controller('pollRatingCtrl', { '$scope' : $rootScope });
      }
   }));

   describe('Method: $scope.createComment', function() {

      it('should allow users to comment anonymously', function() { // not done
         // var controller = createController();
         // $rootScope.isAnonymousInput = true; 
         // $rootScope.createComment(); 
         //expect(this.userIDAnnonymous).toMatch('Anonymous');
      });

      it('should display error message when a user tries to comment twice', function () { // not done
        //  var controller = createController();

        // // $httpBackend.expectGET('/checkUserExist?questionID=1&userID=1');
        //  $rootScope.commentInput = "comment";
        //  $rootScope.createComment();
        //  //expect($rootScope.errorMessageComment).toMatch("undefined");

        //  // $httpBackend.flush(); 
        //  $httpBackend.expectGET('/checkUserExist?questionID=1&userID=1');
        //  $rootScope.commentInput = "comment2";
        //  $rootScope.createComment();
        // // $rootScope.commentInput = "comment2"
        //  // $rootScope.createComment();

        //  // $httpBackend.flush(); 
        //  expect($rootScope.errorMessageComment).toBe("Already commented");
      });

      it('should display error message when guest (userID = -1) commments', function() {
         $cookieStore.put('username', null);
         $cookieStore.put('userID', -1); 
         var controller = createController();
         $rootScope.createComment(); 
         expect($rootScope.errorMessageComment).toMatch('Please log In to comment');
      });

      it('should display error message when (userID = undefined) commments', function() {
         $cookieStore.put('username', null);
         $cookieStore.put('userID', undefined); 
         var controller = createController();
         $rootScope.createComment(); 
         expect($rootScope.errorMessageComment).toMatch('Please log In to comment');
      });

      it('should display error message when user submits empty comment (commentInput = null)', function() {
         $cookieStore.put('username', "user1");
         $cookieStore.put('userID', 1); 
         var controller = createController();
         $rootScope.commentInput = null; 
         $rootScope.createComment(); 
         expect($rootScope.errorMessageComment).toMatch('Please leave a comment');
      });

      it('should display error message when user submits empty comment (commentInput = "")', function() {
         $cookieStore.put('username', "user1");
         $cookieStore.put('userID', 1); 
         var controller = createController();
         $rootScope.commentInput = ""; 
         $rootScope.createComment(); 
         expect($rootScope.errorMessageComment).toMatch('Please leave a comment');
      });
   });

   describe('Method: $scope.selectRate', function() {
      it('should not allow guest (userID = -1) to rate', function() {
         $cookieStore.put('username', null);
         $cookieStore.put('userID', -1); 
         var controller = createController();
         $rootScope.selectRate(); 
         expect($rootScope.errorMessageRate).toMatch('Please log In to rate');
      });


      it('should not allow guest (userID = undefined) to rate', function() {
         $cookieStore.put('username', null);
         $cookieStore.put('userID', undefined); 
         var controller = createController();
         $rootScope.selectRate(); 
         expect($rootScope.errorMessageRate).toMatch('Please log In to rate');
      });
   });


   describe('Method: $scope.selectLikeOrDislike', function() {
       it('should not allow guest (userID = -1) to like or dislike', function() {
         $cookieStore.put('username', null);
         $cookieStore.put('userID', -1); 
         var controller = createController();
         $rootScope.selectLikeOrDislike(); 
         expect($rootScope.errorMessageLike).toMatch('Please log In to like/dislike');
      });


      it('should not allow guest (userID = undefined) to like or dislike', function() {
         $cookieStore.put('username', null);
         $cookieStore.put('userID', undefined); 
         var controller = createController();
         $rootScope.selectLikeOrDislike(); 
         expect($rootScope.errorMessageLike).toMatch('Please log In to like/dislike');
      });


   });

   afterEach( function() {
      $cookieStore.remove('username');
      $cookieStore.remove('userID');
   });
});
