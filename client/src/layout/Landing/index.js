import React, { useCallback, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { Loading } from "../Login/style";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [renderToggle, setRenderToggle] = useState(false);
  const [noneResult, setNoneResult] = useState(false);
  const [search, setSearch] = useState(false);
  const [getAll, setGetAll] = useState(false);
  const [filter, setFilter] = useState({
    category: [],
  });
  const [items, setItems] = useState(10);
  const [scrollOption, setScrollOption] = useState(false);

  const scrollOption_check = useCallback((value) => {
    if (value) {
      setScrollOption(true);
    }
  }, []);

  const getData = useCallback(
    (data) => {
      axios.post("/api/product/data", data).then((response) => {
        if (response.data.success) {
          if (response.data.products.length > 0) {
            if (getAll) {
              // 가장 최근의 업로드 된 것을 가장 위에 표시하기 위해 reverse() 함수사용
              setProducts(response.data.products.reverse().splice(0, items));
            } else {
              setProducts(response.data.products.reverse().splice(0, items));
            }
            setNoneResult(false);
            setGetAll(true);
          } else {
            setNoneResult(true);
          }
        } else {
          console.log(response.data.err);
        }
      });
    },
    [items, getAll]
  );

  const infiniteScroll = useCallback(() => {
    let scrollHeight = document.body.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.body.clientHeight;
    let result = Math.round(scrollHeight - scrollTop - clientHeight);
    if (result === 0) {
      let n = 4;
      setItems((items) => items + n);
    }
  }, []);

  useEffect(() => {
    let data = {};

    if (scrollOption === false) {
      getData(data);
      window.addEventListener("scroll", infiniteScroll);
    }
  }, [renderToggle, items]);

  const categoryFilter = useCallback(
    (selected) => {
      let willBeUpdated = { ...filter };
      willBeUpdated["category"] = selected;
      let data = willBeUpdated;
      getData(data);
      setFilter(willBeUpdated);
    },
    [filter, getData]
  );

  const searchFilter = useCallback(
    (searchValue) => {
      setSearch(true);
      let data = {
        filter,
        searchValue,
      };
      getData(data);
    },
    [filter, getData]
  );

  const getAllProduct = useCallback(() => {
    setRenderToggle((prev) => !prev);
    setScrollOption(false);
  }, []);

  return (
    <LandingContainer>
      <Background alt="background">
        <h1
          style={{
            paddingTop: "100px",
            textAlign: "center",
            fontSize: "1.7rem",
          }}
        >
          당신이 필요한 제품을 구매하시고 필요 없는 상품은 판매해보세요 !
        </h1>
        <FilterBox>
          <Row gutter={[25, 25]}>
            <Col lg={12} xs={12}>
              <CategoryFilter
                Categories={Categories}
                categoryFilter={(selected) => categoryFilter(selected)}
                categoryCheck={scrollOption_check}
              />
            </Col>
            <Col lg={12} xs={24}></Col>
          </Row>
        </FilterBox>
        <SearchFilter
          searchFilter={searchFilter}
          checkSearch={scrollOption_check}
        />
        {search && (
          <GetAllButton onClick={getAllProduct}>전체 목록 보기</GetAllButton>
        )}
      </Background>
      <RenderBox>
        {noneResult && (
          <h1 className="result">찾으시려는 상품이 존재하지 않습니다.</h1>
        )}
        <Row gutter={[24, 24]}>
          {!noneResult &&
            products?.map((product, index) => (
              <Col lg={6} md={8} xs={24} key={index}>
                <Card
                  style={cardStyle}
                  cover={
                    <Link to={`product/${product._id}`}>
                      <ProductCard product={product} />
                    </Link>
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
