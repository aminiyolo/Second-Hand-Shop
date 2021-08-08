import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import { io } from "socket.io-client";
import "./style.css";

const Messenger = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  // const [socket, setSocket] = useState(null);
  const scrollRef = useRef();

  // useEffect(() => {
  //   setSocket(io("ws://localhost:3050"));
  // }, []);

  // useEffect(() => {
  //   socket?.on("getMessage", (data) => {
  //     setReceivedMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, [socket]);

  useEffect(() => {
    socket.current = io("ws://localhost:3050");
    socket.current.on("getMessage", (data) => {
      setReceivedMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    receivedMessage &&
      currentChat?.members.includes(receivedMessage.sender) &&
      setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage, currentChat]);

  // useEffect(() => {
  //   socket?.emit("addUser", user?._id);
  //   socket?.on("getUser", (users) => {
  //     setOnlineUsers(users);
  //   });
  // }, [socket, user]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUser", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`/api/conversations/${user?._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessages,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    let online;
    let users = [];

    onlineUsers.map((user) => {
      users.push(user.userId);
    });

    if (users.indexOf(receiverId) === -1) {
      online = false;
    } else {
      online = true;
    }

    // if (online) {
    //   socket?.emit("sendMessage", {
    //     senderId: user._id,
    //     receiverId,
    //     text: newMessages,
    //   });
    // }

    if (online) {
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessages,
      });
    }

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger_Wrapper">
      <div className="messenger_list">
        <div className="conversation">
          {conversations.map((conversation, index) => (
            <div key={index} onClick={() => setCurrentChat(conversation)}>
              <Conversation conversation={conversation} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="message_wrapper">
        <div className="message_workspace">
          {currentChat ? (
            <div>
              {messages?.map((message, index) => (
                <div key={index} ref={scrollRef}>
                  <Message
                    message={message}
                    owner={message.sender === user?._id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>Open a conversation to start a chat</div>
          )}
        </div>
        <div className="textarea">
          <textarea
            value={newMessages}
            onChange={(e) => setNewMessages(e.target.value)}
          />
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
