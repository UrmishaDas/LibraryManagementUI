import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CheckDuesPopup from "../CheckDuesPopup/CheckDuesPopup";
import BookDetailsService from "../../services/BookDetailsService";
import IssueBookService from "../../services/IssueBookService";

import MessageModal from "../MessageModal/MessageModal";

import "./BookDetailsPage.css";

class BookDescriptionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
      showMessageModal: false,
      message: "",
      bookDetails: {},
      payFineStatus: false
    };

    this.checkDues = this.checkDues.bind(this);
    this.clickPreviousToCategory = this.clickPreviousToCategory.bind(this);
    this.issueBook = this.issueBook.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.payFine = this.payFine.bind(this);
  }
  closeModal() {
    this.setState({
      showMessageModal: !this.state.showMessageModal
    });
  }

  componentDidMount() {
    const bookId = sessionStorage.getItem("bookId");

    // Calling Book Details Service
    BookDetailsService("books/" + bookId).then(result => {
      let responseJSON = result[1];

      this.setState({
        bookDetails: responseJSON
      });
    });
  }

  clickPreviousToCategory() {
    this.props.history.push("/category");
  }

  checkDues() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  payFine() {
    this.setState({
      payFineStatus: true
    });
  }

  issueBook() {
    if (sessionStorage.getItem("user_fine") == 0) {
      //Calling Issue Book service
      let username = sessionStorage.getItem("session_username");
      let userData = {
        userName: username
      };

      let bookid = sessionStorage.getItem("bookId");
      let type = "books/" + bookid + "/bookissue";
      IssueBookService(type, userData).then(result => {
        let status = result[0];
        let responseJSON = result[1];

        let successStatus = /^[2][0][0-9]$/;
        let errorStatus = /^[4][0][0-9]$/;

        if (successStatus.test(status)) {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: "Thankyou for issuing the book!!!",
            payFineStatus: false
          });
        }
        if (errorStatus.test(status)) {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: responseJSON.errorMessage
          });
        }
      });
    } else {
      this.setState({
        showMessageModal: !this.setState.showMessageModal,
        message: "Please click Check Dues and clear the fine to issue the book"
      });
    }
  }

  render() {
    const dues = sessionStorage.getItem("user_fine");

    return (
      <div className="main-component-div">
        <Header />
        <section>
          <div className="title-part-with-back-btn">
            <button
              className="previous-round"
              onClick={this.clickPreviousToCategory}
            >
              &#8249;
            </button>
            <h2> Book Details </h2>
          </div>

          <hr />

          <div>
            <div className="form-book-details">
              <label> Title </label>
              <input type="text" value={this.state.bookDetails.title} />
            </div>

            <div className="form-book-details">
              <label> Book-ID </label>
              <input type="text" value={this.state.bookDetails.bookId} />
            </div>

            <div className="form-book-details">
              <label> Author </label>
              <input type="text" value={this.state.bookDetails.author} />
            </div>

            <div className="form-book-details">
              <label> Description </label>
              <input type="text" value={this.state.bookDetails.description} />
            </div>

            <div className="form-book-details">
              <label> Genre </label>
              <input type="text" value={this.state.bookDetails.genre} />
            </div>

            <div className="form-book-details">
              <label> Likes </label>
              <input type="text" value={this.state.bookDetails.likes} />
            </div>
          </div>

          <div className="form-book-details">
            <button onClick={this.checkDues}> Check Dues</button>

            <button onClick={this.issueBook}>Issue Book</button>
          </div>

          {this.state.showPopup ? (
            <CheckDuesPopup
              closePopup={this.checkDues}
              checkDues={dues}
              payFine={this.payFine}
            />
          ) : null}

          {this.state.showMessageModal ? (
            <MessageModal
              message={this.state.message}
              closeModal={this.closeModal}
            />
          ) : null}

          {this.state.payFineStatus ? (
            <div className="form-book-details">
              <p className="finestatusDiv">
                Thank you for paying all your dues. Please click issue button to
                issue your book.
              </p>
            </div>
          ) : null}
        </section>

        <div className="footer-part">
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(BookDescriptionPage);
