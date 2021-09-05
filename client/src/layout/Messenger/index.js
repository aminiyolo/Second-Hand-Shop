import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import { io } from "socket.io-client";
import "./style.css";
import { Loading } from "../Login/style";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";
import MakeSection from "../../utill/makeSection";
import Textarea from "../../components/Textarea";

const Messenger = () => {
  const { data: userData } = useSWR("/api/users/data", fetcher);
  const history = useHistory();
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
    return () => {
      socket.current.off("disconnect");
    };
  }, []);

  useEffect(() => {
    receivedMessage &&
      currentChat?.members.includes(receivedMessage.sender) &&
      setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userData?._id);
    socket.current.on("getUser", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`/api/conversations/${userData?._id}`);
        // 가장 최근의 생성된 대화방을 가장 위에 나타내기 위하여 reverse() 사용.
        console.log(res);
        setConversations(res.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [userData]);

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
      sender: userData._id,
      text: newMessages,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userData._id
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
        senderId: userData._id,
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

  if (userData === undefined) {
    return <Loading>Loading...</Loading>;
  }

  if (userData?.isAuth === false) {
    history.push("/");
  }

  const msgSections = MakeSection(messages);

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
              <Conversation conversation={conversation} />
            </div>
          ))}
        </div>
      </div>
      <div className="message_wrapper">
        <div className="message">
          {currentChat && <Conversation conversation={currentChat} />}
        </div>
        <div className="message_workspace">
          {currentChat ? (
            <div>
              {Object.entries(msgSections).map(([date, messages]) => {
                return (
                  <section className="section" key={date}>
                    <div className="stickyHeader">
                      <button className="date">{date}</button>
                    </div>
                    {messages?.map((message, index) => (
                      <div key={index} ref={scrollRef}>
                        <Message
                          message={message}
                          owner={message.sender === userData?._id}
                        />
                      </div>
                    ))}
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="info">
              {conversations.length > 0
                ? "메세지를 보낼 상대방을 좌측에서 선택해주세요."
                : "생성된 대화방이 존재하지 않습니다."}
            </div>
          )}
        </div>
        {currentChat && (
          <Textarea
            handleSubmit={handleSubmit}
            newMessages={newMessages}
            setNewMessages={setNewMessages}
          />
        )}
      </div>
    </div>
  );
};

export default Messenger;
