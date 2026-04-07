import React, { useContext, useEffect, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../assets/img/zona5-solo.png";
import "../assets/css/header-footer.css";
import { useCart } from "../context/CartContext";
import CartModal from "./modales/CartModal";

const HeaderApp = () => {
  const { user, authLoading, clearUserData } = useContext(UserContext);
  const { cartLoading, totalItems } = useCart();
  const location = useLocation();

  const isAuthPage = useMemo(() => {
    return (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/nosotros"
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".custom-navbar");
      if (!navbar) return;

      if (window.scrollY > 25 && !isAuthPage) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthPage]);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg custom-navbar ${isAuthPage ? "auth-page-mode" : ""}`}
      >
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
                <NavLink
                  className={({ isActive }) =>
                    `nav-link text-white fs-5 ${isActive ? "active" : ""}`
                  }
                  to="/"
                >
                  Inicio
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link text-white fs-5 ${isActive ? "active" : ""}`
                  }
                  to="/reserva"
                >
                  Reservar
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link text-white fs-5 ${isActive ? "active" : ""}`
                  }
                  to="/tienda"
                >
                  Comprar
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link text-white fs-5 ${isActive ? "active" : ""}`
                  }
                  to="/nosotros"
                >
                  Nosotros
                </NavLink>
              </li>
            </ul>

            <div className="d-flex align-items-center justify-content-center flex-column flex-lg-row gap-3 pb-3 pb-lg-0">
              {!authLoading && !cartLoading && (
                <>
                  {user ? (
                    <div className="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-center gap-2 gap-lg-3">
                      {(user.role === "admin" ||
                        user.role === "superadmin") && (
                        <NavLink to="/admin" className="btn-admin-neon">
                          <i className="bi bi-shield-lock"></i>
                        </NavLink>
                      )}

                      <NavLink
                        className="text-white position-relative"
                        data-bs-toggle="modal"
                        data-bs-target="#modalCarrito"
                        aria-label="Ver carrito"
                      >
                        <i className="bi bi-cart3 fs-4 cart-icon"></i>
                        {totalItems > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {totalItems}
                          </span>
                        )}
                      </NavLink>

                      <Link
                        to="/perfil/reservas"
                        className="btn btn-outline-light border-0 d-flex align-items-center gap-2 px-3 py-1 rounded-pill profile-btn-header"
                      >
                        <i className="bi bi-person-circle fs-5"></i>
                        <span className="fw-bold d-none d-sm-inline-flex align-items-center gap-1">
                          Hola,{" "}
                          <span className="user-neon">{user.username}</span>
                        </span>
                      </Link>

                      <button
                        className="btn-logout-neon"
                        onClick={clearUserData}
                        aria-label="Cerrar sesión"
                        title="Cerrar sesión"
                      >
                        <i className="bi bi-box-arrow-right"></i>
                      </button>
                    </div>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className={`btn btn-auth w-100 text-nowrap text-center ${isAuthPage ? "active-auth" : ""}`}
                      >
                        Iniciar Sesión
                      </NavLink>

                      <NavLink
                        to="/register"
                        className={`btn btn-auth w-100 text-nowrap text-center ${isAuthPage ? "active-auth" : ""}`}
                      >
                        Registrarse
                      </NavLink>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <CartModal />
    </>
  );
};

export default HeaderApp;
