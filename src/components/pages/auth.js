import React, { Component } from "react";
import Login from "../auth/login";
import Signup from "../auth/signup";

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    }


    handleSuccessfulAuth() {
        this.props.handleSuccessfulLogin();
        this.props.history.push("/");
    }


    handleUnsuccessfulAuth() {
        this.props.handleUnsuccessfulLogin();
    }

  render() {
    return (
        <div className='auth-page-wrapper'>
            <div className='left-column'>
                <Signup handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </div>

            <div className='right-columm'>
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </div>
        </div>
    );
  }
}