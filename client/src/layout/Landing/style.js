import styled from "styled-components";
import img from "../Login/image/LoginBG.jpg";

export const LandingContainer = styled.div`
  margin: 0px auto 100px;
  padding-bottom: 40px;
  background-color: whitesmoke;

  @media screen and (max-width: 768px) {
  }
`;

export const Background = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 430px;

  & > .sentence {
    position: absolute;
    top: 25%;
    left: 19.5%;
  }

  & > .title {
    padding-top: 100px;
    text-align: center;
    font-size: 1.7rem;
  }

  @media screen and (max-width: 820px) {
    & > .title {
      font-size: 1rem;
    }
  }
`;

export const FilterBox = styled.div`
  width: 85%;
  margin: 25px auto;
  position: absolute;
  top: 45%;
  left: 30%;
  z-index: 1000;

  @media screen and (max-device-width: 1024px) {
    top: 20%;
  }

  @media screen and (max-device-width: 768px) {
    top: 28%;
  }

  @media screen and (max-width: 500px) {
    top: 40%;
  }

  @media screen and (max-device-width: 400px) {
    top: 38%;
  }
`;

export const RenderBox = styled.div`
  width: 85%;
  margin: 40px auto;
  & .result {
    text-align: center;
  }
`;

export const ProductData = styled.div`
  height: 1.8rem;
  & > .title {
    margin-bottom: 5px;
    font-size: 16px;
    color: black;
    font-weight: 550;
  }

  & > .price {
    margin-top: 10px;
    font-size: 14px;
  }

  & > .date {
    font-size: 12px;
  }
`;

export const cardStyle = {
  color: "black",
  paddingBottom: "65px",
  boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.3)",
};

export const GetAllButton = styled.div`
  width: 15%;
  height: 7.5%;
  margin: auto;
  margin-top: 1.1rem;
  text-align: center;
  font-size: 0.8rem;
  border: 2px solid #ff8a3d;
  background-color: #ff8a3d;
  color: whitesmoke;
  font-weight: 600;
  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #ff8a3d;
    border: 2px solid white;
  }

  @media screen and (max-width: 820px) {
    font-size: 0.5rem;
    height: 5.5%;
  }

  @media screen and (max-width: 415px) {
    font-size: 0.5rem;
    height: 12%;
  }

  @media screen and (max-device-width: 380px) {
    font-size: 1px;
    padding: 0.25rem;
    height: 8.3%;
  }
`;
