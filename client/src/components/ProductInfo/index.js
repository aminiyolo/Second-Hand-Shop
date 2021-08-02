import React, { useEffect, useState } from "react";
import { checkCategory } from "./categoryData";
import dayjs from "dayjs";
import axios from "axios";
import { useParams, withRouter } from "react-router";
import {
  addedStyle,
  normalStyle,
  ChatBtn,
  BtnContainer,
  Description,
} from "./style";

const ProductInfo = ({ product, DATA, revalidate, history }) => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [inAcart, setInAcart] = useState(false);

  const onClickCart = () => {
    if (DATA && DATA.isAuth === false) {
      let choice = window.confirm("로그인이 필요한 서비스 입니다.");
      if (choice) {
        history.push("/login");
      }
      return;
    }

    let data = {
      id,
    };

    if (!inAcart) {
      axios.post("/api/users/addTo_cart", data).then((response) => {
        if (response.data.success) {
          setInAcart(true);
          revalidate();
        } else {
          console.log(response.data);
        }
      });
    } else {
      axios.post("/api/users/removeFrom_cart", data).then((response) => {
        if (response.data.success) {
          setInAcart(false);
          revalidate();
        } else {
          console.log("removeErr");
        }
      });
    }
  };

  const onClickChat = () => {
    if (DATA && !DATA.isAuth) {
      let choice = window.confirm("로그인이 필요한 서비스 입니다.");
      if (choice) {
        history.push("/login");
      }
      return;
    }
  };

  useEffect(() => {
    checkCategory(product, setCategory);
    if (DATA && DATA.token) {
      DATA.cart.forEach((data) => {
        if (data.id === id) setInAcart(true);
      });
    }
  }, [product, DATA, id]);

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
        <ChatBtn onClick={onClickChat}>판매자와 채팅</ChatBtn>
      </BtnContainer>
    </div>
  );
};

export default withRouter(ProductInfo);
