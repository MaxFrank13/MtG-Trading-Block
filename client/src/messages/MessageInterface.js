import React, { useEffect, useState } from "react";
import ChatInterface from "./ChatInterface";
import InboxInterface from "./InboxInterface";
import './styles.css'

export default function MessageInterface({ socket }) {

  const [activeMessage, setActiveMessage] = useState(true);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit('send_message', {
      hello: 'hello world'
    });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {

      console.log(data);
      // setMessagePanel((prev) => {

      //   if (prev.length) {
      //     if (prev.find(item => item.id === data.id)) {
      //       return prev;
      //     };
      //     return [ ...prev, data ]
      //   };
      //   return [ data ];
      // });
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
        />
      ) : (
        <InboxInterface />
      )}
    </section>
  )
}