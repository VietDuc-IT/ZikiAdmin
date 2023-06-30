import React, { useEffect, useState, useContext } from "react";
import firebaseDb from "../firebase";
import { Link } from "react-router-dom";

const User = () => {
  const [data, setData] = useState({});

  console.log("data", data);
  const urlProduct = "User";

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
      firebaseDb.child(`User/${id}`).remove((err) => {
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
              <h1 class="display-2">Quản lý khách hàng</h1>
            </div>
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((id, index) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td>{data[id].name}</td>
                      <td>{data[id].email}</td>
                      <td>
                        <a
                          className="btn text-danger"
                          onClick={() => onDelete(id)}
                        >
                          <i className="fas fa-trash-alt" />
                        </a>
                        <Link to={`/viewUser/${id}`}>
                          <a className="btn text-info">
                            <i className="fas fa-eye" />
                            Xem
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

export default User;

