import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { CartContainer, Empty, ProductContainer, Img } from "./style";
import { Redirect } from "react-router";

const Cart = ({ DATA, revalidate }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let container = [];

    if (DATA && DATA.cart.length > 0) {
      DATA.cart.forEach((data) => {
        container.push(data.id);
      });
      axios
        .get(`/api/product/product_by_id?id=${container}&type=array`)
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.productInfo);
          }
        });
    } else {
      setProducts([]);
    }
  }, [DATA]);

  const onClick = useCallback(
    (id) => {
      let data = {
        id,
      };
      axios.post("/api/users/removeFrom_cart", data).then((response) => {
        revalidate();
        if (response.data.success) {
          alert("삭제 되었습니다.");
        } else {
          console.log("removeErr");
        }
      });
    },
    [revalidate]
  );

  if (DATA === undefined) {
    return <div>Loading...</div>;
  }

  if (DATA && DATA.isAuth === false) {
    <Redirect to="/login" />;
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
        {DATA && DATA.token && DATA.cart.length === 0 && (
          <Empty>
            <h1>텅 ~</h1>
          </Empty>
        )}
        {products !== [] &&
          products.map((product, index) => (
            <React.Fragment key={index}>
              <ProductContainer>
                <div>
                  <a href={`/product/${product._id}`}>
                    <Img
                      src={`http://localhost:3050/${product.images[0]}`}
                      alt={product.title}
                    />
                  </a>
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
                  onClick={() => onClick(product._id)}
                >
                  삭제
                </button>
              </ProductContainer>
            </React.Fragment>
          ))}
      </div>
    </CartContainer>
  );
};

export default Cart;
