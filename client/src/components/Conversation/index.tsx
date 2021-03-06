import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import { Profile } from "./style";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export type ConversationType = {
  members: string[];
  title: string;
  price: string;
  image: string;
  nickname: string;
  _id: string;
};

interface IProps {
  conversation: ConversationType;
  price?: boolean;
}

type CurrentUser = {
  nickname: string;
};

const Conversation: React.VFC<IProps> = ({ conversation, price }) => {
  const { user } = useSelector((state: RootState) => state);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    // 대화하는 상대방의 정보

    const counterpart = conversation?.members?.find(
      (member) => member !== user?._id,
    );

    const getUser = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/users/find?userId=${counterpart}`,
        );
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [conversation, user?._id]);

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
