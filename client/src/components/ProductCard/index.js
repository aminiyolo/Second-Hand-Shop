import React from "react";
import { Img } from "./style";

const ProductCard = ({ product }) => {
  return (
    <div>
      {product.images[0] && (
        <div>
          <Img
            src={`http://localhost:3050/${product.images[0]}`}
            alt={product.title}
          />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
