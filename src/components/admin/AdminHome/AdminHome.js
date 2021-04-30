import React, { Component } from "react";
import Footer from "../../../components/Footer/Footer";

import AdminMenu from "../../admin/AdminMenu/AdminMenu";
import AdminHeader from "../../admin/AdminHeader/AdminHeader";

import GetConfigDetailsService from "../../admin/services_for_admin/GetConfigDetailsService";
import EditConfigDetailsService from "../../admin/services_for_admin/EditConfigDetailsService";
import MessageModal from "../../MessageModal/MessageModal";

import "./AdminHome.css";

class AdminHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      FINE_PER_DAY: "",
      NO_OF_DAYS_A_USER_CAN_KEEP_A_BOOK: "",
      NUMBER_OF_BOOKS_PER_USER: "",
      editStatus: false,
      showMessageModal: false,
      message: ""
    };

    this.editDetails = this.editDetails.bind(this);
    this.saveDetails = this.saveDetails.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // Get Config Details
    GetConfigDetailsService("config").then(result => {
      let responseJSON = result[1];

      this.setState({
        FINE_PER_DAY: responseJSON.FINE_PER_DAY,
        NO_OF_DAYS_A_USER_CAN_KEEP_A_BOOK:
          responseJSON.NO_OF_DAYS_A_USER_CAN_KEEP_A_BOOK,
        NUMBER_OF_BOOKS_PER_USER: responseJSON.NUMBER_OF_BOOKS_PER_USER
      });
    });
  }

  closeModal() {
    this.setState({
      showMessageModal: !this.state.showMessageModal
    });
    window.location.reload();
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editDetails() {
    this.setState({
      editStatus: !this.state.editStatus
    });
  }

  saveDetails() {
    let userData = {
      FINE_PER_DAY: this.state.FINE_PER_DAY,
      NO_OF_DAYS_A_USER_CAN_KEEP_A_BOOK: this.state
        .NO_OF_DAYS_A_USER_CAN_KEEP_A_BOOK,
      NUMBER_OF_BOOKS_PER_USER: this.state.NUMBER_OF_BOOKS_PER_USER
    };
    if (this.state.editStatus) {
      if (
        this.state.FINE_PER_DAY &&
        this.state.NO_OF_DAYS_A_USER_CAN_KEEP_A_BOOK &&
        this.state.NUMBER_OF_BOOKS_PER_USER
      ) {
        EditConfigDetailsService("config", userData).then(result => {
          let responseJSON = result[1];
          let status = result[0];

          let successStatus = /^[2][0][0-9]$/;
          let errorStatus = /^[4][0][0-9]$/;
          if (successStatus.test(status)) {
            this.setState({
              showMessageModal: !this.setState.showMessageModal,
              message: "You have successfully edited the details"
            });
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

          this.setState({
            editStatus: !this.state.editStatus
          });
        });
      } else {
        this.setState({
          showMessageModal: !this.setState.showMessageModal,
          message: "Fill all the fields"
        });
      }
    } else {
      this.setState({
        showMessageModal: !this.setState.showMessageModal,
        message: "Click edit button to edit the details"
      });
    }
  }
  render() {
    return (
      <div className="main-component-div">
        <AdminHeader />

        <section>
          <AdminMenu />
          <h2> Edit Configuration Details</h2>
          <hr />
          <div className="edit-configuration-main-container">
            <div className="edit-configuration-div">
              <div className="edit-configuration-details">
                <label> Fine per day </label>
                {!this.state.editStatus ? (
                  <ConfigDiv value={this.state.FINE_PER_DAY} />
                ) : (
                  <input
                    type="text"
                    name="FINE_PER_DAY"
                    onChange={this.changeHandler}
                  />
                )}
              </div>

              <div className="edit-configuration-details">
                <label> Days a user can keep a book </label>
                {!this.state.editStatus ? (
                  <ConfigDiv
                    value={this.state.NO_OF_DAYS_A_USER_CAN_KEEP_A_BOOK}
                  />
                ) : (
                  <input
                    type="text"
                    name="NO_OF_DAYS_A_USER_CAN_KEEP_A_BOOK"
                    onChange={this.changeHandler}
                  />
                )}
              </div>

              <div className="edit-configuration-details">
                <label> No of books per user </label>
                {!this.state.editStatus ? (
                  <ConfigDiv value={this.state.NUMBER_OF_BOOKS_PER_USER} />
                ) : (
                  <input
                    type="text"
                    name="NUMBER_OF_BOOKS_PER_USER"
                    onChange={this.changeHandler}
                  />
                )}
              </div>
              <div className="edit-configuration-details">
                <button onClick={this.editDetails}> Edit / See Details </button>
                <button onClick={this.saveDetails}> Save</button>
              </div>
            </div>
          </div>

          {this.state.showMessageModal ? (
            <MessageModal
              message={this.state.message}
              closeModal={this.closeModal}
            />
          ) : null}
        </section>

        <div className="footer-part">
          <Footer />
        </div>
      </div>
    );
  }
}

const ConfigDiv = props => {
  return <div>{props.value}</div>;
};

export default AdminHome;
