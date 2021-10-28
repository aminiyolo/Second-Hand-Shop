import styled from "styled-components";

export const AdminPageContainer = styled.div`
  padding-top: 120px;
  width: 85%;
  margin: auto;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  & > .users {
    padding: 10px 20px;
    background-color: whitesmoke;
    border-radius: 5px;
    cursor: pointer;
  }
  & > .posts {
    padding: 10px 20px;
    background-color: whitesmoke;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const RenderWrapper = styled.div`
  margin-top: 15px;
`;
