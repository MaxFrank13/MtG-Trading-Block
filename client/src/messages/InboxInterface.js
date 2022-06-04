import React, { useEffect } from 'react';
import FormInput from './FormInput';

export default function InboxInterface({ onChange, handleNewChatSubmit, newChat, setActiveChat, joinRoom, userData, chatData, setChatData }) {

  const handleChatClick = (e) => {
    e.stopPropagation()
    const currentId = e.target.closest('.message-info-container').dataset.id;

    console.log(currentId);
    const currentChat = chatData.filter(chat => chat._id === currentId);
    console.log(...currentChat);
    joinRoom(...currentChat);
    setActiveChat(true);
  };

  useEffect(() => {
    if (newChat.users){
      console.log(chatData);
      console.log(newChat);
      setChatData([ ...chatData, newChat ]);
    }

  }, [newChat]);

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
          <div className='inbox-info'>
            {chat.users?.filter(item => item.username !== userData.username).map((user, i) => (
              <span key={i}>
                {user.username}
              </span>
            ))}
          </div>
          <p>
            latest message
          </p>
        </div>
      ))}
    </section>
  )
}