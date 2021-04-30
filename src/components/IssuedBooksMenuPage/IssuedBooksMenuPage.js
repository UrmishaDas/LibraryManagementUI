import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import "./IssuedBooksMenuPage.css";

class IssuedBooksMenuPage extends Component {
  render() {
    return (
      <div>
        <header className="mainHeader">
          <nav>
            <ul>
              <li>
                <Link to="/userBooksIssued/booksIssued"> Books Issued </Link>
              </li>
              <li>
                <Link to="/userBooksIssued/booksReturned"> Books Returned</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default IssuedBooksMenuPage;
