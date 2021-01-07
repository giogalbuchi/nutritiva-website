import React from "react";
import aboutImg from "../../../static/assets/images/about.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function() {
    return (
        <div className="about-container">
            <div className="content-page-wrapper">

                <div className="about-title one column">
                    <p>we are</p> NUTRITIVA
                </div>

                <div className="about-content">

                    <div className='left-column'>
                        <img src={aboutImg} alt="nutritiva"/>
                    </div>


                    <div className="right-column">
                        <p><strong>Nutritiva </strong>was born by the desire for other people to be able to experience the pleasure for healthy food. <br />Many times, we hear about people suffering because they are going through restrictive diets, when in fact, is not necessary. The safest path will always be to make small changes over time in our daily nutrition with the integration of healthy habits.<br /> <br /><strong>Our purpose</strong> from day one was and is for people to be able to eat healthily without stress nor pain in their attempt. On the contrary, so that they are able to enjoy homemade, tasty and healthy food.</p>
                    </div>
                </div>

                <div className="social-media-section one-column">
                    <div className="social-text"><p className="cursive">find us</p>here too!</div> 
                    <a href="https://www.facebook.com/Nutritiva-102825981535863" className="social-icon"><FontAwesomeIcon icon={['fab', 'facebook-square']} /></a>
                    <a href="https://www.instagram.com/nutritiva.hermanas/" className="social-icon"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
                </div>

            </div>
            <div className="copyright">Copyright © Giovanni Galbuchi 2021</div>
        </div>
    )
}