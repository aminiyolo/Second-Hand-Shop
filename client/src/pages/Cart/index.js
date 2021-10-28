import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { CartContainer, Empty, ProductContainer, Img } from "./style";
import { useHistory, Link } from "react-router-dom";
import { Loading } from "../Login/style";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../redux/apiCalls";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { user, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let container = [];

    const getProduct = async () => {
      if (cart.length > 0) {
        cart.forEach((c) => {
          container.push(c.id);
        });
      } else {
        return setProducts([]);
      }

      try {
        const res = await axios.get(
          `/api/product/product_by_id?id=${container}&type=array`
        );

        setProducts(res.data.productInfo);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [cart]);

  const handleRemove = useCallback(
    (id) => {
      let data = {
        id,
      };

      try {
        removeCart(dispatch, data, user.token);
        toast.success("삭제 되었습니다.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } catch (err) {
        alert("잠시 후에 다시 시도 해주세요.");
      }

      // const removeItem = async () => {
      //   try {
      //     await axios.post("/api/users/removeFrom_cart", data);
      //     alert("삭제 되었습니다.");
      //   } catch (err) {
      //     console.log(err);
      //   }
      // };

      // removeItem();
    },
    [dispatch, user.token]
  );

  if (!user) {
    history.push("/");
  }

  if (products === null) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <CartContainer>
      <h1 className="title">장바구니</h1>
      <div className="info">
        <p># 상품의 이미지를 클릭하시면 상품페이지로 이동됩니다.</p>
        <p className="caution">
          # 판매자가 상품판매 완료 혹은 상품삭제 시 장바구니에서 자동
          삭제됩니다.
        </p>
      </div>
      <br />
      <div>
        {products.length < 1 && (
          <Empty>
            <h1>텅 ~</h1>
          </Empty>
        )}
        {products !== [] &&
          products.map((product, index) => (
            <React.Fragment key={index}>
              <ProductContainer>
                <div>
                  <Link to={`/product/${product._id}`}>
                    <Img
                      src={`http://localhost:3050/${product.images[0]}`}
                      alt={product.title}
                    />
                  </Link>
                </div>
                <div className="detail">
                  <h2>{product.title}</h2>
                  <p>
                    업로드 날짜: {dayjs(product.createdAt).format("YYYY-MM-DD")}
                  </p>
                  <div>{product.description}</div>
                  <div>{product.price}원</div>
                </div>
                <button
                  className="removeBtn"
                  onClick={() => handleRemove(product._id)}
                >
                  삭제
                </button>
              </ProductContainer>
            </React.Fragment>
          ))}
      </div>
      <ToastContainer />
    </CartContainer>
  );
};

export default Cart;
