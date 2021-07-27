import styled from "styled-components";

export const Nav = styled.div`
  width: 100%;
  position: fixed;
  padding: 12px 16px;
  background-color: white;
  display: flex;
  box-shadow: 0 0 30px #f3f1f1;
`;

export const Logo = styled.h1`
  font-weight: 800;
  font-size: 32px;
  margin-bottom: 0;
  & > a {
    color: #ff8a3d;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  right: 17px;
  display: flex;
`;

export const Upload = styled.div`
  margin-right: 35px;
  color: #ff8a3d;
  font-weight: 500;
  font-size: 16px;
  margin-top: 0;
  border: 2px solid #ff8a3d;
  border-radius: 5px;
  line-height: 42px;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    background-color: #ff8a3d;
    color: white;
  }
`;

export const Cart = styled.div`
  color: #ff8a3d;
  margin-right: 30px;
  font-size: 32px;
  line-height: 40px;
  cursor: pointer;
  transition: 250ms ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;
