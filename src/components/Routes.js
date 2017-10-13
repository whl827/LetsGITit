import React from 'react'
import { Switch, Route, IndexRoute } from 'react-router-dom'

import CreateSurveyLayout from './create_survey/CreateSurveyLayout';
import SignUpLayout from './sign_up/SignUpLayout';
import Profile from './profile/ProfileLayout';
import LogInLayout from './log_in/LogInLayout';

const Routes = () => (
	<main>
		<Switch>
			<Route exact path='/' component={CreateSurveyLayout}/>
			<Route path='/profile' component={Profile}/>
			<Route path='/sign_up' component={SignUpLayout}/>
			<Route path='/log_in' component={LogInLayout}/>

		</Switch>
	</main>
);

export default Routes;


/* 			<Route path='/history/:value' component={DroneHistoryLayout}/>
 */