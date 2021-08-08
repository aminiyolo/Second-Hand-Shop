import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CartContainer, Empty, ProductContainer, Img } from "../Cart/style";

const MyPage = ({ DATA }) => {
  const [products, setProducts] = useState([]);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const onRemove = (id) => {
    let data = {
      id,
    };
    axios.post("/api/product/remove_from_myPage", data).then((response) => {
      if (response.data.success) {
        setDeleteToggle((prev) => !prev);
        alert("상품이 삭제되었습니다.");
      } else {
        console.log(response.data.err);
        alert("상품 삭제 실패!");
      }
    });
  };

  useEffect(() => {
    if (DATA?._id) {
      let data = {
        id: DATA._id,
      };

      const getMyProduct = async () => {
        try {
          const res = await axios.post("/api/product/myProduct", data);
          setProducts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMyProduct();
    }
  }, [DATA, deleteToggle]);
  return (
    <CartContainer>
      <h1 className="title">내가 올린 상품</h1>
      <p className="info">
        # 상품의 이미지를 클릭하시면 상품페이지로 이동됩니다.
      </p>
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
                  onClick={() => onRemove(product._id)}
                >
                  상품 지우기
                </button>
              </ProductContainer>
            </React.Fragment>
          ))}
      </div>
    </CartContainer>
  );
};

export default MyPage;
