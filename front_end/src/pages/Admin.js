import React from 'react';

function Admin() {
  // set active nav link on page load
  React.useEffect(() => {
    document.getElementById("home").classList.remove('active');
    document.getElementById("admin").classList.add('active');
    document.getElementById("feed").classList.remove('active');
  }, []);
  
  // state variables
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  
    function alertInput(){
      alert(title+' '+type+' '+price+' '+description);
    }
        
  return (
    <div>
      <h2>Admin Page</h2>
      <div id="page">
              <form onSubmit={alertInput} id="listingForm" class="mx-auto text-left card p-3 bg-light">

                <h4 className="text-center"><b><u>Post a Listing</u></b></h4>

                <div className="form-group">
                  <label htmlFor="input-title"><b>Title:</b></label>
                  <input required id="input-title" class="form-control" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="input-type"><b>Type:</b></label>
                  <select required class="form-control" id="input-type" value={type} onChange={e => setType(e.target.value)}>
                  <option value="" selected disabled hidden>Select a Type</option>
                    <option value="car">Car</option>
                    <option value="truck">Truck</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="input-price"><b>Price:</b></label>
                  <input required id="input-price" class="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="input-description"><b>Description:</b></label>
                  <input id="input-description" class="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>

                <div className="text-center">
                  <button type="submit" id="submit" class="btn btn-primary"><b>Submit</b></button>
                </div>
              </form>
            </div>
    </div>
    
  );
}

export default Admin;
