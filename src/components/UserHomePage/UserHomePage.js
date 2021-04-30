import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "./UserHomePage.css";
import BooksGenreService from "../../services/BooksGenreService";
import UserDetailsService from "../../services/UserDetailsService";
import BooksRecommendationService from "../../services/BooksRecommendationService";

class UserHomePage extends Component {
  constructor(props) {
    super(props);

    this.textgenre = React.createRef();

    this.state = {
      favGenre: "",
      selectedGenre: "",
      genreList: [],
      recommendationList: [],
      title: "",
      author: ""
    };

    this.clickGenre = this.clickGenre.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
  }

  componentWillMount() {
    let offset = 0;
    let limit = 5;

    // Calling User Details Service
    const username = sessionStorage.getItem("session_username");
    UserDetailsService("users/" + username).then(result => {
      let responseJSON = result[1];

      console.log("from header ", responseJSON);
      this.setState({ favGenre: responseJSON.favGenre });

      sessionStorage.setItem("user_fine", responseJSON.fine);
      sessionStorage.setItem("fav_genre", responseJSON.favGenre);
    });

    // Calling User's favourite Genre Recommendations
    let favGenre = this.state.favGenre;
    let type =
      "books?" + "genre=" + favGenre + "&offset=" + offset + "&limit=" + limit;

    BooksRecommendationService(type).then(result => {
      let responseJSON = result[1];

      this.setState({
        recommendationList: responseJSON
      });
    });

    // Clearing session storage
    if (sessionStorage.getItem("search_by_title")) {
      sessionStorage.removeItem("search_by_title");
    }
    if (sessionStorage.getItem("search_by_author")) {
      sessionStorage.removeItem("search_by_author");
    }
    if (sessionStorage.getItem("selected_genre")) {
      sessionStorage.removeItem("selected_genre");
    }
  }

  componentDidMount() {
    // Calling Books Genre Service
    BooksGenreService("books/genres").then(result => {
      let responseJSON = result[1];
      this.setState({
        genreList: responseJSON
      });
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  clickSearch() {
    // Search by title and author
    if (this.state.title && this.state.author) {
      sessionStorage.setItem("search_by_author", this.state.author);
      sessionStorage.setItem("search_by_title", this.state.title);
    }

    // Search by author
    else if (this.state.author) {
      sessionStorage.setItem("search_by_author", this.state.author);
    }

    // Search by title
    else if (this.state.title) {
      sessionStorage.setItem("search_by_title", this.state.title);
    }

    // Alert message
    else {
      alert("Enter title or author or both to search for books");
    }

    this.props.history.push("/category");
  }

  clickGenre(genre) {
    this.setState({
      selectedGenre: genre
    });

    sessionStorage.setItem("selected_genre", genre);
    this.props.history.push("/category");
  }

  render() {
    const { genreList, recommendationList } = this.state;

    return (
      <div className="main-component-div">
        <Header />
        <section>
          <div className="content-div">
            <div className="left-part">
              <div className="left-part-top">
                <form>
                  <div className="search-div">
                    <input
                      className="search-author"
                      type="search"
                      name="author"
                      placeholder="Search by Author"
                      onChange={this.onChange}
                    />
                    <input
                      className="search-title"
                      type="search"
                      name="title"
                      placeholder="Search by Title"
                      onChange={this.onChange}
                    />
                    <button
                      className="search-button"
                      onClick={this.clickSearch}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>

              <div className="left-part-bottom">
                <h2> Recommendations</h2>
                <hr />

                <div className="recommendation-div-scrollable">
                  <dl>
                    {recommendationList.map(recommendation => (
                      <div key={recommendation.bookId}>
                        <dt>{recommendation.title}</dt>
                        <dd>-{recommendation.author}</dd>
                        <hr />
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <div className="right-part">
              <h2> Select your genre </h2>
              <hr />

              <div className="genre-div-scrollable">
                <div>
                  {genreList.map(genre => (
                    <BookGenreSection
                      key={genre.genre}
                      genre={genre.genre}
                      onClickGenre={this.clickGenre}
                    />
                  ))}
                </div>
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

class BookGenreSection extends Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.props.onClickGenre(this.props.genre);
  }

  render() {
    const { genre } = this.props;
    return (
      <div className="card" onClick={this.onClickHandler}>
        <div className="container">
          <h3>
            <b>{genre}</b>
          </h3>
          <p>
            This section contains all types of {genre}
            Books. Go explore !!!
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserHomePage);
