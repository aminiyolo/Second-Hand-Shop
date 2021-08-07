import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import socketIOClient from "socket.io-client";
import "./style.css";

const Messenger = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef(socketIOClient("localhost:3050"));
  const scrollRef = useRef();

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

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessages,
    });

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.current = socketIOClient("localhost:3050");
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
      console.log(users);
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
