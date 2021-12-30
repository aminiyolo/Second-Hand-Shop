import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { UploadOutlined } from "@ant-design/icons";
import { InputContainer, ImageContainer, Img, H3 } from "./style";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

interface IProps {
  getImages: (imgs: string[]) => void;
  clearImg: boolean;
  setClearImg: (bool: boolean) => void;
  defaultImages: string[] | undefined;
}

const UploadBox: React.VFC<IProps> = ({
  getImages,
  clearImg,
  setClearImg,
  defaultImages = [], // 게시물 이미지 수정이 아닌, 최초 업로드시
}) => {
  const [images, setImages] = useState<string[]>(defaultImages);

  const onDrop = useCallback(
    (files: any) => {
      const fileName = new Date().getTime() + files[0].name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          alert("다시 시도해주세요.");
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setImages([...images, downloadURL]);
            getImages([...images, downloadURL]);
          });
        },
      );
    },
    [getImages, images],
  );

  const onRemove = useCallback(
    (image) => {
      const indexNum = images.indexOf(image);
      const newImages = [...images];
      newImages.splice(indexNum, 1);
      setImages(newImages);
      getImages(newImages);
    },
    [images, getImages],
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
        {images.length > 0 &&
          images.map((image, index) => (
            <div key={index} onClick={() => onRemove(image)}>
              <Img src={image} alt={"product_image"} />
            </div>
          ))}
      </ImageContainer>
      {images.length > 0 && <H3>사진을 클릭하시면 삭제됩니다.</H3>}
    </React.Fragment>
  );
};

export default UploadBox;
