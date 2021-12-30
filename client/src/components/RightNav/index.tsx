import { RightNav, Options, NavContainer } from "./style";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls";
import { RootState } from "../../redux/store";
import { useCallback } from "react";

interface IProps {
  onCloseRightNav: () => void;
}

const RightNavbar: React.VFC<IProps> = ({ onCloseRightNav }) => {
  const { user } = useSelector((state: RootState) => state);
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const onClickHome = useCallback(() => {
    onCloseRightNav();
    history.push("/");
  }, [history, onCloseRightNav]);

  const onClickMyPage = useCallback(() => {
    onCloseRightNav();
    history.push("/myPage");
  }, [history, onCloseRightNav]);

  const onClickChat = useCallback(() => {
    onCloseRightNav();
    history.push("/chat");
  }, [history, onCloseRightNav]);

  const onClickCart = useCallback(() => {
    onCloseRightNav();
    history.push("/cart");
  }, [history, onCloseRightNav]);

  const onClickUpload = useCallback(() => {
    onCloseRightNav();
    history.push("/upload");
  }, [history, onCloseRightNav]);

  const onClickLogout = useCallback(() => {
    user && logout(dispatch, user.token);
  }, [dispatch, user]);

  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

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
