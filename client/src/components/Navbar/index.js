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
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";
import RightNavbar from "../RightNav/index";

const Navbar = () => {
  const history = useHistory();
  const { data, revalidate } = useSWR("/api/users/data", fetcher);
  const [open, setOpen] = useState(false);

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
      {data?.token ? (
        <div>
          <Nav>
            <Logo>
              <span onClick={onClick}>2nd Hand</span>
            </Logo>
            <ButtonContainer>
              <Cart onClick={onCart}>
                <ShoppingOutlined />
              </Cart>
              <Upload onClick={onUpload}>상품 업로드</Upload>
              <RightMenu data={data} revalidate={revalidate} />
            </ButtonContainer>
            {!open && <MenuBar onClick={onClickMenu} />}
          </Nav>
          {open && (
            <RightNavbar
              onCloseRightNav={onCloseRightNav}
              revalidate={revalidate}
            />
          )}
        </div>
      ) : (
        <Nav>
          <Logo>
            <span onClick={onClick}>2nd Hand</span>
          </Logo>
          <LoginContainer>
            <RightMenu data={data} revalidate={revalidate} />
          </LoginContainer>
        </Nav>
      )}
    </>
  );
};

export default Navbar;
