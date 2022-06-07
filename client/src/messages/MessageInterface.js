import React, { useEffect, useState, useRef } from "react";
import ChatInterface from "./ChatInterface";
import InboxInterface from "./InboxInterface";
import './styles.css'

import { useQuery, useMutation } from '@apollo/client';
import { GET_CHATS } from '../utils/queries';
import { ADD_CHAT, ADD_MESSAGE } from '../utils/mutations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faMessage } from '@fortawesome/free-solid-svg-icons'

// Socket.io client side
import io from 'socket.io-client';

const socket = io.connect();

export default function MessageInterface({ userData, loadingUser, setChat }) {

  const { loading, data } = useQuery(GET_CHATS, {
    fetchPolicy: 'cache-and-network',
  });

  const [chatData, setChatData] = useState(data?.myChats || []);
  const [joinedMainRoom, setJoinedMainRoom] = useState(false);

  // Importing the addChat mutation from GQL
  const [addChat, { addChatError }] = useMutation(ADD_CHAT);

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
          if (!chat.messages) {
            chatRef.current = {
              ...chat,
              messages: [newMessage]
            };
            return {
              ...chat,
              messages: [...chatRef.current.messages]
            }
          }
          chatRef.current = {
            ...chat,
            messages: [...chat.messages, newMessage]
          };
          return {
            ...chat,
            messages: [...chatRef.current.messages]
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

    const username = e.target[0].value;

    try {
      const { data } = await addChat({
        variables: {
          username
        }
      });

      if (!data) {
        throw new Error('something went wrong!');
      };
      console.log(data);

      chatRef.current = data.addChat;
      joinRoom(data.addChat);
      socket.emit('join_room', data.addChat._id);
      socket.emit('add_new_chat', { username, chat: data.addChat });
      console.log()
      setChatData([...chatData, data.addChat]);

    } catch (err) {
      console.error(err);
    }
  };


  // Listening for a 'receive_message' event from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      console.log(chatData);
      setChatData(prev => {
        return prev.map(chat => {
          if (chat._id === data.chat_id) {
            if (chat.messages.find(item => item._id === data._id)) {
              return chat;
            }
            chatRef.current = {
              ...chat,
              messages: [...chat.messages, data]
            };
            return {
              ...chat,
              messages: [...chatRef.current.messages]
            };
          };
          return chat;
        });
      });
    });

    socket.on("receive_new_message", (data) => {
      console.log(data);
      console.log(chatData);
      setChatData(prev => {
        if (prev.find(chat => chat._id === data._id)) {
          return prev;
        };
        return [
          ...prev,
          data
        ]
      });

      socket.emit('join_room', data._id);
    });

  }, []);

  // Data has not returned yet from GQL
  if (loading || loadingUser) {
    return (
      <section className="message-interface">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </section>
    );
  };

  // User is not logged in
  if (!userData?.username) {
    return (
      <h4 className="chat-alert bg-danger">
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (!joinedMainRoom) {
    socket.emit('join_room', userData.email);
    setJoinedMainRoom(true);
  };

  return (
    <section className="message-interface">
      <div className="message-interface-header">
        <FontAwesomeIcon
          onClick={() => setChat(false)}
          size='lg'
          icon={faMinus}
          className='minimize-chat'
          color='#ff5722'
        />
        {activeChat && (
          <FontAwesomeIcon
            onClick={() => setActiveChat(!activeChat)}
            icon={faMessage}
            size='lg'
            className='back-to-inbox'
            color='#bdd310'
          />
        )}
      </div>
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
            chatData={chatData}
          />
          {addChatError && (
            <div className="my-3 p-3 bg-danger text-white">
              Chat error: {addChatError.message}
            </div>
          )}
          {addMessageError && (
            <div className="my-3 p-3 bg-danger text-white">
              Message error: {addMessageError.message}
            </div>
          )}
        </>
      )}
    </section>
  )
}