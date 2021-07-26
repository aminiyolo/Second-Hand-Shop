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
  height: 250px;
  & > .profile {
    padding: 20px 0;
    margin-top: 5px;
    font-size: 16px;
  }
  & > p {
    font-size: 12px;
  }
`;

export const CloseBtn = styled.span`
  position: absolute;
  right: 18px;
  font-size: 25px;
  cursor: pointer;
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
    padding: 26px 0;
    cursor: pointer;
    &:hover {
      background-color: #ff8a4d;
    }
  }
  & > .logout {
    padding-top: 16px;
    padding-bottom: 26px;
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
