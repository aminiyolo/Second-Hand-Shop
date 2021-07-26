import styled from "styled-components";

export const Menu = styled.div`
  margin-top: 7px;
  margin-right: 15px;
`;

export const Button = styled.button`
  position: relative;
  background-color: #ff8a3d;
  cursor: pointer;
  color: white;
  border: none;
  outline: none;
  padding: 10px 12px;
  border-radius: 5px;
`;

export const ProfileModal = styled.div`
  display: flex;
  padding: 20px;
  & img {
    display: flex;
  }
  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  & #profile-name {
    font-weight: bold;
    display: inline-flex;
  }
`;

export const Img = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 8px;
`;

export const Nickname = styled.span`
  margin-right: 10px;
  font-size: 16px;
  font-weight: 700;
`;
