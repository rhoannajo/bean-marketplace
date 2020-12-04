import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Admin from './pages/Admin';
import Feed from './pages/Feed';
import Home from './pages/Home';
import './App.css';

// React components
function App() {
  document.title="WhipTrader"
  return (
    <div className="App">
      {/* <h1>Final Project App</h1> */}
      <div class="bg-white">
        <a href="/">
            <img id="logo" class="mw-10" src={require('./images/WhipTraderLogo.png')} alt=""></img>
        </a>
      </div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link class="nav-link" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/admin">Admin</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/feed">Feed</Link>
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

            {/* including bootstrap css library */}
            <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      >
      </link>
    </div>
  );
}

export default App;
