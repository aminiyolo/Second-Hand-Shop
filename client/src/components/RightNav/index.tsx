import { RightNav, Options, NavContainer } from "./style";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls";
import { RootState } from "../../redux/store";

interface IProps {
  onCloseRightNav: () => void;
}

const RightNavbar: React.VFC<IProps> = ({ onCloseRightNav }) => {
  const { user } = useSelector((state: RootState) => state);
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

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
    user && logout(dispatch, user.token);
  };

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  return (
    <NavContainer onClick={() => onCloseRightNav()}>
      <RightNav pathname={pathname} onClick={stopPropagation}>
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
