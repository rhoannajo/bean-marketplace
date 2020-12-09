import React from "react";
import axios from "axios";

const websocket = new WebSocket("ws://localhost:1234/ws");

function Feed() {
  // state variables
  const [listings, setListings] = React.useState([""]);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    loadListings(); // load listings on page load

    // setting the correct active tab in navbar
    document.getElementById("home").classList.remove("active");
    document.getElementById("admin").classList.remove("active");
    document.getElementById("feed").classList.add("active");

    // filling the filter dropdown with last value
    setFilter(window.localStorage.getItem("filter"));

    // listener to update feed when listings are updated
    websocket.addEventListener("message", handleWebsocketMessage);
  }, []);

  const handleWebsocketMessage = (messageEvent) => {
    if (JSON.stringify(messageEvent.data) == '"Listings Updated"') {
      loadListings();
      document.getElementById("feedLink").click(); // refreshing the page by clicking the navbar link
    }
  };

  function loadListings() {
    // get all the listings to display in the feed
    axios.get("/api/viewListings").then(function (response) {
      setListings(response.data.items); // store the listings in the state variable array 'listings'
    });
  }

  function filterListings() {
    // get filtered listings to display in the feed

    // use filter type in the api.post url to get filtered results
    let filterType = window.localStorage.getItem('filter');

    alert('selected type = '+filterType); 

    // Change below to filter by query string args like for deleteListing in admin

    // query args should look like `/?type= filterType
    // you can refer to the deleteListing in admin.js to see an example
    
    // axios.get("/api/viewListings").then(function (response) {
    //   setListings(response.data.items); // store the listings in the state variable array 'listings'
    // });
  }

  return (
    <div>
      <h2 class="p-1">Feed Page</h2>
      {/* <button onClick={send()}>button</button> */}
      <div class="p-3">
        <form class="mx-auto text-left card bg-light px-3 py-1">
          <div class="form-group">
            <label for="filterType">
              <b>Filter by Type:</b>
            </label>
            <select
              id= "selectFilter"
              onChange={(e) => {
                setFilter(e.target.value);
                window.localStorage.setItem("filter", e.target.value);
                filterListings();
              }}
              class="form-control"
              id="filterType"
              value={filter}
            >
              <option value="" selected>
                All
              </option>
              <option value="tops">Tops</option>
              <option value="outerwear">Outerwear</option>
              <option value="bottoms">Bottoms</option>
              <option value="footwear">Footwear</option>
            </select>
          </div>
        </form>
        <div class="mx-auto card bg-light my-3 px-3 py-1 text-center">
          <h2>Listings:</h2>
          <div class="container-fluid">
            <div class="row">
              {listings
                .slice(0)
                .reverse()
                .map((item) => (
                  <div class="col-sm-12 col-md-6 col-xl-3 text-center">
                    <div class="mx-1 my-2 card bg-body">
                      <h5>{item.title}</h5>
                      <hr class="p-0 m-0"></hr>
                      <span class="caps">
                        {/* <i
                          class={`fa fa-${item.type} fa-lg typeColor ${item.type}Color`}
                        ></i>{" "} */}
                        {item.type}
                      </span>
                      <span>${item.price}</span>
                      <span>{item.description}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
