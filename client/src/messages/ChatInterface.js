import React, { useEffect } from 'react';
import FormInput from './FormInput';

export default function ChatInterface({ handleMessageSubmit, messages, onChange, currentMessage, userData }) {

  useEffect(() => {
    const messageInterface = document.querySelector('.chat-messages');

    messageInterface.scrollTop = messageInterface.scrollHeight;
  },[messages])

  return (
    <section className='chat-interface'>
      <h3>Username</h3>
      <section className='chat-messages'>
        {messages.map(message => (
          <div 
            key={message.id}
            className={userData.username === message.username ? 'chat-me' : 'chat-them'}
          >
            <p>
              {message.content}
            </p>
            <small className='chat-info-text'>
              <span>
                {message.username}
              </span>
              <span>
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </small>
          </div>

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