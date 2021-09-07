import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import useInput from "../../hooks/useInput";
import {
  DescriptionBox,
  Description,
  Input,
  Textarea,
  Button,
} from "../../layout/Upload/style";
import { Error } from "../../layout/Login/style";

const Editor = ({ product, closeEdit }) => {
  const [title, onChangeTitle, setTitle] = useInput("");
  const [description, onChangeDescription, setDescription] = useInput("");
  const [period, onChangePeriod, setPeriod] = useInput("");
  const [price, onChangePrice, setPrice] = useInput("");

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [periodError, setPeriodError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axios.get(
          `/api/product/product_by_id?id=${product.id}&type=single`
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProductInfo();
  }, [product]);

  const onClickCancle = useCallback(() => {
    closeEdit();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        paddingTop: "7rem",
        width: "90%",
        margin: "auto",
        justifyContent: "center",
        // backgroundColor: "#eee",
        // borderRadius: "1rem",
      }}
    >
      <div style={{ marginRight: "1.5rem" }}>
        <img
          style={{ width: "20rem", height: "20rem", marginTop: "0.5rem" }}
          src={`http://localhost:3050/${product.images[0]}`}
          alt="product__img"
        />
      </div>
      <DescriptionBox>
        <form>
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
            <label>사용한 개월 수 (ex 3 또는 7) </label>
            <Input type="number" value={period} onChange={onChangePeriod} />
            {periodError && <Error>사용 개월 수는 최소 1개월 입니다.</Error>}
            <br />
            <br />
            <label>가격(원)</label>
            <Input value={price} onChange={onChangePrice} type="number" />
            {priceError && <Error>가격은 최소 1원 입니다.</Error>}
          </Description>
          <Button>등록하기</Button>
          <Button onclick={onClickCancle}>취소</Button>
        </form>
      </DescriptionBox>
    </div>
  );
};

export default Editor;
