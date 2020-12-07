import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Admin from "./pages/Admin";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import "./App.css";

const websocket = new WebSocket("ws://localhost:1234/ws");

// React components
function App() {
  document.title = "Bean Marketplace";
  return (
    <div className="App">
      {/* including bootstrap css library */}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      ></link>
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
      ></script>
<link rel = "stylesheet" href = "http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      {/* <h1>Final Project App</h1> */}
      <div class="bg-dark">
        <a href="/">
          <img
            id="logo"
            class="rounded p-1"
            src={require("./images/BeanPurpleLogo2.png")}
            alt=""
          ></img>
        </a>
      </div>
      <nav class="navbar navbar-expand bg-dark navbar-dark border-top border-secondary py-0">
        <ul class="navbar-nav">
          <li id="home" class="nav-item">
            <Link class="nav-link mx-auto" to="/">
              Home
            </Link>
          </li>
          <li id="admin" class="nav-item">
            <Link class="nav-link" to="/admin">
              Admin
            </Link>
          </li>
          <li id="feed" class="nav-item">
            <Link id="feedLink" class="nav-link" to="/feed">
              Feed
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
