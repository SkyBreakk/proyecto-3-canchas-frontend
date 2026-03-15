import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartBtnApp = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Link
      to="/cart"
      className="btn btn-success position-relative rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm"
      style={{ width: "45px", height: "45px" }}
    >
      <i className="bi bi-cart3 fs-5"></i>

      {total > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {total}
        </span>
      )}
    </Link>
  );
};

export default CartBtnApp;
