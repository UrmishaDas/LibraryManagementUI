import React, { Component } from "react";
import Footer from "../../../components/Footer/Footer";

import AdminMenu from "../../admin/AdminMenu/AdminMenu";
import AdminHeader from "../../admin/AdminHeader/AdminHeader";
import MessageModal from "../../MessageModal/MessageModal";
import BookDetailsService from "../../../services/BookDetailsService";

import EditBookDetailsService from "../../admin/services_for_admin/EditBookDetailsService";
import "./EditBook.css";

class EditBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookId: "",
      title: "",
      description: "",
      author: "",
      genre: "",
      showMessageModal: false,
      message: ""
    };

    this.clickEditBook = this.clickEditBook.bind(this);
    this.clickReset = this.clickReset.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clickPrevious = this.clickPrevious.bind(this);
  }

  clickPrevious() {
    this.props.history.push("/admin/showBooks");
  }

  componentDidMount() {
    let bookId = sessionStorage.getItem("bookId_for_edit");

    if (bookId != null) {
      // Calling Book Details Service
      BookDetailsService("books/" + bookId).then(result => {
        let responseJSON = result[1];

        this.setState({
          bookId: bookId,
          title: responseJSON.title,
          description: responseJSON.description,
          author: responseJSON.author,
          genre: responseJSON.genre
        });
      });
    }
  }

  componentWillUnmount() {
    sessionStorage.removeItem("bookId_for_edit");
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

  clickEditBook() {
    let bookId = sessionStorage.getItem("bookId_for_edit");
    // Calling add book service
    const { title, description, author, genre } = this.state;

    let userData = {
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
      genre: this.state.genre
    };

    let queryStr = "books/" + bookId;

    if (title && description && author && genre) {
      EditBookDetailsService(queryStr, userData).then(result => {
        let responseJSON = result[1];
        let status = result[0];

        let successStatus = /^[2][0][0-9]$/;
        let errorStatus = /^[4][0][0-9]$/;
        if (successStatus.test(status)) {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: "You have successfully updated the book details"
          });

          this.clickReset();
        } else if (errorStatus.test(status)) {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: "This Book Id does not exist"
          });
          this.clickReset();
        } else if (status === 404) {
          this.setState({
            showMessageModal: !this.setState.showMessageModal,
            message: "This Book Id does not exist."
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
    this.refs.bookId.value = "";
    this.refs.title.value = "";
    this.refs.description.value = "";
    this.refs.author.value = "";
    this.refs.genre.value = "";
  }

  render() {
    console.log(this.state.title);
    return (
      <div className="main-component-div">
        <AdminHeader />

        <section>
          <AdminMenu />

          <div className="title-part-with-back-btn">
            <button className="previous-round" onClick={this.clickPrevious}>
              &#8249;
            </button>
            <h2> Edit Book Details</h2>
          </div>

          <hr />

          <div className="edit-configuration-main-container">
            <div className="edit-configuration-div">
              <div className="edit-configuration-details">
                <ConfigDiv value="Book Id" />
                <input
                  type="text"
                  name="bookId"
                  ref="bookId"
                  disabled
                  defaultValue={this.state.bookId}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="edit-configuration-details">
                <ConfigDiv value="Title" />
                <input
                  type="text"
                  name="title"
                  ref="title"
                  defaultValue={this.state.title}
                  onChange={this.changeHandler}
                />
              </div>

              <div className="edit-configuration-details">
                <ConfigDiv value="Description" />
                <input
                  type="text"
                  name="description"
                  ref="description"
                  defaultValue={this.state.description}
                  onChange={this.changeHandler}
                />
              </div>

              <div className="edit-configuration-details">
                <ConfigDiv value="Author" />
                <input
                  type="text"
                  name="author"
                  ref="author"
                  defaultValue={this.state.author}
                  onChange={this.changeHandler}
                />
              </div>

              <div className="edit-configuration-details">
                <ConfigDiv value="Genre" />
                <input
                  type="text"
                  name="genre"
                  ref="genre"
                  defaultValue={this.state.genre}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="edit-configuration-details">
                <button onClick={this.clickEditBook}> Edit Details </button>
                <button onClick={this.clickReset}> Reset</button>
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

export default EditBook;
