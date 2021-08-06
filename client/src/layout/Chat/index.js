import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import Messenger from "../../components/Messenger";

// const socket = socketIOClient("localhost:3050");

const Chat = ({ DATA }) => {
  // useEffect(() => {
  //   let userId;

  //   if (DATA?._id) {
  //     userId = DATA._id;
  //   }

  //   axios.get(`/api/conversations/${userId}`).then((res) => {
  //     console.log(res.data);
  //   });
  // }, [DATA]);
  // const [currentSocket, setCurrentSocket] = useState();
  // const [value, setValue] = useState("");

  // const onChange = (e) => {
  //   setValue(e.target.value);
  // };

  // console.log(currentSocket);

  // useEffect(() => {
  //   setCurrentSocket(socketIOClient("localhost:3050"));
  // }, []);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   currentSocket.emit("msg", { payload: value }, () => {
  //     console.log("server is done");
  //   });
  //   console.log("submit");
  // };

  return (
    <div style={{ padding: "0px 20px" }}>
      <Messenger />
    </div>
  );
};

export default Chat;
