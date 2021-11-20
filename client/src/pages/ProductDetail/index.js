import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageSlider from "../../components/ImageSlider";
import ProductInfo from "../../components/ProductInfo";
import { Row, Col } from "antd";
import { axiosInstance } from "../../config";
import { DetailContainer } from "./style";
import { Loading } from "../Login/style";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/product/product_by_id?id=${id}&type=single`
        );
        setSeller(res.data.productInfo[0].seller._id);
        setProduct(res.data.productInfo[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getProductInfo();
  }, [id]);

  if (product === null) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <DetailContainer>
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* product image */}
          <ImageSlider product={product} />
        </Col>
        <Col lg={12} sm={24}>
          {/* product description and function buttons */}
          <ProductInfo product={product} seller={seller} />
        </Col>
      </Row>
    </DetailContainer>
  );
};

export default ProductDetail;
