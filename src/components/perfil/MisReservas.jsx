import React, { useEffect, useState } from "react";
import { apiReserva } from "../../helpers/reserva";
import ConfirmModal from "../modales/ConfirmModal";
import { pagarMercadoPago } from "../../helpers/payment";
import { useToast } from "../../context/ToastContext";

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  const [pagandoId, setPagandoId] = useState(null);
  const { showToast } = useToast();

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
        showToast("La reserva se canceló correctamente.", "success");
      } else {
        showToast("No se pudo cancelar la reserva.", "danger");
      }
    } catch (error) {
      console.error("Error en el borrado:", error);
      showToast("Error de conexión.", "warning");
    }
  };

  const handlePagar = async (reserva) => {
    setPagandoId(reserva._id);

    try {
      const totalPagar = (reserva.cancha?.precio || 0) * reserva.horas;

      if (totalPagar === 0) {
        showToast(
          "Error: No se pudo calcular el precio de la cancha.",
          "danger",
        );
        setPagandoId(null);
        return;
      }

      const datosPago = {
        titulo: `Reserva Completa - ${reserva.cancha?.nombre} (${reserva.horas} hs)`,
        cantidad: 1,
        precio: totalPagar,
        reservaId: reserva._id,
      };

      const res = await pagarMercadoPago(datosPago);

      if (res.ok && res.id) {
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${res.id}`;
      } else {
        showToast("No se pudo generar link de pago.", "danger");
        setPagandoId(null);
      }
    } catch (error) {
      console.error(error);
      showToast("Error al intentar conectar con Mercado Pago.", "warning");
      setPagandoId(null);
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
        <div className="alert alert-dark border-secondary text-black">
          No tienes reservas activas en este momento.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover border-secondary align-middle">
            <thead className="text-success text-center">
              <tr>
                <th>Cancha</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {reservas.map((r) => {
                const fecha = new Date(r.fecha);
                return (
                  <tr key={r._id} className="itemRow-adminScreen">
                    <td className="fw-bold">{r.cancha?.nombre}</td>
                    <td>
                      {fecha.toLocaleDateString()} -{" "}
                      {fecha.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      hs
                    </td>

                    <td>
                      {r.estadoPago === "Pagado" ? (
                        <span className="badge bg-success">Pagado</span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Pendiente
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                        {r.estadoPago === "Pendiente" && (
                          <button
                            className="btn btn-sm btn-info text-white rounded-pill px-3 fw-bold"
                            style={{
                              backgroundColor: "#009ee3",
                              borderColor: "#009ee3",
                            }}
                            onClick={() => handlePagar(r)}
                            disabled={pagandoId === r._id}
                          >
                            {pagandoId === r._id ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                              <>
                                <i className="bi bi-credit-card me-1"></i> Pagar
                              </>
                            )}
                          </button>
                        )}

                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill px-3"
                          onClick={() => prepararCancelacion(r)}
                        >
                          <i className="bi bi-trash me-1"></i> Cancelar
                        </button>
                      </div>
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
