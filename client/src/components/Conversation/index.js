import React, { useEffect, useState } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const counterpart = conversation.members.find(
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
    <div
      style={{
        border: "1px solid black",
        width: "90%",
        display: "flex",
        height: "60px",
      }}
    >
      {user && (
        <div>
          <img
            style={{ width: "30px", height: "30px" }}
            src={user.image}
            alt="profile"
          />
        </div>
      )}
      {user && <span>{user.nickname}</span>}
    </div>
  );
};

export default Conversation;
