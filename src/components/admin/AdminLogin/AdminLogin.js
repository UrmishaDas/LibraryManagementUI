import React, { Component } from "react";
import "./AdminLogin.css";
import { withRouter, Redirect } from "react-router-dom";
import LoginService from "../../../services/LoginService";
import MessageModal from "../../MessageModal/MessageModal";

class AdminLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      redirect: false,
      showMessageModal: false,
      message: ""
    };

    this.pressLogin = this.pressLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clickTitle = this.clickTitle.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      showMessageModal: !this.state.showMessageModal
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  clickTitle() {
    this.props.history.push("/");
  }

  pressLogin() {
    if (this.state.username && this.state.password) {
      if (this.state.username == "admin" && this.state.password == "library") {
        this.props.history.push("/admin/home");
      } else {
        this.setState({
          showMessageModal: !this.setState.showMessageModal,
          message: "Incorrect Credentials"
        });
      }
    } else {
      this.setState({
        showMessageModal: !this.setState.showMessageModal,
        message: "Enter the Credentials"
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/userHome"} />;
    }

    if (sessionStorage.getItem("session_username")) {
      return <Redirect to={"/userHome"} />;
    }
    return (
      <div>
        <div className="loginLeftDiv" onClick={this.clickTitle}>
          <h1 id="mainTitle">Million Pages</h1>
        </div>

        <div className="loginRightDiv">
          <div className="loginParentDiv">
            <label id="id_label"> Admin </label>
            <div className="LoginFormDiv">
              <div className="loginForm">
                <label>
                  <input
                    id="id_username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.onChange}
                  />
                </label>

                <label>
                  <input
                    id="id_password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </label>

                <div className="loginButtons">
                  <button id="id_adminLogin" onClick={this.pressLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.showMessageModal ? (
          <MessageModal
            message={this.state.message}
            closeModal={this.closeModal}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(AdminLogin);
