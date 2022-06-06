import React from 'react';
import FormInput from './FormInput';

export default function InboxInterface({ onChange, handleNewChatSubmit, setActiveChat, joinRoom, userData, chatData }) {

  const handleChatClick = (e) => {
    e.stopPropagation()
    const currentId = e.target.closest('.message-info-container').dataset.id;

    console.log(currentId);
    const currentChat = chatData.filter(chat => chat._id === currentId);
    console.log(...currentChat);
    joinRoom(...currentChat);
    setActiveChat(true);
  };

  if (!chatData) {
    return (
      <h4 className="chat-alert bg-danger">
        No chat data.
      </h4>
    );
  };

  return (
    <section className='inbox-interface'>
      <FormInput
        onSubmit={handleNewChatSubmit}
        placeholder='invite to chat'
        onChange={onChange}
      />
      {chatData && chatData.map((chat, i) => (
        <div
          key={i}
          onClick={handleChatClick}
          data-id={chat._id}
          className='message-info-container'
        >
          <p>
            {chat.messages?.length > 0 ? (
              <>
                <span>{chat.messages.at(-1).content}</span>
                <span>{chat.messages.at(-1).username === userData.username ? 'me' : chat.messages.at(-1).username}</span>
              </>
            ) :(
              <small>no messages</small>
            )}
          </p>
          <div className='inbox-info'>
            <span>Chat with </span>
            {chat.users?.filter(item => item.username !== userData.username).map((user, i) => (
              <span key={i}>{user.username}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}