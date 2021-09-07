import ImageGallery from "react-image-gallery";

const ImageSlider = ({ product }) => {
  let container = [];
  console.log(product);
  if (product) {
    product?.images.map((image) => {
      container.push({
        original: `http://localhost:3050/${image}`,
        thumbnail: `http://localhost:3050/${image}`,
      });
    });
  }

  return <ImageGallery showPlayButton={false} items={container} />;
};

export default ImageSlider;
