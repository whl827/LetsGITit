import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class SignInLayout extends Component {  

  constructor(props) {
    super(props);
      this.state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e){
    e.preventDefault();
    console.log(this.state); //pass to other function later
  }

  render() {
      return (
        <div className="SignUp" >
        <form className="signup-form" onSubmit={this.onSubmit}>
        
          <h2 className="signup-title">Join KnowItAll!</h2>

          
          <div className = "form-group">
            <label className = "control-label">UserName</label>
            <input
              value={this.state.username}
              onChange = {this.onChange}
              type = "text"
              name = "username"
              placeholder = "username"
              className="form-control"
              />
          </div>

          <div className = "form-group">
            <label className = "control-label">Email</label>
            <input
              value={this.state.email}
              onChange = {this.onChange}
              type = "text"
              name = "email"
              placeholder = "username@usc.edu"
              className="form-control"
              />
          </div>

           <div className = "form-group">
            <label className = "control-label">Password</label>
            <input
              value={this.state.password}
              onChange = {this.onChange}
              type = "password"
              name = "password"
              placeholder = "********"
              className="form-control"
              />
          </div>

           <div className = "form-group">
            <label className = "control-label">Password Confirmation</label>
            <input
              value={this.state.passwordConfirmation}
              onChange = {this.onChange}
              type = "password"
              name = "passwordConfirmation"
              placeholder = "********"
              className="form-control"
              />
          </div>

          <div className = "form-group">
            <button className = "btn btn-primary btn-lg">
              Sign Up
            </button>
          </div>

        </form>
        </div>
      );
    }
}

export default SignInLayout; 

