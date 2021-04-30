import React, { Component } from "react";
import ConfirmationPopup from "../../admin/ConfirmationPopup/ConfirmationPopup";

import "./TableData.css";

class TableData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteStatus: false
    };

    this.renderTableData = this.renderTableData.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
  }

  clickDelete() {
    sessionStorage.setItem("bookId_for_del", this.props.bookId);
    this.setState({
      deleteStatus: !this.state.deleteStatus
    });
  }

  renderTableData() {
    return (
      <tr>
        <td>{this.props.bookId}</td>
        <td>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>{this.props.genre}</td>
        <td>{this.props.likes}</td>
        <td>
          <button id="btn-operation" onClick={this.clickDelete}>
            &#10006;
          </button>
        </td>
      </tr>
    );
  }
  render() {
    return (
      <table id="mainTable">
        <tbody>{this.renderTableData()}</tbody>
        {this.state.deleteStatus ? (
          <ConfirmationPopup
            text="Are you sure you want to delete the book???"
            closePopup={this.clickDelete}
          />
        ) : null}
      </table>
    );
  }
}

export default TableData;
