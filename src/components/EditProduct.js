import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../pages/Layout";
import { useNavigate } from "react-router-dom";

let initialState = {
  name: "",
  image: "",
  desc: "",
  price: "",
  category: "",
  ratings: "",
};

// regular expression to validate an image url
const IMG_REGEX = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;

function EditProduct() {
  const { id } = useParams();

  // state variables
  const [formVal, setFormVal] = useState(initialState);
  const [prodArr, setProdArr] = useState([]);
  const [validImgUrl, setValidImgUrl] = useState(true);
  const [validRatings, setValidRatings] = useState(true);

  const navigate = useNavigate();
  let { name, image, desc, category, ratings, price } = formVal;

  useEffect(() => {
    // when this component mounts it will fetch this particular product details from local storage
    const products = JSON.parse(localStorage.getItem("prodArr"));
    const index = products.findIndex((prod) => prod.id === id);
    setFormVal(products[index]);
    setProdArr(products);
  }, [id]);

  // storing the values of form fields to state and checking some validation
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "image") {
      value = e.target.files[0].name;
      const imgResult = IMG_REGEX.test(value);
      if (!imgResult) {
        toast.error("Invalid image file");
      }
      setValidImgUrl(imgResult);
    }
    if (name === "ratings") {
      const ratingsResult = value <= 5;
      if (!ratingsResult) {
        toast.error("Ratings should be less than or equal to 5");
      }
      setValidRatings(ratingsResult);
    }
    setFormVal({ ...formVal, [name]: value });
  };

  // store the updated product to localstorage
  const editProduct = (e) => {
    e.preventDefault();
    name = name.trim();
    let index = prodArr.findIndex((prod) => prod.id === id);
    prodArr[index] = formVal;
    localStorage.setItem("prodArr", JSON.stringify(prodArr));
    navigate("/");
    toast.success(`${name} is updated`);
  };

  return (
    <Layout>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3 mt-4">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Edit Product
                    </h2>

                    <form onSubmit={editProduct}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example1cg">
                          Product Name
                        </label>
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          name="name"
                          value={name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <div>
                          <img
                            src={image && require(`../assets/images/${image}`)}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </div>
                        <label className="form-label" htmlFor="form3Example2cg">
                          Product Image
                        </label>
                        <input
                          type="file"
                          id="form3Example2cg"
                          className="form-control form-control-lg"
                          name="image"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="desc"
                          value={desc}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3cg">
                          Price
                        </label>
                        <input
                          type="number"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          name="price"
                          value={price}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label
                          className="form-label"
                          htmlFor="form3Example4cdg"
                        >
                          Category
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="form3Example4cdg"
                          name="category"
                          onChange={handleChange}
                        >
                          <option defaultValue={category}>{category}</option>
                          <option value="book">Book</option>
                          <option value="mobile">Mobile</option>
                          <option value="shoe">Shoe</option>
                          <option value="laptop">Laptop</option>
                        </select>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example5cg">
                          Ratings
                        </label>
                        <input
                          type="number"
                          id="form3Example5cg"
                          className="form-control form-control-lg"
                          name="ratings"
                          onChange={handleChange}
                          value={ratings}
                        />
                      </div>

                      <input
                        type="submit"
                        className="btn btn-primary text-white btn-block btn-lg gradient-custom-4 form-control"
                        value="Edit Product"
                        disabled={
                          !name ||
                          !image ||
                          !desc ||
                          !price ||
                          !category ||
                          !ratings ||
                          !validImgUrl ||
                          !validRatings
                        }
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default EditProduct;
