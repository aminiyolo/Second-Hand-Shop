import React from "react";

const Slider = ({ product }) => {
  return (
    <div>
      {product.images[0] && (
        <div>
          <img
            style={{
              width: "100%",
              margin: "auto",
              height: "180px",
              borderRadius: "5px",
            }}
            src={`http://localhost:3050/${product.images[0]}`}
            alt={product.title}
          />
        </div>
      )}
    </div>
  );
};

export default Slider;
