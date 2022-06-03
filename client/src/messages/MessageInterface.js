import React, { useEffect, useState, useRef } from "react";
import ChatInterface from "./ChatInterface";
import InboxInterface from "./InboxInterface";
import './styles.css'
import { v4 as uuidv4 } from 'uuid';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { ADD_CHAT, ADD_MESSAGE } from '../utils/mutations';

// Socket.io client side
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

export default function MessageInterface() {

  // User information being fetched from GQL and set as a state variable
  const { loading, data } = useQuery(GET_ME);

  const [userData, setUserData] = useState(data?.me || {});

  // Importing the addChat mutation from GQL
  const [addChat, { addChatError }] = useMutation(ADD_CHAT);
  const [newChat, setNewChat] = useState({});

  const [addMessage, { addMessageError }] = useMutation(ADD_MESSAGE);
  const [newMessage, setNewMessage] = useState({});

  // useEffect that fires as soon as the data comes in from the GQL request
  // sets userData to the response from the request
  useEffect(() => {

    const user = data?.me || {};

    console.log(user);

    setUserData(user);

  }, [data]);

  // Will be set when the user selects a chat
  const [activeChat, setActiveChat] = useState({});
  const chatRef = useRef({});

  // useEffect(() => {

  //   console.log('active chat is changing');
  //   console.log(activeChat);
  //   // setMessages(activeChat?.messages || [])

  // }, [activeChat]);

  // Array of messages for a given chat - gets reset when the user changes chats
  const [messages, setMessages] = useState([]);

  // This is tracking the user's MESSAGE input whenever they type
  const [chatInputData, setChatInputData] = useState('');

  // Messages are given unique ids and added to the state variable
  // TODO: need to add MESSAGE POST REQUEST
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const _id = uuidv4();
    const newMessage = {
      _id,
      username: userData.username,
      email: userData.email,
      content: chatInputData,
      createdAt: Date.now(),
      room: chatRef.current
    };
    // POST TO DB
    try {
      const { data } = await addMessage({
        variables: {
          chat_id: activeChat._id,
          createdAt: newMessage.createdAt.toString(),
          content: newMessage.content,
          username: newMessage.username,
        }
      });

      if (!data) {
        throw new Error('something went wrong!');
      };


    } catch (err) {
      console.error(err);
    }

    // emits a 'send_message' event to the server, passing the newMessage
    socket.emit('send_message', newMessage);

    // setMessages([...messages, newMessage]);

    console.log(activeChat.messages);
    chatRef.current = {
      ...activeChat,
      messages: [...activeChat.messages, newMessage]
    };

    console.log(chatRef);

    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, newMessage]
    });


    setChatInputData('');
  };


  // Function that tracks the onChange event of the MESSAGE input
  const handleMessageInput = (e) => {
    const { value } = e.target;
    setChatInputData(value);
  };

  const joinRoom = (data) => {
    console.log(data);
    socket.emit('join_room', { chatRef, newRoom: data._id })

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

      setActiveChat(data.addChat);
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
      console.log(activeChat);
      console.log(chatRef);
      setActiveChat( {
        ...chatRef.current,
        messages: [...chatRef.current.messages, data]
      });

      setMessages((prev) => {

        if (prev.length) {
          if (prev.find(item => item.id === data.id)) {
            return prev;
          };
          return [...prev, data]
        };
        return [data];
      });
    });
  }, []);

  // Data has not returned yet from GQL
  if (loading) {
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
      {activeChat.users ? (
        <ChatInterface
          handleMessageSubmit={handleMessageSubmit}
          messages={messages}
          onChange={handleMessageInput}
          currentMessage={chatInputData}
          userData={userData}
          chatData={activeChat}
        />
      ) : (
        <>
          <InboxInterface
            handleNewChatSubmit={handleNewChatSubmit}
            setActiveChat={setActiveChat}
            joinRoom={joinRoom}
            userData={userData}
            newChat={newChat}
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