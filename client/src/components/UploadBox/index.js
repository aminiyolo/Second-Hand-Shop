import React, { useCallback, useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { UploadOutlined } from "@ant-design/icons";
import { InputContainer, ImageContainer, Img, H3 } from "./style";

const UploadBox = ({ getImages, clearImg, setClearImg }) => {
  const [images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    //save the image we chose
    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...images, response.data.image]);
        getImages([...images, response.data.image]);
      } else {
        alert("사진 업로드에 실패하였습니다.");
      }
    });
  };

  const onRemove = useCallback(
    (image) => {
      const indexNum = images.indexOf(image);
      let willBeUpdated = [...images];
      willBeUpdated.splice(indexNum, 1);
      setImages(willBeUpdated);
      getImages(willBeUpdated);
    },
    [images]
  );

  if (clearImg) {
    setTimeout(() => {
      setImages([]);
      setClearImg(false);
    }, 1000);
  }

  return (
    <React.Fragment>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <InputContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <UploadOutlined style={{ fontSize: "64px" }} />
          </InputContainer>
        )}
      </Dropzone>
      <H3>사진을 여러 장 첨부하실 수 있습니다.</H3>
      <ImageContainer>
        {images !== [] &&
          images.map((image, index) => (
            <div key={index} onClick={() => onRemove(image)}>
              <Img
                src={`http://localhost:3050/${image}`}
                alt={"product_image"}
              />
            </div>
          ))}
      </ImageContainer>
      {images.length > 0 && <H3>사진을 클릭하시면 삭제됩니다.</H3>}
    </React.Fragment>
  );
};

export default UploadBox;
