import React from "react";

function ProductAddForm() {
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

                  <form>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        name="name"
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
                      >
                        <option defaultValue="addd">Select Category</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
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
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary text-white btn-block btn-lg gradient-custom-4 form-control"
                      >
                        Add Product
                      </button>
                    </div>
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
