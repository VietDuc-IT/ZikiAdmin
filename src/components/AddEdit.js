import React, { useState, useEffect } from "react";
import firebaseDb from "../firebase";
import { useParams, useHistory } from "react-router-dom";
import { isEmpty } from "lodash";

const AddEdit = () => {
  const values = {
    name: "",
    price: "",
    img: "",
    type: "",
  };
  const [initialState, setState] = useState(values);
  const [data, setData] = useState({});

  //   console.log("currentId", currentId);
  const urlProduct = "/foodApp/product";

  const { name, price, img, type } = initialState;

  const currentId = useParams();
  const history = useHistory();

  const { id } = currentId;

  console.log("currentId", currentId);

  useEffect(() => {
    firebaseDb.child(urlProduct).on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        setData({});
      }
    });
  }, [id]);

  useEffect(() => {
    if (isEmpty(id)) {
      console.log("initialState", initialState);
      setState({ ...values });
    } else {
      setState({ ...data[id] });
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...initialState,
      [name]: value,
    });
  };

  const handleSubmit = (e, obj) => {
    e.preventDefault();
    console.log("initialState", initialState);
    if (isEmpty(id)) {
      firebaseDb.child(urlProduct).push(initialState, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      //`contacts/${id}`
      firebaseDb.child(`/foodApp/product/${id}`).set(initialState, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    history.push("/");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="bmd-label-floating">Tên</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="bmd-label-floating">Giá</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="bmd-label-floating">Ảnh</label>
              <input
                type="text"
                className="form-control"
                name="img"
                value={img}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="bmd-label-floating">Loại</label>
              <input
                type="text"
                className="form-control"
                name="type"
                value={type}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-default">Cancel</button>
            <button type="submit" className="btn btn-success btn-raised">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEdit;
