import styled from "styled-components";

export const addedStyle = {
  border: "none",
  backgroundColor: "#FF6A4D",
  color: "white",
  padding: "10px 8px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  outline: "none",
};

export const normalStyle = {
  border: "none",
  backgroundColor: "#FF8A3D",
  color: "white",
  padding: "10px 8px",
  outline: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export const ChatBtn = styled.button`
  border: none;
  background-color: #ff8a3d;
  color: white;
  outline: none;
  padding: 10px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

export const BtnContainer = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: space-around;
`;

export const Description = styled.div`
  text-align: center;
  background-color: whitesmoke;
  padding: 50px 10px;
  & .detail {
    display: flex;
    margin-left: 180px;
    margin-bottom: 15px;
    & .category {
      margin-right: 20px;
    }
  }
  & .price {
    margin-top: 10px;
  }
`;
