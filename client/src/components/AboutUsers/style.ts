import styled from "styled-components";

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

export const H2 = styled.h2`
  text-align: center;
`;

export const Tr = styled.tr`
  .email {
    width: 40%;
  }
`;
