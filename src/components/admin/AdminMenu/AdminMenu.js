import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import "./AdminMenu.css";

class AdminMenu extends Component {
  render() {
    return (
      <div>
        <header className="mainHeader">
          <nav>
            <ul>
              <li>
                <Link to="/admin/home"> Edit Config </Link>
              </li>
              <li>
                <Link to="/admin/addBook"> Add Book </Link>
              </li>
              {/* <li>
                <Link to="/admin/editBook"> Edit Book </Link>
              </li> */}
              <li>
                <Link to="/admin/showBooks"> All Books </Link>
              </li>
              <li>
                <Link to="/admin/showIssuedBooks"> Issued Books </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default AdminMenu;
