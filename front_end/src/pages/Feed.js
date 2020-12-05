import React from 'react';

function Feed() {
  // set active nav link on page load
  React.useEffect(() => {
    document.getElementById("home").classList.remove('active');
    document.getElementById("admin").classList.remove('active');
    document.getElementById("feed").classList.add('active');
  }, []);

  return (
    <div>
      <h2>Feed Page</h2>
      <div id="page">
          <form className="mx-auto text-left card bg-light px-3 py-1">
            <div class="form-group">
              <label for="filterType"><b>Filter by Type:</b></label>
              <select class="form-control" id="filterType">
                <option>All</option>
                <option>Cars</option>
                <option>Trucks</option>
                <option>Motorcycles</option>
             </select>
            </div>
          </form>
        </div>
    </div>
  );
}

export default Feed;
