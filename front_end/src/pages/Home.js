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
      <h2>Home Page</h2>
    </div>
  );
}

export default Home;
