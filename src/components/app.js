import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

library.add(faMoon, faSun);

import NavigationContainer from './navigation-container';
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact';
import Blog from './pages/blog';
import NoMatch from './pages/no-match';

export default class App extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      dark: false
    };

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
    this.setState({ dark: !this.state.dark });
  }

  render() {
    return (
      <div className={'theme ' + (this.state.dark ? 'theme--dark' : 'theme--default')}>
        <div className='container'>
          <Router>
            <div>
              <NavigationContainer {...this.props} changeTheme={this.changeTheme} />

              <Switch>
                <Route exact path="/" component={Home} />
                <Route path='/about-me' component={About} />
                <Route path='/contact' component={Contact} />
                <Route path='/blog' component={Blog} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>

        </div>
      </div>
    );
  }
}
