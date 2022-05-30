import React, { useEffect } from "react";
import './styles.css'

export default function MessageInterface({ socket }) {

  const handleMessageClick = (e) => {
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
      <div>
        <button onClick={handleMessageClick}>Click here</button>
      </div>
      <div>
        <p>messages here</p>
      </div>
    </section>
  )
}