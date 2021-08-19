import React from "react";
import RightMenu from "./RightMenu";
import { Nav, Logo, Upload, ButtonContainer, Cart } from "./style";
import { withRouter } from "react-router";
import { ShoppingOutlined } from "@ant-design/icons";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";

const Navbar = ({ history }) => {
  const { data } = useSWR("/api/users/data", fetcher, {
    dedupingInterval: 2000,
  });

  const onUpload = () => {
    history.push("/upload");
  };

  const onCart = () => {
    history.push("/cart");
  };

  const onClick = () => {
    history.push("/");
  };

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  if (data?.token) {
    return (
      <Nav>
        <Logo>
          <span onClick={onClick}>2nd Hand</span>
        </Logo>
        <ButtonContainer>
          <Cart onClick={onCart}>
            <ShoppingOutlined />
          </Cart>
          <Upload onClick={onUpload}>상품 업로드</Upload>
          <RightMenu />
        </ButtonContainer>
      </Nav>
    );
  } else {
    return (
      <Nav>
        <Logo>
          <span onClick={onClick}>2nd Hand</span>
        </Logo>
        <ButtonContainer>
          <RightMenu />
        </ButtonContainer>
      </Nav>
    );
  }
};

export default withRouter(Navbar);
