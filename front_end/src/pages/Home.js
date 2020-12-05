import React from 'react';

function Home() {
  var navLink = document.getElementById("feed");
  if(navLink){
    document.getElementById("home").classList.add('active');
    document.getElementById("admin").classList.remove('active');
    document.getElementById("feed").classList.remove('active');
  }
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
}

export default Home;
