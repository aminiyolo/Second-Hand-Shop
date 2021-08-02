import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageSlider from "../../components/ImageSlider";
import ProductInfo from "../../components/ProductInfo";
import { Row, Col } from "antd";
import axios from "axios";

const ProductDetail = ({ DATA, revalidate }) => {
  const { id } = useParams();
  const [product, setProduct] = useState("");

  console.log(DATA);

  useEffect(() => {
    axios
      .get(`/api/product/product_by_id?id=${id}&type=single`)
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data.productInfo[0]);
        } else {
          console.log(response.data.err);
        }
      });
  }, []);

  return (
    <div style={{ paddingTop: " 100px", width: "90%", margin: "auto" }}>
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* product image */}
          <ImageSlider product={product} />
        </Col>
        <Col lg={12} sm={24}>
          {/* product description and function buttons */}
          <ProductInfo product={product} DATA={DATA} revalidate={revalidate} />
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
