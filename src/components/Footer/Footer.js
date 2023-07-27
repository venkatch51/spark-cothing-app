// importing the necassary components
import React from 'react';
import MenuList from '../MenuList/MenuList';

// Footer Component
const Footer = () => {
  // copyright Year
  const copyrightYear = '2022';
  return (
    <>
      <footer className="bg-body-tertiary">
        <div className="row mt-3">
          <div className="col-md-4">
            {/* Free Shipping section */}
            <div>
              <h4 className="pt-4">FREE SHIPPING AND RETURN</h4>
              <p className="card-text">
                Free shipping on all orders over RS.499
              </p>
            </div>
          </div>
          <div className="col-md-4">
            {/* Money Back Gurantee section */}
            <div>
              <h4 className="pt-4">MONEY BACK GURANTEE</h4>
              <p className="card-text">100% money back gurantee</p>
            </div>
          </div>
          <div className="col-md-4">
            {/* Online support section */}
            <div>
              <h4 className="pt-4 ">ONLINE SUPPORT 24/7</h4>
              <p className="card-text">Reach us out anytime</p>
            </div>
          </div>
        </div>
        <div className="row footer-border">
          <div className="col-md-4">
            {/* MenuList Component where all the Menu items are coming in */}
            <MenuList />
            <ul className="footer-icons">
              <li className="icons-one">
                <i className="fa fa-facebook-official" aria-hidden="true"></i>
              </li>
              <li className="icons-two">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </li>
              <li className="icons-three">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </li>
              <li className="icons-four">
                <i className="fa fa-whatsapp" aria-hidden="true"></i>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            {/* Copyright */}
            <p className="mt-0 mb-0">
              Copyright {copyrightYear} | MyShop
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
