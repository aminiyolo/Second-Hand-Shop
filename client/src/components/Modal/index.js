import axios from "axios";
import React, { useCallback, FC } from "react";
import {
  CreateModal,
  Menu,
  Img,
  Category,
  CloseBtn,
  MeunContainer,
} from "./style";
import { withRouter } from "react-router";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";

const Modal = ({ history, onCloseModal }) => {
  const { data, revalidate } = useSWR("/api/users/data", fetcher);
  const onLogout = useCallback(() => {
    const Logout = async () => {
      try {
        await axios.get("/api/users/logout");
        onCloseModal();
        document.cookie =
          "USER=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        revalidate();

        setTimeout(() => {
          history.push("/login");
        }, 500);
      } catch (err) {
        alert("로그아웃에 실패하였습니다.");
      }
    };

    Logout();
  }, [history, onCloseModal, revalidate]);

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
              {data.nickname}
              <Img src={data.image} />
            </span>
            <p>{data.email}</p>
            <Category>
              {data.role ? (
                <div onClick={onAdminPage} className="myPage">
                  Admin Page
                </div>
              ) : (
                <div onClick={onMyPage} className="myPage">
                  My Page
                </div>
              )}
              <div className="messenger" onClick={onMessenger}>
                Messenger
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

export default withRouter(Modal);
