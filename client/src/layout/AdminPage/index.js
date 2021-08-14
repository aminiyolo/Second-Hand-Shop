import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import AboutPosts from "../../components/AboutPosts";
import AboutUsers from "../../components/AboutUsers";
import "./style.css";

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
        console.log(res.data);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllUsers();
  }, []);

  return (
    <div style={{ paddingTop: "120px", width: "85%", margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          onClick={() => {
            setClickedUsers(true);
            setClickedPosts(false);
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          회원 정보
        </div>
        <div
          onClick={() => {
            setClickedUsers(false);
            setClickedPosts(true);
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          게시물 관리
        </div>
      </div>
      <hr />
      <div style={{ marginTop: "15px" }}>
        {clickedUsers && <AboutUsers users={users} />}
        {clickedPosts && <AboutPosts users={users} />}
      </div>
    </div>
  );
};

export default withRouter(AdminPage);
