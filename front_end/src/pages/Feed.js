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

    const handleWebsocketMessage = (messageEvent) => {
      if (JSON.stringify(messageEvent.data) === '"Listings Updated"') {
        loadListings();
        document.getElementById("feedLink").click(); // refreshing the page by clicking the navbar link
      }
    };

    // listener to update feed when listings are updated
    websocket.addEventListener("message", handleWebsocketMessage);
  }, []);

  function loadListings() {
    // get all the listings to display in the feed
    let filterType = window.localStorage.getItem("filter"); // getting the last set filter (for remembering a "session's" last filter)

    if (filterType === null || filterType === "") {
      // if filter is "", get All the listings (all types)
      axios.get("/api/viewListings").then(function (response) {
        setListings(response.data.items); // store the listings in the state variable array 'listings'
      });
    } else {
      //filters the listings to only display one type
      axios
        .get(`/api/viewListings/?type=${filterType}`)
        .then(function (response) {
          setListings(response.data.items);
        });
    }
  }

  return (
    <div>
      <h2 class="p-1">Feed Page</h2>
      <div class="p-3">
        <form class="mx-auto text-left card bg-light px-3 py-1">
          <div class="form-group">
            <label for="selectFilter">
              <b>Filter by Type:</b>
            </label>
            <select
              id="selectFilter"
              onChange={(e) => {
                setFilter(e.target.value);
                window.localStorage.setItem("filter", e.target.value);
                loadListings();
              }}
              class="form-control"
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
        <h3 className="text-center">
                  <b>
                    <u>Listings:</u>
                  </b>
                </h3>
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
                      <span class="caps">{item.type}</span>
                      <span>${item.price}</span>
                      <span>{item.description}</span>
                      <span class="small">{item.date}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {listings.length === 0 && (
            <div class="border border-dark bg-light rounded p-2">
              <h5 class="caps">
                <i class="fa fa-exclamation-triangle fa-lg text-danger"></i> No
                Posted Listings{" "}
                {!(
                  window.localStorage.getItem("filter") === null ||
                  window.localStorage.getItem("filter") === ""
                ) && `For Type ${window.localStorage.getItem("filter")} `}
                Yet!
              </h5>
              <h5>
                Check back later or post a listing:{" "}
                <a class="btn btn-info" href="/admin">
                  {" "}
                  <i class="fa fa-pencil-square"></i> Post Listing
                </a>
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed;
