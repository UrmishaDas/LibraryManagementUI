import React, { Component } from "react";
import "./CheckDuesPopup.css";

class CheckDuesPopup extends Component {
  constructor(props) {
    super(props);

    this.pay = this.pay.bind(this);
  }

  pay() {
    // --- TO DO ---
    /**
     * Call the pay fine service to update the issueBook table
     * Reset the session storage value
     */
    this.props.payFine();
    sessionStorage.setItem("user_fine", 0);

    // alert("You have successfully paid the dues.");
    this.props.closePopup();
  }

  render() {
    if (this.props.checkDues != 0) {
      return (
        <div className="main-popup-component2">
          <h3> You have dues left. Please pay!! </h3>
          <div className="due-amt-classes2">
            <label> Amount </label>
            <div>{this.props.checkDues}</div>
          </div>

          <div className="btn-classes2">
            <button onClick={this.pay}> Pay </button>
            <button onClick={this.props.closePopup}> Close </button>
          </div>
        </div>
      );
    }
    return (
      <div className="main-popup-component2">
        <p> You have no dues left </p>
        <div className="btn-classes2">
          <button onClick={this.props.closePopup}> Close </button>
        </div>
      </div>
    );
  }
}

export default CheckDuesPopup;
