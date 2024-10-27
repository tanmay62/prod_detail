import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from '../redux/actions';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming you have custom styles here for pagination

const Products = () => {
  const dispatch = useDispatch();
  const { list: products, loading, error } = useSelector(state => state);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsRequest());
      try {
        const skip = (currentPage - 1) * productsPerPage;
        const response = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`);
        const result = await response.json();
        dispatch(fetchProductsSuccess(result.products));
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    fetchProducts();
  }, [dispatch, currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error}</div>;

  const totalPages = Math.ceil(100 / productsPerPage); // Assuming the API has 100 products

  // Pagination Controls
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container bg-warning">
      <h1 className='text-center text-success mb-4'>Product List</h1>
      <div className="row mt-3">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <Link to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination custom-pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePreviousPage}>
                Previous
              </button>
            </li>
            {/* Display Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageClick(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handleNextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Products;