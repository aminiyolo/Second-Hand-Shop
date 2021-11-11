import styled from "styled-components";
import { Menu } from "@styled-icons/boxicons-regular/Menu";
import { BellOutlined } from "@ant-design/icons";

export const Nav = styled.div`
  width: 100%;
  position: fixed;
  padding: 0.875rem 1rem;
  background-color: white;
  display: flex;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.06);
  z-index: 4;
`;

export const MenuBar = styled(Menu)`
  color: #ff8a3d;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    right: 1rem;
    width: 3rem;
    cursor: pointer;
  }

  @media screen and (max-device-width: 768px) {
    right: 3rem;
  }

  @media screen and (max-device-width: 415px) {
    right: 2rem;
  }
`;

export const RightNav = styled.div`
  position: fixed;
  width: 23%;
  top: 0rem;
  right: 0;
  height: 100%;
  z-index: 10000;
  background: #ff8a3d;
  color: #fff;
  border-radius: 0.3rem 0 0 0.5rem;
  padding: 1rem 5rem 1rem 0;
  font-size: 1.2rem;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    text-align: center;
    width: 11rem;
    cursor: pointer;
  }

  @media screen and (max-device-width: 768px) {
    width: 18rem;
  }

  @media screen and (max-device-width: 415px) {
    width: 10rem;
  }
`;

export const Logo = styled.h1`
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 0;
  & > span {
    color: #ff8a3d;
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  display: flex;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LoginContainer = styled.div`
  position: absolute;
  right: 1rem;
  display: flex;

  @media screen and (max-device-width: 786px) {
    right: 9rem;
  }

  @media screen and (max-device-width: 415px) {
    right: 4rem;
  }
`;

export const Upload = styled.div`
  margin-right: 35px;
  color: #ff8a3d;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 0;
  border: 2px solid #ff8a3d;
  border-radius: 0.5rem;
  line-height: 42px;
  padding: 0 10px;
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    background-color: #ff8a3d;
    color: white;
  }
`;

export const Cart = styled.div`
  color: #ff8a3d;
  margin-right: 30px;
  font-size: 2.5rem;
  line-height: 40px;
  cursor: pointer;
  transition: 300ms ease-out;

  &:hover {
    transform: rotate(15deg);
  }
`;

export const Notification = styled(BellOutlined)`
  margin-top: 5px;
  color: #ff8a3d;
  font-size: 2.3rem;
  margin-right: 1.7rem;
  cursor: pointer;
  transition: 300ms ease-out;

  &:hover {
    transform: rotate(20deg);
  }
`;

export const Modal = styled.div`
  position: absolute;
  top: 45px;
  left: ${({ left }) => left}px;
  background-color: whitesmoke;
  font-size: 1rem;
  font-weight: 500;
  padding: ${({ padding }) => padding}px;
  width: ${({ width }) => width}rem;
  text-align: center;
  border-radius: 5px;
`;

export const ModalClose = styled.div`
  margin-top: 8px;
`;
