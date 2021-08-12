import styled from "styled-components";
import img from "../Login/image/LoginBG.jpg";

export const AuthButton = styled.button`
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  background-color: #ff4a3d;
  cursor: pointer;
  color: white;
  padding: 5px 8px;
`;

export const H2 = styled.h2`
  text-align: center;
  padding-top: 20px;
  font-size: 32px;
  font-weight: 700;
  color: white;
`;

export const Container = styled.div`
  border-radius: 7px;
  width: 35%;
  margin-bottom: 0px;
`;

export const Background = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 1250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const Error = styled.div`
  color: red;
  margin: 8px 0 16px;
  font-weight: bold;
`;
