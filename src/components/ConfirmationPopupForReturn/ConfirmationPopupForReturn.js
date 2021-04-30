import React, { Component } from "react";
import "./ConfirmationPopupForReturn.css";

import MessageModal from "../MessageModal/MessageModal";

import BooksReturnReissueService from "../../services/BooksReturnReissueService";

class ConfirmationPopupForReturn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessageModal: false,
      message: ""
    };
    this.returnBook = this.returnBook.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      showMessageModal: !this.state.showMessageModal
    });

    //window.location.reload();
  }

  returnBook() {
    //this.props.closePopup();
    // Calling the Return Book Service

    let bookId = sessionStorage.getItem("bookId_for_return");
    let bookIssueId = sessionStorage.getItem("bookIssueId_for_return");
    let type = "books/" + bookId + "/bookissue/" + bookIssueId;

    let userData = {
      operation: "RETURN"
    };
    BooksReturnReissueService(type, userData).then(result => {
      let status = result[0];
      let responseJSON = result[1];
      this.props.closePopup();

      let successStatus = /^[2][0][0-9]$/;
      if (successStatus.test(status)) {
        // this.setState({
        //   showMessageModal: !this.setState.showMessageModal,
        //   message: "Thankyou for returning the book. Keep taking more books."
        // });
        this.props.closePopup();
        alert("Thankyou for returning the book. Keep taking more books.");

        window.location.reload();
      } else {
        alert(responseJSON.errorMessage);
        this.props.closePopup();
        window.location.reload();
      }
    });
  }

  render() {
    return (
      <div className="main-popup-component">
        <p> {this.props.text}</p>
        <div className="btn-classes">
          <button onClick={this.returnBook}> Yes </button>
          <button onClick={this.props.closePopup}> No </button>
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

export default ConfirmationPopupForReturn;
