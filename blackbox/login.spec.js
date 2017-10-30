describe('Login Testing\n', function () {
	var usernameTextFeild = element(by.model('username'));
	var passwordTextFeild = element(by.model('password'));
	var loginButton = element(by.id('loginButton'));

	var loginAsUser1 = function() {
		browser.manage().addCookie({name : 'username', value : 'user1'});
		browser.manage().addCookie({name : 'userID', value : '1'});
	}

	beforeEach(function () {
		browser.get('http://localhost:8080/#!/login');
	});

	it('Should load the login page correctly with undefined cookies\n', function () {
		expect(browser.getCurrentUrl()).toContain('login');
	});

	it('Login with an invalid username and password, should not set any cookies\n', function() {
		usernameTextFeild.sendKeys('invalidUser');
		passwordTextFeild.sendKeys('invalidPassword');
		loginButton.click();
		browser.manage().getCookie('username').then(function (cookie) {
			expect(cookie).toBe(null);			// The cookie has not yet been defined
		});
	});

	it('Login with a valid username and password while logged out, expect user1 cookies\n', function () {
		usernameTextFeild.sendKeys('user1');
		passwordTextFeild.sendKeys('pwd');
		loginButton.click();
		browser.manage().getCookie('username').then(function (cookie) {
			expect(cookie.value).toBe('user1');
		});
		browser.manage().getCookie('userID').then(function (cookie) {
			expect(cookie.value).toBe('1');
		});
	});

	it('Login as user 2 while logged in as user 1, expect user 2 cookies\n', function() {
		loginAsUser1();
		// To make sure login function is working
		browser.manage().getCookie('username').then(function (cookie) {
			expect(cookie.value).toBe('user1');
		});
		browser.manage().getCookie('userID').then(function (cookie) {
			expect(cookie.value).toBe('1');
		});

		usernameTextFeild.sendKeys('user2');
		passwordTextFeild.sendKeys('pwd');
		loginButton.click();

		browser.manage().getCookie('username').then(function (cookie) {
			expect(cookie.value).toBe('user2');
		});
		browser.manage().getCookie('userID').then(function (cookie) {
			expect(cookie.value).toBe('2');
		});
	});

	afterEach(function () {
		browser.manage().deleteAllCookies();
	})
});
