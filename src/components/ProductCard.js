import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      {/* Ensure the image is displayed fully and responsively */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="card-img-top img-fluid"
        style={{ objectFit: 'contain', height: '200px', width: '100%' }} // Keeps image uncropped
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;