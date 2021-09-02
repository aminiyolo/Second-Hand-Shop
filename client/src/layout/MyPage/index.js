import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CartContainer, Empty, ProductContainer, Img } from "../Cart/style";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Loading } from "../Login/style";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";

const MyPage = () => {
  const { data: userData } = useSWR("/api/users/data", fetcher);
  const history = useHistory();
  const [products, setProducts] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [receiveData, setReceiveData] = useState(false);

  const onRemove = (id) => {
    let data = {
      id,
    };

    const removeMyItem = async () => {
      try {
        await axios.post("/api/product/remove_from_myPage", data);
        setDeleteToggle((prev) => !prev);
        alert("상품이 삭제되었습니다.");
      } catch (err) {
        alert("상품 삭제 실패!");
      }
    };

    removeMyItem();
  };

  useEffect(() => {
    if (userData?._id) {
      let data = {
        id: userData._id,
      };

      const getMyProduct = async () => {
        try {
          const res = await axios.post("/api/product/myProduct", data);
          if (res.data.length < 0) {
            setReceiveData(true);
            setProducts([]);
          } else setReceiveData(true);

          setProducts(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      getMyProduct();
    }
  }, [userData, deleteToggle]);

  if (userData?.isAuth === false) {
    history.push("/");
  }

  if (products === null) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <CartContainer>
      <h1 className="title">내가 올린 상품</h1>
      <p className="info">
        # 상품의 이미지를 클릭하시면 상품페이지로 이동됩니다.
      </p>
      <br />
      <div>
        {products.length === 0 && receiveData !== false && (
          <Empty>
            <h1>텅 ~</h1>
          </Empty>
        )}
        {products?.map((product, index) => (
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
