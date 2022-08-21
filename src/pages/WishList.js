import Layout from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromWishlist } from "../slices/wishListSlice";

function WishList() {
  const { wishList } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  // delete a product from wishlist
  const handleDelete = (id) => {
    dispatch(deleteFromWishlist(id));
  };
  return (
    <Layout>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-10">
              <div className="card">
                <div className="card-header p-3">
                  <h5 className="mb-0">
                    <i className="fas fa-tasks me-2"></i>Wish List
                  </h5>
                </div>
                <div
                  className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{ position: "relative" }}
                >
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Product Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Category Price</th>
                        <th scope="col">Price</th>
                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishList.map((w) => {
                        return (
                          <tr key={w.id} className="fw-normal">
                            <th>
                              <img
                                src={require(`../assets/images/${w.image}`)}
                                className="shadow-1-strong"
                                alt="avatar 1"
                                style={{ width: "70px", height: "auto" }}
                              />
                            </th>
                            <td className="align-middle">
                              <span>{w.name}</span>
                            </td>
                            <td className="align-middle">
                              <h6 className="mb-0">
                                <span>{w.category}</span>
                              </h6>
                            </td>
                            <td className="align-middle">
                              <h6 className="mb-0">
                                <span>&#8377;{w.price}</span>
                              </h6>
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(w.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default WishList;
