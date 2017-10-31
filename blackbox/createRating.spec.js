
describe('Create Poll Page', function(){

    var create_button = element(by.id('createButtonInRating'));
    var error_message = element(by.id("errorMessageTextRating"));

	beforeEach(function (){

        //go to poll page before each case starts
        browser.get('http://localhost:8080/#!/createRating');

        browser.manage().addCookie({name:'username', value: 'user2'});
        browser.manage().addCookie({name:'userID', value: '2'});

	});

	it('should not allow a guest user who clicks on a create button to add a rating and be directed back to home page', function(){

       browser.manage().deleteAllCookies();
	   //When a guest user tries to create a poll by clicking on a create button
	   create_button.click();
       browser.sleep(2000);
	   expect(error_message.getText()).toMatch("Please login to create a rating.");

	});

    it('should not add a rating when clicking on a create button without a title ', function(){

        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Please provide a title for your rating.");
    });

    it('should not allow the user to create a poll when clicking on a create button without description ', function(){

        //Providing valid title but no options
        var titleInput = element(by.model('ratingTitleInput'));
        titleInput.sendKeys('Title');
        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Please provide description of your rating.");


    });

    it('should not allow the user to create a rating when clicking on create button without an end date', function(){

        //also checks sequention problem for options
        var titleInput = element(by.model('ratingTitleInput'));
        titleInput.sendKeys('Title');
        var description = element(by.model('descriptionInput'));
        description.sendKeys('Description');

        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Please provide an end date for your rating.");
    });

    it('should not allow the user to create a rating when clicking on create button with Open Forever checked and end Date set', function(){

        //also checks sequention problem for options
        var titleInput = element(by.model('ratingTitleInput'));
        titleInput.sendKeys('Title');
        var description = element(by.model('descriptionInput'));
        description.sendKeys('Description');

        var dateInput = element(by.model('endDateInput'));
        dateInput.sendKeys("01012018");

        var openForever = element(by.model('openForeverInput'));
        openForever.click();

        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Please only choose one end date for your rating.");
        
    });

    it('should not allow the user to create a poll with Title that already exists', function(){

        //also checks sequention problem for options
        var titleInput = element(by.model('ratingTitleInput'));
        titleInput.sendKeys('Rating 2');
        var description = element(by.model('descriptionInput'));
        description.sendKeys('Description');
        var openForever = element(by.model('openForeverInput'));
        openForever.click();

        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Title already exists. Please choose another one.");
        
    });

    it('should direct user to home page after clicking a create button with valid input', function(){

        //also checks sequention problem for options
        var titleInput = element(by.model('ratingTitleInput'));
        titleInput.sendKeys('RatingTitle');
        var description = element(by.model('descriptionInput'));
        description.sendKeys('Description');
        var openForever = element(by.model('openForeverInput'));
        openForever.click();

        create_button.click();
        browser.sleep(2000);
        //To check if it went to the correct page after an action(clicking button)
        expect(browser.getCurrentUrl()).toEqual("http://localhost:8080/index.html#!/");

    });

    it('should check if the question was inserted and displays on home page correctly with correct information', function(){

        //Include every info
        var titleInput = element(by.model('ratingTitleInput'));
        titleInput.sendKeys('My New Rating Title');
        var description = element(by.model('descriptionInput'));
        description.sendKeys('My New Rating Description');
        var openForever = element(by.model('openForeverInput'));
        openForever.click();

        create_button.click();
        browser.sleep(2000);

        var insertedTitle = element(by.repeater('question in questionList').
        row(0).column('question.title'));
        expect(insertedTitle.getText()).toEqual('My New Rating Title');

        var insertedDescription = element(by.repeater('question in questionList').
        row(0).column('question.description'));
        expect(insertedDescription.getText()).toEqual('My New Rating Description');

        var insertedEndDate = element(by.repeater('question in questionList').
        row(0).column('question.endDate'));
        expect(insertedEndDate.getText()).toEqual('Open Forever');

        var insertedIsPoll = element(by.repeater('question in questionList').
        row(0).column('question.isPoll'));
        expect(insertedIsPoll.getText()).toEqual("Rating");

    });

    it("should check if the inserted rating is in user's profile", function(){

        //Include every info
        var titleInput = element(by.model('ratingTitleInput'));
        titleInput.sendKeys('New Rating in User Profile');
        var description = element(by.model('descriptionInput'));
        description.sendKeys('My New Rating Description');
        var openForever = element(by.model('openForeverInput'));
        openForever.click();

        //click on create button
        create_button.click();
        browser.sleep(2000);

        //get instances of search button, textfield and drop down
        var search_button = element(by.id('searchButton'));
        var search_textField = element(by.id('searchTextField'));
        var drop_down_menu = element(by.id("drop_down"));
        
        //select the drop box, write on textfield, click search button
        drop_down_menu.sendKeys("User");
        search_textField.sendKeys("user2");
        search_button.click();
        browser.sleep(2000);

        //click on the first user (user 1);
        element(by.repeater('user in userList').row(0)).$('#current-user').click();
        browser.sleep(2000);
        //click the user's most recent 
        var userRecentQuestionTitle = element(by.repeater('question in questionList').row(0).column('question.title'));
        expect(userRecentQuestionTitle.getText()).toEqual("New Rating in User Profile");

    });

    it("Check if the rating will show up with different tags", function(){

        //Include every info
        var titleInput = element(by.model('ratingTitleInput'));
        titleInput.sendKeys('New Rating With Tags');
        var description = element(by.model('descriptionInput'));
        description.sendKeys('My New Rating Description');
        var openForever = element(by.model('openForeverInput'));
        openForever.click();
        
        //check for normal tag(uniqueTag1), tag with space (uniqueTag2), tag after double comma(uniqueTag3)
        var tags = element(by.model('tagInput'));
        tags.sendKeys("uniqueRatingTag1,  uniqueRatingTag2   ,   ,uniqueRatingTag3");

        //click on create button
        create_button.click();
        browser.sleep(2000);

        //get instances of search button, textfield and drop down
        var search_button = element(by.id('searchButton'));
        var search_textField = element(by.id('searchTextField'));
        var drop_down_menu = element(by.id("drop_down"));
        
        //select the drop box, write on textfield, click search button
        drop_down_menu.sendKeys("Tags");
        search_textField.sendKeys("uniqueRatingTag1");
        search_button.click();
        browser.sleep(2000);
        
        //click the user's most recent 
        var ratingWithUniqueTag1Title = element(by.repeater('question in questionList').row(0).column('question.title'));
        expect(ratingWithUniqueTag1Title.getText()).toEqual("New Rating With Tags");

        //now Search for Tag2 (should be without space)
        browser.get('http://localhost:8080/#!');
        browser.sleep(2000);
        //select the drop box, write on textfield, click search button
        drop_down_menu.sendKeys("Tags");
        search_textField.sendKeys("uniqueRatingTag2");
        search_button.click();
        browser.sleep(2000);

        var ratingWithUniqueTag2Title = element(by.repeater('question in questionList').row(0).column('question.title'));
        expect(ratingWithUniqueTag2Title.getText()).toEqual("New Rating With Tags");

        //now Search for Tag3 (double commas should not have prevent them from inserting other tags)
        browser.get('http://localhost:8080/#!');
        browser.sleep(2000);
        //select the drop box, write on textfield, click search button
        drop_down_menu.sendKeys("Tags");
        search_textField.sendKeys("uniqueRatingTag3");
        search_button.click();
        browser.sleep(2000);   

        var ratingWithUniqueTag3Title = element(by.repeater('question in questionList').row(0).column('question.title'));
        expect(ratingWithUniqueTag3Title.getText()).toEqual("New Rating With Tags");

    });

    afterEach( function () {
        browser.manage.deleteAllCookies();
    });

});