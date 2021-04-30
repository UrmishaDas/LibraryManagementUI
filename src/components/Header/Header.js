import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./Header.css";

import UserDetailsService from "../../services/UserDetailsService";

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.clickHomePage = this.clickHomePage.bind(this);
  }

  clickHomePage() {
    this.props.history.push("/userHome");
  }

  logout() {
    sessionStorage.clear();
    this.props.history.push("/userLogin");
  }

  render() {
    const username = sessionStorage.getItem("session_username");
    return (
      <header className="header-title-bar">
        <div className="mainHeader_upperHeader">
          <div onClick={this.clickHomePage}>
            <h2>
              Million<span>Pages</span>
            </h2>
          </div>

          <div className="mainHeader_userDetails">
            <div className="dropdown">
              <button className="dropbtn">{username}</button>
              <div className="dropdown-content">
                <a href="#">Settings</a>
                <Link to="/userBooksIssued/booksIssued">Your Books</Link>
                <a href="#">Feedback</a>
              </div>
            </div>

            <button className="margin-right" onClick={this.logout}>
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  }
}


export default withRouter(Header);
