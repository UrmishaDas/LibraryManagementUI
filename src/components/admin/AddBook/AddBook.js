import React, { Component } from "react";
import Footer from "../../../components/Footer/Footer";

import AdminMenu from "../../admin/AdminMenu/AdminMenu";
import AdminHeader from "../../admin/AdminHeader/AdminHeader";
import MessageModal from "../../MessageModal/MessageModal";

import AddBookService from "../../admin/services_for_admin/AddBookService";
import "./AddBook.css";

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      author: "",
      genre: "",
      showMessageModal: false,
      message: ""
    };

    this.clickAddBook = this.clickAddBook.bind(this);
    this.clickReset = this.clickReset.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  closeModal() {
    this.setState({
      showMessageModal: !this.state.showMessageModal
    });
  }

  clickAddBook() {
    // Calling add book service
    const { title, description, author, genre } = this.state;

    let userData = {
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
      genre: this.state.genre
    };

    if (title && description && author && genre) {
      AddBookService("books", userData).then(result => {
        let responseJSON = result[1];
        let status = result[0];

        let successStatus = /^[2][0][0-9]$/;
        let errorStatus = /^[4][0][0-9]$/;
        if (successStatus.test(status)) {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: "You have successfully added a book"
          });

          this.clickReset();
        } else if (errorStatus.test(status)) {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: responseJSON.errorMessage
          });
        } else {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: "Invalid Input. Please enter valid input"
          });
        }
      });
    } else {
      this.setState({
        showMessageModal: !this.setState.showMessageModal,
        message: "Fill all the fields"
      });
      //alert("Fill all the fields");
    }
  }

  clickReset() {
    this.refs.title.value = "";
    this.refs.description.value = "";
    this.refs.author.value = "";
    this.refs.genre.value = "";
  }

  render() {
    return (
      <div className="main-component-div">
        <AdminHeader />

        <section>
          <AdminMenu />
          <h2> Add A Book</h2>
          <hr />

          <div className="edit-configuration-main-container">
            <div className="edit-configuration-div">
              <div className="edit-configuration-details">
                <ConfigDiv value="Title" />
                <input
                  type="text"
                  name="title"
                  ref="title"
                  onChange={this.changeHandler}
                />
              </div>

              <div className="edit-configuration-details">
                <ConfigDiv value="Description" />
                <input
                  type="text"
                  name="description"
                  ref="description"
                  onChange={this.changeHandler}
                />
              </div>

              <div className="edit-configuration-details">
                <ConfigDiv value="Author" />
                <input
                  type="text"
                  name="author"
                  ref="author"
                  onChange={this.changeHandler}
                />
              </div>

              <div className="edit-configuration-details">
                <ConfigDiv value="Genre" />
                <input
                  type="text"
                  name="genre"
                  ref="genre"
                  onChange={this.changeHandler}
                />
              </div>
              <div className="edit-configuration-details">
                <button onClick={this.clickAddBook}>Add Book</button>
                <button onClick={this.clickReset}>Reset</button>
              </div>
            </div>
          </div>

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

const ConfigDiv = props => {
  return <label>{props.value}</label>;
};

export default AddBook;
