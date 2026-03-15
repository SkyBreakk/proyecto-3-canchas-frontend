import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../assets/img/zona5-solo.png";
import "../assets/css/header-footer.css";
import { useCart } from "../context/CartContext";
import CartModal from "./modales/CartModal";

const HeaderApp = () => {
  const { user, authLoading, clearUserData } = useContext(UserContext);
  const { cart, cartLoading, totalItems } = useCart();

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-lg">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="ZONA 5" className="logo-header" />
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4 text-center">
            <li className="nav-item">
              <NavLink className="nav-link text-white fs-5" to="/reserva">
                Reservar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white fs-5" to="/tienda">
                Comprar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white fs-5"
                to="/nosotros" // Agregué el path aquí para que sea un link real
              >
                Nosotros
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center justify-content-center flex-column flex-lg-row gap-3 pb-3 pb-lg-0">
            {!authLoading && !cartLoading && (
              <>
                {user ? (
                  <div className="d-flex align-items-center gap-3">
                    {user.role === "admin" && (
                      <NavLink
                        to="/admin"
                        className="btn btn-outline-warning btn-sm me-2"
                      >
                        <i className="bi bi-shield-lock me-1"></i> Panel Admin
                      </NavLink>
                    )}

                    <NavLink
                      className="text-white position-relative"
                      data-bs-toggle="modal"
                      data-bs-target="#modalCarrito"
                    >
                      <i className="bi bi-cart3 fs-4 cart-icon"></i>
                      {totalItems > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {totalItems}
                        </span>
                      )}
                    </NavLink>

                    <span className="text-white fw-bold ms-2">
                      Hola, <span className="user-neon">{user.username}</span>
                    </span>

                    <button
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={clearUserData}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                    </button>
                    <CartModal />
                  </div>
                ) : (
                  <>
                    <button className="btn btn-auth w-100 text-nowrap">
                      <NavLink
                        to="/login"
                        className="text-white text-decoration-none"
                      >
                        Iniciar Sesión
                      </NavLink>
                    </button>
                    <button className="btn btn-auth w-100">
                      <NavLink
                        to="/register"
                        className="text-white text-decoration-none"
                      >
                        Registrarse
                      </NavLink>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderApp;
