import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/zona5.png";
import "../assets/css/header-footer.css";

const FooterApp = () => {
  return (
    <div className="footer-bg text-white pt-4">
      <div className="container">
        <div className="row align-items-center justify-content-between text-center text-md-start">
          <div className="col-md-3 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <div className="logo-container mb-2">
              <img src={logo} alt="ZONA5 Logo" className="footer-logo" />
            </div>
            <p className="fw-bold mb-3">Tu lugar en la cancha</p>
            <div className="social-icons d-flex gap-3">
              <Link to="/404">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to="/404">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link to="/404">
                <i className="bi bi-whatsapp"></i>
              </Link>
            </div>
          </div>

          <div className="footer-divider d-none d-md-block"></div>

          <div className="col-md-3 mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
            <h5 className="fw-bold mb-3">Navegación</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/reserva">Reservar</Link>
              </li>
              <li>
                <Link to="/tienda">Comprar</Link>
              </li>
              <li>
                <a href="#">Nosotros</a>
              </li>
            </ul>
          </div>

          <div className="footer-divider d-none d-md-block"></div>

          <div className="col-md-3 d-flex flex-column align-items-center align-items-md-start">
            <h5 className="fw-bold mb-3">Contacto</h5>
            <address className="footer-contact">
              <p className="mb-1">Av. Copa del Mundo 3</p>
              <p className="mb-1">3815898989</p>
              <p className="mb-1">zona5@gmail.com</p>
              <p className="mb-1">Todos los días</p>
              <p className="mb-0">Cerrado de 1 a 11hs</p>
            </address>
          </div>
        </div>

        <hr className="mt-5 mb-4 border-secondary" />
        <div className="text-center pb-2">
          <p className="mb-0 fw-bold">
            &copy; 2026 ZONA5 <span className="mx-2">|</span> Todos los derechos
            reservados
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterApp;
