import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageSlider from "../../components/ImageSlider";
import ProductInfo from "../../components/ProductInfo";
import { Row, Col } from "antd";
import axios from "axios";
import { DetailContainer } from "./style";

const ProductDetail = ({ DATA, revalidate }) => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [seller, setSeller] = useState("");

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axios.get(
          `/api/product/product_by_id?id=${id}&type=single`
        );
        setSeller(res.data.productInfo[0].seller.email);
        setProduct(res.data.productInfo[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getProductInfo();
  }, [id]);

  return (
    <DetailContainer>
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* product image */}
          <ImageSlider product={product} />
        </Col>
        <Col lg={12} sm={24}>
          {/* product description and function buttons */}
          <ProductInfo
            product={product}
            DATA={DATA}
            revalidate={revalidate}
            seller={seller}
          />
        </Col>
      </Row>
    </DetailContainer>
  );
};

export default ProductDetail;
