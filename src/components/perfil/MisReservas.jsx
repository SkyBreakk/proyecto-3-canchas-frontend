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
      const response = await apiReserva.delete(reservaSeleccionada._id);
      if (response.ok) {
        setReservas(
          reservas.filter((reserva) => reserva._id !== reservaSeleccionada._id),
        );
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
      const response = await pagarMercadoPago({
        tipo: "reserva",
        id: reserva._id,
      });
      if (response.ok && response.id) {
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${response.id}`;
      } else {
        showToast("No se pudo generar link de pago.", "danger");
        setPagandoId(null);
      }
    } catch (error) {
      console.error(error);
      showToast("Error al conectar con Mercado Pago.", "warning");
      setPagandoId(null);
    }
  };

  if (cargando) {
    return (
      <div className="text-center p-5 neon-text">Cargando tus turnos...</div>
    );
  }

  return (
    <div className="container-fluid px-0">
      <h4 className="text-white border-bottom border-secondary pb-2 mb-4 neon-text">
        Historial de Turnos
      </h4>

      {reservas.length === 0 ? (
        <div className="alert alert-dark border-secondary text-white bg-transparent">
          No tienes reservas activas en este momento.
        </div>
      ) : (
        <div className="containerTable-adminScreen p-3">
          <div className="row fw-bold border-bottom pb-2 mb-2 neon-text px-3 text-center d-none d-lg-flex header-grid">
            <div className="col-lg-3">Cancha</div>
            <div className="col-lg-3">Fecha y Hora</div>
            <div className="col-lg-2">Estado</div>
            <div className="col-lg-4">Acciones</div>
          </div>

          {reservas.map((reserva) => (
            <div
              key={reserva._id}
              className="row itemRow-adminScreen py-3 align-items-center mx-0 px-2 text-center text-lg-start border-bottom border-secondary border-opacity-25"
            >
              <div className="col-12 col-lg-3 mb-2 mb-lg-0 text-center fw-bold">
                <span className="d-lg-none text-secondary d-block small">
                  Cancha
                </span>
                {reserva.cancha?.nombre}
              </div>

              <div className="col-12 col-lg-3 mb-2 mb-lg-0 text-center opacity-75">
                <span className="d-lg-none text-secondary d-block small">
                  Fecha
                </span>
                {new Date(reserva.fecha).toLocaleString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                <br />
                <span className="badge bg-dark border border-secondary mt-1 text-secondary">
                  {reserva.horas} hrs
                </span>
              </div>

              <div className="col-12 col-lg-2 mb-3 mb-lg-0 text-center">
                <span className="d-lg-none text-secondary d-block small mb-1">
                  Estado
                </span>
                {reserva.estadoPago === "Pagado" ? (
                  <span className="badge bg-success w-75 py-2">
                    <i className="bi bi-check-circle-fill me-1"></i> Pagado
                  </span>
                ) : (
                  <span className="badge bg-warning text-dark w-75 py-2">
                    <i className="bi bi-clock-history me-1"></i> Pendiente
                  </span>
                )}
              </div>

              <div className="col-12 col-lg-4 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2">
                {reserva.estadoPago === "Pendiente" && (
                  <button
                    className="btn btn-sm btn-info text-white rounded-pill px-4 fw-bold w-100"
                    style={{ backgroundColor: "#009ee3", border: "none" }}
                    onClick={() => handlePagar(reserva)}
                    disabled={pagandoId === reserva._id}
                  >
                    {pagandoId === reserva._id ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <>
                        <i className="bi bi-credit-card me-1"></i> Pagar
                      </>
                    )}
                  </button>
                )}

                <button
                  className="btn btn-sm btn-outline-danger rounded-pill px-4 w-100"
                  onClick={() => prepararCancelacion(reserva)}
                >
                  <i className="bi bi-trash me-1"></i> Cancelar
                </button>
              </div>
            </div>
          ))}
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
