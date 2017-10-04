import React from 'react'
import { Switch, Route, IndexRoute } from 'react-router-dom'

import CreateSurveyLayout from './create_survey/CreateSurveyLayout';
import SignInLayout from './sign_in/SignInLayout';
import Profile from './profile/ProfileLayout';

const Routes = () => (
	<main>
		<Switch>
			<Route exact path='/' component={CreateSurveyLayout}/>
			<Route path='/profile' component={Profile}/>
			<Route path='/sign_in' component={SignInLayout}/>

		</Switch>
	</main>
);

export default Routes;


/* 			<Route path='/history/:value' component={DroneHistoryLayout}/>
 */