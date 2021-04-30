import React, { Component } from "react";
import "./Footer.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer-distributed">
          <div className="footer-left">
            <h3>
              Million<span>PAGES</span>
            </h3>

            <p className="footer-company-name">MillionPages &copy; 2019</p>
          </div>

          <div className="footer-center">
            <div>
              <i className="fa fa-envelope" />
              <p>
                <span>21 Revolution Street</span> Bengaluru, India
              </p>
            </div>

            <div>
              <i className="fa fa-phone" />
              <p>+91-8621896888</p>
            </div>

            <div>
              <p>
                <i className="fa fa-envelope" />
                <a href="mailto:support@company.com">
                  support@millionpages.com
                </a>
              </p>
            </div>
          </div>

          <div className="footer-right">
            <p className="footer-company-about">
              <span>About MillionPages</span>
              MillionPages gives you a variety of books to explore and issue. It
              is your online library.
            </p>

            <div className="footer-icons">
              <a href="#">
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={["fab", "linkedin"]} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={["fab", "github"]} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
