import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MessageWrapper } from "./style";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";

const Message = ({ message, owner }) => {
  const { data: currentUser } = useSWR("/api/users/data", fetcher);
  const [counterpart, setCounterpart] = useState(null);

  useEffect(() => {
    if (message.sender !== currentUser._id) {
      setCounterpart("상대방");
    }
  }, [currentUser, message]);

  return (
    <MessageWrapper className="messageWrapper">
      <div className={owner ? "sender" : "message"}>
        <div className={counterpart ? "recieve" : "send"}>
          {counterpart && <p className="couterpart">{counterpart}:</p>}
          <p className="text">{message.text}</p>
        </div>
        <div className="createdAt">
          {dayjs(message.createdAt).format("MM/DD - h:mm A")}
        </div>
      </div>
    </MessageWrapper>
  );
};

export default Message;
