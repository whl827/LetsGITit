
describe('Profile Page', function() {

	// var login_button;

	beforeEach(function (){

		browser.get('http://localhost:8080/#!/');
		// login_button = element(by.id('loginButton'));

		browser.manage().addCookie({name:'username', value: 'user1'});
		browser.manage().addCookie({name:'userID', value: '1'});
	});


	// it('should not allow a guest to follow/unfollow another user', function(){

	// 	browser.manage().deleteAllCookies();

	// 	//get instances of search button, textfield and drop down
 //        var search_button = element(by.id('searchButton'));
 //        var search_textField = element(by.id('searchTextField'));
 //        var drop_down_menu = element(by.id("TagUserDropDown"));
        
 //        //select the drop box, write on textfield, click search button
 //        drop_down_menu.sendKeys("User");
 //        search_textField.sendKeys("user1");
 //        search_button.click();

 //        browser.sleep(5000);

 //        //click on the first user (user 1);
 //        element(by.repeater('user in userList').row(0)).$('#current-user').click();

 // 		browser.sleep(5000);

 //        // browser.get('http://localhost:8080/#!/userProfile');

 //        browser.sleep(5000);

	// 	var otherUserError = element(by.id('userProfileError'));
	// 	expect(otherUserError.getText()).toMatch("You are not logged in");
	// });




	it('should not ', function(){
		// browser.get('http://localhost:8080/#!/profile');
		// var my_profile_title = element(by.id('myProfileTitle'));	
		// expect(my_profile_title.getText()).toEqual("This is Profile.");
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

	// Try open other profile and follow user

	it('should allow logged in users to follow other user', function(){
		browser.get('http://localhost:8080/#!/userProfile/user3');
		var btn = element.all(by.id('btnDiv')).get(0);
		btn.click(); 		
		expect(element.all(by.id('btnDiv')).get(0).getText()).toEqual("UnFollow");
	});

	afterEach( function () {
		browser.manage().deleteAllCookies();
	});

});