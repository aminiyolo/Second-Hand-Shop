import axios from "axios";
import React, { useCallback } from "react";
import {
  CreateModal,
  Menu,
  Img,
  Category,
  CloseBtn,
  MeunContainer,
} from "./style";
import { withRouter } from "react-router";

const Modal = ({ data, revalidate, history, onCloseModal }) => {
  const onLogout = useCallback(() => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        onCloseModal();
        document.cookie =
          "USER=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        revalidate();
        history.push("/login");
      } else {
        alert("로그아웃에 실패하였습니다.");
      }
    });
  }, [history, onCloseModal, revalidate]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const onMyPage = () => {
    history.push("/myPage");
    onCloseModal();
  };

  return (
    <CreateModal onClick={onCloseModal}>
      <MeunContainer>
        <Menu onClick={stopPropagation}>
          <CloseBtn onClick={onCloseModal}>&times;</CloseBtn>
          <div className="profile">
            {data.nickname}
            <Img src={data.image} />
          </div>
          <p>{data.email}</p>
          <Category>
            <div onClick={onMyPage} className="myPage">
              My Page
            </div>
            <div onClick={onLogout} className="logout">
              Logout
            </div>
          </Category>
        </Menu>
      </MeunContainer>
    </CreateModal>
  );
};

export default withRouter(Modal);
