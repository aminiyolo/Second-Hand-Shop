import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import useInput from "../../hooks/useInput";
import {
  DescriptionBox,
  Description,
  Input,
  Textarea,
} from "../../layout/Upload/style";
import UploadBox from "../UploadBox/index";
import { Error } from "../../layout/Login/style";
import { EditWrapper, ButtonContainer } from "./style";

const Editor = ({ product, closeEdit }) => {
  const [title, onChangeTitle, setTitle] = useInput("");
  const [description, onChangeDescription, setDescription] = useInput("");
  const [period, onChangePeriod, setPeriod] = useInput("");
  const [price, onChangePrice, setPrice] = useInput("");
  const [images, setImages] = useState(product.images);

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [periodError, setPeriodError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axios.get(
          `/api/product/product_by_id?id=${product._id}&type=single`
        );

        setTitle(res.data.productInfo[0].title);
        setDescription(res.data.productInfo[0].description);
        setPeriod(res.data.productInfo[0].period);
        setPrice(res.data.productInfo[0].price);
      } catch (err) {
        console.log(err);
      }
    };

    getProductInfo();
  }, []);

  const ValidationCheck = (state, setState) => {
    if (!state.trim()) {
      setState(true);
    } else {
      setState(false);
    }
  };

  const Recheck = (state, setState) => {
    if (state) {
      setState(false);
    }
  };

  const getImages = (images) => {
    setImages(images);
  };

  const onClickCancle = useCallback(() => {
    closeEdit();
  }, [closeEdit]);

  const onSubmit = (e) => {
    e.preventDefault();

    Recheck(title, setTitleError);
    Recheck(description, setDescriptionError);
    Recheck(period, setPeriodError);
    Recheck(price, setPriceError);
    ValidationCheck(title, setTitleError);
    ValidationCheck(description, setDescriptionError);

    if (!images.length) {
      setImgError(true);
    }

    if (price <= 0) {
      setPriceError(true);
    }

    if (period <= 0) {
      setPeriodError(true);
    }

    if (
      !title ||
      !description ||
      !price ||
      !period ||
      !images.length ||
      period <= 0 ||
      price <= 0
    ) {
      return;
    }

    const data = {
      id: product._id,
      title,
      description,
      period,
      price,
      images,
    };

    const editData = async () => {
      try {
        await axios.post("/api/product/edit", data);
        alert("수정되었습니다.");
        closeEdit();
      } catch (err) {
        alert("잠시 후에 다시 시도해주시길 바랍니다.");
      }
    };

    editData();
  };

  return (
    <EditWrapper>
      <div className="upload">
        <h1 className="title">게시물수정</h1>
        <UploadBox defaultImages={product.images} getImages={getImages} />
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
          {imgError && <Error>사진을 첨부해주세요.</Error>}

          <ButtonContainer>
            <button onClick={onSubmit}>수정하기</button>
            <button onClick={onClickCancle}>취소하기</button>
          </ButtonContainer>
        </form>
      </DescriptionBox>
    </EditWrapper>
  );
};

export default Editor;
