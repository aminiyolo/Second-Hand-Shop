import { useState } from "react";
import RightMenu from "./RightMenu";
import {
  Nav,
  Logo,
  Upload,
  ButtonContainer,
  Cart,
  MenuBar,
  LoginContainer,
  Notification,
  Modal,
  ModalClose,
} from "./style";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
import RightNavbar from "../RightNav/index";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { useEffect } from "react";

const Navbar = ({ socket }) => {
  const { user, cart } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(0);
  const [modal, setModal] = useState(false);
  const [msgFrom, setMsgFrom] = useState(null);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!socket) return;
    socket?.on("notification", ({ senderNickname }) => {
      setMsgFrom(senderNickname);
      setNotification(notification + 1);
    });
  }, [socket, notification, msgFrom]);

  const onUpload = () => {
    history.push("/upload");
  };

  const onCart = () => {
    history.push("/cart");
  };

  const onClick = () => {
    history.push("/");
  };

  const onClickMenu = () => {
    setOpen(true);
  };

  const onCloseRightNav = () => {
    setOpen(false);
  };

  const handleNotification = () => {
    setModal(false);
    setNotification(0);
  };

  useEffect(() => {
    if (pathname !== "/") setModal(false);
  }, [pathname]);

  return (
    <>
      {user ? (
        <div>
          <Nav pathname={pathname}>
            <Logo>
              <span onClick={onClick}>2nd Hand</span>
            </Logo>
            <ButtonContainer>
              {pathname === "/chat" ? null : (
                <Badge
                  count={notification}
                  style={{
                    marginRight: "32px",
                    marginTop: "10px",
                  }}
                >
                  <Notification onClick={() => setModal(true)} />
                </Badge>
              )}
              {modal && notification ? (
                <Modal left={-100} width={15} padding={20}>
                  {msgFrom}으로 부터 메세지가 도착했습니다.
                  <ModalClose>
                    <button className="btn" onClick={handleNotification}>
                      읽음
                    </button>
                  </ModalClose>
                </Modal>
              ) : (
                modal && (
                  <Modal left={-65} width={10} padding={10}>
                    알림 없음
                    <ModalClose>
                      <button className="btn" onClick={handleNotification}>
                        닫기
                      </button>
                    </ModalClose>
                  </Modal>
                )
              )}
              <Badge
                count={cart.length}
                style={{ marginRight: "32px", marginTop: "10px" }}
              >
                <Cart onClick={onCart}>
                  <ShoppingOutlined />
                </Cart>
              </Badge>
              <Upload onClick={onUpload}>상품 업로드</Upload>
              <RightMenu user={user} />
            </ButtonContainer>
            {!open && <MenuBar pathname={pathname} onClick={onClickMenu} />}
          </Nav>
          {open && <RightNavbar onCloseRightNav={onCloseRightNav} />}
        </div>
      ) : (
        <Nav>
          <Logo>
            <span onClick={onClick}>2nd Hand</span>
          </Logo>
          <LoginContainer>
            <RightMenu user={user} />
          </LoginContainer>
        </Nav>
      )}
    </>
  );
};

export default Navbar;
