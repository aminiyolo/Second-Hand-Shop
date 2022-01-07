import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../../config";
import axios from "axios";
import { useHistory } from "react-router";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import {
  MessengerWrapper,
  MessengerList,
  ConversationWrapper,
  MessageWrapper,
  Section,
  Info,
} from "./style";
import { Loading } from "../Login/style";
import MakeSection from "../../utill/useMakeSection";
import Textarea from "../../components/Textarea";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../../redux/store";
import { ConversationType as CurrentChat } from "../../components/Conversation";
import { Msg } from "../../utill/useMakeSection";

interface IProps {
  socket: Socket | undefined;
}

interface IMessage {
  sender: string;
  text: string;
  createdAt: number;
}

const Messenger: React.VFC<IProps> = ({ socket }) => {
  const { user } = useSelector((state: RootState) => state);
  const history = useHistory();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [newMessages, setNewMessages] = useState("");
  const [receivedMessage, setReceivedMessage] = useState<Msg | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const msgSections = MakeSection(messages);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setReceivedMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket?.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    receivedMessage &&
      currentChat?.members.includes(receivedMessage.sender) &&
      setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage, currentChat]);

  useEffect(() => {
    socket?.emit("addUser", user?._id);
    socket?.on("getUser", (users) => {
      setOnlineUsers(users);
    });
  }, [user, socket]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axiosInstance.get(`/api/conversations/${user?._id}`);
        // 가장 최근의 생성된 대화방을 가장 위에 나타내기 위하여 reverse() 사용.
        setConversations(res.data.reverse());
      } catch (err) {
        console.log(err);
      }

      const source = axios.CancelToken.source();

      return () => {
        source.cancel();
      };
    };
    getConversation();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/messages/${currentChat?._id}`,
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }

      const source = axios.CancelToken.source();

      return () => {
        source.cancel();
      };
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!newMessages.trim()) return;

    socket?.on("getUser", (users) => {
      setOnlineUsers(users);
    });

    const message = {
      sender: user?._id,
      text: newMessages,
      conversationId: currentChat?._id,
    };

    const receiverId: any = currentChat?.members.find(
      (member) => member !== user?._id,
    );

    const users: string[] = [];

    onlineUsers.forEach((user) => {
      users.push(user.userId);
    });

    let online;
    users.indexOf(receiverId) === -1 ? (online = false) : (online = true);

    if (online) {
      socket?.emit("sendMessage", {
        senderId: user?._id,
        receiverId,
        text: newMessages,
      });

      socket?.emit("notification", {
        senderNickname: user?.nickname,
        receiverId,
      });
    }

    try {
      const res = await axiosInstance.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (user === undefined) {
    return <Loading>Loading...</Loading>;
  }

  !user && history.push("/");

  return (
    <MessengerWrapper>
      <MessengerList>
        <div className="conversations">
          {conversations.map((conversation, index) => (
            <ConversationWrapper
              key={index}
              onClick={() => setCurrentChat(conversation)}
            >
              <Conversation conversation={conversation} />
            </ConversationWrapper>
          ))}
        </div>
      </MessengerList>
      <MessageWrapper>
        <div className="message">
          {currentChat && (
            <Conversation conversation={currentChat} price={true} />
          )}
        </div>
        <div className="message_workspace">
          {currentChat ? (
            <div>
              {Object.entries(msgSections).map(([date, messages]) => {
                return (
                  <Section key={date}>
                    <div className="stickyHeader">
                      <button className="date">{date}</button>
                    </div>
                    {(messages as []).map(
                      (message: IMessage, index: number) => (
                        <div key={index} ref={scrollRef}>
                          <Message
                            message={message}
                            owner={message.sender === user?._id}
                          />
                        </div>
                      ),
                    )}
                  </Section>
                );
              })}
            </div>
          ) : (
            <Info>
              {conversations.length > 0
                ? "메세지를 보낼 상대방을 좌측에서 선택해주세요."
                : "생성된 대화방이 존재하지 않습니다."}
            </Info>
          )}
        </div>
        {currentChat && (
          <Textarea
            handleSubmit={handleSubmit}
            newMessages={newMessages}
            setNewMessages={setNewMessages}
          />
        )}
      </MessageWrapper>
    </MessengerWrapper>
  );
};

export default Messenger;
