import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import AboutPosts from "../../components/AboutPosts";
import AboutUsers from "../../components/AboutUsers";
import { AdminPageContainer, ButtonWrapper, RenderWrapper } from "./style";

const AdminPage = ({ DATA, history }) => {
  const [users, setUsers] = useState([]);
  const [clickedUsers, setClickedUsers] = useState(false);
  const [clickedPosts, setClickedPosts] = useState(false);

  useEffect(() => {
    if (DATA?.role === 0) {
      history.push("/");
    }
  }, [DATA, history]);

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

export default withRouter(AdminPage);
