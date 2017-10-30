describe('Login Testing\n', function () {
	var usernameTextFeild = element(by.model('username'));
	var passwordTextFeild = element(by.model('password'));
	var loginButton = element(by.id('loginButton'));
	var loginAsUser1;

	beforeEach(function () {
		browser.get('http://localhost:8080/#!/login');

		loginAsUser1 = function() {
			browser.manage().addCookie({name : 'username', value : 'user1'});
			browser.manage().addCookie({name : 'userID', value : '1'});
		}
	});

	it('Should load the login page correctly with undefined cookies', function () {
		expect(browser.getCurrentUrl()).toContain('login');
	});

	it('Login with an invalid username and password, should not set any cookies', function() {
		usernameTextFeild.sendKeys('invalidUser');
		passwordTextFeild.sendKeys('invalidPassword');
		loginButton.click();
		browser.manage().getCookie('username').then(function (cookie) {
			expect(cookie).toBe(null);			// The cookie has not yet been defined
		});
	});

	afterEach(function () {
		browser.manage().deleteAllCookies();
	})
});
