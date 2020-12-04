import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Admin from './pages/Admin';
import Feed from './pages/Feed';
import Home from './pages/Home';
import './App.css';

// React components
function App() {
  // state variables
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');


  function alertInput(){
    alert(title+' '+type+' '+price+' '+description);
  }

  document.title="WhipTrader"
  return (
    <div className="App">
      {/* <h1>Final Project App</h1> */}
      <div class="bg-dark">
        <a href="/">
            <img id="logo" class="rounded" src={require('./images/WhipTraderLogo.png')} alt=""></img>
        </a>
      </div>
      <nav class="navbar navbar-expand bg-dark navbar-dark border-top border-secondary">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link class="nav-link mx-auto" to="/">Home</Link>
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
            <div id="page">
              <form onSubmit={alertInput} id="listingForm" class="mx-auto text-left card p-3 bg-light">

                <h4 className="text-center"><b><u>Post a Listing</u></b></h4>

                <div className="form-group">
                  <label htmlFor="input-title"><b>Title:</b></label>
                  <input required id="input-title" class="form-control" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="input-type"><b>Type:</b></label>
                  <select required class="form-control" id="input-type" value={type} onChange={e => setType(e.target.value)}>
                  <option value="" selected disabled hidden>Select a Type</option>
                    <option value="car">Car</option>
                    <option value="truck">Truck</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="input-price"><b>Price:</b></label>
                  <input required id="input-price" class="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="input-description"><b>Description:</b></label>
                  <input id="input-description" class="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>

                <div className="text-center">
                  <button type="submit" id="submit" class="btn btn-primary"><b>Submit</b></button>
                </div>
              </form>
            </div>
        </Route>
        <Route path="/feed">
          <Feed />
            <div id="page">
              <form className="mx-auto text-left card bg-light px-1">
                <div class="form-group">
                  <label for="filterType">Filter by Type</label>
                  <select class="form-control" id="filterType">
                    <option>All</option>
                    <option>Cars</option>
                    <option>Trucks</option>
                    <option>Motorcycles</option>

                  </select>
                </div>
                {/* <div class="form-group">
                  <label for="exampleFormControlSelect2">Example multiple select</label>
                  <select multiple class="form-control" id="exampleFormControlSelect2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div> */}
              </form>
            </div>
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
