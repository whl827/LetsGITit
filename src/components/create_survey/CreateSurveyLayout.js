import React, { Component } from 'react';

import {Card, CardTitle, TextField, Subheader, DatePicker, RaisedButton, Toggle} from 'material-ui';

class CreateSurveyLayout extends Component {  
	constructor(props){
		super(props);
	}


	

	render() {
	    return (
	    	<div>
	    		<Card className="form">
	    			<CardTitle title="Create A Poll" />
			   		<TextField
			   		 	floatingLabelText="Title"
	    			/>
	    			<br/>
	    			<TextField
			   		 	floatingLabelText="Option"
	    			/>
	    			<DatePicker
			            floatingLabelText="Start Date"
			        />
			        <DatePicker
			            floatingLabelText="End Date"
			        />


			        <Toggle
				    	label="Post Anonymously"
				    />


				    <TextField
			   		 	floatingLabelText="Tags"
	    			/>
	    			<br/>


			         <RaisedButton
				    	className="button-margin"
						label="Cancel"
						labelPosition="before"
				    />
			        <RaisedButton
			        	className="button-margin"
						label="Create"
						labelPosition="before"
						primary={true}
				    />

			    </Card>
		  </div>
	    );
  	}
}

export default CreateSurveyLayout; 
