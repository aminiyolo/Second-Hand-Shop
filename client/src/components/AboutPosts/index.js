import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router";
import dayjs from "dayjs";

const AboutPosts = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [deleteToggle, setDeleteToggle] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      let data = {};
      try {
        const res = await axios.post("/api/product/data", data);
        console.log(res.data.products);
        setProducts(res.data.products);
      } catch (err) {}
    };

    getAllProducts();
  }, [deleteToggle]);

  const onClickImg = useCallback(
    (id) => {
      history.push(`/product/${id}`);
    },
    [history]
  );

  const onRemove = useCallback((id) => {
    const remove = async () => {
      let data = {
        id,
      };

      let result = window.confirm("회원의 상품을 정말로 삭제하시겠습니까?");

      if (!result) return;

      try {
        await axios.post("/api/product/remove_from_myPage", data);
        setDeleteToggle((prev) => !prev);
      } catch (err) {
        alert("삭제 중 오류가 발생했습니다.");
      }
    };

    remove();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>게시물 관리</h2>
      <div>총 게시물 수: {products.length}개</div>
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th>이미지</th>
              <th>제목</th>
              <th>판매자</th>
              <th>가격</th>
              <th>게시 날짜</th>
              <th>삭제하기</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <th style={{ width: "15%" }}>
                  <img
                    onClick={() => onClickImg(product._id)}
                    style={{
                      cursor: "pointer",
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                    }}
                    src={`http://localhost:3050/${product.images[0]}`}
                    alt={product.title}
                  />
                </th>
                <th style={{ width: "35%" }}>{product.title}</th>
                <th>{product.seller.ID}</th>
                <th>{product.price}원</th>
                <th>{dayjs(product.createdAt).format("YYYY-MM-DD")}</th>
                <th style={{ width: "10%" }}>
                  <button
                    onClick={() => onRemove(product._id)}
                    style={{ cursor: "pointer" }}
                  >
                    게시물 삭제
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // <div>
    //   <div>
    //     {products.map((product) => (
    //       <div style={{ display: "flex" }}>
    //         <img
    //           style={{ width: "80px", height: "80px" }}
    //           src={`http://localhost:3050/${product.images[0]}`}
    //           alt={product.title}
    //         />
    //         <div style={{ marginLeft: "15px" }}>
    //           <div>{product.title} </div>
    //           <div>{product.seller.ID} </div>
    //           <div>{product.price}원 </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default withRouter(AboutPosts);
