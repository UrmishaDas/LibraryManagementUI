import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./AdminHeader.css";

import UserDetailsService from "../../../services/UserDetailsService";

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.clickHomePage = this.clickHomePage.bind(this);
  }

  clickHomePage() {
    this.props.history.push("/admin/home");
  }

  logout() {
    this.props.history.push("/adminLogin");
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
