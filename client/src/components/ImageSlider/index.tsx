import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { Product } from "../ProductInfo";

interface IProps {
  product: Product;
}

const ImageSlider: React.VFC<IProps> = ({ product }) => {
  let container: ReactImageGalleryItem[] = [];

  if (product) {
    product?.images.forEach((image) => {
      container.push({
        original: image,
        thumbnail: image,
      });
    });
  }

  return <ImageGallery showPlayButton={false} items={container} />;
};

export default ImageSlider;
