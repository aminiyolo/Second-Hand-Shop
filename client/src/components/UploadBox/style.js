import styled from "styled-components";

export const InputContainer = styled.div`
  width: 20.5rem;
  height: 270px;
  margin-top: 20px;
  border: 2px solid #ff8a3d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media screen and (max-width: 991px) {
    width: 120%;
  }
`;

export const ImageContainer = styled.div`
  margin-top: 20px;
  display: flex;
  width: 18.75rem;
  height: 10.5rem;
  overflow-x: auto;

  @media screen and (max-width: 991px) {
    margin: 0;
    height: 5rem;
  }
`;

export const Img = styled.img`
  min-width: 200px;
  width: 200px;
  height: 160px;
  margin-right: 9px;
  border-radius: 3px;
`;

export const H3 = styled.h3`
  margin-top: 10px;
  margin-left: 30px;
`;
