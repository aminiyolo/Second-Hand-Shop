import styled from "styled-components";

export const CartContainer = styled.div`
  width: 85%;
  margin: 0px auto;
  padding-top: 100px;
  padding-bottom: 10px;
  & > .title {
    font-size: 32px;
  }
  & > .info {
    display: flex;
    justify-content: space-around;
    font-weight: 600;
    font-size: 15px;
    padding-top: 0;

    & > .caution {
      display: flex;
      justify-content: flex-end;
      color: #e4685a;
    }
  }
`;

export const Empty = styled.div`
  margin-top: 30px;
  font-size: 70px;
  text-align: center;
  margin-left: 50px;
  & > h1 {
    color: gainsboro;
  }
`;

export const ProductContainer = styled.div`
  width: 95%;
  margin: auto;
  display: flex;
  margin-bottom: 20px;
  border: 4px solid #ff8a3d;
  border-radius: 5px;
  padding: 10px;
  position: relative;
  & > .detail {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    color: black;
  }
  & > .removeBtn {
    position: absolute;
    right: 30px;
    bottom: 20px;
    font-size: 15px;
    border: 1px solid #ff8a3d;
    outline: none;
    background-color: #ff8a3d;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    padding: 8px 12px;

    @media screen and (max-width: 760px) {
      bottom: 10px;
      padding: 0.5rem 0.75rem;
      font-size: 0.5rem;

      & > .detail {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        color: black;
        font-size: 0.2rem;
      }
    }
  }
`;

export const Img = styled.img`
  width: 200px;
  height: 100%;

  @media screen and (max-width: 760px) {
    width: 100px;
    height: 90%;
  }
`;
