import styled from "styled-components";

export const TextareaWrapper = styled.div`
  display: flex;
  text-align: center;
  margin-top: 0px;
  width: 100%;

  & > .form {
    width: 100%;
    display: flex;

    & > .textarea {
      width: 100%;
      outline: none;
    }

    & > .submit {
      padding: 10px;

      & > button {
        padding: 10px 5px;
        border-radius: 5px;
        outline: none;
        border: 1px solid lightgray;
      }
    }
  }
`;
