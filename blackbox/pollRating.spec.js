describe('Poll Rating Page', function(){

    var LikeDislikeButton;
    var CommentButton;
    var LikeDislikeErrorMessage;
    var CommentErrorMessage;

    //Checking for Error messages 
    //1. should not allow a guest user to vote 
    //2. should not allow a guest user to rate
    //3. should not allow a guest user to comment

    beforeEach(function (){

        //go to poll page before each case starts
        browser.get('http://localhost:8080/#!/poll/1');
        LikeDislikeButton = element(by.id('LikeDislikeButton'));
        CommentButton = element(by.id('CommentButton'));
        LikeDislikeErrorMessage = element(by.id("LikeDislikeErrorMessage"));
        CommentErrorMessage = element(by.id("CommentErrorMessage"));

        browser.manage().addCookie({name:'username', value: 'user2'});
        browser.manage().addCookie({name:'userID', value: '2'});
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

     it('should now allow a user to submit an empty like/dislike', function(){

     	// var likeInput = element(by.model('likeInput'));
     	// var dislikeInput = element(by.model('dislikeInput'));
     	LikeDislikeButton.click();
    	browser.sleep(2000);
		expect(LikeDislikeErrorMessage.getText()).toMatch("Please choose the like/dislike value");
     });

     it('should now allow a user to submit an empty comment', function(){

		// var comment = element(by.model('commentInput'));
  //    	comment.sendKeys(" ");
    	browser.sleep(2000);
		expect(CommentErrorMessage.getText()).toMatch("Please leave a comment");
     });





});