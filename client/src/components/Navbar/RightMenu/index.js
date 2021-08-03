import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import { Menu, Button, Img, Nickname } from "./style";
import Modal from "../../Modal/index";

const RightMenu = ({ history, data, revalidate }) => {
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

  if (data.isAuth === false) {
    return (
      <Menu>
        <Button onClick={onClickLogin}>로그인</Button>
      </Menu>
    );
  } else if (data && data.token) {
    return (
      <React.Fragment>
        <Button onClick={onClickProfile}>
          <Nickname>{data.nickname}</Nickname>
          <Img src={data.image} alt={data.nickname} />
        </Button>
        {showProfileModal && (
          <Modal
            data={data}
            revalidate={revalidate}
            onCloseModal={onCloseModal}
          />
        )}
      </React.Fragment>
    );
  }
};

export default withRouter(RightMenu);
