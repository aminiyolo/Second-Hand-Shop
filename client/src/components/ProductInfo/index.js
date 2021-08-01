import React, { useEffect, useState } from "react";
import { checkCategory } from "./categoryData";
import dayjs from "dayjs";
import axios from "axios";
import { useParams } from "react-router";
import {
  addedStyle,
  normalStyle,
  ChatBtn,
  BtnContainer,
  Description,
} from "./style";

const ProductInfo = ({ product, DATA }) => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [inAcart, setInAcart] = useState(false);

  useEffect(() => {
    if (DATA) {
      DATA.cart.forEach((data) => {
        if (data.id === id) setInAcart(true);
      });
    }
  }, [id, DATA]);

  const onClickCart = () => {
    let data = {
      id,
    };
    if (!inAcart) {
      axios.post("/api/users/addTo_cart", data).then((response) => {
        if (response.data.success) {
          setInAcart(true);
        } else {
          console.log(response.data);
        }
      });
    } else {
      axios.post("/api/users/removeFrom_cart", data).then((response) => {
        if (response.data.success) {
          setInAcart(false);
        } else {
          console.log("removeErr");
        }
      });
    }
  };

  useEffect(() => {
    checkCategory(product, setCategory);
  }, [product]);

  return (
    <div>
      <Description>
        <h1>{product.title}</h1>
        <div className="detail">
          <div className="category">{category}</div>
          <div>
            / &nbsp;&nbsp; 업로드 날짜:
            {dayjs(product.createdAt).format("YYYY-MM-DD")}
          </div>
        </div>
        <h3>{product.description}</h3>
        <div>사용기간: &nbsp;{product.period}개월</div>
        <div className="price">가격: &nbsp;{product.price}원</div>
      </Description>
      <BtnContainer>
        <button
          onClick={onClickCart}
          style={inAcart ? addedStyle : normalStyle}
        >
          {!inAcart ? "장바구니에 담기" : "장바구니에서 빼기"}
        </button>
        <ChatBtn>판매자와 채팅</ChatBtn>
      </BtnContainer>
    </div>
  );
};

export default ProductInfo;
