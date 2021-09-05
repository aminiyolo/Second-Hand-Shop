import styled from "styled-components";

export const Profile = styled.div`
  border: none;
  width: 99.9%;
  display: flex;
  height: 60px;
  margin: none;

  & > div {
    & > .img {
      margin-top: 3px;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
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
      font-size: 0.7rem;
      text-align: left;
      color: lightslategrey;
    }
  }

  @media screen and (max-width: 415px) {
    & > div {
      & > .img {
        margin-top: 4px;
        width: 1rem;
        height: 1rem;
      }
    }

    & > .detail {
      & > .nickname {
        font-size: 0.1rem;
      }
      & > .title {
        font-size: 8px;
      }
    }
  }
`;
