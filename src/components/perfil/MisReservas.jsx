import React, { useEffect, useState } from "react";
import { apiReserva } from "../../helpers/reserva";
import ConfirmModal from "../modales/ConfirmModal";

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  const cargarReservas = async () => {
    try {
      const data = await apiReserva.getMisReservas();
      if (data.ok) {
        setReservas(data.reservas);
      }
    } catch (error) {
      console.error("Error al cargar reservas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const prepararCancelacion = (reserva) => {
    setReservaSeleccionada(reserva);
    setShowModal(true);
  };

  const ejecutarCancelacion = async () => {
    if (!reservaSeleccionada) return;

    try {
      const res = await apiReserva.delete(reservaSeleccionada._id);
      if (res.ok) {
        setReservas(reservas.filter((r) => r._id !== reservaSeleccionada._id));
        setShowModal(false);
      } else {
        alert("No se pudo cancelar la reserva en el servidor.");
      }
    } catch (error) {
      console.error("Error en la petición de borrado:", error);
      alert("Error de conexión al intentar cancelar.");
    }
  };

  if (cargando) {
    return (
      <div className="text-center p-5 neon-text">Cargando tus turnos...</div>
    );
  }

  return (
    <div className="p-2">
      <h4 className="text-white border-bottom border-secondary pb-2 mb-4">
        Historial de Turnos
      </h4>

      {reservas.length === 0 ? (
        <div className="alert alert-dark border-secondary text-secondary-custom">
          No tienes reservas activas en este momento.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover border-secondary align-middle">
            <thead className="text-success text-center">
              <tr>
                <th>Cancha</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Duración</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {reservas.map((r) => {
                const fecha = new Date(r.fecha);
                return (
                  <tr key={r._id} className="itemRow-adminScreen">
                    <td className="fw-bold">{r.cancha?.nombre}</td>
                    <td>{fecha.toLocaleDateString()}</td>
                    <td>
                      {fecha.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      hs
                    </td>
                    <td>{r.horas} hr(s)</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger rounded-pill px-3"
                        onClick={() => prepararCancelacion(r)}
                      >
                        <i className="bi bi-trash me-1"></i> Cancelar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        show={showModal}
        close={() => setShowModal(false)}
        onConfirm={ejecutarCancelacion}
        message={`¿Estás seguro que deseas cancelar tu turno en ${reservaSeleccionada?.cancha?.nombre}?`}
      />
    </div>
  );
};

export default MisReservas;
