import React, { Component } from "react";
import { auth } from '../../firebase';


export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = this.state.email
        const password = this.state.password
        
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            this.props.handleSuccessfulAuth();
        }).catch(error => {
            this.setState({
                errorText: error.message
            })
        })
    }

  render() {
    return (
      <div>
        <h1 className="login-msg">SIGN UP!</h1>

        <form className="login-form one-column" onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} />
          <input type="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.handleChange} />
          <div className="login-button">
              <button className="btn" type="submit">Sign Up</button>
          </div>
        </form>
        <div className="error-text one-column">{this.state.errorText}</div>
      </div>
    );
  }
}