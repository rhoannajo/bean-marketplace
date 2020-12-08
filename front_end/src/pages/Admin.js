import React from "react";
import axios from "axios";

// *** Noticing weird issue with posts not going through on Safari
// Maybe Switch from axios to "http" or another library

const uuidv4 = require("uuid/v4"); // used to create random ids for each listing

const websocket = new WebSocket("ws://localhost:1234/ws");

function Admin() {
  // set active nav link on page load
  React.useEffect(() => {
    document.getElementById("home").classList.remove("active");
    document.getElementById("admin").classList.add("active");
    document.getElementById("feed").classList.remove("active");
    setTitle(window.localStorage.getItem('title'));
    setType(window.localStorage.getItem('type'));
    setPrice(window.localStorage.getItem('price'));
    setDescription(window.localStorage.getItem('description'));
  }, []);

  // state variables
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [postId, setPostId] = React.useState("");

  function getCookie(key) {
    const regex = new RegExp(
      `/(?:(?:^|.*;s*)${key}s*=s*([^;]*).*$)|^.*$/, "$1"`
    );
    return document.cookie.replace(regex).replace(`${key}=`, "");
  }

  function deleteCookie(key) {
    document.cookie = key + "=; Max-Age=0";
    window.location.reload(false);
  }

  function validation() {
    var title = document.forms["form-group"].title.value;
    var price = document.forms["form-group"]["input-price"].id.value;
    var description =
      document.forms["form-group"]["input-description"].id.value;

    if (title === null || title === "") {
      alert("Please insert a title!");
      return false;
    }
    if (price === null || price === "") {
      alert("Please insert a price!");
      return false;
    }
    if (description === null || description === "") {
      alert("Please insert a description!");
      return false;
    }
    return true;
  }

  function handleClick() {
    // handling submit for the listing form
    //var status = validation();

    //if(status === true){
    postListing(); // post request the inputted listing

    // setTitle(""); // reset state variable after submitting
    // setType("");
    // setPrice("");
    // setDescription("");

    // setPostId(uuidv4()); // creating a random id for users listing
    // document.cookie = 'postId=' + uuidv4() + '; Max-Age=86400'; // storing postId in a cookies

    websocket.send("Listings Updated");
  }

  function postListing() {
    // adds a new listing
    let id;
    axios
      .post("/api/createListing", {
        title: title,
        type: type,
        price: price,
        description: description,
      })
      .then(function (response) {
        id = response.data.items[0].entryId;
        // alert(JSON.stringify(response));
      })
      .then(function () {
        document.cookie = "postId=" + id + "; Max-Age=86400"; // storing posted listing in cookies
        window.localStorage.setItem("title",title)
        window.localStorage.setItem("type",type)
        window.localStorage.setItem("price",price)
        window.localStorage.setItem("description",description)

        window.location.reload(false);
      });
  }

  function deleteListing() {
    // removes a listing
    axios
      .post(`/api/deleteListing/?id=${getCookie('postId')}`)
      .then(function (response) {
        // alert(JSON.stringify(response));
      })
      .then(function () {
        deleteCookie("postId");
        websocket.send("Listings Updated");
      });
      window.localStorage.clear();
  }

  return (
    <div>
      <h2 class="p-1">Admin Page</h2>
      <div class="p-3">
        {(() => {
          if (getCookie("postId") === "") {
            return (
              <form
                // onSubmit={handleClick}
                id="listingForm"
                class="mx-auto text-left card p-3 bg-light"
              >
                <h4 className="text-center">
                  <b>
                    <u>Post a Listing</u>
                  </b>
                </h4>

                <div className="form-group">
                  <label htmlFor="input-title">
                    <b>Title:</b>
                  </label>
                  <input
                    required
                    id="input-title"
                    class="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-type">
                    <b>Type:</b>
                  </label>
                  <select
                    required
                    class="form-control"
                    id="input-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" selected disabled hidden>
                      Select a Type
                    </option>
                    <option value="tops">Tops</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="footwear">Footwear</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="input-price">
                    <b>Price:</b>
                  </label>
                  <input
                    required
                    type="number"
                    id="input-price"
                    class="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-description">
                    <b>Description:</b>
                  </label>
                  <input
                    required
                    id="input-description"
                    class="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleClick}
                    id="submit"
                    class="btn beanButton"
                  >
                    <b>
                      <i class="fa fa-paper-plane"></i> Submit
                    </b>
                  </button>
                </div>
              </form>
            );
          } else {
            return (
              <div class="">
                              <form
                // onSubmit={handleClick}
                id="listingForm"
                class="mx-auto text-left card p-3 bg-light"
              >
                <h4 className="text-center">
                  <b>
            <u>Edit Listing</u>
                  </b>
                </h4>

                <div className="form-group">
                  <label htmlFor="input-title">
                    <b>Title:</b>
                  </label>
                  <input
                    required
                    id="input-title"
                    class="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-type">
                    <b>Type:</b>
                  </label>
                  <select
                    required
                    class="form-control"
                    id="input-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" selected disabled hidden>
                      Select a Type
                    </option>
                    <option value="tops">Tops</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="footwear">Footwear</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="input-price">
                    <b>Price:</b>
                  </label>
                  <input
                    required
                    type="number"
                    id="input-price"
                    class="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-description">
                    <b>Description:</b>
                  </label>
                  <input
                    required
                    id="input-description"
                    class="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleClick}
                    id="submit"
                    class="btn beanButton"
                  >
                    <b>
                      <i class="fa fa-paper-plane"></i> Submit
                    </b>
                  </button>
                </div>
              </form>
                <h4>
                  Edit Listing<br></br>*Need to Implement*
                </h4>
                <p>listing ID = {getCookie("postId")}</p>
                <div className="text-center">
                  <button
                    onClick={() => deleteListing()}
                    type="button"
                    id="deleteListing"
                    class="btn btn-danger"
                  >
                    <b>
                      <i class="fa fa-trash fa-lg"></i> Delete
                    </b>
                  </button>
                </div>
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default Admin;
