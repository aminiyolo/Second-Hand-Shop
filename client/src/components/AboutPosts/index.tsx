import { axiosInstance } from "../../config";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import { Wrapper, Img, Loading, Table, Title, Tr } from "./style";

type Product = {
  _id: string;
  images: string;
  title: string;
  seller: {
    ID: string;
  };
  createdAt: string;
  price: string;
};

const AboutPosts = () => {
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteToggle, setDeleteToggle] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axiosInstance.post("/api/product/data", {});
        res ? setProducts(res.data) : setProducts([]);
      } catch (err) {
        alert("잠시 후에 다시 시도해주세요.");
      }
    };

    getAllProducts();
  }, [deleteToggle]);

  const onClickImg = useCallback(
    (id) => {
      history.push(`/product/${id}`);
    },
    [history],
  );

  const onRemove = useCallback((id) => {
    const remove = async () => {
      const res = window.confirm("회원의 상품을 정말로 삭제하시겠습니까?");
      if (!res) return;

      try {
        await axiosInstance.post("/api/product/remove_from_myPage", { id });
        setDeleteToggle((prev) => !prev);
      } catch (err) {
        alert("삭제 중 오류가 발생했습니다.");
      }
    };

    remove();
  }, []);

  if (!products.length) {
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
            {products?.map((product) => (
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
