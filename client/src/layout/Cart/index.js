import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

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

  const onClick = (id) => {
    let data = {
      id,
    };
    axios.post("/api/users/removeFrom_cart", data).then((response) => {
      if (response.data.success) {
        revalidate();
      } else {
        console.log("removeErr");
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "80px auto" }}>
      <h1>장바구니</h1>
      <hr />
      <br />
      <div>
        {products !== [] &&
          products.map((product, index) => (
            <React.Fragment key={index}>
              <div
                style={{
                  width: "95%",
                  margin: "auto",
                  display: "flex",
                  marginBottom: "20px",
                  border: "4px solid #FF8A3D",
                  borderRadius: "5px",
                  padding: "10px",
                  position: "relative",
                }}
              >
                <div>
                  <a href={`/product/${product._id}`}>
                    <img
                      style={{ width: "200px", height: "100%" }}
                      src={`http://localhost:3050/${product.images[0]}`}
                      alt={product.title}
                    />
                  </a>
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    color: "black",
                  }}
                >
                  {/* title */}
                  <h2>{product.title}</h2>
                  <p>
                    업로드 날짜: {dayjs(product.createdAt).format("YYYY-MM-DD")}
                  </p>
                  <div>{product.description}</div>
                  <div>{product.price}원</div>
                </div>
                <button
                  onClick={() => onClick(product._id)}
                  style={{
                    position: "absolute",
                    right: "30px",
                    bottom: "20px",
                    fontSize: "15px",
                    border: "1px solid #FF8A3D",
                    outline: "none",
                    backgroundColor: "#FF8A3D",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "8px 12px",
                  }}
                >
                  삭제
                </button>
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Cart;
