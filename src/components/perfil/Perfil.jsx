import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MisReservas from "../perfil/MisReservas";
import MisDatos from "../perfil/MisDatos";
import "../../assets/css/admin.css";

const Perfil = () => {
  const { seccion } = useParams();
  const navigate = useNavigate();

  const views = {
    reservas: <MisReservas />,
    datos: <MisDatos />,
  };

  return (
    <section className="background-adminScreen p-4">
      <div className="container containerTable-adminScreen p-4 shadow-lg">
        <h2 className="neon-text text-center mb-4">MI CUENTA</h2>

        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
          <button
            onClick={() => navigate("/perfil/reservas")}
            className={`btn ${seccion === "reservas" ? "btn-neon" : "btn-outline-light"} px-4 rounded-pill`}
          >
            <i className="bi bi-calendar-check me-2"></i> Mis Reservas
          </button>
          <button
            onClick={() => navigate("/perfil/datos")}
            className={`btn ${seccion === "datos" ? "btn-neon" : "btn-outline-light"} px-4 rounded-pill`}
          >
            <i className="bi bi-person-gear me-2"></i> Mis Datos
          </button>
        </div>

        <div className="fade-in">
          {views[seccion] || (
            <div className="text-center p-5 text-secondary">
              <h3>Selecciona una opción para gestionar tu cuenta</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Perfil;
