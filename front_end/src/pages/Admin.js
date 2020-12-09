import React from "react";
import axios from "axios";

import Popup from "reactjs-popup";

const websocket = new WebSocket("ws://localhost:1234/ws");

function Admin() {
  // state variables
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priceError, setPriceError] = React.useState("");

  // set active nav link on page load
  React.useEffect(() => {
    document.getElementById("home").classList.remove("active");
    document.getElementById("admin").classList.add("active");
    document.getElementById("feed").classList.remove("active");

    // filling out edit form with listing's values
    setTitle(window.localStorage.getItem("title"));
    setType(window.localStorage.getItem("type"));
    setPrice(window.localStorage.getItem("price"));
    setDescription(window.localStorage.getItem("description"));

    // displaying the post, edit, and delete confirmation popup
    if (window.localStorage.getItem("popUp") == "listed") {
      document.getElementById("listed").click();
      window.localStorage.setItem("popUp", "");
    } else if (window.localStorage.getItem("popUp") == "deleted") {
      document.getElementById("deleted").click();
      window.localStorage.setItem("popUp", "");
    } else if (window.localStorage.getItem("popUp") == "edited") {
      document.getElementById("edited").click();
      window.localStorage.setItem("popUp", "");
    }
  }, []);

  function getCookie(key) {
    // function to get value of a cookie, used to store postId in a persistent way
    const regex = new RegExp(
      `/(?:(?:^|.*;s*)${key}s*=s*([^;]*).*$)|^.*$/, "$1"`
    );
    return document.cookie.replace(regex).replace(`${key}=`, "");
  }

  function deleteCookie(key) {
    // function to delete a cookie, used after a listing is deleted
    document.cookie = key + "=; Max-Age=0";
    window.location.reload(false);
  }

  function validation() {
    // reseting the invalid fields to no longer ber red
    document.getElementById("input-title").className = "form-control";
    document.getElementById("input-type").className = "form-control";
    document.getElementById("input-price").className = "form-control";
    document.getElementById("input-description").className = "form-control";

    // validates forms to make sure all inputs are valid
    if (title === null || title === "" || title === " ") {
      document.getElementById("input-title").className =
        "form-control is-invalid";
      return false;
    } else if (type === null || type === "" || type === " ") {
      document.getElementById("input-type").className =
        "form-control is-invalid";
      return false;
    } else if (price === null || price === "" || price === " ") {
      setPriceError("Please insert a price!");
      document.getElementById("input-price").className =
        "form-control is-invalid";
      return false;
    } else if (price != parseInt(price, 10)) {
      // checking that price is an integer value
      setPriceError("Please insert a whole number for price!");
      document.getElementById("input-price").className =
        "form-control is-invalid";
      return false;
    } else if (price <= 0) {
      setPriceError("Please insert a price over $0!");
      document.getElementById("input-price").className =
        "form-control is-invalid";
      return false;
    } else if (price > 2147483647) {
      setPriceError(
        "Please insert a lower price, the maximum is $2,147,483,647!"
      );
      document.getElementById("input-price").className =
        "form-control is-invalid";
      return false;
    } else if (
      description === null ||
      description === "" ||
      description === " "
    ) {
      document.getElementById("input-description").className =
        "form-control is-invalid";
      return false;
    }
    return true;
  }

  function postListing() {
    // adds a listing to the batabase
    //validates input fields are not empty and correct
    let status = validation();

    if (status === true) {
      // valid form so will new listing to backend
      let id;
      axios
        .post("/api/createListing", {
          title: title,
          type: type,
          price: price,
          description: description,
          date: "Posted " + new Date().toLocaleString().toString(),
        })
        .then(function (response) {
          id = response.data.items[0].entryId;
        })
        .then(function () {
          document.cookie = "postId=" + id + "; Max-Age=86400"; // storing postId of listing in cookies
          window.localStorage.setItem("title", title); // storing fields to display in edit form
          window.localStorage.setItem("type", type);
          window.localStorage.setItem("price", price);
          window.localStorage.setItem("description", description);

          window.localStorage.setItem("popUp", "listed"); // setting "listed" to show post success popUp after refresh

          websocket.send("Listings Updated"); // send websocket message to update ever user's feed real-time

          window.location.reload(false); // reloading the page to display the edit listing form
        });
    }
  }

  function deleteListing() {
    // removes a listing from database
    axios
      .post(`/api/deleteListing/?id=${getCookie("postId")}`)
      .then(function () {
        let deletedPostId = getCookie("postId");
        let deletedTitle = window.localStorage.getItem("title");
        deleteCookie("postId");
        window.localStorage.clear();

        window.localStorage.setItem("popUp", "deleted"); // setting "delete" to show post successful delete after refresh
        window.localStorage.setItem("deletedPostId", deletedPostId); // storing values to display in popup
        window.localStorage.setItem("deletedTitle", deletedTitle);

        websocket.send("Listings Updated"); // send websocket message to update ever user's feed real-time

        window.location.reload(false); // reloading the page to return to postLisitng screen
      });
  }

  function editListing() {
    // edits a listing in the batabase
    let id;
    let status = validation();
    if (status === true) {
      // checking that form is valid
      let ls = window.localStorage;

      // checking that if listing hasn't been edited, no need to update
      if (
        title === ls.getItem("title") &&
        type === ls.getItem("type") &&
        price === ls.getItem("price") &&
        description === ls.getItem("description")
      ) {
        alert("Please make a change to update your listing!");
        return;
      }

      axios
        .post(`/api/editListing/?id=${getCookie("postId")}`, {
          title: title,
          type: type,
          price: price,
          description: description,
          entryId: getCookie("postId"),
          date: "Edited " + new Date().toLocaleString().toString(),
        })
        .then(function (response) {
          id = response.data.items[0].entryId;
        })
        .then(function () {
          document.cookie = "postId=" + id + "; Max-Age=86400"; // storing posted listing in cookies
          window.localStorage.setItem("title", title); // storing fields to display in edit form
          window.localStorage.setItem("type", type);
          window.localStorage.setItem("price", price);
          window.localStorage.setItem("description", description);

          window.localStorage.setItem("popUp", "edited"); // setting popUp to display successful edit after reload

          websocket.send("Listings Updated"); // update all users feeds realtime

          window.location.reload(false); // reloading the page to update value and display success popUp
        });
    }
  }

  function closePopUp(name) {
    // function to close a pop window
    window.localStorage.setItem(name, "");
    document.getElementById(name).click();
  }

  return (
    <div>
      <h2 class="p-1">Admin Page</h2>
      <div class="p-3">
        {(() => {
          if (getCookie("postId") === "") {
            return (
              <form
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
                  <div class="invalid-feedback">Please insert a title!</div>
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
                    <option value="tops">Top</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="bottoms">Bottom</option>
                    <option value="footwear">Footwear</option>
                  </select>
                  <div class="invalid-feedback">Please insert a type!</div>
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
                  <div id="priceError" class="invalid-feedback">
                    {priceError}
                  </div>
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
                  <div class="invalid-feedback">
                    Please insert a description!
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => postListing()}
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
                    <div class="invalid-feedback">Please insert a title!</div>
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
                    <div class="invalid-feedback">Please insert a type!</div>
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
                    <div id="priceError" class="invalid-feedback">
                      {priceError}
                    </div>
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
                    <div class="invalid-feedback">
                      Please insert a description!
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => editListing()}
                      id="submitEdit"
                      class="btn beanButton"
                    >
                      <b>
                        <i class="fa fa-pencil"></i> Update
                      </b>
                    </button>
                    &nbsp;
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
                </form>
              </div>
            );
          }
        })()}
      </div>
      <div class="w-100">
        <Popup
          modal
          trigger={
            <button hidden id="listed">
              Listed
            </button>
          }
        >
          <div class="container h-100 d-flex justify-content-center text-center">
            <div class="jumbotron my-auto beanPopUp border border-dark p-4">
              <button
                hidden
                type="button"
                class="btn topRight"
                onClick={() => closePopUp("listed")}
              >
                <i class="fa fa-times-circle fa-lg text-danger"></i>
              </button>
              <i class="fa fa-check fa-3x text-success"></i>
              <h2 class="display-5 py-1 px-1">
                Listing: {window.localStorage.getItem("title")} Added!
              </h2>
              <h6 class="display-5 px-1 pb-2">
                Post Id: {getCookie("postId")}
              </h6>
              <a class="btn btn-warning" href="/admin">
                {" "}
                <i class="fa fa-edit fa-lg"></i> Edit Listing
              </a>
              &nbsp;
              <a class="btn btn-primary" href="/feed">
                <i class="fa fa-eye fa-lg"></i> View Feed
              </a>
            </div>
          </div>
        </Popup>
        <Popup
          modal
          trigger={
            <button hidden id="deleted">
              Deleted
            </button>
          }
        >
          <div class="container h-100 d-flex justify-content-center text-center">
            <div class="jumbotron my-auto beanPopUp border border-dark p-4">
              <button
                type="button"
                class="btn topRight"
                onClick={() => closePopUp("deleted")}
              >
                <i class="fa fa-times-circle fa-lg text-danger"></i>
              </button>
              <i class="fa fa-trash fa-3x text-danger"></i>
              <h2 class="display-5 py-1 px-1">
                Listing: {window.localStorage.getItem("deletedTitle")} Deleted!
              </h2>
              <h6 class="display-5 px-1 pb-2">
                Post Id: {window.localStorage.getItem("deletedPostId")}
              </h6>
              <a class="btn btn-warning" href="/admin">
                {" "}
                <i class="fa fa-trash fa-lg"></i> Post Listing
              </a>
              &nbsp;
              <a class="btn btn-primary" href="/feed">
                <i class="fa fa-eye fa-lg"></i> View Feed
              </a>
            </div>
          </div>
        </Popup>
        <Popup
          modal
          trigger={
            <button hidden id="edited">
              Deleted
            </button>
          }
        >
          <div class="container h-100 d-flex justify-content-center text-center">
            <div class="jumbotron my-auto beanPopUp border border-dark p-4">
              <button
                type="button"
                class="btn topRight"
                onClick={() => closePopUp("edited")}
              >
                <i class="fa fa-times-circle fa-lg text-danger"></i>
              </button>
              <i class="fa fa-pencil fa-3x text-success"></i>
              <h2 class="display-5 py-1 px-1">
                Listing: {window.localStorage.getItem("title")} Edited!
              </h2>
              <h6 class="display-5 px-1 pb-2">
                Post Id: {getCookie("postId")}
              </h6>
              <a class="btn btn-warning" href="/admin">
                {" "}
                <i class="fa fa-edit fa-lg"></i> Edit Listing
              </a>
              &nbsp;
              <a class="btn btn-primary" href="/feed">
                <i class="fa fa-eye fa-lg"></i> View Feed
              </a>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default Admin;
