import { axiosInstance } from "../../config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import AboutPosts from "../../components/AboutPosts";
import AboutUsers from "../../components/AboutUsers";
import { AdminPageContainer, ButtonWrapper, RenderWrapper } from "./style";
import { RootState } from "../../redux/store";
import { User } from "../../components/AboutUsers";

const AdminPage = () => {
  const { user } = useSelector((state: RootState) => state);
  const history = useHistory();
  const [users, setUsers] = useState<User[]>([]);
  const [clickedUsers, setClickedUsers] = useState(true);
  const [clickedPosts, setClickedPosts] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/users/all");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllUsers();
  }, []);

  if (user?.role !== 1) {
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
        {clickedPosts && <AboutPosts />}
      </RenderWrapper>
    </AdminPageContainer>
  );
};

export default AdminPage;
