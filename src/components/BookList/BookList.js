import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./BookList.css";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.clickDetails = this.clickDetails.bind(this);
  }

  clickDetails() {
    sessionStorage.setItem("bookId", this.props.bookId);
    this.props.history.push("/details");
  }

  render() {
    const { availability, author, title } = this.props;
    return (
      <div className="card">
        <div className="container">
          <h2>
            <b>{title}</b> &nbsp;
            <span className="availability-span">({availability})</span>
          </h2>

          <p>
            written by &nbsp;
            <span className="author-span">{author}</span>
            &nbsp; &nbsp; &nbsp;
            <button onClick={this.clickDetails}> More... </button>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(BookList);
