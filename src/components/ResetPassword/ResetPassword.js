import React, { Component } from "react";
import "./ResetPassword.css";
import { withRouter, Redirect } from "react-router-dom";
import ResetPasswordService from "../../services/ResetPasswordService";
import MessageModal from "../MessageModal/MessageModal";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      showMessageModal: false,
      message: ""
    };

    this.pressReset = this.pressReset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.pressCancel = this.pressCancel.bind(this);
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

  pressCancel() {
    this.props.history.push("/userLogin");
  }

  pressReset() {
    if (
      this.state.username &&
      this.state.password &&
      this.state.confirmPassword
    ) {
      if (this.state.password == this.state.confirmPassword) {
        let userData = {
          password: this.state.password
        };

        let type = "users/" + this.state.username;
        ResetPasswordService(type, userData).then(result => {
          let responseJSON = result[1];
          let status = result[0];
          alert("Your password has been reset. Login with your new password");
          this.props.history.push("/userLogin");
        });
      } else {
        alert(
          "Password and confirm password does not match. Please enter again."
        );
      }
    } else {
      alert("Enter all the fields.");
    }
    // if (this.state.username && this.state.password) {
    //   LoginService("userlogin", this.state).then(result => {
    //     let status = result[0];
    //     let responseJSON = result[1];
    //     if (responseJSON.authenticated) {
    //       sessionStorage.setItem("session_username", this.state.username);
    //       this.setState({ redirect: true });
    //     } else {
    //       this.setState({
    //         showMessageModal: !this.setState.showMessageModal,
    //         message: "Incorrect Credentials"
    //       });
    //     }
    //   });
    // } else {
    //   this.setState({
    //     showMessageModal: !this.setState.showMessageModal,
    //     message: "Enter the Credentials"
    //   });
    // }
  }

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={"/userHome"} />;
    // }

    // if (sessionStorage.getItem("session_username")) {
    //   return <Redirect to={"/userHome"} />;
    // }
    return (
      <div>
        <div className="ResetPasswordLeftDiv" onClick={this.clickTitle}>
          <h1 id="mainTitle">Million Pages</h1>
        </div>

        <div className="ResetPasswordRightDiv">
          <div className="ResetPwdParentDiv">
            <label id="id_label"> Reset Password </label>
            <div className="ResetPwdFormDiv">
              <div className="ResetPwdForm">
                <label>
                  <input
                    id="id_username1"
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={this.onChange}
                  />
                </label>
                <label>
                  <input
                    id="id_password1"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </label>

                <label>
                  <input
                    id="id_confirmPwd"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={this.onChange}
                  />
                </label>

                <div className="ResetButtons">
                  <button id="id_resetPwd" onClick={this.pressReset}>
                    Reset
                  </button>
                  <button id="id_cancel" onClick={this.pressCancel}>
                    Cancel
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

export default withRouter(ResetPassword);
