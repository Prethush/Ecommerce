import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
const Home = React.lazy(() => import("./pages/Home"));
const ProductAddForm = React.lazy(() => import("./components/ProductAddForm"));
const Cart = React.lazy(() => import("./pages/Cart"));
const WishList = React.lazy(() => import("./pages/WishList"));
const EditProduct = React.lazy(() => import("./components/EditProduct"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/add" element={<ProductAddForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
          </Routes>
        </Router>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
