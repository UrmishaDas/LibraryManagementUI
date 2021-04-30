import React, { Component } from "react";
import Footer from "../../Footer/Footer";

import AdminMenu from "../../admin/AdminMenu/AdminMenu";
import AdminHeader from "../../admin/AdminHeader/AdminHeader";
import EditBook from "../../admin/EditBook/EditBook";
import GetBookDetailsService from "../../admin/services_for_admin/GetBookDetailsService";
import DeleteBookService from "../services_for_admin/DeleteBookService";
//import ConfirmationPopup from "../../admin/ConfirmationPopup/ConfirmationPopup";
import MessageModal from "../../MessageModal/MessageModal";

import "./ShowBooks.css";

class ShowBooks2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: [],
      deleteStatus: false,
      showMessageModal: false,
      message: "",
      editBook: false
    };

    this.renderTableData = this.renderTableData.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // Calling Book Details Service
    GetBookDetailsService("books").then(result => {
      let responseJSON = result[1];

      this.setState({
        bookList: responseJSON
      });
    });
  }

  closeModal() {
    this.setState({
      showMessageModal: !this.state.showMessageModal
    });
    window.location.reload();
  }

  clickDelete() {
    this.setState({
      deleteStatus: !this.state.deleteStatus
    });
  }

  deleteBook() {
    // Calling the Delete Book Service

    let bookId = sessionStorage.getItem("bookId_for_del");
    console.log("Book is : ", bookId);
    DeleteBookService("books/" + bookId).then(result => {
      this.setState({
        showMessageModal: !this.setState.showMessageModal,
        message: "You have successfully deleted the book."
      });
    });
  }

  renderTableData() {
    const { bookList } = this.state;
    return bookList.map(book => {
      return (
        <tr key={book.bookId}>
          <td>{book.bookId}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.genre}</td>

          <td>
            <button
              id="btn-operation"
              onClick={() => {
                sessionStorage.setItem("bookId_for_edit", book.bookId);
                this.props.history.push("/admin/editBook");
              }}
            >
              &#9998;
            </button>
          </td>

          <td>
            <button
              id="btn-operation"
              onClick={() => {
                sessionStorage.setItem("bookId_for_del", book.bookId);

                this.deleteBook();
              }}
            >
              &#10006;
            </button>
          </td>
        </tr>
      );
    });
  }
  render() {
    const { bookList } = this.state;

    if (!this.state.editBook) {
      return (
        <div className="main-component-div">
          <AdminHeader />

          <section>
            <AdminMenu />
            <h2> List of Books</h2>
            <hr />

            <table id="mainTable">
              <thead>
                <tr>
                  <th>Book Id</th>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Edit Book</th>
                  <th>Delete Book</th>
                </tr>
              </thead>
              <tbody>{this.renderTableData()}</tbody>
            </table>

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
    } else {
      return <EditBook />;
    }
  }
}

export default ShowBooks2;
