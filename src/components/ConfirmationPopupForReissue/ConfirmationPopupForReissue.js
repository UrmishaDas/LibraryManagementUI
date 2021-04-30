import React, { Component } from "react";
import "./ConfirmationPopupForReissue.css";

import BooksReturnReissueService from "../../services/BooksReturnReissueService";

class ConfirmationPopupForReturn extends Component {
  constructor(props) {
    super(props);

    this.reissueBook = this.reissueBook.bind(this);
  }

  reissueBook() {
    // Calling the Return Book Service

    let bookId = sessionStorage.getItem("bookId_for_return");
    let bookIssueId = sessionStorage.getItem("bookIssueId_for_return");
    let type = "books/" + bookId + "/bookissue/" + bookIssueId;

    let userData = {
      operation: "REISSUE"
    };
    BooksReturnReissueService(type, userData).then(result => {
      let status = result[0];
      let responseJSON = result[1];
      this.props.closePopup();

      var successStatus = /^[2][0][0-9]$/;
      if (successStatus.test(status)) {
        alert(" Book is re-issued");
        this.props.closePopup();
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
          <button onClick={this.reissueBook}> Yes </button>
          <button onClick={this.props.closePopup}> No </button>
        </div>
      </div>
    );
  }
}

export default ConfirmationPopupForReturn;
