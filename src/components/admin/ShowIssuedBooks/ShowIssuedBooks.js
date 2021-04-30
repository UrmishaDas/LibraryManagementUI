import React, { Component } from "react";
import Footer from "../../Footer/Footer";

import AdminMenu from "../../admin/AdminMenu/AdminMenu";
import AdminHeader from "../../admin/AdminHeader/AdminHeader";
import GetBooksIssuedDetailsService from "../../admin/services_for_admin/GetBooksIssuedDetailsService";
import GetUsernamesForIssuedBooksService from "../../admin/services_for_admin/GetUsernamesForIssuedBooksService";

import "./ShowIssuedBooks.css";

class ShowIssuedBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: [],
      usernameList: [],
      moreDetails: false
    };

    this.renderTableData = this.renderTableData.bind(this);
    this.renderTableDataForUsernames = this.renderTableDataForUsernames.bind(
      this
    );

    this.getUsernames = this.getUsernames.bind(this);
    this.clickPrevious = this.clickPrevious.bind(this);
  }

  clickPrevious() {
    this.setState({
      moreDetails: false
    });
  }

  componentDidMount() {
    // Calling Book Details Service
    GetBooksIssuedDetailsService("issuedbooks").then(result => {
      let responseJSON = result[1];

      this.setState({
        bookList: responseJSON
      });
    });
  }

  getUsernames() {
    //books / 7 / issuedUsers;

    let bookId = sessionStorage.getItem("bookId_for_issuedbook");

    let queryUrl = "books/" + bookId + "/issuedUsers";
    // Get the usernames who have issued the book
    GetUsernamesForIssuedBooksService(queryUrl).then(result => {
      let responseJSON = result[1];

      this.setState({
        usernameList: responseJSON
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
          <td>{book.numberOfCopiesIssued}</td>
          <td>
            <button
              id="btn-operation1"
              onClick={() => {
                sessionStorage.setItem("bookId_for_issuedbook", book.bookId);
                sessionStorage.setItem("bookTitle_for_issuedbook", book.title);
                this.setState({
                  moreDetails: true
                });

                this.getUsernames();
              }}
            >
              More...
            </button>
          </td>
        </tr>
      );
    });
  }

  renderTableDataForUsernames() {
    const { usernameList } = this.state;
    let bookId = sessionStorage.getItem("bookId_for_issuedbook");
    let bookTitle = sessionStorage.getItem("bookTitle_for_issuedbook");

    return usernameList.map(user => {
      return (
        <tr key={user.username}>
          <td>{bookId}</td>
          <td>{bookTitle}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.username}</td>
        </tr>
      );
    });
  }
  render() {
    const { bookList } = this.state;

    if (!this.state.moreDetails) {
      return (
        <div className="main-component-div">
          <AdminHeader />

          <section>
            <AdminMenu />
            <h2> List of Issued Books</h2>
            <hr />

            <table id="mainTable">
              <thead>
                <tr>
                  <th>Book Id</th>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Copies Issued</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>{this.renderTableData()}</tbody>
            </table>
          </section>

          <div className="footer-part">
            <Footer />
          </div>
        </div>
      );
    } else {
      return (
        <div className="main-component-div">
          <AdminHeader />

          <section>
            <AdminMenu />
            <div className="title-part-with-back-btn">
              <button className="previous-round" onClick={this.clickPrevious}>
                &#8249;
              </button>
              <h2> List of users issued the book</h2>
            </div>

            <hr />

            <table id="mainTable2">
              <thead>
                <tr>
                  <th>Book Id</th>
                  <th>Book</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>{this.renderTableDataForUsernames()}</tbody>
            </table>
          </section>

          <div className="footer-part">
            <Footer />
          </div>
        </div>
      );
    }
  }
}

export default ShowIssuedBooks;
