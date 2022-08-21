import { Link } from "react-router-dom";
import shoppingCartIcon from "../assets/images/shopping-cart.png";
import wishListIcon from "../assets/images/love.png";
import { useSelector } from "react-redux";

function Header() {
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="text-body" style={{ textDecoration: "none" }}>
          <h4>Home</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            <Link
              to="/product/add"
              className="me-4"
              style={{ textDecoration: "none" }}
            >
              Add Product
            </Link>
            <Link to="/cart" className="me-4">
              <div className="position-relative">
                <img
                  src={shoppingCartIcon}
                  alt="shppoingCartLogo"
                  style={{ height: "30px" }}
                />
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </div>
            </Link>
            <Link to="/wishlist">
              <div className="me-4 position-relative">
                <img
                  src={wishListIcon}
                  alt="wishListIcon"
                  style={{ height: "30px" }}
                />
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishList.length}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
