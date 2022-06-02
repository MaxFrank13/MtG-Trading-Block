import React, { useEffect, useState } from "react";
import ChatInterface from "./ChatInterface";
import InboxInterface from "./InboxInterface";
import './styles.css'
import { v4 as uuidv4 } from 'uuid';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

// Socket.io client side
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

export default function MessageInterface() {

  const { loading, data } = useQuery(GET_ME);
  const [userData, setUserData] = useState(data?.me || {});

  useEffect(() => {
  
    const user = data?.me || {};
  
    console.log(user);
  
    setUserData(user);

  },[data]);
  
  const [activeMessage, setActiveMessage] = useState(true);

  const [messages, setMessages] = useState([]);

  const [chatInputData, setChatInputData] = useState('');

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const newMessage = {
      id,
      username: userData.username,
      email: userData.email,
      content: chatInputData,
      createdAt: Date.now()
    };
    socket.emit('send_message', newMessage);
    setMessages([...messages, newMessage]);
    setChatInputData('');
  };

  const handleMessageInput = (e) => {
    const { value } = e.target;
    setChatInputData(value);
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {

      setMessages((prev) => {

        if (prev.length) {
          if (prev.find(item => item.id === data.id)) {
            return prev;
          };
          return [ ...prev, data ]
        };
        return [ data ];
      });
    });
  }, []);

  if (loading) {
    return <h2>LOADING...</h2>;
  };

  if (!userData?.username) {
    return (
      <h4 className="chat-alert bg-danger">
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  };

  return (
    <section className="message-interface">
      <button onClick={() => setActiveMessage(!activeMessage)}>
        {activeMessage ? 'invite' : 'chat'}
      </button>
      {activeMessage ? (
        <ChatInterface 
          handleMessageSubmit={handleMessageSubmit}
          messages={messages}
          onChange={handleMessageInput}
          currentMessage={chatInputData}
          userData={userData}
        />
      ) : (
        <InboxInterface 
        />
      )}
    </section>
  )
}