import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path='/'
            element={
              <div style={{ textAlign: "center", marginTop: "4rem" }}>
                <Link to="/products">
                  <button style={{ marginLeft: "3rem" }} className="btn btn-primary mt-4">Products</button>
                </Link>
              </div>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;