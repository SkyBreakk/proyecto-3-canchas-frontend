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
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
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
