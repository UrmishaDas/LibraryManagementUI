import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

class MainPage1 extends Component {
  constructor(props) {
    super(props);

    this.pressAdmin = this.pressAdmin.bind(this);
    this.pressUser = this.pressUser.bind(this);
  }

  pressUser() {
    this.props.history.push("/userLogin");
  }

  pressAdmin() {
    this.props.history.push("/adminLogin");
  }

  render() {
    return (
      <div className="outer-div">
        <div className="main-class">
          <h1>
            Million<span>Pages</span>
          </h1>
          <div className="info-div">
            MillionPages gives you a variety of books to explore and issue. It
            is your online library.
          </div>
          {/* <div className="btn-classes"> */}
          <p className="btn-classes">
            <button onClick={this.pressAdmin}> Are you an Admin? </button>
            <button onClick={this.pressUser}> Hey User!! Please login</button>
          </p>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default MainPage1;
