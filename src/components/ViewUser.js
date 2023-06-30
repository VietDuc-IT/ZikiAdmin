import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import firebaseDb from "../firebase";

const ViewUser = () => {
  const currentId = useParams();
  const [data, setData] = useState({});
  const { id } = currentId;

  const urlProfile = "Profile";
  const urlUser = "User";

  console.log("currentId", currentId);

  useEffect(() => {
    firebaseDb.child(urlUser).on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        setData({});
      }
    });
  }, [id]);
  return (
    <div className="container mt-5">
      {Object.keys(data).map((userId) => {
        if (userId === id) {
          return (
            <div class="card">
              <div class="card-header lead">Chi tiết</div>
              <div class="card-body">
                <p class="card-text">Tên: {data[id].name}</p>
                <p class="card-text">Email: {data[id].email}</p>
                <p class="card-text">Địa chỉ: {data[id].address}</p>
                <p class="card-text">Số điện thoại: {data[id].phone}</p>
                <Link to="/User">
                  <a className="btn btn-info">Trở lại</a>
                </Link>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ViewUser;
