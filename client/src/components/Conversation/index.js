import React, { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "./style";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";

const Conversation = ({ conversation }) => {
  const { data: currentUser } = useSWR("/api/users/data", fetcher);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const counterpart = conversation?.members?.find(
      (member) => member !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await axios(`/api/users/find?userId=${counterpart}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <Profile>
      {user && (
        <div>
          <img
            className="img"
            src={`http://localhost:3050/${conversation?.image}`}
            alt="productImg"
          />
        </div>
      )}
      <div className="detail">
        {user && <span className="nickname">{user.nickname}</span>}
        <span className="title">{conversation?.title}</span>
      </div>
    </Profile>
  );
};

export default Conversation;
