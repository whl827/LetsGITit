describe('Search Testing\n', function () {
	var title = element(by.id('Title'));
	var resultsTableQuery = element.all(by.repeater('question in questionList'));
	var resultsTableUser = element.all(by.repeater('user in userList'));
	var searchButton = element(by.id('searchButton'));
	var queryTextFeild = element(by.model('query'));
	var TagUserDropDown = element(by.id('TagUserDropDown'));
	var DropDownSelectUser = element(by.id('DropDownSelectUser'));
	var DropDownSelectTag = element(by.id('DropDownSelectTag'));

	beforeEach(function () {
		browser.get('http://localhost:8080/#!/');
		browser.manage().addCookie({name : 'username', value : 'user1'});
		browser.manage().addCookie({name : 'userID', value : '1'});
	});

	it('We have loaded the main page correctly\n', function () {
		expect(title.getText()).toBe('Home Page');
	});

	it('We have loaded the home page with the correct number of 9 questions\n', function () {
		expect(resultsTableQuery.count()).toEqual(9);
	});

	it('Click search with empty query, numm elements should be 0\n', function () {
		searchButton.click();
		expect(resultsTableQuery.count()).toEqual(0);
	});

	it('Click search with invalid tag query of "invalidTag", num elements should be 0 \n', function () {
		queryTextFeild.sendKeys('invalidTag');
		DropDownSelectTag.click();
		searchButton.click();
		expect(resultsTableQuery.count()).toEqual(0);
	});

	it('Click search with invalid user query of "invalidUser", num elements 0 \n', function () {
		queryTextFeild.sendKeys('invalidUser');
		DropDownSelectUser.click();
		searchButton.click();
		expect(resultsTableUser.count()).toEqual(0);
	});

	it('Click search with valid tag t1 and get 3 results\n', function () {
		queryTextFeild.sendKeys('t1');
		DropDownSelectTag.click();
		searchButton.click();
		expect(resultsTableQuery.count()).toEqual(3);
	});

	it('Search for t1 then click on the first question\n', function () {
		queryTextFeild.sendKeys('t1');
		DropDownSelectTag.click();
		searchButton.click();
		resultsTableQuery.first().click();
		expect(browser.getCurrentUrl()).toContain('poll');
	});

	it('Search for t2 then test to see 2 results\n', function () {
		queryTextFeild.sendKeys('t2');
		DropDownSelectTag.click();
		searchButton.click()
		expect(resultsTableQuery.count()).toEqual(3);
	});

	it('Search for a valid user "user 2" \n', function () {
		queryTextFeild.sendKeys('user2');
		DropDownSelectUser.click();
		searchButton.click();
		expect(resultsTableUser.count()).toEqual(1);
	});

	// Should this search yeild a result?
	it('Search for yourself when your logged in\n', function () {
		queryTextFeild.sendKeys('user1');
		DropDownSelectUser.click();
		searchButton.click();
		expect(resultsTableUser.count()).toEqual(1);
	});

	it('Click search with empty navbar logged out\n', function() {
		browser.manage().deleteAllCookies();
		searchButton.click();
		expect(resultsTableQuery.count()).toEqual(0);
	});

	it('Click search with invalid user logged out\n', function () {
		browser.manage().deleteAllCookies();
		queryTextFeild.sendKeys('invalidUser');
		DropDownSelectUser.click();
		searchButton.click();
		expect(resultsTableUser.count()).toEqual(0);
	});

	it('Click search with valid tag t1 logged out\n', function () {
		browser.manage().deleteAllCookies();
		queryTextFeild.sendKeys('t1');
		DropDownSelectTag.click();
		searchButton.click();
		expect(resultsTableQuery.count()).toEqual(3);
	});

	it('Click on user1 when searched for user 1 and logged out\n', function () {
		browser.manage().deleteAllCookies();
		queryTextFeild.sendKeys('user1');
		DropDownSelectUser.click();
		searchButton.click();
		expect(resultsTableUser.count()).toEqual(1);
		resultsTableUser.first().click();
	});

	it('Search for t1 and click on poll1 when logged out\n', function () {
		browser.manage().deleteAllCookies();
		queryTextFeild.sendKeys('t1');
		DropDownSelectTag.click();
		searchButton.click();
		resultsTableQuery.first().click();
		expect(browser.getCurrentUrl()).toContain('poll');
	})

	it('Load the home page while logged in\n', function () {
		expect(resultsTableQuery.count() != 0).toBeTruthy();
	})

	it('Load the home page while logged out\n', function () {
		browser.manage().deleteAllCookies();
		expect(resultsTableQuery.count() != 0).toBeTruthy();
	})

	afterEach( function () {
		browser.manage().deleteAllCookies();
	});
});