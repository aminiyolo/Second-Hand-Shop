import { RightNav, Options, NavContainer } from "./style";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls";

const RightNavbar = ({ onCloseRightNav }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

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
    logout(dispatch, user.token);
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
