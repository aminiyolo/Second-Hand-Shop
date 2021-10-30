import ImageGallery from "react-image-gallery";

const ImageSlider = ({ product }) => {
  let container = [];

  if (product) {
    product?.images.map((image) => {
      container.push({
        original: image,
        thumbnail: image,
      });
    });
  }

  return <ImageGallery showPlayButton={false} items={container} />;
};

export default ImageSlider;
