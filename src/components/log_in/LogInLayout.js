import React, { Component } from 'react';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import "./Login.css";

class LogInLayout extends Component {  

  constructor(props) {
    super(props);
      this.state = {
        email: "",
        password: ""
      };
  }
  validateForm() {
  return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value
  });
  }

  handleSubmit = event => {
  event.preventDefault();
    }

  //alert 
  alertFunction(){
    alert("This is an alert!");
  }

  render() {
      return (
        <div className="Login" >
          <form className="login-form" onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="username@usc.edu"
              value={this.state.email}
              onChange={this.handleChange}
            />
           </FormGroup>
          <FormGroup 
            controlId="password" 
            bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="********"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick = {this.alertFunction}
          >
            Login
          </Button>
        </form>
       </div>
      );
    }
}

export default LogInLayout; 

