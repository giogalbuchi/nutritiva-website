import React, {Component } from 'react';


import ExamplesContainer from "../example-container";

export default class Blog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='blog-page'>
  
        {this.props.loggedInStatus === "LOGGED_IN" ? (
          <ExamplesContainer />
        ) : <div className="login-message">
            <h1>Log in/Sign Up to see our content!</h1>
          </div>  }
        
      </div>
    );
  }
  
}