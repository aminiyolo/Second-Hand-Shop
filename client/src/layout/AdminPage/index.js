import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";
import AboutPosts from "../../components/AboutPosts";
import AboutUsers from "../../components/AboutUsers";
import fetcher from "../../hooks/fetcher";
import { Loading } from "../Login/style";
import { AdminPageContainer, ButtonWrapper, RenderWrapper } from "./style";

const AdminPage = () => {
  const { data: userData } = useSWR("/api/users/data", fetcher);
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [clickedUsers, setClickedUsers] = useState(false);
  const [clickedPosts, setClickedPosts] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("/api/users/all");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllUsers();
  }, []);

  if (userData === undefined) {
    return <Loading>Loading...</Loading>;
  }

  if (userData?.role !== 1) {
    history.push("/");
  }

  return (
    <AdminPageContainer>
      <ButtonWrapper>
        <div
          onClick={() => {
            setClickedUsers(true);
            setClickedPosts(false);
          }}
          className="users"
        >
          회원 정보
        </div>
        <div
          onClick={() => {
            setClickedUsers(false);
            setClickedPosts(true);
          }}
          className="posts"
        >
          게시물 관리
        </div>
      </ButtonWrapper>
      <hr />
      <RenderWrapper>
        {clickedUsers && <AboutUsers users={users} />}
        {clickedPosts && <AboutPosts users={users} />}
      </RenderWrapper>
    </AdminPageContainer>
  );
};

export default AdminPage;
