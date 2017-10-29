describe('loginController', function() {

  var $httpBackend, $cookiesStore, $rootScope, 
  createController, authRequestHandeler, badRequestHandeler;

  beforeEach(module('KnowItAll'));

  beforeEach(inject(function(_$controller_, _$cookieStore_, _$httpBackend_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    var $controller = _$controller_;
    $cookieStore = _$cookieStore_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    authRequestHandeler = $httpBackend.when('GET', '/user?username=user1&password=111421')
                                  .respond([{userID: 1, username: "user1", passwordHash: 111421}]);

    badRequestHandeler = $httpBackend.when('GET', '/user?username=user2&password=111421')
                                  .respond([]);                         

    $cookieStore.put('username', 'user2');
    $cookieStore.put('userID', 2);

    createController = function () {
      return $controller('loginController', { '$scope' : $rootScope });
    }
  }));

  describe('$rootScope.errorMessage tester should be you have not logged out', function() {
    it('Testing logout functionallity for correct errorMessage', function() {
      var controller = createController();
      $rootScope.logout();
      expect($rootScope.errorMessage).toEqual('You have logged out');
    });

  describe('$cookies logout tester sets cookies', function() {
    it('Testing logout sets username to null', function () {
      var controller = createController();
      expect($cookieStore.get('username')).toBe('user2');
      $rootScope.logout();
      expect($cookieStore.get('username')).toBe(null);
    });

    it('Testing logout sets userID to -1', function () {
      var controller = createController();
      expect($cookieStore.get('userID')).toBe(2);
      $rootScope.logout();
      expect($cookieStore.get('userID')).toBe(-1);
    });

    it('Testing logout with null cookie', function () {
      $cookieStore.remove('username');
      $cookieStore.remove('userID');
      var controller = createController();
      $rootScope.logout();
      expect($rootScope.errorMessage).toBe('You were not logged in origonally');
    });

    it('Testing logout when already logged out', function() {
      $cookieStore.put('username', null);
      $cookieStore.put("userID", -1);
      var controller = createController();
      $rootScope.logout();
      expect($rootScope.errorMessage).toBe('You were not logged in origonally');
    });
  }); 

  describe('Login $httpGet request is handeled correctly \n', function  () {
    
    it('should fetch authentication token', function() {
     $httpBackend.expectGET('/user?username=user1&password=111421');
     $rootScope.username = 'user1'
     $rootScope.password = 'pwd';
     var controller = createController();
     $rootScope.userQuery();
     $httpBackend.flush();
   });

    it('should test the cookies are corret when logged in with user1', function() {
     $httpBackend.expectGET('/user?username=user1&password=111421');
     $rootScope.username = 'user1'
     $rootScope.password = 'pwd';
     var controller = createController();
     $rootScope.userQuery();
     $httpBackend.flush();
     expect($cookieStore.get('userID')).toBe(1);
   });

    it('Should set error message for invalid login', function() {
     $httpBackend.expectGET('/user?username=user2&password=111421');
     $rootScope.username = 'user2'
     $rootScope.password = 'pwd';
     var controller = createController();
     $rootScope.userQuery();
     $httpBackend.flush();
     expect($rootScope.errorMessage).toBe('The username and password combination is incorrect.');
   });

  });

  afterEach( function() {
    $cookieStore.remove('username');
    $cookieStore.remove('userID');
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  });
});