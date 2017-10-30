describe('Login Testing\n', function () {
	var usernameTextFeild = element(by.model('username'));
	var passwordTextFeild = element(by.model('password'));
	var loginButton = element(by.id('loginButton'));

	beforeEach(function () {
		browser.get('http://localhost:8080/#!/login');
	});

	it('Should load the login page correctly with undefined cookies', function () {
		expect(browser.getCurrentUrl()).toContain('login');
	});

	it('Login with an invalid username and password, should not set any cookies', function() {
		usernameTextFeild.sendKeys('invalidUser');
		passwordTextFeild.sendKeys('invalidPassword');
		loginButton.click();
		browser.manage.getCookie('username').then(function (cookie) {
			expect(0).toBeTruthy();
		});
	});

	afterEach(function () {
		browser.manage().deleteAllCookies();
	})
});
