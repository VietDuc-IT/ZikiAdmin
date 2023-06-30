import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import firebaseDb from "../firebase";

const ViewCate = () => {
  const currentId = useParams();
  const [data, setData] = useState({});
  const { id } = currentId;

  const urlProduct = "/foodApp/category";

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
  return (
    <div className="container mt-5">
      {Object.keys(data).map((userId) => {
        if (userId === id) {
          return (
            <div class="card">
              <div class="card-header lead">Chi tiết</div>
              <div class="card-body">
                <p class="card-text">Tên: {data[id].name}</p>
                <p class="card-text">Ảnh: {data[id].img}</p>
                <p class="card-text">Loại: {data[id].type}</p>
                <Link to="/category">
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

export default ViewCate;
