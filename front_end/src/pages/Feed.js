import React from 'react';

const websocket = new WebSocket('ws://localhost:1234/ws');

function Feed() {
  // set active nav link on page load
  React.useEffect(() => {
    document.getElementById("home").classList.remove("active");
    document.getElementById("admin").classList.remove("active");
    document.getElementById("feed").classList.add("active");
    // Trigger getMessages when the page loads
    websocket.addEventListener("message", handleWebsocketMessage);
  }, []);

  const [messages, setMessages] = React.useState([""]);

  const handleWebsocketMessage = (messageEvent) => {
    console.log(messageEvent);
    const newMessages = JSON.parse(messageEvent.data);
    setMessages(newMessages);
  };

  function getMessages() {
    fetch(`/getNotes`)
      .then((res) => res.json()) // async (parse json)
      .then((data) => setMessages(data)); // also async
  }

  return (
    <div>
      <h2 class="p-1">Feed Page</h2>
      <div class="p-3">
        <form class="mx-auto text-left card bg-light px-3 py-1">
          <div class="form-group">
            <label for="filterType">
              <b>Filter by Type:</b>
            </label>
            <select class="form-control" id="filterType">
              <option>All</option>
              <option>Cars</option>
              <option>Trucks</option>
              <option>Motorcycles</option>
            </select>
          </div>
        </form>
        <div class="mx-auto card bg-light my-3 px-3 py-1 text-center">
          <h2>Listings:</h2>
          {messages.map(item => <div class="">{item}</div>)}
        </div>
      </div>
    </div>
  );
}

export default Feed;
