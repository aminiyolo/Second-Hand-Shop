import React, { useEffect, useState, useCallback } from "react";
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
  HeartContainer,
} from "./style";
import { HeartOutlined } from "@ant-design/icons";

const ProductInfo = ({ product, DATA, revalidate, history, seller }) => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [inAcart, setInAcart] = useState(false);
  const [count, setCount] = useState(0);

  const onClickCart = useCallback(() => {
    if (DATA && DATA.isAuth === false) {
      let choice = window.confirm("로그인이 필요한 서비스 입니다.");
      if (choice) {
        history.push("/login");
      }
      return;
    }

    if (seller === DATA.email) {
      return alert("본인의 상품은 장바구니에 담을 수 없습니다.");
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
          alert("장바구니 추가 실패!");
        }
      });
    } else {
      axios.post("/api/users/removeFrom_cart", data).then((response) => {
        if (response.data.success) {
          setInAcart(false);
          revalidate();
        } else {
          alert("삭제 실패!");
        }
      });
    }
  }, [DATA, history, id, seller, inAcart, revalidate]);

  const onClickChat = () => {
    if (DATA && DATA.isAuth === false) {
      let choice = window.confirm("로그인이 필요한 서비스 입니다.");
      if (choice) {
        history.push("/login");
      }
      return;
    }

    if (seller === DATA.email) {
      return alert("판매자가 본인에 해당합니다.");
    }

    let data = {
      senderId: product.seller._id,
      receiverId: DATA._id,
      title: product.title,
      productId: product._id,
    };

    const makeConversation = async () => {
      try {
        await axios.post("/api/conversations", data);
        history.push("/chat");
      } catch (err) {
        console.log(err);
      }
    };

    const checkConversation = async () => {
      try {
        const res = await axios.post("/api/conversations/check", data);

        if (res.data.length > 0) {
          history.push("/chat");
        } else {
          makeConversation();
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkConversation();
  };

  useEffect(() => {
    checkCategory(product, setCategory);
    if (DATA && DATA.token) {
      DATA.cart.forEach((data) => {
        if (data.id === id) setInAcart(true);
      });
    }

    let data = {
      id,
    };

    axios.post("/api/users/count_added_product", data).then((response) => {
      setCount(response.data.length);
    });
  }, [product, DATA, id]);

  return (
    <div>
      <Description>
        <h1>{product.title}</h1>
        <div className="detail">
          {/* <span className="category">{category}</span> */}
          <span>
            {category} &nbsp; / &nbsp; 업로드 날짜: &nbsp;
            {dayjs(product.createdAt).format("YYYY-MM-DD")}
          </span>
        </div>
        <h3>{product.description}</h3>
        <div>사용기간: &nbsp;{product.period}개월</div>
        <div className="price">가격: &nbsp;{product.price}원</div>
        <HeartContainer>
          <HeartOutlined />
          <span>{count}</span>
        </HeartContainer>
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
