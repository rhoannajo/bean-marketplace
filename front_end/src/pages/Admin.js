import React from "react";

const websocket = new WebSocket('ws://localhost:1234/ws');

const uuidv4 = require("uuid/v4"); // used to create random ids for each listing

function Admin() {
  // // set active nav link on page load
  React.useEffect(() => {
    document.getElementById("home").classList.remove("active");
    document.getElementById("admin").classList.add("active");
    document.getElementById("feed").classList.remove("active");
  }, []);

  // state variables
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");

  function getCookie(key) {
    // using regex to extract a cookie's value
    const regex = new RegExp(
      `/(?:(?:^|.*;s*)${key}s*=s*([^;]*).*$)|^.*$/, "$1"`
    );
    return document.cookie.replace(regex).replace(`${key}=`, "");
  }

  function deleteCookie(key) {
    // setting a cookie to expire, such as user's listing deleted
    document.cookie = key + "=;Max-Age=0";
    window.location.reload(false);
  }

  function handleSubmit() {
    let uuid = uuidv4(); // creating a random id for users listing
    document.cookie = "postId=" + uuid + ";Max-Age=86400"; // storing postId in a cookie, expires in 24 hours
    let listing = {
      title: title,
      type: type,
      price: price,
      description: description,
      id: uuid,
    };
    alert(JSON.stringify(listing));
  }

  /////

  // state variable
  const [message, setMessage] = React.useState("");

  function handleClick() {
    // just to test
    // alert(message);

    // create network call (js client call)
    setMessage("");
    // fetch(`/storeNote?note=${message}`)
    //   .then(getMessages); // looks like method ref
    websocket.send(title);
  }

  return (
    <div>
      <h2 class="p-1">Admin Page</h2>
      <div class="p-3">
        {(() => {
          if (getCookie("postId") === "") {
            return (
              <form
                onSubmit={handleClick}
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
                    <option value="car">Car</option>
                    <option value="truck">Truck</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="input-price">
                    <b>Price:</b>
                  </label>
                  <input
                    required
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
                    id="input-description"
                    class="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <button type="submit" id="submit" class="btn beanButton">
                    <b>Submit</b>
                  </button>
                </div>
              </form>
            );
          } else {
            return (
              <div class="mx-auto card p-3 bg-light">
                <h4>
                  Edit Listing<br></br>*Need to Implement*
                </h4>
                <p>listing ID = {getCookie("postId")}</p>
                <div className="text-center">
                  <button
                    onClick={() => deleteCookie("postId")}
                    type="button"
                    id="deleteListing"
                    class="btn btn-danger"
                  >
                    <b>Submit</b>
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
