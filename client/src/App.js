import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Profile from './pages/Profile';
import TradeBlock from './pages/TradeBlock';
import MessageInterface from './messages/MessageInterface';
import Collection from './pages/Collection';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function App() {

  const [chat, setChat] = useState(null);

  return (
    <div>
      <Router>
        <div className="wrapper">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<TradeBlock />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/collection"
                element={<Collection />}
              />
            </Routes>
          </div>
        </div>
      </Router>
      {chat && (
        <MessageInterface
          socket={socket}
        />
      )}
      <button
        onClick={() => setChat(!chat)}
        className='chat-button'
      >
        toggle chat
      </button>
    </div>
  );
}

export default App;
