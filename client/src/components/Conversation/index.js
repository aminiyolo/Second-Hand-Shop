import React, { useEffect, useState } from "react";
import axios from "axios";
import { Profile } from "./style";
import { useSelector } from "react-redux";

const Conversation = ({ conversation, price }) => {
  const { user } = useSelector((state) => state);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 대화하는 상대방의 정보
    const counterpart = conversation?.members?.find(
      (member) => member !== user?._id
    );

    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/find?userId=${counterpart}`);
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [conversation, currentUser, user?._id]);

  return (
    <Profile>
      {currentUser && (
        <div>
          <img className="img" src={conversation?.image} alt="productImg" />
        </div>
      )}
      <div className="detail">
        {/* 채팅 화면 프로필 */}
        {price && currentUser && (
          <>
            <span className="nickname">{currentUser.nickname}</span>
            <div>
              <span className="title">{conversation?.title}</span>
              <span className="price">{conversation?.price}원</span>
            </div>
          </>
        )}
        {!price && currentUser && (
          // 대화방 프로필
          <>
            <span className="nickname">{currentUser.nickname}</span>
            <span className="title">{conversation?.title}</span>
          </>
        )}
      </div>
    </Profile>
  );
};

export default Conversation;
