import React from "react";
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
                        Explain what will get better in cooking or eating 
                    </div>
                </div>
                <div className="fitness-benefit">
                    <div className="fitness-left-column">
                        <h2>COOK BETTER TO LOOK BETTER</h2>
                        Explain what will get better in fitness.
                    </div>
                    <div className="fitness-right-column">
                        <img src={FitnessImg} alt="fitness"/>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <div className="recipes-feature">
                    <div className="recipes-left-column">
                        Nice button of recipes (filter)
                    </div>
                    <div className="recipes-right-column">
                        Explain what recipes will find
                    </div>
                </div>
                <div className="facts-feature">
                    <div className="facts-left-column">
                        Nice button of facts (filter)
                    </div>
                    <div className="facts-right-column">
                        Explain what kind of facts we have
                    </div>
                </div>
            </div>
        </div>
    );
}