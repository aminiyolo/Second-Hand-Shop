import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../hooks/fetcher";
import useInput from "../../hooks/useInput";
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
} from "./style";
import { Error } from "../Login/style";

const Upload = () => {
  const { data: DATA } = useSWR("/api/users/data", fetcher);
  const [category, setCategories] = useState(1);
  const [title, onChangeTitle, setTitle] = useInput("");
  const [description, onChangeDescription, setDescription] = useInput("");
  const [period, onChangePeriod, setPeriod] = useInput("");
  const [price, onChangePrice, setPrice] = useInput("");
  const [images, setImages] = useState([]);
  const [clearImg, setClearImg] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [periodError, setPeriodError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [imgError, setImgError] = useState(false);

  function ValidationCheck(state, setState) {
    if (!state.trim()) {
      setState(true);
    } else {
      setState(false);
    }
  }

  function Recheck(state, setState) {
    if (state) {
      setState(false);
    }
  }

  const makeEmpty = () => {
    setCategories("");
    setTitle("");
    setDescription("");
    setPeriod("");
    setPrice("");
    setClearImg(true);
  };

  const onChangeCategory = (e) => {
    setCategories(e.target.value);
  };

  const getImages = (images) => {
    setImages(images);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Recheck(title, setTitleError);
    Recheck(description, setDescriptionError);
    Recheck(period, setPeriodError);
    Recheck(price, setPriceError);
    ValidationCheck(title, setTitleError);
    ValidationCheck(description, setDescriptionError);
    ValidationCheck(period, setPeriodError);

    if (!images.length) {
      setImgError(true);
      return;
    }

    if (price <= 0) {
      setPriceError(true);
      return;
    }

    if (!title || !description || !price || !period) {
      return;
    }

    let data = {
      seller: DATA._id,
      title,
      description,
      period,
      price,
      images,
      category,
    };

    axios.post("api/product/upload", data).then((response) => {
      if (response.data.success) {
        makeEmpty();
        alert("업로드 성공!");
      } else {
        alert("업로드 실패!");
      }
    });
  };

  return (
    <React.Fragment>
      <UploadContainer>
        <h1>Upload</h1>
        <div className="flex">
          <div className="uploadArea">
            <UploadBox
              getImages={getImages}
              clearImg={clearImg}
              setClearImg={setClearImg}
            />
          </div>
          <DescriptionBox>
            <form onSubmit={onSubmit}>
              <Description>
                <label>제목</label>
                <Input value={title} onChange={onChangeTitle} />
                {titleError && <Error>제목을 입력해주세요</Error>}
                <br />
                <br />
                <label>상세설명</label>
                <Textarea value={description} onChange={onChangeDescription} />
                {descriptionError && <Error>상세설명을 입력해주세요</Error>}
                <br />
                <br />
                <label>사용한 개월 수</label>
                <Input type="number" value={period} onChange={onChangePeriod} />
                {periodError && <Error>사용 개월 수를 입력해주세요</Error>}
                <br />
                <br />
                <label>가격(원)</label>
                <Input value={price} onChange={onChangePrice} type="number" />
                {priceError && <Error>가격은 1 이상이어야 합니다.</Error>}
              </Description>
              <br />
              <br />
              <SelectBox>
                <label>카테고리</label>
                <Select value={category} onChange={onChangeCategory}>
                  {Categories.map((Category, index) => (
                    <option key={index}>{Category.value}</option>
                  ))}
                </Select>
              </SelectBox>
              <br />
              {imgError && <Error>사진을 첨부해주세요.</Error>}
              <br />
              <Button onSubmit={onSubmit}>등록하기</Button>
            </form>
          </DescriptionBox>
        </div>
      </UploadContainer>
    </React.Fragment>
  );
};

export default Upload;
