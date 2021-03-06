import React from "react";
import axios from "axios";

// imports for type icons
import tops from "../images/tops.png";
import outerwear from "../images/outerwear.png";
import bottoms from "../images/tops.png";
import footwear from "../images/tops.png";

const websocket = new WebSocket("ws://localhost:1234/ws");

function Listing() {
  // state var for storing the posted listings
  const [listings, setListings] = React.useState([""]);

  React.useEffect(() => {
    loadListing(); // load listings on page load

    // setting the correct active tab in navbar
    document.getElementById("home").classList.remove("active");
    document.getElementById("admin").classList.remove("active");
    document.getElementById("feed").classList.remove("active");

    // function to update listings
    const handleWebsocketMessage = (messageEvent) => {
      if (JSON.stringify(messageEvent.data) === '"Listings Updated"') {
        loadListing();
        window.location.reload(false); // reloading the page to display updates
      }
    };

    // listener to update feed when listings are updated
    websocket.addEventListener("message", handleWebsocketMessage);
  }, []);

  function loadListing() {
    //filters the listings to only get passed entryId
    axios
      .get(
        `/api/viewListings/?entryId=${new URLSearchParams(
          window.location.search
        ).get("id")}`
      )
      .then(function (response) {
        setListings(response.data.items);
      });
  }

  return (
    <div class="p-3">
      <h2 class="p-1">
        Listing {new URLSearchParams(window.location.search).get("id")}
      </h2>
      <div class="mx-auto card bg-light my-3 px-3 py-1 text-center">
        <div class="container-fluid">
          {listings.map((item) => (
            <div class="p-3">
              <h3 className="text-center">
                <b>
                  <u>
                    <b>Title: </b>
                    {item.title}
                  </u>
                </b>
              </h3>
              <hr></hr>
              <h5 class="caps">
                <div class={`${item.type} logoPic`}></div>
                <b>Type: </b>
                {item.type}
              </h5>
              <h5>
                <b>$</b>
                {item.price}
              </h5>
              <h5>
                <b>Description: </b>
                {item.description}
              </h5>
              <h6>{item.date}</h6>
              {/* To silence the Js warnings */}
              <img hidden class={tops} alt="tops"></img>
              <img hidden class={bottoms} alt="bottoms"></img>
              <img hidden class={outerwear} alt="outerwear"></img>
              <img hidden class={footwear} alt="footwear"></img>
            </div>
          ))}
        </div>
        {listings.length === 0 && (
          <h5 class="p-3">
            <i class="fa fa-exclamation-triangle fa-lg text-danger"></i> Listing
            Does Not Exist or Was Deleted
          </h5>
        )}
      </div>
      <a class="btn btn-info" href="/feed">
        {" "}
        <i class="fa fa-arrow-left"></i> Back to Feed
      </a>
    </div>
  );
}
export default Listing;
