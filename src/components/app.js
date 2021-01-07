import React, { Component } from 'react';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from "./icons";
import {faFacebookSquare, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth } from '../firebase';

library.add(faFacebookSquare, faInstagram, faGoogle);

import NavigationContainer from './navigation-container';
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact';
import Blog from './pages/blog';
import BlogManager from './pages/blog-manager';
import Auth from "./pages/auth";
import NoMatch from './pages/no-match';
import BlogDetail from './blog-detail';
import { library } from '@fortawesome/fontawesome-svg-core';
import AdminPage from './pages/admin-page';

export default class App extends Component { 
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      dark: false,
      user: '',
      isAdmin: 'no'
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);

    this.changeTheme = this.changeTheme.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
    
  }

  changeTheme() {
    this.setState({ dark: !this.state.dark });
  }

  checkLoginStatus() {
    auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          const userAdmin = idTokenResult.claims.admin
          if (userAdmin === true) {
            this.setState({
              isAdmin: 'yes'
            })
          } else {
            this.setState({
              isAdmin: 'no'
            })
          }
        })
        console.log('user logged in: ', user);
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: user.email
        });
      } else {
        console.log('user logged out');
        this.setState({
          loggedInStatus: 'NOT_LOGGED_IN'
        });
      }
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [<Route  key="blog-manager" path="/blog-manager" component={BlogManager} />, <Route 
    path='/admin' 
    render={props => ( 
      <AdminPage
        userEmail={this.state.user}
      />
    )}
  /> ];
  }

  render() {
    return (
        <div className={'theme ' + (this.state.dark ? 'theme--dark' : 'theme--default')}>
          <div className='container'>
            <Router>
              <div>
                <NavigationContainer {...this.props} changeTheme={this.changeTheme} isAdmin={this.state.isAdmin} loggedInStatus={this.state.loggedInStatus} handleSuccessfulLogout={this.handleSuccessfulLogout} history={this.history} />

                <Switch>
                  <Route exact path="/" component={Home} />

                  <Route 
                    path='/auth' 
                    render={props => ( 
                      <Auth
                        {...props}
                        handleSuccessfulLogin={this.handleSuccessfulLogin}
                        handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                      />
                    )}
                  /> 

                  <Route path='/about-me' component={About} />
                  <Route path='/login' component={Contact} />
                  {/* <Route path='/auth' component={<Blog loggedInStatus={this.state.loggedInStatus} />} />  */}
                  <Route 
                    path='/blog' 
                    render={props => ( 
                      <Blog
                        loggedInStatus={this.state.loggedInStatus}
                      />
                    )}
                  /> 
                  {/* <Route path='/blog' component={Blog} /> */}
                  {/* <Route path="/b/:slug" component={BlogDetail}/> */}
                  <Route 
                    path='/b/:slug' 
                    render={props => ( 
                      <BlogDetail
                        {...props}
                        isAdmin = {this.state.isAdmin}
                      />
                    )}
                  /> 
                    
                  

                  {this.state.loggedInStatus === "LOGGED_IN" ? (
                    this.authorizedPages()
                  ) : null}
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </Router>

          </div>
        </div>
    );
  }
}
