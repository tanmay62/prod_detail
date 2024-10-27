import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const result = await response.json();
        setProduct(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;

  return (
    product.message ? (<h1 className='text-center'>{product.message}</h1>) : 
    (<div className='bg-warning'>
      <h1 className='text-center text-success'>Product Details</h1>
      <button style={{marginLeft:"2rem"}} className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back to Product List</button>
    <div style={{marginLeft:"10rem"}} className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.images[0]}
            alt={product.title}
            className="img-fluid"
            style={{ objectFit: 'contain', height: '400px', width: '100%' }} // Ensures the image fits within a square
          />
        </div>

        {/* Product Details Section */}
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Discount: {product.discountPercentage}%</p>
          <p>Rating: {product.rating}</p>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
        </div>
      </div>
    </div>
      </div>)
  );
};

export default ProductDetail;