import styled from "styled-components";
import { Input as input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const Form = styled.form`
  text-align: center;
  border-radius: 50%;
  position: relative;
`;

export const Input = styled(input)`
  width: 50%;
  outline: none;
  margin-top: 2rem;
`;

export const Search = styled(SearchOutlined)`
  position: absolute;
  top: 2rem;
  background-color: white;
  padding: 0.55rem 0.5rem;
`;
