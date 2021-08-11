import React from "react";
import RightMenu from "./RightMenu";
import { Nav, Logo, Upload, ButtonContainer, Cart } from "./style";
import { withRouter } from "react-router";
import { ShoppingOutlined } from "@ant-design/icons";

const Navbar = ({ data, revalidate, history }) => {
  if (data === undefined) {
    return <div></div>;
  }

  const onUpload = () => {
    history.push("/upload");
  };

  const onCart = () => {
    history.push("/cart");
  };

  const onClick = () => {
    history.push("/");
  };

  if (data && data.token) {
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
          <RightMenu data={data} revalidate={revalidate} />
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
          <RightMenu data={data} revalidate={revalidate} />
        </ButtonContainer>
      </Nav>
    );
  }
};

export default withRouter(Navbar);
