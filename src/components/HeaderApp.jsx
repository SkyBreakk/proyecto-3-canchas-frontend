import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/zona5-solo.png";
import "../assets/css/header-footer.css";

const HeaderApp = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-lg">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="ZONA 5" className="logo-img" />
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
              <NavLink className="nav-link text-white fs-5" href="#nosotros">
                Nosotros
              </NavLink>
            </li>
          </ul>

          <div className="d-flex flex-column flex-lg-row gap-2 pb-3 pb-lg-0">
            <button className="btn btn-auth w-100 text-nowrap">
              Iniciar Sesión
            </button>
            <button className="btn btn-auth w-100">Registrarse</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderApp;
