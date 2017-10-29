describe('Sign Up Controller \n', function() {

  var $httpBackend, $cookiesStore, $rootScope, 
  createController, authRequestHandelerUser, authRequestHandelerEmail, badRequestHandeler;

  beforeEach(module('KnowItAll'));

  beforeEach(inject(function(_$controller_, _$cookieStore_, _$httpBackend_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    var $controller = _$controller_;
    $cookieStore = _$cookieStore_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    authRequestHandelerUser = $httpBackend.when('GET', '/signupFunction?signupUsername=testUser&signupPassword=111421&signupEmail=rdiersin@usc.edu')
                                  .respond([ ]);

    authRequestHandelerEmail =  $httpBackend.when('GET', '/sendEmail')
                                  .respond([ ]);

    createController = function () {
      return $controller('signUpController', { '$scope' : $rootScope });
    }
  }));

  describe('Sign up validation\n', function() {
    it('setting error message when you sign up without a usc email address', function () {
      $rootScope.signupPassword = 'pw';
      $rootScope.signupUsername = 'username';
      $rootScope.signupEmail = 'rdiersin@gmail.com';
      var controller = createController();
      $rootScope.signupFunction();
      expect($rootScope.signupErrorMessage).toBe('Please use a usc.edu domain');
    });

    it('setting the correct erroMessageStr when you enter a invalid email', function () {
      $rootScope.signupPassword = "pwd";
      $rootScope.signupUsername = 'testUser';
      $rootScope.signupEmail = 'rdiersin@usc.edu';
      $httpBackend.expectGET('/signupFunction?signupUsername=testUser&signupPassword=111421&signupEmail=rdiersin@usc.edu');
      $httpBackend.expectGET('/sendEmail?newUsername=testUser&newPasswordHash=111421&newEmail=rdiersin@usc.edu');
      var controller = createController();
      $rootScope.signupFunction();
      $httpBackend.flush();
      expect($rootScope.signupErrorMessage).toBe('Failed to send email, invalid address');
    });

  });

  afterEach( function() {
    $cookieStore.remove('username');
    $cookieStore.remove('userID');
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});