import React from "react";
import axios from "axios";

const websocket = new WebSocket("ws://localhost:1234/ws");

function Feed() {
  const [messages, setMessages] = React.useState([""]);
  const [listings, setListings] = React.useState([""]);

  // const [message, setMessage] = React.useState("");

  // const [filter, setFilter] = React.useState();

  // set active nav link on page load
  React.useEffect(() => {
    loadListings();
    document.getElementById("home").classList.remove("active");
    document.getElementById("admin").classList.remove("active");
    document.getElementById("feed").classList.add("active");
    // Trigger getMessages when the page loads
    websocket.addEventListener("message", handleWebsocketMessage);
  }, []);

  const handleWebsocketMessage = (messageEvent) => {
    // alert(JSON.stringify(messageEvent.data));

    if (JSON.stringify(messageEvent.data) == "\"Listings Updated\"") {
      //alert(messageEvent);
      // console.log(messageEvent);
      // const newMessages = JSON.parse(messageEvent.data);
      // setMessages(newMessages);
      loadListings();
      // this.refresh();
       document.getElementById('feedLink').click();
      //window.location.reload(false);
    }
  };

  // function getMessages() {
  //   fetch(`/getNotes`)
  //     .then((res) => res.json()) // async (parse json)
  //     .then((data) => setMessages(data)); // also async
  // }

  function loadListings() {
    // get all the listings to display on the webpage
    axios.get("/api/viewListings").then(function (response) {
      // doing something with the response
      // alert(response.data.items);
      setListings(response.data.items); // store the listings in the state variable array 'listings'
    });
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
            <select class="form-control" id="filterType">
              <option>All</option>
              <option>Tops</option>
              <option>Outerwear</option>
              <option>Bottoms</option>
              <option>Footwear</option>
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
                        <i
                          class={`fa fa-${item.type} fa-lg typeColor ${item.type}Color`}
                        ></i>{" "}
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
