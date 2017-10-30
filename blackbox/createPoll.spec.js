
describe('Create Poll Page', function(){

    var create_button;
    var error_message;

	beforeEach(function (){

        //go to poll page before each case starts
        browser.get('http://localhost:8080/#!/createPoll');
        create_button = element(by.id('createButtonInPoll'));
        error_message = element(by.id("errorMessageText"));

        browser.manage().addCookie({name:'username', value: 'user1'});
        browser.manage().addCookie({name:'userID', value: '1'});

	});

	it('should not allow a guest user who clicks on a create button to add a poll and be directed back to home page', function(){

        browser.manage().deleteAllCookies();
	   //When a guest user tries to create a poll by clicking on a create button
	   create_button.click();
       browser.sleep(2000);
	   expect(error_message.getText()).toMatch("Please login to create a poll.");

	});

    it('should not add a poll when clicking on a create button without a title ', function(){

        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Please provide a title for your survey.");
    });

    it('should not allow the user to create a poll when clicking on a create button without at least 2 options ', function(){

        //Providing valid title but no options
        var titleInput = element(by.model('pollTitleInput'));
        titleInput.sendKeys('Title');
        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Please provide at least two options for your poll.");

         //Providing valid title but with 1 option
        var option1 = element(by.model('option1Input'));
        option1.sendKeys('Option1');
        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Please provide at least two options for your poll.");

    });

    it('should not allow the user to create a poll when clicking on create button without an end date', function(){

        //also checks sequention problem for options
        var titleInput = element(by.model('pollTitleInput'));
        titleInput.sendKeys('Title');
        var option1 = element(by.model('option1Input'));
        option1.sendKeys('Option1');
        var option3 = element(by.model('option3Input'));
        option3.sendKeys('Option3');

        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Please provide an end date for your poll.");
    });

    it('should not allow the user to create a poll when clicking on create button with Open Forever checked and end Date set', function(){

        //also checks sequention problem for options
        var titleInput = element(by.model('pollTitleInput'));
        titleInput.sendKeys('Title');
        var option1 = element(by.model('option1Input'));
        option1.sendKeys('Option1');
        var option3 = element(by.model('option3Input'));
        option3.sendKeys('Option3');

        var dateInput = element(by.model('endDateInput'));
        dateInput.sendKeys("01012018");

        var openForever = element(by.model('openForeverInput'));
        openForever.click();

        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Please only choose one end date for your poll.");
        
    });

    it('should not allow the user to create a poll with Title that already exists', function(){

        //also checks sequention problem for options
        var titleInput = element(by.model('pollTitleInput'));
        titleInput.sendKeys('Poll 1'); //already exists in the database
        var option1 = element(by.model('option1Input'));
        option1.sendKeys('Option1');
        var option3 = element(by.model('option3Input'));
        option3.sendKeys('Option3');

        var openForever = element(by.model('openForeverInput'));
        openForever.click();

        create_button.click();
        browser.sleep(2000);
        expect(error_message.getText()).toMatch("Title already exists. Please choose another one.");
        
    });

    it('should direct user to home page after clicking a create button with valid input', function(){

        //also checks sequention problem for options
        var titleInput = element(by.model('pollTitleInput'));
        titleInput.sendKeys('My Poll');
        var option1 = element(by.model('option1Input'));
        option1.sendKeys('1st Option');
        var option3 = element(by.model('option3Input'));
        option3.sendKeys('2nd Option');

        var openForever = element(by.model('openForeverInput'));
        openForever.click();
        create_button.click();
        browser.sleep(2000);
        //To check if it went to the correct page after an action(clicking button)
        expect(browser.getCurrentUrl()).toEqual("http://localhost:8080/index.html#!/");

    });

    it('should check if the question was inserted and displays on home page correctly with correct information', function(){

        //Include every info
        var titleInput = element(by.model('pollTitleInput'));
        titleInput.sendKeys('My New Poll Title');

        var subtitleInput = element(by.model('pollSubtitleInput'));
        subtitleInput.sendKeys('My New Poll Subtitle');

        var descriptionInput = element(by.model('pollDescriptionInput'));
        descriptionInput.sendKeys('My New Poll Description');

        var option1 = element(by.model('option1Input'));
        option1.sendKeys('My New Poll 1st Option');
        var option3 = element(by.model('option3Input'));
        option3.sendKeys('My New Poll 2nd Option');

        var openForever = element(by.model('openForeverInput'));
        openForever.click();

        create_button.click();
        browser.sleep(2000);

        //when you want to get specific element's attribute from home page
        var insertedTitle = element(by.repeater('question in questionList').
        row(0).column('question.title'));
        expect(insertedTitle.getText()).toEqual('My New Poll Title');

        var insertedSubtitle = element(by.repeater('question in questionList').
        row(0).column('question.subtitle'));
        expect(insertedSubtitle.getText()).toEqual('My New Poll Subtitle');

        var insertedDescription = element(by.repeater('question in questionList').
        row(0).column('question.description'));
        expect(insertedDescription.getText()).toEqual('My New Poll Description');

        var insertedEndDate = element(by.repeater('question in questionList').
        row(0).column('question.endDate'));
        expect(insertedEndDate.getText()).toEqual('Open Forever');

        var insertedIsPoll = element(by.repeater('question in questionList').
        row(0).column('question.isPoll'));
        expect(insertedIsPoll.getText()).toEqual("Poll");

    });

    it("should check if the inserted poll is in user's profile", function(){

        //Include every info
        var titleInput = element(by.model('pollTitleInput'));
        titleInput.sendKeys('Poll in user profile');

        var subtitleInput = element(by.model('pollSubtitleInput'));
        subtitleInput.sendKeys('My New Poll Subtitle');

        var descriptionInput = element(by.model('pollDescriptionInput'));
        descriptionInput.sendKeys('My New Poll Description');

        var option1 = element(by.model('option1Input'));
        option1.sendKeys('My New Poll 1st Option');
        var option3 = element(by.model('option3Input'));
        option3.sendKeys('My New Poll 2nd Option');

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
        search_textField.sendKeys("user1");
        search_button.click();
        browser.sleep(2000);

        //click on the first user (user 1);
        element(by.repeater('user in userList').row(0)).$('#current-user').click();
        browser.sleep(2000);
        //click the user's most recent 
        var userRecentQuestionTitle = element(by.repeater('question in questionList').row(0).column('question.title'));
        expect(userRecentQuestionTitle.getText()).toEqual("Poll in user profile");

    });

    it("Check if the poll will show up with different tags", function(){

        //Include every info
        var titleInput = element(by.model('pollTitleInput'));
        titleInput.sendKeys('Unique Poll');

        var subtitleInput = element(by.model('pollSubtitleInput'));
        subtitleInput.sendKeys('My New Poll Subtitle');

        var descriptionInput = element(by.model('pollDescriptionInput'));
        descriptionInput.sendKeys('My New Poll Description');

        var option1 = element(by.model('option1Input'));
        option1.sendKeys('My New Poll 1st Option');
        var option3 = element(by.model('option3Input'));
        option3.sendKeys('My New Poll 2nd Option');

        var openForever = element(by.model('openForeverInput'));
        openForever.click();
        

        //check for normal tag(uniqueTag1), tag with space (uniqueTag2), tag after double comma(uniqueTag3)
        var tags = element(by.model('tagInput'));
        tags.sendKeys("uniqueTag1,  uniqueTag2   ,   ,uniqueTag3");

        //click on create button
        create_button.click();
        browser.sleep(2000);

        //get instances of search button, textfield and drop down
        var search_button = element(by.id('searchButton'));
        var search_textField = element(by.id('searchTextField'));
        var drop_down_menu = element(by.id("drop_down"));
        
        //select the drop box, write on textfield, click search button
        drop_down_menu.sendKeys("Tags");
        search_textField.sendKeys("uniqueTag1");
        search_button.click();
        browser.sleep(2000);
        
        //click the user's most recent 
        var pollWithUniqueTag1Title = element(by.repeater('question in questionList').row(0).column('question.title'));
        expect(pollWithUniqueTag1Title.getText()).toEqual("Unique Poll");

        //now Search for Tag2 (should be without space)
        browser.get('http://localhost:8080/#!');
        browser.sleep(2000);
        //select the drop box, write on textfield, click search button
        drop_down_menu.sendKeys("Tags");
        search_textField.sendKeys("uniqueTag2");
        search_button.click();
        browser.sleep(2000);

        var pollWithUniqueTag2Title = element(by.repeater('question in questionList').row(0).column('question.title'));
        expect(pollWithUniqueTag2Title.getText()).toEqual("Unique Poll");

        //now Search for Tag3 (double commas should not have prevent them from inserting other tags)
        browser.get('http://localhost:8080/#!');
        browser.sleep(2000);
        //select the drop box, write on textfield, click search button
        drop_down_menu.sendKeys("Tags");
        search_textField.sendKeys("uniqueTag3");
        search_button.click();
        browser.sleep(2000);   

        var pollWithUniqueTag3Title = element(by.repeater('question in questionList').row(0).column('question.title'));
        expect(pollWithUniqueTag3Title.getText()).toEqual("Unique Poll");

    });

});