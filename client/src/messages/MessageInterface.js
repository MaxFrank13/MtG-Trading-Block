import React, { useEffect, useState, useRef } from "react";
import ChatInterface from "./ChatInterface";
import InboxInterface from "./InboxInterface";
import './styles.css'

import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_CHATS } from '../utils/queries';
import { ADD_CHAT, ADD_MESSAGE } from '../utils/mutations';

// Socket.io client side
import io from 'socket.io-client';

const socket = io.connect();

export default function MessageInterface({userData, loadingUser}) {

  const [ loadChats, { called, loading, data } ] = useLazyQuery(GET_CHATS);

  const [chatData, setChatData] = useState(data?.myChats || []);

  // Importing the addChat mutation from GQL
  const [addChat, { addChatError }] = useMutation(ADD_CHAT);
  const [newChat, setNewChat] = useState({});

  const [addMessage, { addMessageError }] = useMutation(ADD_MESSAGE);
  
  useEffect(() => {

    const chats = data?.myChats || [];

    chats.forEach(chat => {
      socket.emit('join_room', chat._id)
    });

    console.log(chats);

    setChatData(chats);

  }, [data]);

  // Boolean to toggle chat window
  const [activeChat, setActiveChat] = useState(false);

  // Reference to the current chat
  const chatRef = useRef({});

  // This is tracking the user's MESSAGE input whenever they type
  const [chatInputData, setChatInputData] = useState('');

  // Messages are given unique ids and added to the state variable
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    let newMessage;
    // POST TO DB
    try {
      const { data } = await addMessage({
        variables: {
          chat_id: chatRef.current._id,
          createdAt: Date.now().toString(),
          content: chatInputData,
          username: userData.username,
        }
      });

      if (!data) {
        throw new Error('something went wrong!');
      };

      newMessage = data.addMessage;

    } catch (err) {
      console.error(err);
    }

    // emits a 'send_message' event to the server, passing the newMessage
    socket.emit('send_message', newMessage);

    console.log(chatRef);

    function modifyChats() {
      return chatData.map(chat => {
        if (chat._id === chatRef.current._id) {
          chatRef.current = {
            ...chat,
            messages: [ ...chat.messages, newMessage ]
          };
          return {
            ...chat,
            messages: [ ...chatRef.current.messages]
          };
        };
        return chat;
      })
    };

    const newChats = modifyChats();

    console.log(newChats);

    setChatData(newChats);

    setChatInputData('');
  };

  // Function that tracks the onChange event of the MESSAGE input
  const handleMessageInput = (e) => {
    const { value } = e.target;
    setChatInputData(value);
  };

  const joinRoom = (data) => {
    console.log(data);
    chatRef.current = data;
  }

  // Handles the chat invite and adds a new Chat to the DB
  const handleNewChatSubmit = async (e) => {
    e.preventDefault();

    const emailInput = e.target[0].value;

    try {
      const { data } = await addChat({
        variables: {
          inviteEmail: emailInput
        }
      });

      if (!data) {
        throw new Error('something went wrong!');
      };
      console.log(data);

      chatRef.current = data.addChat;
      joinRoom(data.addChat);
      setNewChat(data.addChat);

    } catch (err) {
      console.error(err);
    }
  };


  // Listening for a 'receive_message' event from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setChatData(prev => {
        return prev.map(chat => {
          if (chat._id === data.chat_id) {
            if (chat.messages.find(item => item._id === data._id)){
              return chat;
            }
            chatRef.current = {
              ...chat,
              messages: [ ...chat.messages, data ]
            };
            return {
              ...chat,
              messages: [ ...chatRef.current.messages]
            };
          };
          return chat;
        });
      });
    });
  }, []);

  // Data has not returned yet from GQL
  if (loading || loadingUser) {
    return <h2>LOADING...</h2>;
  };

  // User is not logged in
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
      <div onClick={() => setActiveChat(!activeChat)}>
        {activeChat && 'invite'}
      </div>
      <button onClick={() => loadChats()}>loadChats</button>
      {activeChat ? (
        <ChatInterface
          handleMessageSubmit={handleMessageSubmit}
          onChange={handleMessageInput}
          currentMessage={chatInputData}
          userData={userData}
          activeChat={chatRef.current}
        />
      ) : (
        <>
          <InboxInterface
            handleNewChatSubmit={handleNewChatSubmit}
            setActiveChat={setActiveChat}
            joinRoom={joinRoom}
            userData={userData}
            newChat={newChat}
            chatData={chatData}
            setChatData={setChatData}
          />
          {addChatError && (
            <div className="my-3 p-3 bg-danger text-white">
              {addChatError.message}
            </div>
          )}
          {addMessageError && (
            <div className="my-3 p-3 bg-danger text-white">
              {addMessageError.message}
            </div>
          )}
        </>
      )}
    </section>
  )
}