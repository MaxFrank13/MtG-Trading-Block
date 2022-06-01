import React, { useEffect } from 'react';
import FormInput from './FormInput';

export default function ChatInterface({ handleMessageSubmit, messages, onChange, currentMessage }) {

  // const [messagePanel, setMessagePanel] = useState([]);

  useEffect(() => {
    const messageInterface = document.querySelector('.chat-messages');

    messageInterface.scrollTop = messageInterface.scrollHeight;
  },[])

  return (
    <section className='chat-interface'>
      <h3>Username</h3>
      <section className='chat-messages'>
        {messages.map(message => (
          <p key={message.id}>{message.content}</p>
        ))}
      </section>
      <FormInput
        onSubmit={handleMessageSubmit}
        placeholder='message'
        onChange={onChange}
        value={currentMessage}
      />
    </section>
  )
}