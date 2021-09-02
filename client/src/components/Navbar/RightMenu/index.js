import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { Menu, Button, Img, Nickname } from "./style";
import Modal from "../../Modal/index";

const RightMenu = ({ data, revalidate }) => {
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
      {data?.isAuth === false && (
        <Menu>
          <Button onClick={onClickLogin}>로그인</Button>
        </Menu>
      )}
      {data?.token && (
        <React.Fragment>
          <Button onClick={onClickProfile}>
            <Nickname>{data.nickname}</Nickname>
            <Img src={data.image} alt={data.nickname} />
          </Button>
          {showProfileModal && (
            <Modal
              onCloseModal={onCloseModal}
              data={data}
              revalidate={revalidate}
            />
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default RightMenu;
