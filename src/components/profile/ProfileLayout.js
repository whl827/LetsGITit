import React, { Component } from 'react';

import {Card, CardTitle, FlatButton,List, ListItem, Divider, FloatingActionButton, Avatar} from 'material-ui';


import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import ContentAdd from 'material-ui/svg-icons/content/add';


import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';



class ProfileLayout extends Component {  
	constructor(props){
		super(props);
	}

	render() {
	    return (
	    	<div>
	    		<Card className="profile-top">
		    		<Avatar 
			        	src="https://www.what-dog.net/Images/faces2/scroll001.jpg" 
			        	size = {230}
			        	className = "inline"
			        />
			        <p className = "inline name"> Joyce Wang </p>
			    </Card>
			    <Card className="form">
	    			<Toolbar>
						<ToolbarGroup>
						<ToolbarTitle text="Recent Activity" />
						<FontIcon className="muidocs-icon-custom-sort" />
						
						<RaisedButton label="Create" primary={true} />
						

						<IconMenu
							className = "pullRight"
							iconButtonElement={
								<IconButton touch={true}>
									<ContentAdd />
								</IconButton>
							}
						>
							<MenuItem primaryText="Poll" />
							<MenuItem primaryText="Rating" />
						</IconMenu>
						

						</ToolbarGroup>
					</Toolbar>



	    			<List>
						<ListItem insetChildren={true}>
							<h3> action </h3>
							<p> time  </p>
						</ListItem>
					</List>
					<Divider inset={true} />
					<List>
						<ListItem insetChildren={true}>
							<h3> action </h3>
							<p> time  </p>
						</ListItem>
					</List>
					<Divider inset={true} />
					<List>
						<ListItem insetChildren={true}>
							<h3> action </h3>
							<p> time  </p>
						</ListItem>
					</List>
			   		

			    </Card>
		  </div>
	    );
  	}
}

export default ProfileLayout; 


/*
	    			<List>
					    <ListItem
					      disabled={true}
					      leftAvatar={
					        <Avatar 
					        	src="https://www.what-dog.net/Images/faces2/scroll001.jpg" 
					        	size = {100}
					        />
					      }
					    >
					    </ListItem>
					</List>


*/