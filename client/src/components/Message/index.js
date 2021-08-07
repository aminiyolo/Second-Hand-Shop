import React from "react";
import dayjs from "dayjs";
import "./style.css";

const Message = ({ message, owner }) => {
  return (
    <div className={owner ? "sender" : "message"}>
      <div>
        <p>{message.text}</p>
      </div>
      <div>{dayjs(message.createdAt).format("MM-DD - h:mm A")}</div>
    </div>
  );
};

export default Message;
