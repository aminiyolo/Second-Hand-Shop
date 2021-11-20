import React, { useEffect, useState, useCallback } from "react";
import { checkCategory } from "./categoryData";
import dayjs from "dayjs";
import { axiosInstance } from "../../config";
import { useParams, useHistory } from "react-router";
import {
  addedStyle,
  normalStyle,
  ChatBtn,
  BtnContainer,
  Description,
  HeartContainer,
  ProductInfoContainer,
} from "./style";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { addCart, removeCart } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const ProductInfo = ({ product, seller }) => {
  const { user, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [inAcart, setInAcart] = useState(false);
  const [count, setCount] = useState(0);

  const onClickCart = useCallback(() => {
    if (!user) {
      let choice = window.confirm("로그인이 필요한 서비스 입니다.");
      if (choice) {
        history.push("/login");
      }
      return;
    }

    if (seller === user._id) {
      return alert("본인의 상품은 장바구니에 담을 수 없습니다.");
    }

    let data = {
      id,
    };

    if (!inAcart) {
      try {
        addCart(dispatch, data, user.token);
        setCount((prev) => prev + 1);
      } catch (err) {
        alert("다시 시도 해주세요.");
      }
    } else {
      try {
        removeCart(dispatch, data, user.token);
        setCount((prev) => prev - 1);
        setInAcart(false);
      } catch (err) {
        alert("다시 시도 해주세요.");
      }
    }
  }, [user, history, id, seller, inAcart, dispatch]);

  const onClickChat = () => {
    if (!user) {
      let choice = window.confirm("로그인이 필요한 서비스 입니다.");
      if (choice) {
        history.push("/login");
      }
      return;
    }

    if (seller === user._id) {
      return alert("판매자가 본인에 해당합니다.");
    }

    let data = {
      senderId: product.seller._id,
      receiverId: user._id,
      title: product.title,
      productId: product._id,
      image: product.images,
      price: product.price,
    };

    const makeConversation = async () => {
      try {
        await axiosInstance.post("/api/conversations", data);
        history.push("/chat");
      } catch (err) {
        console.log(err);
      }
    };

    const checkConversation = async () => {
      try {
        const res = await axiosInstance.post("/api/conversations/check", data);

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
    cart.forEach((c) => {
      if (c.id === id) {
        setInAcart(true);
      }
    });

    let data = {
      id,
    };

    const getCount = async () => {
      const res = await axiosInstance.post(
        "/api/users/count_added_product",
        data
      );
      setCount(res.data.length);
    };

    getCount();
  }, [product, cart, id]);

  return (
    <ProductInfoContainer>
      <Description>
        <h1>{product?.title}</h1>
        <div className="detail">
          <span>
            {category} &nbsp; / &nbsp; 업로드 날짜: &nbsp;
            {dayjs(product?.createdAt).format("YYYY-MM-DD")}
          </span>
        </div>
        <h3>{product?.description}</h3>
        <div>사용기간: &nbsp;{product?.period}개월</div>
        <div className="price">가격: &nbsp;{product?.price}원</div>
        <HeartContainer>
          {inAcart ? (
            <HeartFilled style={{ color: "red" }} />
          ) : (
            <HeartOutlined />
          )}
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
    </ProductInfoContainer>
  );
};

export default ProductInfo;
