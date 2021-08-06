import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";
import Conversation from "../Conversation";
import Message from "../Message";
import socketIOClient from "socket.io-client";

const Messenger = () => {
  const { data: user } = useSWR("/api/users/data", fetcher);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  // const [socket, setSocket] = useState(null);
  const socket = useRef(socketIOClient("localhost:3050"));
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = socketIOClient("localhost:3050");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
  }, [user]);

  // useEffect(() => {
  //   setSocket(socketIOClient("localhost:3050"));
  // }, []);

  // useEffect(() => {
  //   socket?.on("welcome", (msg) => {
  //     console.log(msg);
  //   });
  // }, [socket]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessages,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          borderRight: "solid",
          borderColor: "lightgray",
          flexDirection: "column",
          width: "20%",
          height: "100vh",
        }}
      >
        <div
          style={{ textAlign: "center", margin: "100px auto", width: "100%" }}
        >
          {conversations.map((conversation, index) => (
            <div key={index} onClick={() => setCurrentChat(conversation)}>
              <Conversation conversation={conversation} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          margin: "auto",
          marginTop: "70px",
          width: "70%",
        }}
      >
        <div
          style={{
            margin: "30px auto 20px",
            textAlign: "center",
            height: "350px",
            overflowY: "auto",
          }}
        >
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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
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
