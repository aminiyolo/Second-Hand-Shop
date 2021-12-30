import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { Product } from "../ProductInfo";

interface IProps {
  product: Product;
}

const ImageSlider: React.VFC<IProps> = ({ product }) => {
  const getItems = (product: Product) => {
    const items: ReactImageGalleryItem[] = [];
    product.images.forEach((image) => {
      items.push({
        original: image,
        thumbnail: image,
      });
    });

    return items;
  };

  return <ImageGallery showPlayButton={false} items={getItems(product)} />;
};

export default ImageSlider;
