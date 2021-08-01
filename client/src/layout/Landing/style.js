import styled from "styled-components";
import img from "../Login/image/LoginBG.jpg";

export const LandingContainer = styled.div`
  margin: 30px auto 100px;
  padding-bottom: 40px;
  background-color: whitesmoke;
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
`;

export const FilterBox = styled.div`
  width: 85%;
  margin: 25px auto;
  position: absolute;
  top: 55%;
  left: 30%;
`;

export const RenderBox = styled.div`
  width: 85%;
  margin: 40px auto;
  & .result {
    text-align: center;
  }
`;

export const ProductData = styled.div`
  height: 30px;
  & > .title {
    margin-bottom: 5px;
    font-size: 16px;
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
};

export const GetAllButton = styled.div`
  position: absolute;
  top: 49%;
  left: 46%;
  border: 2px solid #ff8a3d;
  background-color: #ff8a3d;
  color: whitesmoke;
  font-weight: 600;
  padding: 4px 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #ff8a3d;
    border: 2px solid white;
  }
`;
