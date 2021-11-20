import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { Menu, Button, Img, Nickname } from "./style";
import Modal from "../../Modal/index";

const RightMenu = ({ user, socket }) => {
  const history = useHistory();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const onClickLogin = useCallback(() => {
    setTimeout(() => {
      history.push("/login");
    }, 300);
  }, [history]);

  const onClickProfile = useCallback(() => {
    setShowProfileModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowProfileModal(false);
  }, []);

  return (
    <>
      {!user && (
        <Menu>
          <Button onClick={onClickLogin}>로그인</Button>
        </Menu>
      )}
      {user && (
        <React.Fragment>
          <Button onClick={onClickProfile}>
            <Nickname>{user.nickname}</Nickname>
            <Img src={user.image} alt={user.nickname} />
          </Button>
          {showProfileModal && (
            <Modal onCloseModal={onCloseModal} socket={socket} />
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default RightMenu;
