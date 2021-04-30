import React, { Component } from "react";
import "./UserLogin.css";
import { withRouter, Redirect, Link } from "react-router-dom";
import LoginService from "../../services/LoginService";
import MessageModal from "../MessageModal/MessageModal";

class UserLogin extends Component {
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
    this.pressNewUser = this.pressNewUser.bind(this);
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

  pressNewUser() {
    this.props.history.push("/userRegister");
  }

  pressLogin() {

    //this.setState({ redirect: true });
    if (this.state.username && this.state.password) {
      LoginService("userlogin", this.state).then(result => {
        let status = result[0];
        let responseJSON = result[1];

        if (responseJSON.authenticated) {
          sessionStorage.setItem("session_username", this.state.username);
          this.setState({ redirect: true });
        } else {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: "Incorrect Credentials"
          });
        }
      });
      
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
            <label id="id_label"> Login </label>
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
                  <button id="id_newUser" onClick={this.pressNewUser}>
                    New User
                  </button>
                  <button id="id_login" onClick={this.pressLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>

            <div className="loginForgetPasswordDiv">
              <Link id="id_lostPwd" to="/resetPassword">
                Lost your Password?
              </Link>
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

export default withRouter(UserLogin);
