import React, { useEffect, useState } from "react";
import { apiCancha } from "../helpers/cancha";
import ReservaModal from "../components/modales/ReservaModal";
import "../assets/css/reserva.css";
const ReservaScreen = () => {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);

  useEffect(() => {
    apiCancha
      .get(100, 0)
      .then((data) => {
        setCanchas(
          data.canchas.sort((a, b) => a.nombre.localeCompare(b.nombre)),
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <div className="loading-placeholder"></div>
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner-container">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Cargando productos...</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <h2 className="text-white fs-1 text-center mb-4">Reservar Cancha</h2>
        </div>
        <div className="row mb-5">
          <h3 className="text-center subtext col">
            Tu próxima jugada empieza acá. Reserva tu cancha ahora.
          </h3>
        </div>
        <div className="row row-gap-3">
          {canchas.length > 0 ? (
            canchas.map((cancha) => (
              <div
                key={cancha._id}
                className="col-md-6 col-lg-4 mb-4"
                onClick={() => setCanchaSeleccionada(cancha)}
                data-bs-toggle="modal"
                data-bs-target="#modalCancha"
              >
                <div className="cancha-card shadow">
                  <div className="cancha-img-container">
                    <img
                      src={cancha.img}
                      alt={cancha.nombre}
                      className="cancha-img"
                    />
                  </div>
                  <div className="cancha-info">
                    <h5 className="cancha-title">{cancha.nombre}</h5>
                    <span className="cancha-desc">{cancha.descripcion}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">
              No hay canchas disponibles en este momento.
            </p>
          )}
        </div>
        <ReservaModal cancha={canchaSeleccionada} />
      </div>
    </div>
  );
};

export default ReservaScreen;
