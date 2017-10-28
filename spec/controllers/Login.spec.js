describe('loginController', function() {

  var $httpBackend, $cookiesStore, $rootScope, createController, authRequestHandeler;

  beforeEach(module('KnowItAll'));

  beforeEach(inject(function(_$controller_, _$cookieStore_, _$httpBackend_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    var $controller = _$controller_;
    $cookieStore = _$cookieStore_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    authRequestHandeler = $httpBackend.when('GET', '/user?username=user1&password=1)')
                                  .respond({username : 'user1'}, {userID : '1'});

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
      $rootScope.logout();
      expect($cookieStore.get('username')).toBe(null);
    });

    it('Testing logout sets userID to -1', function () {
      var controller = createController();
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
  }); 

  describe('Login $httpGet request is handeled correctly', function  () {
    it('Test sets username cookie correctly', function () {
      var controller = createController();
      $rootScope.username = 'user1';
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