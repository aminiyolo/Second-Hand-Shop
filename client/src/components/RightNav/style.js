import styled from "styled-components";

export const NavContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10000;
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
  font-size: 1.2rem;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    text-align: center;
    padding-top: 1rem;
    width: 11rem;
    cursor: pointer;
  }

  @media screen and (max-device-width: 768px) {
    width: 18rem;
  }

  @media screen and (max-device-width: 415px) {
    width: 11.5rem;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    text-align: center;
    padding: 1rem;
    margin-left: 1rem;
  }

  @media screen and (max-device-width: 768px) {
    & > span {
      text-align: left;
      padding-bottom: 0.3rem;
      margin-right: 0.5rem;
    }
  }

  @media screen and (max-device-width: 415px) {
    & > span {
      text-align: left;
      padding-bottom: 1rem;
      margin-right: 0.5rem;
    }
    &:hover {
      color: black;
    }
  }
`;
