import React from "react";
import { Img } from "./style";

interface IProps {
  product: {
    images: string[];
    title: string;
  };
}

const ProductCard: React.VFC<IProps> = ({ product }) => {
  return (
    <div>
      {product.images[0] && (
        <div>
          <Img src={product.images[0]} alt={product.title} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
