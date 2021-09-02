import RightMenu from "./RightMenu";
import { Nav, Logo, Upload, ButtonContainer, Cart } from "./style";
import { useHistory } from "react-router";
import { ShoppingOutlined } from "@ant-design/icons";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";

const Navbar = () => {
  const history = useHistory();
  const { data, revalidate } = useSWR("/api/users/data", fetcher);

  const onUpload = () => {
    history.push("/upload");
  };

  const onCart = () => {
    history.push("/cart");
  };

  const onClick = () => {
    history.push("/");
  };

  return (
    <>
      {data?.token ? (
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
      ) : (
        <Nav>
          <Logo>
            <span onClick={onClick}>2nd Hand</span>
          </Logo>
          <ButtonContainer>
            <RightMenu data={data} revalidate={revalidate} />
          </ButtonContainer>
        </Nav>
      )}
    </>
  );
};

export default Navbar;
