import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BookList from "../../components/BookList/BookList";
import "./CategoryPage.css";

import SearchByGenreService from "../../services/SearchByGenreService";

class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BookCategoryList: []
    };

    this.clickDetails = this.clickDetails.bind(this);
    this.clickPreviousToCategory = this.clickPreviousToCategory.bind(this);
  }

  componentDidMount() {
    let offset = 0;
    let limit = 5;
    let type, author, title, genre;

    if (sessionStorage.getItem("selected_genre")) {
      genre = sessionStorage.getItem("selected_genre");
      type =
        "books?" + "genre=" + genre + "&offset=" + offset + "&limit=" + limit;
    } else if (
      sessionStorage.getItem("search_by_author") &&
      sessionStorage.getItem("search_by_title")
    ) {
      author = sessionStorage.getItem("search_by_author");
      title = sessionStorage.getItem("search_by_title");

      type =
        "books?" +
        "author=" +
        author +
        "&title=" +
        title +
        "&offset=" +
        offset +
        "&limit=" +
        limit;
    } else if (sessionStorage.getItem("search_by_author")) {
      author = sessionStorage.getItem("search_by_author");
      type =
        "books?" + "author=" + author + "&offset=" + offset + "&limit=" + limit;
    } else if (sessionStorage.getItem("search_by_title")) {
      title = sessionStorage.getItem("search_by_title");
      type =
        "books?" + "title=" + title + "&offset=" + offset + "&limit=" + limit;
    }

    SearchByGenreService(type).then(result => {
      let responseJSON = result[1];

      this.setState({
        BookCategoryList: responseJSON
      });
    });
  }

  clickPreviousToCategory() {
    this.props.history.push("/userHome");
  }

  clickDetails() {
    this.props.history.push("/description");
  }

  render() {
    const { BookCategoryList } = this.state;

    return (
      <div className="main-component-div">
        <Header />

        <section>
          <div className="category-main-div">
            <div className="title-part-with-back-btn">
              <button
                className="previous-round"
                onClick={this.clickPreviousToCategory}
              >
                &#8249;
              </button>
              <h2>Serve yourself with our books</h2>
            </div>
            <hr />

            <div className="books-div-scrollable">
              <div>
                {BookCategoryList.map(books =>
                  books.available ? (
                    <BookList
                      key={books.bookId}
                      availability="Available"
                      title={books.title}
                      author={books.author}
                      bookId={books.bookId}
                    />
                  ) : (
                    <BookList
                      key={books.bookId}
                      availability="Not Available"
                      title={books.title}
                      author={books.author}
                      bookId={books.bookId}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="footer-part">
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(CategoryPage);
