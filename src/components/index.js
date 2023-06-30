import React, { useEffect, useState, useContext } from "react";
import firebaseDb from "../firebase";
import { Link } from "react-router-dom";

const ListRecord = () => {
  const [data, setData] = useState({});

  console.log("data", data);
  const urlProduct = "/foodApp/product";

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

  const onDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không ?")) {
      firebaseDb.child(`/foodApp/product/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-12">
            <div class="jumbotron">
              <h1 class="display-2">Quản lý sản phẩm</h1>
            </div>
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Url ảnh</th>
                  <th scope="col">Loại</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((id, index) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td>{data[id].name}</td>
                      <td>{data[id].price}</td>
                      <td>{data[id].img.substring(0,20)}</td>
                      <td>{data[id].type}</td>
                      <td>
                        <Link to={`/update/${id}`}>
                          <a className="btn text-primary">
                            <i className="fas fa-pencil-alt" />
                          </a>
                        </Link>

                        <a
                          className="btn text-danger"
                          onClick={() => onDelete(id)}
                        >
                          <i className="fas fa-trash-alt" />
                        </a>
                        <Link to={`/view/${id}`}>
                          <a className="btn text-info">
                            <i className="fas fa-eye" />
                          </a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListRecord;

