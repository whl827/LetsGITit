describe("createRatingController", function() {

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

		$cookieStore.put("username", "user1");
		$cookieStore.put("userID", 1);


	    createController = function () {
	      return $controller('CreateRateCtrl', { '$scope' : $rootScope });
	    }
	}));

	describe('Testing functionality for creating a rating. ', function() {
		createController = function () {
	      return $controller('CreateRateCtrl', { '$scope' : $rootScope });
	    }

	    // test when title is empty(null)
	    it('The rating should not be validated where the \'title\' is empty.', function() {
	    	var controller = createController();
	    	$rootScope.ratingTitleInput = null;
	    	$rootScope.createRating();
	      	expect($rootScope.errorMessage).toEqual('Please provide a title for your rating.');

	      	// test when title is empty string
	      	$rootScope.ratingTitleInput = "";
	    	$rootScope.createRating();
	      	expect($rootScope.errorMessage).toEqual('Please provide a title for your rating.');
	    });

	    // test GUEST when user is not logged in
	    it('As a guest, user shouldn\'t be allowed to create rating', function() {
	    	$cookieStore.put('username', null);
	    	$cookieStore.put('userID', -1);

	    	var controller = createController();
	    	$rootScope.ratingTitleInput = null;
	    	$rootScope.createRating();
	      	expect($rootScope.errorMessage).toEqual('Please login to create a rating.');
	    });

	    // test when title is defined
	    it('The rating should not be validated when only 1 but not all fields are filled.', function() {
	    	var controller = createController();
	    	$rootScope.ratingTitleInput = "title";
	    	$rootScope.createRating();
	      	expect($rootScope.errorMessage).toEqual('Please provide description of your rating.');
	    });


	    it('User should not be allowed to create a rating without END DATE OPTION', function() {
	    	var controller = createController();

	      	//Try without providing end date and open forever unclicked
	      	$rootScope.ratingTitleInput = "Title";
	      	$rootScope.descriptionInput = "Description";
	      	$rootScope.openForeverInput = false;
	      	$rootScope.createRating();
	      	expect($rootScope.errorMessage).toMatch("Please provide an end date for your rating.");
	    });

	    it('User should not be allowed to provide an End Date and click Open Forever', function() {
	    	var controller = createController();

		    //Try providing end date and open forever clicked
		    $rootScope.ratingTitleInput = "Title";
		    $rootScope.descriptionInput = "Description";
		    $rootScope.openForeverInput = true;
		    $rootScope.endDateInput = "Thu Oct 26 2017 00:00:00 GMT-0700 (Pacific Daylight Time)";
		    $rootScope.createRating();

	      	expect($rootScope.errorMessage).toMatch("Please only choose one end date for your rating.");
	    });
	});

	afterEach( function() {
	    $cookieStore.remove('username');
	    $cookieStore.remove('userID');
	});
});