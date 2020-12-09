import React from "react";

function Home() {
  // set active nav link on page load
  React.useEffect(() => {
    document.getElementById("home").classList.add("active");
    document.getElementById("admin").classList.remove("active");
    document.getElementById("feed").classList.remove("active");
  }, []);

  return (
    <div class="p-3">
      <h2 class="p-1">Home Page</h2>
      <div class="card p-3 h-25 border rounded bg-light">
        <h4 className="text-center px-1 pb-0 beanColor">
          <b>
            <u>Welcome to Bean Marketplace</u>
          </b>
        </h4>
        <h5>
          Clothes are what we do. Buy and sell clothes for the best deals!
        </h5>
        <div class="row">
          <div class="col-5 offset-1">
            <a class="btn btn-lg text-info" href="/feed">
              <i class="fa fa-shopping-bag fa-5x"></i>
              <br></br>
              <h5>Shop</h5>
            </a>
          </div>
          <div class="col-5 text">
            <a class="btn btn-lg text-success" href="/admin">
              <i class="fa fa-money fa-5x"></i>
              <br></br>
              <h5>Sell</h5>
            </a>
          </div>
        </div>
        <img
          class="homePic"
          src={require("../images/frontPage.jpg")}
          alt="Bean Marketplace"
        ></img>
      </div>
    </div>
  );
}

export default Home;
