import React, { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../../config";
import { useHistory } from "react-router";
import UploadBox from "../../components/UploadBox";
import { Categories } from "./data";
import {
  UploadContainer,
  DescriptionBox,
  Description,
  Input,
  Textarea,
  Select,
  Button,
  SelectBox,
  ButtonContainer,
} from "./style";
import { Error } from "../Login/style";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux/store";
import { Product } from "../../components/ProductInfo";

interface IProps {
  product: Product | null;
  closeEdit: () => void | null;
}

const Upload: React.VFC<IProps> = ({ product = null, closeEdit = null }) => {
  const { user } = useSelector((state: RootState) => state);
  const history = useHistory();
  const [value, setValue] = useState({
    title: "",
    description: "",
    period: "",
    price: "",
  });

  const [category, setCategories] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [clearImg, setClearImg] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = useCallback(
    (e: any) => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value],
  );

  const onChangeCategory = useCallback((e: any) => {
    setCategories(e.target.value);
  }, []);

  const getImages = useCallback((images: string[]) => {
    setImages(images);
  }, []);

  // 수정한 포스트를 업로드
  const editData = useCallback(
    async (e: any) => {
      e.preventDefault();
      const { title, description, period, price } = value;

      if (!title || !description || !period || !price || !images.length)
        return toast.error("사진 및 모든 입력을 완성해주세요", {
          autoClose: 2000,
        });

      const data = {
        id: product?._id,
        ...value,
        images,
      };

      setIsFetching(true);

      try {
        await axiosInstance.post("/api/product/edit", data);
        setIsFetching(false);
        alert("수정되었습니다.");
        closeEdit!();
      } catch (err) {
        setIsFetching(false);
        alert("잠시 후에 다시 시도해주시길 바랍니다.");
      }
    },
    [closeEdit, images, value, product?._id],
  );

  // 수정 취소
  const onClickCancle = useCallback(() => {
    closeEdit!();
  }, [closeEdit]);

  // 최초 포스트를 업로드
  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (product) return;

      if (!images.length) {
        return setImgError(true);
      }

      const data = {
        ...value,
        seller: user?._id,
        images,
        category,
      };

      setIsFetching(true);

      try {
        await axiosInstance.post("api/product/upload", data);
        setIsFetching(false);
        alert("업로드 성공!");
        history.push("/");
      } catch (err) {
        setIsFetching(false);
        alert("업로드 실패!");
      }
    },
    [category, history, images, product, user?._id, value],
  );

  // 기존 포스트를 수정하기 위해 DB에서 데이터 값 불러오기
  const getProductInfo = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/api/product/product_by_id?id=${product?._id}&type=single`,
      );
      const { title, description, period, price } = res.data.productInfo[0]; // 구조 분해 할당

      setValue((value) => ({
        ...value,
        title,
      }));
      setValue((value) => ({
        ...value,
        description,
      }));
      setValue((value) => ({
        ...value,
        period,
      }));
      setValue((value) => ({
        ...value,
        price,
      }));
    } catch (err) {
      console.log(err);
    }
  }, [product?._id]);

  // 수정 시에만 useEffect 발동
  useEffect(() => {
    product && getProductInfo();
  }, [getProductInfo, product]);

  !user && history.push("/");

  return (
    <React.Fragment>
      <UploadContainer>
        <h1>업로드</h1>
        <div className="flex">
          <div className="uploadArea">
            <UploadBox
              getImages={getImages}
              clearImg={clearImg}
              setClearImg={setClearImg}
              defaultImages={product?.images}
            />
          </div>
          <DescriptionBox>
            <form onSubmit={product ? editData : onSubmit}>
              <Description>
                <label htmlFor="title">제목</label>
                <Input
                  value={value.title}
                  id="title"
                  name="title"
                  autoComplete="off"
                  onChange={handleChange}
                  type="text"
                  required
                />
                <br />
                <br />
                <label htmlFor="description">상세설명</label>
                <Textarea
                  value={value.description}
                  id="description"
                  name="description"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label htmlFor="period">
                  사용한 개월 수 (최대 개월 수 36){" "}
                </label>
                <Input
                  type="number"
                  id="period"
                  name="period"
                  value={value.period}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  min={1}
                  max={36}
                />
                <br />
                <br />
                <label htmlFor="price">가격(원)</label>
                <Input
                  value={value.price}
                  name="price"
                  id="price"
                  autoComplete="off"
                  onChange={handleChange}
                  type="number"
                  required
                  min={1}
                />
              </Description>
              <br />
              <br />
              <SelectBox>
                <label className="category">카테고리</label>
                <Select value={category} onChange={onChangeCategory}>
                  {Categories.map((Category, index) => (
                    <option key={index} value={Category.key}>
                      {Category.value}
                    </option>
                  ))}
                </Select>
              </SelectBox>
              <br />
              {imgError && <Error>사진을 첨부해주세요.</Error>}
              <br />
              {!product ? (
                <Button disabled={isFetching} onSubmit={onSubmit}>
                  등록하기
                </Button>
              ) : (
                <ButtonContainer>
                  <button disabled={isFetching} onClick={editData}>
                    수정하기
                  </button>
                  <button onClick={onClickCancle}>취소하기</button>
                </ButtonContainer>
              )}
            </form>
          </DescriptionBox>
          <ToastContainer position="top-right" />
        </div>
      </UploadContainer>
    </React.Fragment>
  );
};

export default Upload;
