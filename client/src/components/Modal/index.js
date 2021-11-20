import React, { useCallback, useEffect, useState } from "react";
import {
  CreateModal,
  Menu,
  Img,
  Category,
  CloseBtn,
  MeunContainer,
} from "./style";
import { useHistory } from "react-router";

import { logout } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ onCloseModal, socket }) => {
  const { user } = useSelector((state) => state);
  const [soc, setSoc] = useState(null);
  const [flag, setFlag] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setSoc(socket);
    flag && soc.off("disconnect");
    return () => {
      soc && soc.off("disconnect");
    };
  }, [socket, soc, flag]);
  console.log(soc);

  const onLogout = useCallback(() => {
    setFlag(true);
    logout(dispatch, user.token);
  }, [user.token, dispatch]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const onMyPage = useCallback(() => {
    history.push("/myPage");
    onCloseModal();
  }, [history, onCloseModal]);

  const onAdminPage = useCallback(() => {
    history.push("/admin");
    onCloseModal();
  }, [history, onCloseModal]);

  const onMessenger = useCallback(() => {
    history.push("/chat");
    onCloseModal();
  }, [history, onCloseModal]);

  return (
    <CreateModal onClick={onCloseModal}>
      <MeunContainer>
        <Menu onClick={stopPropagation}>
          <div className="menuWrapper">
            <CloseBtn onClick={onCloseModal}>&times;</CloseBtn>
            <span className="profile">
              {user.nickname}
              <Img src={user.image} />
            </span>
            <p>{user.email}</p>
            <Category>
              {user.role ? (
                <div onClick={onAdminPage} className="myPage">
                  Admin Page
                </div>
              ) : (
                <div onClick={onMyPage} className="myPage">
                  My Page
                </div>
              )}
              <div className="messenger" onClick={onMessenger}>
                Chat
              </div>
              <div onClick={onLogout} className="logout">
                Logout
              </div>
            </Category>
          </div>
        </Menu>
      </MeunContainer>
    </CreateModal>
  );
};

export default Modal;
