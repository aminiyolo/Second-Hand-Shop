import styled from "styled-components";

export const UploadContainer = styled.div`
  width: 70%;
  margin: 0px auto;
  padding-top: 100px;
  padding-bottom: 40px;
  & > .flex {
    display: flex;

    & > .uploadArea {
      width: 50%;
    }
  }

  @media screen and (max-width: 991px) {
    margin: 0 auto;
    text-align: center;
    overflow-x: hidden;
    & > .flex {
      margin: 0 auto;
      margin-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const DescriptionBox = styled.div`
  width: 50%;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 1rem;

  & > label {
    font-size: 14px;
    margin-bottom: 4px;
  }

  & > .input {
    padding: 7px;
    border: 2px solid #ff8a3d;
    border-radius: 3px;
    outline: none;
    width: 90%;
  }

  @media screen and (max-width: 991px) {
    width: 100%;
    & > label {
      width: 90%;
    }
  }
`;

export const Input = styled.input`
  padding: 7px;
  border: 2px solid #ff8a3d;
  border-radius: 3px;
  outline: none;
  width: 90%;
`;

export const Textarea = styled.textarea`
  padding: 7px;
  border: 2px solid #ff8a3d;
  border-radius: 3px;
  outline: none;
  width: 90%;
`;

export const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;

  & > .category {
    text-align: left;
  }
`;

export const Select = styled.select`
  border: 1px solid #ff8a3d;
  width: 18%;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
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
`;
