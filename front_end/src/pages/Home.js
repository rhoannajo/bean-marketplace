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
        <img class="w-100"src={require("../images/frontPage.jpg")}></img>
      </div>
    </div>
  );
}

export default Home;
