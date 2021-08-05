import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";
import Conversation from "../Conversation";
import Message from "../Message";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { data: user } = useSWR("/api/users/data", fetcher);

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

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          borderRight: "solid",
          flexDirection: "column",
          width: "20%",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center", margin: "auto", width: "100%" }}>
          {conversations.map((conversation, index) => (
            <div key={index} onClick={() => setCurrentChat(conversation)}>
              <Conversation conversation={conversation} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ margin: "0px auto", textAlign: "center" }}>
        {currentChat ? (
          <div>
            {messages?.map((message, index) => (
              <div key={index}>
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
    </div>
  );
};

export default Messenger;
