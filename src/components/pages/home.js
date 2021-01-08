import React from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import heroImg from '../../../static/assets/images/hero.jpg';
import CookingImg from '../../../static/assets/images/cooking2.jpg';
import FitnessImg from '../../../static/assets/images/fitness.jpg';

export default function() {
    return (
        <div className="home-container">
            <div className="hero-section" style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImg})`
                }}>
                <div className="hero-left-column">
                    <div className="headline">
                        <div id="nutrition">NUTRITION</div>
                        <div id="meets">meets</div>
                        <span id="rotate"></span>
                    </div>
                    <div className="supporting-copy">
                        Nutritiva will help you get a better lifestyle, develop healthy habits and achieve a happier life.
                    </div>
                </div>
                <div className="hero-right-column" >
                </div>
            </div>

            <div className="benefits-section">
                <div className="benefits-title">WHY STAY WITH US?</div>
                <div className="cooking-benefit">
                    <div className="cooking-left-column">
                        <img src={CookingImg} alt="cooking"/>
                    </div>
                    <div className="cooking-right-column">
                        <h2>BAKE THE WORLD A BETTER PLACE</h2>
                         <p>In <strong>Nutritiva</strong> you will find super easy recipes that you can do in your own home. People looking for a healthier nutrition but find it hard to achieve, will find <strong>practical and simple</strong> ideas of how to make those small but constant changes in their day-to-day life.</p>
                    </div>
                </div>
                <div className="fitness-benefit">
                    <div className="fitness-left-column">
                        <h2>COOK BETTER TO LIVE BETTER</h2>
                        <p>Here you will learn cooking tips and at the same time suggestions to be <strong>healthier</strong>. You will soon learn that a healthy nutrition is possible without the need to disappoint your stomach nor your pocket. <br /> You will learn that eating in a <strong>Nutritiva</strong> way is possible, easy and, beautiful!
</p>
                    </div>
                    <div className="fitness-right-column">
                        <img src={FitnessImg} alt="fitness"/>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <div className="features-title">WHAT WILL YOU FIND?</div>
                <div className="recipes-feature">
                    <div className="recipes-left-column">
                    Want to learn new recipes to improve your cooking?
                    </div>
                    <div className="recipes-right-column">
                        <button className="recipes btn"><NavLink to="/blog" activeClassName="nav-link-active">RECIPES!</NavLink></button>
                    </div>
                </div>
                <div className="facts-feature">
                    <div className="facts-left-column">
                        Want to learn about healthy habits and nutrition?
                    </div>
                    <div className="facts-right-column">
                        <button className="facts btn"><NavLink to="/blog" activeClassName="nav-link-active">FACTS!</NavLink></button>
                    </div>
                </div>
            </div>

            <div className="social-media-section one-column">
                <div className="social-text"><p className="cursive">find us</p>here too!</div> 
                <a href="https://www.facebook.com/Nutritiva-102825981535863" className="social-icon"><FontAwesomeIcon icon={['fab', 'facebook-square']} /></a>
                <a href="https://www.instagram.com/nutritiva.hermanas/" className="social-icon"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
            </div>

            <div className="copyright">Copyright © Giovanni Galbuchi 2021</div>
        </div>
    );
}