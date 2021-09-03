import { RightNav, Options, NavContainer } from "./style";
import { useHistory } from "react-router";
import axios from "axios";

const RightNavbar = ({ onCloseRightNav, revalidate }) => {
  const history = useHistory();

  const onClickHome = () => {
    onCloseRightNav();
    history.push("/");
  };

  const onClickMyPage = () => {
    onCloseRightNav();
    history.push("/myPage");
  };

  const onClickChat = () => {
    onCloseRightNav();
    history.push("/chat");
  };

  const onClickCart = () => {
    onCloseRightNav();
    history.push("/cart");
  };

  const onClickUpload = () => {
    onCloseRightNav();
    history.push("/upload");
  };

  const onClickLogout = () => {
    const Logout = async () => {
      try {
        const res = await axios.get("/api/users/logout");
        if (res.data.success) {
          onCloseRightNav();
          document.cookie =
            "USER=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          revalidate();
        }
      } catch (err) {
        alert("로그아웃에 실패하였습니다.");
      }
    };

    Logout();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <NavContainer onClick={() => onCloseRightNav()}>
      <RightNav onClick={stopPropagation}>
        <Options>
          <span onClick={onClickHome}>Home</span>
          <span onClick={onClickMyPage}>My Page</span>
          <span onClick={onClickChat}>Chat</span>
          <span onClick={onClickCart}>Cart</span>
          <span onClick={onClickUpload}>Upload</span>
          <span onClick={onClickLogout}>Logout</span>
        </Options>
      </RightNav>
    </NavContainer>
  );
};

export default RightNavbar;
