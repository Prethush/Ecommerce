import { useState, useEffect } from "react";
import Layout from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { addToWishlist, reset } from "../slices/wishListSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { deleteProd } from "../slices/productSlice";

function Home() {
  const { prodArr } = useSelector((state) => state.product);
  const [productArr, setProductArr] = useState([]);
  const { message } = useSelector((state) => state.wishList);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  // while the component mounts we are fetching the values of the product array from local storage and set that value productArr state variable

  useEffect(() => {
    if (prodArr) {
      let arr = [...prodArr];
      if (value.length) {
        arr = arr.filter(
          (a) =>
            a.name.toLowerCase().startsWith(value.toLocaleLowerCase()) ||
            a.category.toLowerCase().startsWith(value.toLowerCase())
        );
      }
      if (filter.length) {
        if (filter === "price-asc") {
          arr = arr.sort((a, b) => +a.price - +b.price);
        } else if (filter === "price-desc") {
          arr = arr.sort((a, b) => +b.price - +a.price);
        } else {
          arr = arr.sort((a, b) => +b.ratings - +a.ratings);
        }
      }
      setProductArr(arr);
    }
  }, [prodArr, value, filter]);

  // to delete a particular product
  const handleDelete = (id) => {
    dispatch(deleteProd(id));
  };

  // this useeffect is used whenever we are trying to add a product to wishlist which is already present in the wishlist we show this message
  useEffect(() => {
    if (message.length) {
      toast.success(message);
      dispatch(reset());
    }
  }, [dispatch, message]);

  // add a product to wishlist
  const handleAddToWishlist = (id) => {
    dispatch(addToWishlist(id));
  };

  // add a product to cart
  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="text-center me-4">
          <input
            type="text"
            value={value}
            placeholder="Search by product or category"
            className="p-2"
            style={{ width: "300px" }}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div>
          <select
            className="p-2"
            aria-label="Default select example"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option defaultValue={null}>Open this select menu</option>
            <option value="price-asc">Ascending order price</option>
            <option value="price-desc">Descending order price</option>
            <option value="ratings">Ratings</option>
          </select>
        </div>
      </div>
      <section>
        <div className="container py-5">
          <div className="row">
            {productArr.map((pr) => {
              return (
                <div key={pr.id} className="col-md-12 col-lg-4 mb-4 mb-lg-0">
                  <div
                    className="card p-3"
                    style={{ width: "350px", height: "550px" }}
                  >
                    <div className="text-center">
                      <img
                        src={require(`../assets/images/${pr.image}`)}
                        className="card-img-top"
                        alt="Laptop"
                        style={{
                          width: "250px",
                          height: "250px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <p className="small">
                          <span className="text-muted">Category</span>
                        </p>
                        <p>
                          <span>{pr.category}</span>
                        </p>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <h5 className="mb-0">{pr.name}</h5>
                        <h5 className="text-dark mb-0">&#8377; {pr.price}</h5>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <p>{pr.desc}</p>
                      </div>
                      <div className="d-flex justify-content-between mb-3 align-items-center">
                        <h5 className="mb-0">Ratings</h5>
                        <div>
                          <Rating initialValue={pr.ratings} readonly />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Link to={`/product/edit/${pr.id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(pr.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(pr.id)}
                        >
                          Cart
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToWishlist(pr.id)}
                        >
                          WishList
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
