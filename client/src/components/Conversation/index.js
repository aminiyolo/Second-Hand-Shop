import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const Conversation = ({ conversation, currentUser }) => {
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
    <div className="profile">
      {user && (
        <div>
          <img className="img" src={user.image} alt="profile" />
        </div>
      )}
      <div className="detail">
        {user && <span className="nickname">{user.nickname}</span>}
        <span className="title">{conversation?.title}</span>
      </div>
    </div>
  );
};

export default Conversation;
