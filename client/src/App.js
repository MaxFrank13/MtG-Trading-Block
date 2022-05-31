import React, { useState } from "react";

// Apollo Client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages and Components
import Header from './components/Header';
import Profile from './pages/Profile';
import TradeBlock from './pages/TradeBlock';
import MessageInterface from './messages/MessageInterface';
import Collection from './pages/Collection';
import Login from './pages/Login';

// Socket.io client side
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  // State to set if chat window is active
  const [chat, setChat] = useState(null);

  return (
    <ApolloProvider client={client}>
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
              <Route
                path="/login"
                element={<Login />}
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
    </ApolloProvider>
  );
}

export default App;
