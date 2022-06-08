import React, { useEffect } from 'react';
import FormInput from './FormInput';

export default function ChatInterface({ handleMessageSubmit, onChange, currentMessage, userData, activeChat }) {

  useEffect(() => {
    const messageInterface = document.querySelector('.chat-messages');

    messageInterface.scrollTop = messageInterface.scrollHeight;
  }, [activeChat])

  return (
    <section className='chat-interface'>
      {activeChat.users?.filter(user => user.username !== userData.username).map((filteredUser, i) => (
        <div className='chat-interface-header' key={i}>
          <small>chatting with</small>
          <h5>
            {filteredUser.username}
          </h5>
        </div>

      ))}
      <section className='chat-messages'>
        {activeChat.messages?.map(message => (
          <div
            key={message._id}
            className={userData.username === message.username ? 'chat-me' : 'chat-them'}
            data-createdat={message.createdAt}
          >
            <p>
              {message.content}
            </p>
            <small className='chat-info-text'>
              <span>
                {userData.username === message.username ? 'me' : message.username}
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