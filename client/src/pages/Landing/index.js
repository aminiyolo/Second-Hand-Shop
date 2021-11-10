import { useCallback, useEffect, useState } from "react";
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
  MoreBtn,
} from "./style";
import { Col, Card, Row } from "antd";
import CategoryFilter from "../../components/CategoryFilter";
import SearchFilter from "../../components/SearchFilter";
import dayjs from "dayjs";
import { Categories } from "../Upload/data";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(4);
  const [size, setSize] = useState(0);
  const [noneResult, setNoneResult] = useState(false);
  const [search, setSearch] = useState(false);
  const [clearCategory, setClearCategory] = useState(false);

  const getData = useCallback(
    async (data) => {
      try {
        const res = await axios.post("/api/product/data", data);
        if (data.loadMore) {
          setProducts([...products, ...res.data.products]);
        } else {
          if (res.data.products.length === 0) setNoneResult(true);
          setProducts(res.data.products);
        }
        setSize(res.data.length);
      } catch (err) {
        console.log(err);
        alert("데이터를 불러오지 못했습니다. 재접속 해주시길 바랍니다.");
      }
    },
    [products]
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    let data = {
      skip,
      limit,
    };
    getData(data);

    return () => {
      source.cancel();
    };
  }, []);

  const onClickMore = () => {
    let Skip = skip + limit;

    let data = {
      skip: Skip,
      limit,
      loadMore: true,
    };

    getData(data);
    setSkip(Skip);
  };

  const categoryFilter = useCallback(
    (selected) => {
      let willBeUpdated = { category: [] };
      willBeUpdated["category"] = selected;
      let data = willBeUpdated;

      setNoneResult(false);
      getData(data);
    },
    [getData]
  );

  const searchFilter = useCallback(
    (searchValue) => {
      setSearch(true);

      let data = {
        searchValue,
      };

      setNoneResult(false);
      setClearCategory((prev) => !prev);
      getData(data);
    },
    [getData]
  );

  const getAllProduct = useCallback(() => {
    setNoneResult(false);
    setClearCategory((prev) => !prev);
    setSearch(false);

    let data = {};

    getData(data);
  }, []);

  return (
    <LandingContainer>
      <Background alt="background">
        <h1 className="title">
          당신이 필요한 제품을 구매하시고 필요 없는 상품은 판매해보세요 !
        </h1>
        <FilterBox>
          <Row gutter={[25, 25]}>
            <Col lg={12} xs={12}>
              <CategoryFilter
                Categories={Categories}
                categoryFilter={categoryFilter}
                clearCategory={clearCategory}
              />
            </Col>
            <Col lg={12} xs={24}></Col>
          </Row>
        </FilterBox>
        <SearchFilter searchFilter={searchFilter} />
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
                    <span className="upload__date">
                      업로드 날짜:{" "}
                      {dayjs(product.createdAt).format("YYYY-MM-DD")}
                    </span>
                  </ProductData>
                </Card>
              </Col>
            ))}
        </Row>
      </RenderBox>
      {skip < size && (
        <MoreBtn>
          <button onClick={onClickMore}>더보기</button>
        </MoreBtn>
      )}
    </LandingContainer>
  );
};

export default LandingPage;
