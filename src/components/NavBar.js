import React from 'react';
import { Link, NavLink  } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
	  
const NavBar = () => (
	<Navbar>
		<Navbar.Header>
			<Navbar.Brand>
				<a href="#">KnowItAll!</a>
			</Navbar.Brand>
		</Navbar.Header>
		<Nav>
			<NavItem><NavLink exact to='/'>TEST</NavLink></NavItem>
			<NavItem><NavLink to='/profile'>PROFILE</NavLink></NavItem>
			<NavItem><NavLink to='/log_in'>LOG IN</NavLink></NavItem>
			<NavItem><NavLink to='/sign_up'>SIGN UP</NavLink></NavItem>
			<NavItem href="#">SEARCH BAR HERE</NavItem>
		</Nav>
	</Navbar>

);

export default NavBar;

