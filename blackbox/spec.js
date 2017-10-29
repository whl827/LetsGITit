describe('Search Testing\n', function () {
	var title = element(by.id('Title'));
	var resultsTableQuery = element.all(by.repeater('question in questionList'));
	var searchButton = element(by.id('searchButton'));
	var queryTextFeild = element(by.model('query'));

	beforeEach(function () {
		browser.get('http://localhost:8080/#!/');
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
		searchButton.click();
		expect(resultsTableQuery.count()).toEqual(0);
	});



});