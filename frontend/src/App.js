import "./App.css";
import React from "react";
import {Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);
  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              {user ? 'Logout' : <Link to={"/login"}>Login</Link>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path={"/movies"} element={<MoviesList/>}></Route>
        {/*if path is / or movies show movie list component and similarly ahead*/}
        <Route
          path="/movies/:id/review"
          render={(props) => <AddReview {...props} user={user} />}
        ></Route>{/*Using Render insated of component as render allows to pass props */}
        <Route
          path="/movies/:id/"
          render={(props) => <Movie {...props} user={user} />}
        ></Route>
        <Route
          path="/login"
          render={(props) => <Login login={login} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
