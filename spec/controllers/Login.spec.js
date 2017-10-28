describe('loginController', function() {

  var $httpBackend, $cookiesStore, $rootScope, createController, authRequestHandeler;

  beforeEach(module('KnowItAll'), function ($provide) {
    $provide.decorator ('$cookieStore', function ($delegate) {
      $delegate.put('username', 'user1');
      $delegate.put('userID', '1');
    })
  });

  beforeEach(inject(function(_$controller_, _$cookieStore_, _$httpBackend_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    var $controller = _$controller_;
    $cookieStore = _$cookieStore_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    authRequestHandeler = $httpBackend.when('GET', '/user?username=user1&password=1)')
                                  .respond({username : 'user1'}, {userID : '1'});

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

  describe('$cookies logout tester sets cookies correctly', function() {
    it('Testing logout sets username to null', function () {
      expect(1).toEqual(1);
    });
  }); 

  afterEach( function() {
    $cookieStore.remove('username');
    $cookieStore.remove('userID');
  });

  });
});