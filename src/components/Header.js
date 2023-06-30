import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="container-fluid">
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "rgb(120, 120, 120)" }}
      >
        <NavLink to="/" className="btn" style={{ color: "white" }}>
          Sản phẩm
        </NavLink>

        <NavLink to="/Category" className="btn" style={{ color: "white" }}>
          Loại món ăn
        </NavLink>

        <NavLink to="/User" className="btn" style={{ color: "white" }}>
          Khách hàng
        </NavLink>

      </nav>
    </div>
  );
};

export default Header;
//<NavLink to="/about" className="btn" style={{ color: "white" }}>About</NavLink>
//<NavLink to="/add" className="btn" style={{ color: "white" }}>Thêm</NavLink>