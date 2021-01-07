import React, { Component } from "react";
import { auth, provider } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    handleGoogleLogin(event) {
        event.preventDefault();
        console.log('Click Google working')
        auth.signInWithPopup(provider).then(cred => {
            console.log('google went well')
            this.props.handleSuccessfulAuth();
        }).catch(error => {
            console.log('google went wrong', error)
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = this.state.email
        const password = this.state.password
        
        auth.signInWithEmailAndPassword(email, password).then(cred => {
            this.props.handleSuccessfulAuth();
        }).catch(error => {
            this.setState({
                errorText: error.message
            })
        })
    }

  render() {
    return (
      <div className="login-container one-column">
        <h1 className="login-msg one-column">LOGIN TO ACCESS</h1>

        <form className="login-form one-column" onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} />
          <input type="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.handleChange} />
          <div className="login-button">
              <button className="btn" type="submit">Login</button>
          </div>
        </form>
        <div className="error-text one-column">{this.state.errorText}</div>
        <div className="login-button">
              <button className="btn" type="button" onClick={this.handleGoogleLogin}>Login with Google <FontAwesomeIcon icon={['fab', 'google']} /></button>
          </div>
      </div>
    );
  }
}