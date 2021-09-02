import styled from "styled-components";

export const Nav = styled.div`
  width: 100%;
  position: fixed;
  padding: 0.875rem 1rem;
  background-color: white;
  display: flex;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.06);
  z-index: 1000;
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
  transition: 250ms ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;
