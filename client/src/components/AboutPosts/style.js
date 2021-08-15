import styled from "styled-components";

export const Title = styled.h2`
  text-align: center;
`;

export const Img = styled.img`
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

export const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  & td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
`;

export const Tr = styled.tr`
  .title {
    width: 35%;
    color: black;
    font-size: 15px;
  }

  .button {
    width: 10%;
  }
`;
