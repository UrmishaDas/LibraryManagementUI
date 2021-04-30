import React, { Component } from "react";
import "./BooksReturned.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import IssuedBooksMenuPage from "../../components/IssuedBooksMenuPage/IssuedBooksMenuPage";
import BooksIssuedService from "../../services/BooksIssuedService";

class BooksReturned extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booksIssuedList: []
    };

    this.renderTableData = this.renderTableData.bind(this);
  }

  componentDidMount() {
    // Calling Books Issued Service
    let username = sessionStorage.getItem("session_username");
    let type = "users/" + username + "/books";
    BooksIssuedService(type).then(result => {
      let responseJSON = result[1];

      this.setState({ booksIssuedList: responseJSON });
      console.log(responseJSON);
    });
  }

  renderTableData() {
    const { booksIssuedList } = this.state;

    return booksIssuedList.map(book => {
      if (book.returned) {
        return (
          <tr key={book.bookIssueId}>
            <td>{book.bookIssueId}</td>
            <td>{book.title}</td>
            <td>{book.issueDate}</td>
            <td> {book.actualReturnDate}</td>
          </tr>
        );
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
                <th>Book</th>
                <th>Issue Date</th>
                <th> Returned Date </th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>

          {/* {booksIssuedList.map(book => {
            if (book.returned) {
              return (
                <table id="mainTable">
                  <thead>
                    <tr>
                      <th>Issue Id</th>
                      <th>Book</th>
                      <th>Issue Date</th>
                      <th> Returned Date </th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTableData()}</tbody>
                </table>
              );
            } else {
              return <div> no book</div>;
            }
          })} */}
        </section>
        <div className="footer-part">
          <Footer />
        </div>
      </div>
    );
  }
}

export default BooksReturned;
