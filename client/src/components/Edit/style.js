import styled from "styled-components";

export const EditWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 7rem;
  width: 90%;
  margin: auto;
  justify-content: center;

  & > .upload {
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 38%;
  }

  @media screen and (max-width: 991px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;

  & > button {
    border: 2px solid #ff8a3d;
    padding: 8px;
    border-radius: 5px;
    background-color: white;
    color: #ff8a3d;
    margin: 0 1rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background-color: #ff8a3d;
      color: white;
    }
  }
`;
