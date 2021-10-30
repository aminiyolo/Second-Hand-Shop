import React from "react";
import { Img } from "./style";

const ProductCard = ({ product }) => {
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
