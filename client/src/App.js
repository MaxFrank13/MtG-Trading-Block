import logo from './logo.svg';
import './App.css';
import MessageInterface from './messages/MessageInterface';

import io from 'socket.io-client';

// socket connection
const socket = io.connect('http://localhost:3000');

function App() {
  return (
    <MessageInterface
      socket={socket}
    />
  );
}

export default App;
