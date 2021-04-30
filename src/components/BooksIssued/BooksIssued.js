import React, { Component } from "react";
import "./BooksIssued.css";
import BooksIssuedService from "../../services/BooksIssuedService";
import BooksReturnReissueService from "../../services/BooksReturnReissueService";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import IssuedBooksMenuPage from "../../components/IssuedBooksMenuPage/IssuedBooksMenuPage";
import ConfirmationPopupForReturn from "../../components/ConfirmationPopupForReturn/ConfirmationPopupForReturn";
import ConfirmationPopupForReissue from "../../components/ConfirmationPopupForReissue/ConfirmationPopupForReissue";
import MessageModal from "../MessageModal/MessageModal";

class BooksIssued extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booksIssuedList: [],
      ReturnedStatus: false,
      ReIssuedStatus: false,
      showMessageModal: false,
      message: ""
    };

    

    this.renderTableData = this.renderTableData.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.reissueBook = this.reissueBook.bind(this);
    this.returnBook = this.returnBook.bind(this);
  }

  componentDidMount() {
    // Calling Books Issued Service
    let username = sessionStorage.getItem("session_username");
    let type = "users/" + username + "/books";
    BooksIssuedService(type).then(result => {
      let responseJSON = result[1];

      this.setState({ booksIssuedList: responseJSON });
    });
  }

  closeModal() {
    this.setState({
      showMessageModal: !this.state.showMessageModal
    });
    window.location.reload();
  }

  returnBook() {
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

      let successStatus = /^[2][0][0-9]$/;
      if (successStatus.test(status)) {
        this.setState({
          showMessageModal: !this.setState.showMessageModal,
          message: "Thankyou for returning the book. Keep taking more books."
        });
      } else {
        this.setState({
          showMessageModal: !this.setState.showMessageModal,
          message: responseJSON.errorMessage
        });
      }
    });
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

      var successStatus = /^[2][0][0-9]$/;
      if (successStatus.test(status)) {
        this.setState({
          showMessageModal: !this.setState.showMessageModal,
          message: "Book is re-issued."
        });
      } else {
        this.setState({
          showMessageModal: !this.setState.showMessageModal,
          message: responseJSON.errorMessage
        });
      }
    });
  }

  renderTableData() {
    const { booksIssuedList } = this.state;

    const style = {
      color: "red",
      fontWeight: "bold",
      fontStyle: "italic"
    };

    return booksIssuedList.map(book => {
      if (!book.returned) {
        if (book.fineCleared) {
          return (
            <tr key={book.bookIssueId}>
              <td>{book.bookIssueId}</td>
              <td> {book.bookId}</td>
              <td>{book.title}</td>
              <td>{book.issueDate}</td>
              <td> {book.expectedReturnDate}</td>
              <td style={style}> Not Returned </td>
              <td> {book.fine}</td>
              <td> Paid </td>
              <td>
                <button
                  id="btn-operation1"
                  onClick={() => {
                    sessionStorage.setItem("bookId_for_return", book.bookId);
                    sessionStorage.setItem(
                      "bookIssueId_for_return",
                      book.bookIssueId
                    );

                    this.returnBook();
                  }}
                >
                  Return
                </button>
              </td>
              <td>
                <button
                  id="btn-operation1"
                  onClick={() => {
                    sessionStorage.setItem("bookId_for_return", book.bookId);
                    sessionStorage.setItem(
                      "bookIssueId_for_return",
                      book.bookIssueId
                    );

                    this.reissueBook();
                  }}
                >
                  Re-issue
                </button>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={book.bookIssueId}>
              <td>{book.bookIssueId}</td>
              <td> {book.bookId}</td>
              <td>{book.title}</td>
              <td>{book.issueDate}</td>
              <td> {book.expectedReturnDate}</td>
              <td style={style}> Not Returned </td>
              <td> {book.fine}</td>
              <td> Not Paid </td>
              <td>
                <button
                  id="btn-operation1"
                  onClick={() => {
                    sessionStorage.setItem("bookId_for_return", book.bookId);
                    sessionStorage.setItem(
                      "bookIssueId_for_return",
                      book.bookIssueId
                    );

                    this.returnBook();
                  }}
                >
                  Return
                </button>
              </td>
              <td>
                <button
                  id="btn-operation1"
                  onClick={() => {
                    sessionStorage.setItem("bookId_for_return", book.bookId);
                    sessionStorage.setItem(
                      "bookIssueId_for_return",
                      book.bookIssueId
                    );

                    this.reissueBook();
                  }}
                >
                  Re-issue
                </button>
              </td>
            </tr>
          );
        }
      }
    });
  }
  render() {
    const { booksIssuedList } = this.state;

    return (
      <div className="main-component-div">
        <Header />

        <section>
          <IssuedBooksMenuPage />

          <table id="mainTable">
            <thead>
              <tr>
                <th>Issue Id</th>
                <th> Book Id</th>
                <th>Book</th>
                <th>Issue Date</th>
                <th> Expected Return Date</th>
                <th>Return Status</th>
                <th> Fine </th>
                <th> Fine Status </th>
                <th> Return </th>
                <th> Re-Issue </th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>

          {this.state.ReturnedStatus ? (
            <ConfirmationPopupForReturn
              text="Are you sure you want to return the book???"
              closePopup={this.clickOpenPopupForReturn}
            />
          ) : null}

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

export default BooksIssued;
