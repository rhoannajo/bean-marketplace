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
      <h2 class="p-1 beanColor">
        Welcome to Bean Marketplace
      </h2>
      <h4>Home Page</h4>
    </div>
  );
}

export default Home;
