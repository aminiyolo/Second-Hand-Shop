import styled from "styled-components";

export const CreateModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
`;

export const Menu = styled.div`
  position: fixed;
  border-radius: 4px;
  top: 22px;
  right: 28px;
  background-color: #ff6a4d;
  width: 200px;
  height: 264.5px;
  & > .menuWrapper {
    position: relative;
    padding-top: 15px;
    & > .profile {
      padding: 20px 25px;
      padding-top: 10px;
      margin-left: 10px;
      margin-top: 20px;
      font-size: 16px;
      border: none;
    }
    & > p {
      font-size: 12px;
    }
  }
`;

export const CloseBtn = styled.span`
  position: absolute;
  right: 14px;
  top: -5px;
  font-size: 25px;
  cursor: pointer;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.2);
  }
`;

export const Img = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 8px;
  margin-left: 5px;
  margin-bottom: 5px;
  margin-top: 3px;
`;

export const Category = styled.div`
  & > .myPage {
    border-top: 2px solid #ff8a7d;
    border-bottom: 2px solid #ff8a7d;
    padding: 18px 0;
    cursor: pointer;
    &:hover {
      background-color: #ff8a4d;
    }
  }
  & > .messenger {
    cursor: pointer;
    padding: 18px;
    border-bottom: 2px solid #ff8a7d;
    &:hover {
      background-color: #ff8a4d;
    }
  }

  & > .logout {
    padding-top: 4px;
    line-height: 52px;
    padding-bottom: 7px;
    cursor: pointer;
    &:hover {
      background-color: #ff8a4d;
    }
  }
`;

export const MeunContainer = styled.div`
  color: white;
  text-align: center;
`;
