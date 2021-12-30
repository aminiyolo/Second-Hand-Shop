import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MessageWrapper } from "./style";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IProps {
  message: {
    sender: string;
    text: string;
    createdAt: number;
  };
  owner: boolean;
}

const Message: React.VFC<IProps> = ({ message, owner }) => {
  const { user } = useSelector((state: RootState) => state);
  const [counterpart, setCounterpart] = useState<string | null>(null);

  useEffect(() => {
    message.sender !== user?._id && setCounterpart("상대방");
  }, [user, message]);

  return (
    <MessageWrapper className="messageWrapper">
      <div className={owner ? "sender" : "message"}>
        <div className={counterpart ? "recieve" : "send"}>
          {counterpart && <p className="couterpart">{counterpart}:</p>}
          <p className="text">{message.text}</p>
        </div>
        <div className="createdAt">
          {dayjs(message.createdAt).format("h:mm A")}
        </div>
      </div>
    </MessageWrapper>
  );
};

export default Message;
