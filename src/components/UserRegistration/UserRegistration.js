import React, { Component } from "react";
import "./UserRegistration.css";

import { withRouter } from "react-router-dom";
import RegisterService from "../../services/RegisterService";
import MessageModal from "../MessageModal/MessageModal";

class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      favGenre: "",
      showMessageModal: false,
      message: ""
    };

    this.pressLogin = this.pressLogin.bind(this);
    this.clickTitle = this.clickTitle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.pressRegistration = this.pressRegistration.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      showMessageModal: !this.state.showMessageModal
    });
  }

  pressLogin() {
    this.props.history.push("/userLogin");
  }

  clickTitle() {
    this.props.history.push("/");
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  pressRegistration() {
    let userData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      favGenre: this.state.favGenre
    };
    if (
      this.state.firstname &&
      this.state.lastname &&
      this.state.email &&
      this.state.username &&
      this.state.password &&
      this.state.favGenre
    ) {
      RegisterService("users", userData).then(result => {
        let status = result[0];
        let responseJSON = result[1];

        let successStatus = /^[2][0][0-9]$/;
        let errorStatus = /^[4][0][0-9]$/;
        if (successStatus.test(status)) {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message:
              "Thankyou for registering with us!!!! Go and login with your username and password."
          });
          //this.props.history.push("/userLogin");
        } else if (errorStatus.test(status)) {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: responseJSON.errorMessage
          });
        } else {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: "Invalid Input. Please enter valid input"
          });
        }
      });
    } else {
      this.setState({
        showMessageModal: !this.setState.showMessageModal,
        message: "Enter all the fields"
      });
    }
  }

  render() {
    return (
      <div>
        <div className="loginLeftDiv1" onClick={this.clickTitle}>
          <h1 id="mainTitle">Million Pages</h1>
        </div>

        <div className="loginRightDiv1">
          <div className="loginParentDiv1">
            <label id="id_label1"> Register </label>

            <div className="loginForm1">
              {/* First Name */}
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={this.onChange}
              />

              {/* Last Name */}
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={this.onChange}
              />

              {/* Email */}
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.onChange}
              />

              {/* Username */}
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.onChange}
              />

              {/* Password */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.onChange}
              />

              {/* Favourite Genre */}
              <input
                type="text"
                name="favGenre"
                placeholder="Favourite Genre"
                onChange={this.onChange}
              />

              <div className="loginButtons1">
                <button id="id_newUser1" onClick={this.pressRegistration}>
                  Register
                </button>
                <button id="id_login1" onClick={this.pressLogin}>
                  Cancel
                </button>
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

export default withRouter(UserRegistration);
