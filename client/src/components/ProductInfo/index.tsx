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
import { RootState } from "../../redux/store";

export type Product = {
  seller: {
    _id: string;
  };
  title: string;
  createdAt: string;
  description: string;
  price: string;
  period: string;
  _id: string;
  images: string[];
  category: number;
};

interface IProps {
  product: Product;
  seller: string | null;
}

const ProductInfo: React.VFC<IProps> = ({ product, seller }) => {
  const { user, cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState("");
  const [inAcart, setInAcart] = useState(false);
  const [count, setCount] = useState(0);

  const onClickCart = useCallback(() => {
    if (!user) {
      const res = window.confirm("로그인이 필요한 서비스 입니다.");
      res && history.push("/login");
      return;
    }

    if (seller === user._id) {
      return alert("본인의 상품은 장바구니에 담을 수 없습니다.");
    }

    !inAcart &&
      addCart(dispatch, { id }, user.token) &&
      setCount((prev) => prev + 1);

    inAcart &&
      removeCart(dispatch, { id }, user.token) &&
      setCount((prev) => prev - 1) &&
      setInAcart(false);
  }, [user, history, id, seller, inAcart, dispatch]);

  const onClickChat = useCallback(() => {
    if (!user) {
      const res = window.confirm("로그인이 필요한 서비스 입니다.");
      res && history.push("/login");
      return;
    }

    if (seller === user._id) return alert("판매자가 본인에 해당합니다.");

    const data = {
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

        res.data.length > 0 ? history.push("/chat") : makeConversation();
      } catch (err) {
        console.log(err);
      }
    };

    checkConversation();
  }, [history, product, seller, user]);

  useEffect(() => {
    checkCategory(product, setCategory);
    cart.forEach((c) => {
      c.id === id && setInAcart(true);
    });

    const getCount = async () => {
      const res = await axiosInstance.post("/api/users/count_added_product", {
        id,
      });
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
