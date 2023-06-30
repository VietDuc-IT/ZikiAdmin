import React, { useState, useEffect } from "react";

const ContactForm = ({ addOrEdit, currentId, data }) => {
  const values = {
    name: "",
    pirce: "",
    img: "",
    type: "",
  };
  const [initialState, setState] = useState(values);

  console.log("currentId", currentId);
  //const urlProduct = "Product";

  const { name, pirce, img, type } = initialState;

  useEffect(() => {
    if (currentId === "") {
      console.log("initialState", initialState);
      setState({ ...values });
    } else {
      setState({ ...data[currentId] });
    }
  }, [currentId, data]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...initialState,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addOrEdit(initialState);
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-user" />
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Tên sản phẩm"
            name="Tên: "
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group input-group col-md-6">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-mobile-alt" />
              </div>
            </div>
            <input
              className="form-control"
              placeholder="Giá"
              name="Giá"
              value={pirce}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-envelope" />
              </div>
            </div>
            <input
              className="form-control"
              placeholder="Ảnh"
              name="Ảnh"
              value={img}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Loại"
            name="Loại"
            value={type}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value={currentId === "" ? "Save" : "Update"}
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
