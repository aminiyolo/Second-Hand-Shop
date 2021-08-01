import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import {
  Background,
  LandingContainer,
  FilterBox,
  RenderBox,
  ProductData,
  cardStyle,
  GetAllButton,
} from "./style";
import { Col, Card, Row } from "antd";
import CategoryFilter from "../../components/CategoryFilter";
import SearchFilter from "../../components/SearchFilter";
import dayjs from "dayjs";
import { Categories } from "../Upload/data";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [renderToggle, setRenderToggle] = useState(false);
  const [noneResult, setNoneResult] = useState(false);
  const [filter, setFilter] = useState({
    category: [],
  });

  const getData = (data) => {
    axios.post("/api/product/data", data).then((response) => {
      if (response.data.success) {
        if (response.data.products.length > 0) {
          setNoneResult(false);
          setProducts(response.data.products);
        } else {
          setNoneResult(true);
        }
      } else {
        console.log(response.data.err);
      }
    });
  };

  useEffect(() => {
    let data = {};
    getData(data);
  }, [renderToggle]);

  const categoryFilter = (selected) => {
    let willBeUpdated = { ...filter };
    willBeUpdated["category"] = selected;
    let data = willBeUpdated;
    getData(data);
    setFilter(willBeUpdated);
  };

  const searchFilter = (searchValue) => {
    console.log(filter);
    let data = {
      filter,
      searchValue,
    };
    getData(data);
  };

  const getAllProduct = () => {
    setRenderToggle((prev) => !prev);
  };

  return (
    <LandingContainer>
      <Background alt="background">
        <h1 className="sentence">
          당신이 필요한 제품을 구매하시고 필요 없는 상품은 판매해보세요 !
        </h1>
        <SearchFilter searchFilter={searchFilter} />
        <GetAllButton onClick={getAllProduct}>전체 목록 보기</GetAllButton>
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
        {noneResult && (
          <h1 className="result">찾으시려는 상품이 존재하지 않습니다.</h1>
        )}
        <Row gutter={[24, 24]}>
          {!noneResult &&
            products &&
            products.map((product, index) => (
              <Col lg={6} md={8} xs={24} key={index}>
                <Card
                  style={cardStyle}
                  cover={
                    <a href={`product/${product._id}`}>
                      <ProductCard product={product} />
                    </a>
                  }
                >
                  <ProductData>
                    <p className="title">{product.title}</p>
                    <p className="price">{`${product.price}원`}</p>
                    <span className="date">
                      업로드 날짜:{" "}
                      {dayjs(product.createdAt).format("YYYY-MM-DD")}
                    </span>
                  </ProductData>
                </Card>
              </Col>
            ))}
        </Row>
      </RenderBox>
    </LandingContainer>
  );
};

export default LandingPage;
