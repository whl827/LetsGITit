
describe('Create Poll Page', function(){

	beforeEach(function (){
		
        browser.get('http://localhost:8080/#!/createPoll');

	});	

	it('should give you an error message if title is empty and you click create button', function(){

		var variable = element(by.id('vienfusdkfsnb'));
		
		//create_button.click();
		// var title = ptor.findElement(protractor.by.model("pollTitleInput"));
		//expect(errorMessage).toMatch("Please provide a title for your survey.");
		expect(variable.getText()).toMatch("TESTVALUE");
        
        // variable.getText().then(function (text) {
        //     console.log("HIHIHI::: " + text);
        // });


	});

});