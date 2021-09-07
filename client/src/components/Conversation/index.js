import React, { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "./style";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";

const Conversation = ({ conversation, price }) => {
  const { data: currentUser } = useSWR("/api/users/data", fetcher);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 대화하는 상대방의 정보
    const counterpart = conversation?.members?.find(
      (member) => member !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/find?userId=${counterpart}`);
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
        {/* 채팅 화면 프로필 */}
        {price && user && (
          <>
            <span className="nickname">{user.nickname}</span>
            <div>
              <span className="title">{conversation?.title}</span>
              <span className="price">{conversation?.price}원</span>
            </div>
          </>
        )}
        {!price && user && (
          // 대화방 프로필
          <>
            <span className="nickname">{user.nickname}</span>
            <span className="title">{conversation?.title}</span>
          </>
        )}
      </div>
    </Profile>
  );
};

export default Conversation;
