import React, { Component } from "react";
import "./ConfirmationPopup.css";

import DeleteBookService from "../services_for_admin/DeleteBookService";
import MessageModal from "../../MessageModal/MessageModal";

class DeleteConfirmationPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessageModal: false,
      message: ""
    };

    this.deleteBook = this.deleteBook.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({
      showMessageModal: !this.state.showMessageModal
    });
    window.location.reload();
  }

  deleteBook() {
    // Calling the Delete Book Service

    let bookId = sessionStorage.getItem("bookId_for_del");
    DeleteBookService("books/" + bookId).then(result => {
      this.setState({
        showMessageModal: !this.setState.showMessageModal,
        message: "You have successfully deleted the book."
      });

      this.props.closePopup();
    });
  }

  render() {
    return (
      <div className="main-popup-component">
        <p> {this.props.text}</p>
        <div className="btn-classes">
          <button onClick={this.deleteBook}> Yes </button>
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

export default DeleteConfirmationPopup;
