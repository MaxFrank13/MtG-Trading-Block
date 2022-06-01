import React, { useEffect, useState } from "react";
import ChatInterface from "./ChatInterface";
import InboxInterface from "./InboxInterface";
import './styles.css'
import { v4 as uuidv4 } from 'uuid';

// Socket.io client side
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

export default function MessageInterface() {
  
  const [activeMessage, setActiveMessage] = useState(true);

  const [messages, setMessages] = useState([]);

  const [chatInputData, setChatInputData] = useState({
    content: ''
  });

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const newMessage = {
      id,
      content: chatInputData.content
    }
    socket.emit('send_message', newMessage);
    setMessages([...messages, newMessage]);
    setChatInputData({
      content: ''
    })
  };

  const handleMessageInput = (e) => {
    const { value } = e.target;
    setChatInputData({
      content: value
    });
    console.log(chatInputData);
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {

      console.log(data);
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
        />
      ) : (
        <InboxInterface 
        />
      )}
    </section>
  )
}