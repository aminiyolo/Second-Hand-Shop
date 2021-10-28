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
} from "./style";
import { useHistory } from "react-router";
import { ShoppingOutlined } from "@ant-design/icons";
import RightNavbar from "../RightNav/index";
import { useSelector } from "react-redux";
import { Badge } from "antd";

const Navbar = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { user, cart } = useSelector((state) => state);

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

  return (
    <>
      {user ? (
        <div>
          <Nav>
            <Logo>
              <span onClick={onClick}>2nd Hand</span>
            </Logo>
            <ButtonContainer>
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
            {!open && <MenuBar onClick={onClickMenu} />}
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
