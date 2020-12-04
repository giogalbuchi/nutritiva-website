import React, {Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import logo from "../../static/assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default class NavigationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moon: false
        };

        this.changeIcon = this.changeIcon.bind(this);
        this.handleChangeTheme = this.handleChangeTheme.bind(this);
    }

    changeIcon() {
        this.setState({ moon: !this.state.moon });
    }

    handleChangeTheme() {
        this.props.changeTheme();
        this.changeIcon();
    }

    dynamicLink = (route, linkText) => {
        return (
            <div className="nav-link-wrapper">
                <NavLink to={route} activeClassName='nav-link-active'>
                    {linkText}
                </NavLink>
            </div>
        );
    }

    handleSignOut = () => {
        axios.delete("https://api.devcamp.space/logout", { withCredentials : true }).then(response => {
            if (response.status === 200) {
                window.location.reload(true);
                props.handleSuccessfulLogout();
            }
            return response.data;
        }).catch(error => {
            console.log("Error signing out", error);
        });
    };

    

    render() {
        return(
            <div>
                <div className="nav-wrapper">
                    <div className='left-side'>
                        <img src="../../static/assets/images/logo.png" alt="Logo"/>
                    </div>

                    <div className='center-side'>
                        <div className='nav-link-wrapper'>
                            <NavLink exact to="/" activeClassName="nav-link-active">
                                Home
                            </NavLink>
                        </div>
                        <div className='nav-link-wrapper'>   
                            <NavLink to="/about-me" activeClassName="nav-link-active">
                                About
                            </NavLink>
                        </div>
                        <div className='nav-link-wrapper'>
                            <NavLink to="/contact" activeClassName="nav-link-active">
                                Contact
                            </NavLink>
                        </div>
                        <div className='nav-link-wrapper'>
                            <NavLink to="/blog" activeClassName="nav-link-active">
                                Blog
                            </NavLink>
                        </div> 
                        {this.props.loggedInStatus === "LOGGED_IN" ? (
                            this.dynamicLink("/blog-manager", "Blog Manager")
                        ) : null}
                    </div>
                    
                    <div className='right-side'>
                        <a className="theme-toggle header-link" onClick={this.handleChangeTheme}>
                            <FontAwesomeIcon icon={this.state.moon ? 'sun' : 'moon'}/>
                        </a>
                        <div className='nutritiva-name'>
                            <h3>   Nutritiva</h3>
                        </div>
                        {this.props.loggedInStatus === "LOGGED_IN" ? (
                            <a className="sign-out-icon" onClick={this.handleSignOut.bind(this)}><FontAwesomeIcon icon="sign-out-alt" /></a>
                        ) : null}
                    </div>
                </div>
            </div>
        );

    }
}

    
