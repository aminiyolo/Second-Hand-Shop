import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "../../components/Slider";
import {
  Background,
  LandingContainer,
  FilterBox,
  RenderBox,
  ProductData,
} from "./style";
import { Col, Card, Row } from "antd";
import CategoryFilter from "../../components/CategoryFilter";
import PeriodFilter from "../../components/PeriodFilter";
import SearchFilter from "../../components/SearchFilter";
import dayjs from "dayjs";

const cardStyle = {
  color: "black",
  paddingBottom: "50px",
};

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.post("/api/product/data").then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);
      }
    });
  }, []);

  const uploadedProduct = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          style={cardStyle}
          cover={
            <a href={`product/${product._id}`}>
              <Slider product={product} />
            </a>
          }
        >
          <ProductData>
            <p className="title">{product.title}</p>
            <p className="price">{`${product.price}원`}</p>
            <span className="date">
              업로드 날짜: {dayjs(product.createdAt).format("YYYY-MM-DD")}
            </span>
          </ProductData>
        </Card>
      </Col>
    );
  });

  return (
    <LandingContainer>
      <Background alt="background">
        <SearchFilter />
      </Background>
      <FilterBox>
        <Row gutter={[25, 25]}>
          <Col lg={12} xs={24}>
            <CategoryFilter />
          </Col>
          <Col lg={12} xs={24}>
            <PeriodFilter />
          </Col>
        </Row>
      </FilterBox>
      <RenderBox>
        <Row gutter={[24, 24]}>{uploadedProduct}</Row>
      </RenderBox>
    </LandingContainer>
  );
};

export default LandingPage;
