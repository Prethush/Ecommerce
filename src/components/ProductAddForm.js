import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

let initialState = {
  name: "",
  image: "",
  desc: "",
  price: "",
  category: "",
  ratings: "",
};

// regex to validate an image url
const IMG_REGEX = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;

function ProductAddForm() {
  const unique_id = uuid();
  const navigate = useNavigate();

  // form fields
  const [formVal, setFormVal] = useState(initialState);

  // state variables
  const [prodArr, setProdArr] = useState([]);
  const [validImgUrl, setValidImgUrl] = useState(false);
  const [validRatings, setValidRatings] = useState(false);

  let { name, image, desc, price, category, ratings } = formVal;

  useEffect(() => {
    //checking if a productArr exist in localstorage
    const products = JSON.parse(localStorage.getItem("prodArr")) || [];
    setProdArr(products);
  }, []);

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

  // add product to the local storage
  const addProduct = (e) => {
    e.preventDefault();
    name = name.trim();
    const small_id = unique_id.slice(0, 8);
    let newFormVal = { ...formVal };
    newFormVal.id = small_id;
    prodArr.push(newFormVal);
    localStorage.setItem("prodArr", JSON.stringify(prodArr));
    setFormVal(initialState);
    navigate("/");
    toast.success(`${name} is added`);
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Add Product
                  </h2>

                  <form onSubmit={addProduct}>
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
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Category
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="form3Example4cdg"
                        name="category"
                        onChange={handleChange}
                      >
                        <option defaultValue="">Select Category</option>
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
                      value="Add Product"
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
  );
}

export default ProductAddForm;
