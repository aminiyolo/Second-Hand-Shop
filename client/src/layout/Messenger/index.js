import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import { io } from "socket.io-client";
import "./style.css";

const Messenger = ({ user, history }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

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

    if (!newMessages.trim()) {
      return;
    }

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

  if (user?.isAuth === false) {
    history.push("/");
  }

  return (
    <div className="messenger_Wrapper">
      <div className="messenger_list">
        <div className="conversation_Wrapper">
          {conversations.map((conversation, index) => (
            <div
              className="conversation"
              key={index}
              onClick={() => setCurrentChat(conversation)}
            >
              <Conversation conversation={conversation} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="message_wrapper">
        <div className="message">
          {currentChat && (
            <Conversation conversation={currentChat} currentUser={user} />
          )}
        </div>
        <div className="message_workspace">
          {currentChat ? (
            <div>
              {messages?.map((message, index) => (
                <div key={index} ref={scrollRef}>
                  <Message
                    message={message}
                    owner={message.sender === user?._id}
                    currentUser={user}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="info">
              메세지를 보낼 상대방을 좌측에서 선택해주세요.
            </div>
          )}
        </div>
        {currentChat && (
          <div className="textareaWrapper">
            <form className="form" onSubmit={handleSubmit}>
              <input
                className="textarea"
                value={newMessages}
                onChange={(e) => setNewMessages(e.target.value)}
              />
              <div className="submit">
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Messenger);
