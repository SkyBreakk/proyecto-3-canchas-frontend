import React, { useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/img/zona5.png";
import "../assets/css/header-footer.css";

const FooterApp = () => {
  const location = useLocation();

  const isAuthPage = useMemo(() => {
    return (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/nosotros"
    );
  }, [location.pathname]);

  return (
    <footer
      className={`footer-bg text-white pt-4 ${isAuthPage ? "auth-page-mode" : ""}`}
    >
      <div className="container">
        <div className="row align-items-center justify-content-between text-center text-md-start">
          <div className="col-md-3 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <div className="logo-container mb-2">
              <img src={logo} alt="ZONA5 Logo" className="footer-logo" />
            </div>
            <p className="fw-bold mb-3 text-white-50">Tu lugar en la cancha</p>
            <div className="social-icons d-flex gap-3">
              <Link to="/404" aria-label="Facebook" title="Facebook">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to="/404" aria-label="Instagram" title="Instagram">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link to="/404" aria-label="WhatsApp" title="WhatsApp">
                <i className="bi bi-whatsapp"></i>
              </Link>
            </div>
          </div>

          <div className="footer-divider d-none d-md-block"></div>

          <div className="col-md-3 mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
            <h5 className="fw-bold mb-3 text-white">Navegación</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reserva"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Reservar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tienda"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Comprar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/nosotros"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Nosotros
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="footer-divider d-none d-md-block"></div>

          <div className="col-md-3 d-flex flex-column align-items-center align-items-md-start">
            <h5 className="fw-bold mb-3 text-white">Contacto</h5>
            <address className="footer-contact text-white-50">
              <p className="mb-1">
                <i className="bi bi-geo-alt"></i> Av. Copa del Mundo 3
              </p>
              <p className="mb-1">
                <i className="bi bi-telephone"></i> 3815898989
              </p>
              <p className="mb-1">
                <i className="bi bi-envelope"></i> zona5@gmail.com
              </p>
              <p className="mb-1">
                <i className="bi bi-clock"></i> Todos los días
              </p>
              <p className="mb-0">
                <i className="bi bi-x-circle"></i> Cerrado de 1 a 11hs
              </p>
            </address>
          </div>
        </div>

        <hr className="mt-5 mb-4 border-secondary opacity-25" />
        <div className="text-center pb-2">
          <p className="mb-0 fw-bold text-white-50">
            &copy; 2026 ZONA5 <span className="mx-2 opacity-50">|</span> Todos
            los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;
