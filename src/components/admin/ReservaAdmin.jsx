import { useState, useEffect } from "react";
import { apiReserva } from "../../helpers/reserva";
import ConfirmModal from "../modales/ConfirmModal";
import { useToast } from "../../context/ToastContext";

function ReservaAdmin() {
  const [reservas, setReservas] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const { showToast } = useToast();

  const cargarReservas = () => {
    apiReserva.get(5, pagina).then((data) => {
      setReservas(data.reservas || []);
      setTotal(data.total || 0);
    });
  };

  useEffect(cargarReservas, [pagina]);

  const borrarReserva = async () => {
    const res = await apiReserva.delete(deleteModal.id);
    if (res.ok) {
      setReservas(reservas.filter((r) => r._id !== deleteModal.id));
      setTotal((prev) => prev - 1);
      setDeleteModal({ show: false, id: null });
      showToast("La reserva se eliminó correctamente.", "success");
    } else {
      showToast("Se produjo un error.", "danger");
    }
  };

  const handlePago = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === "Pendiente" ? "Pagado" : "Pendiente";
    const nuevoMetodo = nuevoEstado === "Pagado" ? "Efectivo" : "A confirmar";

    try {
      const res = await apiReserva.updatePago(id, {
        estadoPago: nuevoEstado,
        metodoPago: nuevoMetodo,
      });

      if (res.ok) {
        setReservas(
          reservas.map((r) =>
            r._id === id
              ? { ...r, estadoPago: nuevoEstado, metodoPago: nuevoMetodo }
              : r,
          ),
        );
        showToast("La reserva se actualizó correctamente.", "success");
      } else {
        showToast("Error al actualizar el pago.", "danger");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  return (
    <>
      <h1 className="display-4 text-center neon-text mb-5 fw-bold">
        Gestión de Reservas
      </h1>

      <div className="row fw-bold border-bottom pb-2 mb-2 neon-text px-3 text-center d-none d-lg-flex header-grid">
        <div className="col-lg-2">Usuario</div>
        <div className="col-lg-2">Cancha</div>
        <div className="col-lg-1">Seña</div>
        <div className="col-lg-3">Fecha/Hora</div>
        <div className="col-lg-4 text-center">Estado y Acciones</div>
      </div>

      {reservas.map((res) => (
        <div
          key={res._id}
          className="row itemRow-adminScreen py-3 align-items-center mx-0 px-2 text-center text-lg-start border-bottom border-secondary border-opacity-25"
        >
          <div className="col-12 col-lg-2 mb-2 mb-lg-0 text-center fw-bold">
            {res.usuario?.username || "N/A"}
          </div>
          <div className="col-12 col-lg-2 mb-2 mb-lg-0 text-center">
            {res.cancha?.nombre || "Eliminada"}
          </div>
          <div className="col-6 col-lg-1 mb-2 mb-lg-0 text-lg-center neon-text fw-bold">
            ${res.senia}
          </div>
          <div className="col-6 col-lg-3 mb-2 mb-lg-0 text-lg-center small opacity-75">
            {new Date(res.fecha).toLocaleString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
            <br />
            <span className="badge bg-dark border border-secondary mt-1 text-secondary">
              {res.horas} hrs
            </span>
          </div>

          <div className="col-12 col-lg-4 mt-3 mt-lg-0 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2">
            <button
              onClick={() => handlePago(res._id, res.estadoPago)}
              className={`btn btn-sm w-100 ${
                res.estadoPago === "Pagado"
                  ? "btn-success"
                  : "btn-outline-warning"
              }`}
            >
              {res.estadoPago === "Pagado" ? (
                <>
                  <i className="bi bi-check-circle-fill me-1"></i> Pagado
                </>
              ) : (
                <>
                  <i className="bi bi-clock-history me-1"></i> Pendiente
                </>
              )}
            </button>

            <button
              className="btn btn-sm btn-outline-danger w-100"
              onClick={() => setDeleteModal({ show: true, id: res._id })}
            >
              <i className="bi bi-trash3 me-1"></i> Borrar
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button
          className="btn btn-sm btn-neon"
          onClick={() => setPagina((p) => Math.max(0, p - 5))}
          disabled={pagina === 0}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <span className="text-secondary small">
          Mostrando {pagina + 1} - {pagina + reservas.length} de {total}
        </span>
        <button
          className="btn btn-sm btn-neon"
          onClick={() => setPagina((p) => p + 5)}
          disabled={pagina + 5 >= total}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <ConfirmModal
        show={deleteModal.show}
        close={() => setDeleteModal({ show: false, id: null })}
        onConfirm={borrarReserva}
        message="¿Estás seguro de cancelar esta reserva?"
      />
    </>
  );
}

export default ReservaAdmin;
