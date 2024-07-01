

import React from 'react'
import {assets} from "../assets/assets"

function Footer() {
  return (
    <>
     <div className="footer">
         <div className="footer-content">
             <div className="footer-content-left">
                <div className="footer-content-logo">
                    <img src={assets.logo} alt="" />
                    <h2>Foodie</h2>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rem voluptas dicta repellat ratione vel quod quasi perspiciatis maiores dolor expedita at nisi ut dolorum praesentium, perferendis quos. Inventore, magni?</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
             </div>
             
             <div className="footer-content-center">
                 <h2>COMPANY</h2>
                 <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                 </ul>
             </div>
             
             <div className="footer-content-right">
                <h2>GET IN TOUCH </h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@foodie.com</li>
                </ul>
             </div>
         </div>
         <hr />
         <p className="footer-copyright">
            Copyright 2024 @ Foodie.com - All Right Reserved.
         </p>
     </div>
    </>
  )
}

export default Footer