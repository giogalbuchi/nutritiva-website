import React, {Component } from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../../static/assets/images/logo.png";
import { auth } from '../firebase';



export default class NavigationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moon: false
        };

        this.changeIcon = this.changeIcon.bind(this);
        this.handleChangeTheme = this.handleChangeTheme.bind(this);
        this.handleHamburger = this.handleHamburger.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this)
    }

    handleHamburger() {
        const center = document.getElementById('center');
        center.classList.toggle('active');
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

    handleSignOut() {
        auth.signOut().then(() => {
            console.log('user signed out');
            this.props.handleSuccessfulLogout();
        })
    };

    

    render() {
        return(
            <div>
                <div className="nav-wrapper">

                    <div className='left-side'>
                        <img src={logo} alt="Logo"/>
                    </div>

                    <div  id="center" className='center-side'>
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
                            <NavLink to="/blog" activeClassName="nav-link-active">
                                Blog
                            </NavLink>
                        </div> 
                        {this.props.loggedInStatus === "NOT_LOGGED_IN" ? (
                            this.dynamicLink("/auth", "Log In/Sign Up")
                        ) : null}
                        {this.props.loggedInStatus === "LOGGED_IN" && this.props.isAdmin === "yes" ? (
                            this.dynamicLink("/blog-manager", "Blog Manager")
                        ) : null}
                        {this.props.loggedInStatus === "LOGGED_IN" && this.props.isAdmin === "yes" ? (
                            this.dynamicLink("/admin", "Admin Page")
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
                            <a className="sign-out-icon" onClick={this.handleSignOut}><FontAwesomeIcon icon="sign-out-alt" /></a>
                        ) : null}
                    </div>

                    <a onClick={this.handleHamburger} className="toggle" id="navHamburger"><FontAwesomeIcon icon="bars" /></a>
                </div>
            </div>
        );

    }
}

    
