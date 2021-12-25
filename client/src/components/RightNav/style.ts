import styled from "styled-components";

export const NavContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10000;
`;

export const RightNav = styled.div<{ pathname: string }>`
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
    width: 10rem;
  }

  @media screen and (max-device-width: 415px) {
    width: ${({ pathname }) => (pathname === "/" ? 11.5 : 7.5)}rem;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    text-align: center;
    padding: 1rem;
    padding-left: 1rem;
    &:hover {
      background-color: #ffff;
      color: #ff8a3d;
    }
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
