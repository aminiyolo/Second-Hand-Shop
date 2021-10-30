import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import { Wrapper, Img, Loading, Table, Title, Tr } from "./style";

const AboutPosts = () => {
  const history = useHistory();
  const [products, setProducts] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      let data = {};
      try {
        const res = await axios.post("/api/product/data", data);
        setProducts(res.data.products);

        if (!res) setProducts([]);
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

  if (products === null) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Wrapper>
      <Title>게시물 관리</Title>
      <div>총 게시물 수: {products.length}개</div>
      <br />
      <>
        <Table>
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
              <Tr key={product._id}>
                <th>
                  <Img
                    onClick={() => onClickImg(product._id)}
                    src={product.images[0]}
                    alt={product.title}
                  />
                </th>
                <th className="title">{product.title}</th>
                <th>{product.seller.ID}</th>
                <th>{product.price}원</th>
                <th>{dayjs(product.createdAt).format("YYYY-MM-DD")}</th>
                <th className="button">
                  <button
                    onClick={() => onRemove(product._id)}
                    style={{ cursor: "pointer" }}
                  >
                    게시물 삭제
                  </button>
                </th>
              </Tr>
            ))}
          </tbody>
        </Table>
      </>
    </Wrapper>
  );
};

export default AboutPosts;
