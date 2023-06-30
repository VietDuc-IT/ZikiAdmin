import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

const Contacts = () => {
  const [data, setData] = useState({});
  const [currentId, setCurrentId] = useState("");

  const urlProduct = "/foodApp/product/";

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
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "") {
      firebaseDb.child(urlProduct).push(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    } else {
      firebaseDb.child(`/foodApp/product/${currentId}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  const onDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ?")) {
      firebaseDb.child(`/foodApp/product/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForm
            addOrEdit={addOrEdit}
            data={data}
            currentId={currentId}
          />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thread-light">
              <tr>
                <th>Tên</th>
                <th>Giá</th>
                <th>Url ảnh</th>
                <th>Loại</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id) => {
                return (
                  <tr key={id}>
                    <td>{data[id].name}</td>
                    <td>{data[id].price}</td>
                    <td>{data[id].img}</td>
                    <td>{data[id].type}</td>
                    <td>
                      <a
                        className="btn text-primary"
                        onClick={() => setCurrentId(id)}
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                      <a
                        className="btn text-danger"
                        onClick={() => onDelete(id)}
                      >
                        <i className="fas fa-trash-alt" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
