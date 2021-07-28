import styled from "styled-components";

export const UploadContainer = styled.div`
  width: 70%;
  margin: 100px auto;
  padding-bottom: 40px;
  & > .flex {
    display: flex;

    & > .uploadArea {
      width: 50%;
    }
  }
`;

export const DescriptionBox = styled.div`
  width: 50%;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  & > label {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

export const Input = styled.input`
  padding: 7px;
  border: 2px solid #ff8a3d;
  border-radius: 3px;
  outline: none;
`;

export const Textarea = styled.textarea`
  padding: 7px;
  border: 2px solid #ff8a3d;
  border-radius: 3px;
  outline: none;
`;

export const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  border: 1px solid #ff8a3d;
  width: 18%;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
`;

export const Button = styled.button`
  border: 2px solid #ff8a3d;
  padding: 8px;
  border-radius: 5px;
  background-color: white;
  color: #ff8a3d;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #ff8a3d;
    color: white;
  }
`;
