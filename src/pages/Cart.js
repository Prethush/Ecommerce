import { useSelector, useDispatch } from "react-redux";
import {
  deleteFromCart,
  addToCart,
  reduceCountFromCart,
} from "../slices/cartSlice";
import Layout from "./Layout";

function Cart() {
  const cartArr = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  
  // delete a product from cart
  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  // add a product to cart
  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  // to reduce the quantity a product in the cart
  const reduceCount = (id) => {
    dispatch(reduceCountFromCart(id));
  };
  return (
    <Layout>
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
              </div>

              {cartArr.map((cart) => {
                return (
                  <div key={cart.id} className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={require(`../assets/images/${cart.image}`)}
                            className="img-fluid rounded-3"
                            alt="Cotton T-shirt"
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p className="lead fw-normal mb-2">{cart.name}</p>
                          <p>
                            <span className="text-muted">Category: </span>
                            {cart.category}
                          </p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          <button className="btn btn-link px-2">
                            <i
                              className="fas fa-minus"
                              onClick={() => reduceCount(cart.id)}
                            ></i>
                          </button>

                          <input
                            id="form1"
                            min="0"
                            name="quantity"
                            type="number"
                            value={cart.count}
                            className="form-control form-control-sm"
                          />

                          <button className="btn btn-link px-2">
                            <i
                              className="fas fa-plus"
                              onClick={() => handleAddToCart(cart.id)}
                            ></i>
                          </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h5 className="mb-0">
                            &#8377; {+cart.price * +cart.count}
                          </h5>
                        </div>

                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <a href="#!" className="text-danger">
                            <i
                              className="fas fa-trash fa-lg"
                              onClick={() => handleDelete(cart.id)}
                            ></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Cart;
