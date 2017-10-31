
describe('Profile Page', function() {

	beforeEach(function (){

		browser.get('http://localhost:8080/#!/');

		browser.manage().addCookie({name:'username', value: 'user1'});
		browser.manage().addCookie({name:'userID', value: '1'});
	});

	// Try open self profile when logged in

	it('should allow a logged in user to go into his profile', function(){
		browser.get('http://localhost:8080/#!/profile');
		var my_profile_title = element(by.id('myProfileTitle'));	
		expect(my_profile_title.getText()).toEqual("This is Profile.");
	});

	// Try open the other profile when you are logged in

	it('should allow logged in users to view other users profile', function(){
		browser.get('http://localhost:8080/#!/userProfile/user2');
		var others_profile_title = element(by.id('othersProfileTitle'));	
		expect(others_profile_title.getText()).toEqual("Other User Profile Page");
	});

	// Try open other profile and check if following

	it('should allow logged in users to click into others profile and check if following', function(){
		browser.get('http://localhost:8080/#!/userProfile/user2');
		var unfollow_btn = element(by.id('unfollowBtn'));	
		expect(unfollow_btn.getText()).toEqual("UnFollow");
	});

	afterEach( function () {
		browser.manage().deleteAllCookies();
	});

});