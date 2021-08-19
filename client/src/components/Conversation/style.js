import styled from "styled-components";

export const Profile = styled.div`
  border: none;
  width: 99.9%;
  display: flex;
  height: 60px;
  margin: none;

  & > div {
    & > .img {
      margin-top: 4px;
      width: 30px;
      height: 30px;
    }
  }

  & > .detail {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    & > .nickname {
      text-align: left;
      font-weight: 600;
    }
    & > .title {
      font-size: 11px;
      text-align: left;
      color: lightslategrey;
    }
  }
`;
