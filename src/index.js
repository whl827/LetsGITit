import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavBar from './components/NavBar';
import Routes from './components/Routes.js';

import { BrowserRouter } from "react-router-dom";

const App = () => (
  <MuiThemeProvider>
  	<div>
	   	<NavBar />
	   	<Routes />
   	</div>
  </MuiThemeProvider>
);
 
ReactDOM.render(
  <BrowserRouter ><App /></BrowserRouter>,
  document.getElementById('root')
);



