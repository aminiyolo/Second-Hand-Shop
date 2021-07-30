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
import SearchFilter from "../../components/SearchFilter";
import dayjs from "dayjs";
import { Categories } from "../Upload/data";

const cardStyle = {
  color: "black",
  paddingBottom: "50px",
};

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  const getData = (data) => {
    axios.post("/api/product/data", data).then((response) => {
      if (response.data.success) {
        setProducts(response.data.products);
      }
    });
  };

  useEffect(() => {
    let data = {};
    getData(data);
  }, []);

  const categoryFilter = (selected) => {
    let data = { category: [...selected] };
    getData(data);
  };

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
        <h1 className="sentence">
          당신이 필요한 제품을 구매하시고 필요 없는 상품은 판매해보세요 !
        </h1>
        <SearchFilter />
      </Background>
      <FilterBox>
        <Row gutter={[25, 25]}>
          <Col lg={12} xs={24}>
            <CategoryFilter
              Categories={Categories}
              categoryFilter={(selected) => categoryFilter(selected)}
            />
          </Col>
          <Col lg={12} xs={24}></Col>
        </Row>
      </FilterBox>
      <RenderBox>
        <Row gutter={[24, 24]}>{uploadedProduct}</Row>
      </RenderBox>
    </LandingContainer>
  );
};

export default LandingPage;
