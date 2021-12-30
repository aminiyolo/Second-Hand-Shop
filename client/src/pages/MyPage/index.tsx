import { axiosInstance } from "../../config";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { CartContainer, Empty, ProductContainer, Img } from "../Cart/style";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Loading } from "../Login/style";
import { Edit } from "./style";
import { FormOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Upload from "../Upload";
import { RootState } from "../../redux/store";
import { Product } from "../../components/ProductInfo/index";

const MyPage = () => {
  const { user } = useSelector((state: RootState) => state);
  const history = useHistory();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [receiveData, setReceiveData] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);

  const onRemove = useCallback((id: string) => {
    const res = window.confirm("정말로 삭제하시겠습니까?");
    if (!res) return;

    const removeMyItem = async () => {
      try {
        await axiosInstance.post("/api/product/remove_from_myPage", { id });
        setDeleteToggle((prev) => !prev);
        alert("상품이 삭제되었습니다.");
      } catch (err) {
        alert("상품 삭제 실패!");
      }
    };

    removeMyItem();
  }, []);

  useEffect(() => {
    const getMyProduct = async () => {
      try {
        const res = await axiosInstance.post("/api/product/myProduct", {
          id: user?._id,
        });
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
  }, [user, deleteToggle, clickedEdit]);

  const onClickEdit = useCallback((product) => {
    setProductData(product);
    setClickedEdit(true);
  }, []);

  const closeEdit = useCallback(() => {
    setClickedEdit(false);
  }, []);

  !user && history.push("/");

  if (products === null) {
    return <Loading>Loading...</Loading>;
  }

  if (!clickedEdit) {
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
                    <Img src={product?.images[0]} alt={product.title} />
                  </Link>
                </div>
                <div className="detail">
                  <h2>{product.title}</h2>
                  <p>
                    업로드 날짜: {dayjs(product.createdAt).format("YYYY-MM-DD")}
                  </p>
                  <div>{product.description}</div>
                  <div>{product.price}원</div>
                  <Edit>
                    <FormOutlined onClick={() => onClickEdit(product)} />
                  </Edit>
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
  } else return <Upload product={productData} closeEdit={closeEdit} />;
};

export default MyPage;
