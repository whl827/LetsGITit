describe('Poll Page', function(){

    var LikeDislikeButton = element(by.id('LikeDislikeButton'));
    var CommentButton = element(by.id('CommentButton'));
    var LikeDislikeErrorMessage = element(by.id("LikeDislikeErrorMessage"));
    var CommentErrorMessage = element(by.id("CommentErrorMessage"));
    var comment = element(by.model('commentInput'));
    var commentQuery= element.all(by.repeater('comment in commentList'));

    beforeEach(function (){
        browser.get('http://localhost:8080/#!/poll/1');
        browser.manage().addCookie({name : 'username', value : 'user1'});
        browser.manage().addCookie({name : 'userID', value : '1'});
	});

   // *************************** Error Messages ******************************

    it('should not allow a user to submit an empty like/dislike', function(){

        LikeDislikeButton.click();
        browser.sleep(2000);
        expect(LikeDislikeErrorMessage.getText()).toMatch("Please choose the like/dislike value");
     });

   it('should not allow a user to submit an empty comment', function(){

        browser.actions().sendKeys(';').perform();
        CommentButton.click();
        browser.sleep(2000);
    	
		expect(CommentErrorMessage.getText()).toMatch("Please leave a comment");
     });

    it('should not allow a guest user to vote ', function(){

        browser.manage().deleteAllCookies();
        LikeDislikeButton.click();
        browser.sleep(2000);
        expect(LikeDislikeErrorMessage.getText()).toMatch("Please log In to like/dislike");
    });

    it('should not allow a guest user to comment ', function(){

        browser.manage().deleteAllCookies();
        CommentButton.click();
        browser.sleep(2000);
        expect(CommentErrorMessage.getText()).toMatch("Please log In to comment");
    });

    it('should display error message when they already voted for like/dislike', function(){


        var radio = $("input[type='radio'][name='like']").click();

        LikeDislikeButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/poll/1');
        var radio = $("input[type='radio'][name='like']").click();

        LikeDislikeButton.click();
        browser.sleep(2000);

        expect(LikeDislikeErrorMessage.getText()).toMatch("Already voted. Updating your like/dislike");
    });

    it('should display error message when they already commented', function(){

        comment.sendKeys('I like this poll');
        CommentButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/poll/1');
        comment.sendKeys('me too!');
        CommentButton.click();
        browser.sleep(2000);

        expect(CommentErrorMessage.getText()).toMatch("Already commented");
    });

   // ******************************* Getting Values *******************************

    it('should display the username of the creater correctly', function(){
        var username = element(by.id('username'));
        expect(username.getText()).toMatch("user1");
    });

    it('should display the title correctly', function(){
        var title = element(by.id('title'));
        expect(title.getText()).toMatch("Poll 1");
    });

    it('should display the description correctly', function(){
        var description = element(by.id('description'));
        expect(description.getText()).toMatch("has tags 1");
    });

    it('should display the description correctly', function(){
        var description = element(by.id('endDate'));
        expect(description.getText()).toMatch("(Open Forever)");
    });

    it('should display Created by ANONYMOUS correctly', function(){
        browser.get('http://localhost:8080/#!/poll/2');
        var username = element(by.id('username'));
        expect(username.getText()).toMatch("Created by ANONYMOUS");
    });

    it('radio buttons should select correct values ', function(){
    
        var radio = $("input[type='radio'][name='like']")
            expect(radio.getAttribute('value')).toEqual('true');
    
        var radio = $("input[type='radio'][name='dislike']");
            expect(radio.getAttribute('value')).toEqual('false');
    });

   // ******************************* Updating Value *******************************

    it('should update like/dislike when they already voted for like/dislike', function(){

        var radio = $("input[type='radio'][name='like']").click();

        LikeDislikeButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/poll/1');
        var radio = $("input[type='radio'][name='dislike']").click();

        LikeDislikeButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/poll/1');
        var numLikes = element(by.id('numLikes'));
        var numDislikes = element(by.id('numDislikes'));
        expect(numLikes.getText()).toMatch("0");
        expect(numDislikes.getText()).toMatch("1");

    });

    it('Total comment number should change after user commented', function(){
        
        browser.get('http://localhost:8080/#!/poll/2');
        comment.sendKeys('This poll helped me so much !!!');

        CommentButton.click();
        browser.sleep(2000);

        var totalComment = element.all(by.id('totalComment'));
        expect(totalComment.getText()).toMatch("1");
         
    });

});

describe('Rating Page', function(){

    var LikeDislikeButton = element(by.id('LikeDislikeButton'));
    var CommentButton = element(by.id('CommentButton'));
    var RatingButton = element(by.id('RatingButton'));
    var LikeDislikeErrorMessage = element(by.id("LikeDislikeErrorMessage"));
    var CommentErrorMessage = element(by.id("CommentErrorMessage"));
    var RatingErrorMessage = element(by.id("RatingErrorMessage"));
    var comment = element(by.model('commentInput'));

    beforeEach(function (){
        browser.get('http://localhost:8080/#!/rating/5');
        browser.manage().addCookie({name : 'username', value : 'user1'});
        browser.manage().addCookie({name : 'userID', value : '1'});
    });

  //  *************************** Error Messages ********************************

    it('should not allow a guest user to vote ', function(){

        browser.manage().deleteAllCookies();
        LikeDislikeButton.click();
        browser.sleep(2000);
        expect(LikeDislikeErrorMessage.getText()).toMatch("Please log In to like/dislike");
    });

     it('should not allow a guest user to comment ', function(){

        browser.manage().deleteAllCookies();
        CommentButton.click();
        browser.sleep(2000);
        expect(CommentErrorMessage.getText()).toMatch("Please log In to comment");
    });

    it('should not allow a guest user to rate ', function(){

        browser.manage().deleteAllCookies();
        RatingButton.click();
        browser.sleep(2000);
        expect(RatingErrorMessage.getText()).toMatch("Please log In to rate");
    });

    it('should not allow a user to submit an empty comment', function(){

        browser.actions().sendKeys(';').perform();
        CommentButton.click();
        browser.sleep(2000);
        //comment.sendKeys("");
        
        expect(CommentErrorMessage.getText()).toMatch("Please leave a comment");
    });

    it('should not allow a user to submit an empty like/dislike', function(){

        LikeDislikeButton.click();
        browser.sleep(2000);
        expect(LikeDislikeErrorMessage.getText()).toMatch("Please choose the like/dislike value");
     });

    it('should not allow a user to submit an empty rating', function(){

        RatingButton.click();
        browser.sleep(2000);
        expect(RatingErrorMessage.getText()).toMatch("Please choose the rating value");
     });

    it('should display error message when they already voted for like/dislike', function(){

        var radio = $("input[type='radio'][name='like']").click();

        LikeDislikeButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/rating/5');
        var radio = $("input[type='radio'][name='like']").click();

        LikeDislikeButton.click();
        browser.sleep(2000);

        expect(LikeDislikeErrorMessage.getText()).toMatch("Already voted. Updating your like/dislike");
    });

    it('should display error message value when they already rated', function(){


        var radio = $("input[type='radio'][name='rating1']").click();

        RatingButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/rating/5');
        var radio = $("input[type='radio'][name='rating2']").click();

        RatingButton.click();
        browser.sleep(2000);

        expect(RatingErrorMessage.getText()).toMatch("Already rated. Updating your rating");
    });

    it('should display error message when they already commented', function(){

        comment.sendKeys('I like this poll');
        CommentButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/poll/1');
        comment.sendKeys('me too!');
        CommentButton.click();
        browser.sleep(2000);

        expect(CommentErrorMessage.getText()).toMatch("Already commented");
    });

  //  ******************************* Getting Values *******************************

    it('should display the username of the creater correctly', function(){
        var username = element(by.id('username'));
        expect(username.getText()).toMatch("user2");
    });

    it('should display the title correctly', function(){
        var title = element(by.id('title'));
        expect(title.getText()).toMatch("Rating 2");
    });

    it('should display the description correctly', function(){
        var description = element(by.id('description'));
        expect(description.getText()).toMatch("has NO tags");
    });

    // it('should display the end date correctly', function(){
    //     var description = element(by.id('endDate'));
    //     expect(description.getText()).toMatch("2017-10-17");
    // });

    it('should display Created by ANONYMOUS correctly', function(){
        browser.get('http://localhost:8080/#!/rating/8');
        var username = element(by.id('username'));
        expect(username.getText()).toMatch("Created by ANONYMOUS");
    });

    it('radio buttons should select correct values ', function(){

        var radio = $("input[type='radio'][name='like']")
            expect(radio.getAttribute('value')).toEqual('true');

        var radio = $("input[type='radio'][name='dislike']");
            expect(radio.getAttribute('value')).toEqual('false');

    });

   // ******************************* Updating Value *******************************

    it('should update like/dislike when they already voted for like/dislike', function(){

        var radio = $("input[type='radio'][name='like']").click();

        LikeDislikeButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/rating/5');
        var radio = $("input[type='radio'][name='dislike']").click();

        LikeDislikeButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/rating/5');
        var numLikes = element(by.id('numLikes'));
        var numDislikes = element(by.id('numDislikes'));
        expect(numLikes.getText()).toMatch("0");
        expect(numDislikes.getText()).toMatch("1");

    });

    it('should update rating value when they already rated', function(){

        var radio = $("input[type='radio'][name='rating1']").click();

        RatingButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/rating/5');
        var radio = $("input[type='radio'][name='rating2']").click();

        RatingButton.click();
        browser.sleep(2000);

        browser.get('http://localhost:8080/#!/rating/5');

        var avgRating = element(by.id('avgRating'));
        expect(avgRating.getText()).toMatch("2");

    });

    it('Total comment number should change after user commented', function(){

        browser.get('http://localhost:8080/#!/rating/8');
        comment.sendKeys('This rating helped me so much !!!');
        CommentButton.click();
        browser.sleep(2000);

        var totalComment = element.all(by.id('totalComment'));
        expect(totalComment.getText()).toMatch("1");
         
    });

});



