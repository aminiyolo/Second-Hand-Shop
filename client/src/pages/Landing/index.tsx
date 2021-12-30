import { useCallback, useEffect, useState, useRef } from "react";
import { axiosInstance } from "../../config";
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
import InfiniteScroll from "../../utill/useInfiniteScroll";

type Products = {
  _id: string;
  images: string[];
  title: string;
  price: string;
  createdAt: string;
};

const LandingPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [hasCategory, setHasCategory] = useState(false);
  const [noneResult, setNoneResult] = useState(false);
  const [search, setSearch] = useState(false);
  const [clearCategory, setClearCategory] = useState(false);
  const fetchMore = useRef(null);
  const intersecting = InfiniteScroll(fetchMore);

  const getData = useCallback(async () => {
    let cursor;
    // 검색 후 초기화시 최초 리스트 렌더
    if (search || hasCategory) cursor = "";
    else cursor = products[products.length - 1]?._id || "";
    setNoneResult(false);
    setSearch(false);
    setHasNext(true);

    try {
      const res = await axiosInstance.get(`/api/product/data?cursor=${cursor}`);
      // setState는 비동기 함수이므로 위에서 setSearch(false)를 실행해도, search 값이 true일때 아래코드가 작동할 때 까지는 true 값을 유지한다.
      !search ? setProducts([...products, ...res.data]) : setProducts(res.data);
      !res.data.length && setHasNext(false);
    } catch (err) {
      alert("데이터를 불러오지 못했습니다. 잠시 후 다시 시도 바랍니다.");
    }
  }, [products, search, hasCategory]);

  const getFilteredData = useCallback(async (data) => {
    try {
      const res = await axiosInstance.post("/api/product/data", data);
      if (res.data.length) {
        setProducts([...res.data]);
      } else {
        setNoneResult(true);
        setProducts([]);
        setHasNext(true);
      }
    } catch (err) {
      alert("데이터를 불러오지 못했습니다. 잠시 후 다시 시도 바랍니다.");
    }
  }, []);

  const categoryFilter = (selected: number[]) => {
    !selected.length ? setHasCategory(false) : setHasCategory(true);

    if (!selected.length) {
      setHasCategory(false);
      setProducts([]);
      setHasNext(true);
      getFilteredData({});
      return;
    }

    setHasCategory(true);
    const newCategory: { category: number[] } = { category: [] };
    newCategory["category"] = selected;
    setNoneResult(false);
    selected.length && getFilteredData(newCategory);
  };

  const searchFilter = useCallback(
    (searchValue) => {
      setSearch(true);
      setNoneResult(false);
      setClearCategory((prev) => !prev);
      getFilteredData({ searchValue });
    },
    [getFilteredData],
  );

  useEffect(() => {
    if (intersecting && !hasCategory && hasNext) {
      getData();
    }
  }, [intersecting]);

  return (
    <LandingContainer>
      <Background>
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
        {search && <GetAllButton onClick={getData}>전체목록 보기</GetAllButton>}
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
      {!search && !hasCategory && <div ref={fetchMore}></div>}
    </LandingContainer>
  );
};

export default LandingPage;
