import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";

import UserLogin from "./components/UserLogin/UserLogin";
import UserRegistration from "./components/UserRegistration/UserRegistration";
import UserHomePage from "./components/UserHomePage/UserHomePage";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import BookDetailsPage from "./components/BookDetailsPage/BookDetailsPage";
import BooksIssued from "./components/BooksIssued/BooksIssued";
import BooksReturned from "./components/BooksReturned/BooksReturned";
import ResetPassword from "./components/ResetPassword/ResetPassword";

import AdminLogin from "./components/admin/AdminLogin/AdminLogin";
import AdminHome from "./components/admin/AdminHome/AdminHome";
import AddBook from "./components/admin/AddBook/AddBook";
import EditBook from "./components/admin/EditBook/EditBook";
import ShowBooks from "./components/admin/ShowBooks/ShowBooks";
import ShowIssuedBooks from "./components/admin/ShowIssuedBooks/ShowIssuedBooks";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/userLogin" component={UserLogin} />
      <Route path="/resetPassword" component={ResetPassword} />
      <Route path="/userRegister" component={UserRegistration} />
      <Route path="/userHome" component={UserHomePage} />
      <Route path="/category" component={CategoryPage} />
      <Route path="/details" component={BookDetailsPage} />
      <Route path="/userBooksIssued">
        <Route path="/userBooksIssued/booksIssued" component={BooksIssued} />
        <Route
          path="/userBooksIssued/booksReturned"
          component={BooksReturned}
        />
      </Route>

      <Route path="/adminLogin" component={AdminLogin} />
      <Route path="/admin">
        <Route path="/admin/home" component={AdminHome} />
        <Route path="/admin/addBook" component={AddBook} />
        <Route path="/admin/editBook" component={EditBook} />
        <Route path="/admin/showBooks" component={ShowBooks} />
        <Route path="/admin/showIssuedBooks" component={ShowIssuedBooks} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
