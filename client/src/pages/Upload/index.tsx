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

  const handleChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onChangeCategory = (e: any) => {
    setCategories(e.target.value);
  };

  const getImages = (images: string[]) => {
    setImages(images);
  };

  // 수정한 포스트를 업로드
  const editData = async (e: any) => {
    e.preventDefault();
    // if (!product) return;
    const { title, description, period, price } = value;

    if (!title || !description || !period || !price || images.length < 1)
      return toast.error("사진 및 모든 입력을 완성해주세요", {
        autoClose: 2000,
      });

    const data = {
      id: product?._id,
      ...value,
      images,
    };

    try {
      await axiosInstance.post("/api/product/edit", data);
      alert("수정되었습니다.");
      closeEdit && closeEdit();
    } catch (err) {
      alert("잠시 후에 다시 시도해주시길 바랍니다.");
    }
  };

  // 수정 취소
  const onClickCancle = useCallback(() => {
    closeEdit && closeEdit();
  }, [closeEdit]);

  // 최초 포스트를 업로드
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (product) return;

    if (!images.length) {
      setImgError(true);
      return;
    }

    let data = {
      ...value,
      seller: user?._id,
      images,
      category,
    };
    try {
      await axiosInstance.post("api/product/upload", data);
      alert("업로드 성공!");
      history.push("/");
    } catch (err) {
      alert("업로드 실패!");
    }
  };

  // 기존 포스트를 수정하기 위해 DB에서 데이터 값 불러오기
  const getProductInfo = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/api/product/product_by_id?id=${product?._id}&type=single`,
      );
      setValue((value) => ({
        ...value,
        title: res.data.productInfo[0].title,
      }));
      setValue((value) => ({
        ...value,
        description: res.data.productInfo[0].description,
      }));
      setValue((value) => ({
        ...value,
        period: res.data.productInfo[0].period,
      }));
      setValue((value) => ({
        ...value,
        price: res.data.productInfo[0].price,
      }));
    } catch (err) {
      console.log(err);
    }
  }, [product?._id]);

  // 수정 시에만 useEffect 발동
  useEffect(() => {
    product && getProductInfo();
  }, [getProductInfo, product]);

  if (!user) {
    history.push("/");
  }

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
                <label>제목</label>
                <Input
                  value={value.title}
                  name="title"
                  onChange={handleChange}
                  type="text"
                  required
                />
                <br />
                <br />
                <label>상세설명</label>
                <Textarea
                  value={value.description}
                  name="description"
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label>사용한 개월 수 (최대 개월 수 36) </label>
                <Input
                  type="number"
                  name="period"
                  value={value.period}
                  onChange={handleChange}
                  required
                  min={1}
                  max={36}
                />
                <br />
                <br />
                <label>가격(원)</label>
                <Input
                  value={value.price}
                  name="price"
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
                <Button onSubmit={onSubmit}>등록하기</Button>
              ) : (
                <ButtonContainer>
                  <button onClick={editData}>수정하기</button>
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
