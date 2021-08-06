import React from "react";
import dayjs from "dayjs";

const Message = ({ message, owner }) => {
  console.log(owner);

  return (
    <div style={{ marginBottom: "30px", height: "70px" }}>
      <div>
        <p>{message.text}</p>
      </div>
      <div>{dayjs(message.createdAt).format("MM-DD - h:mm A")}</div>
    </div>
  );
};

export default Message;
