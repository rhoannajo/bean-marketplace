import React from 'react';

function Home() {
  // set active nav link on page load
  React.useEffect(() => {
    document.getElementById("home").classList.add('active');
    document.getElementById("admin").classList.remove('active');
    document.getElementById("feed").classList.remove('active');
  }, []);

  return (
    <div>
      <h2 class="p-1">Home Page</h2>
      <h4 class="p-1 beanColor">Welcome to Bean Marketplace</h4>
      <div class="p-3">
      <div class="row">
          <div class="col-5 offset-1"><a class="btn btn-lg text-info"href="/feed"><i class="fa fa-shopping-bag fa-5x"></i><br></br><h5>Shop</h5></a></div>
          <div class="col-5 text"><a class="btn btn-lg text-success" href="/admin"><i class="fa fa-money fa-5x"></i><br></br><h5>Sell</h5></a></div>
        </div>
        <img class="w-100 border border-dark rounded" src={require("../images/frontPage.jpg")}></img>
      </div>
    </div>
  );
}

export default Home;
