import { useState, useEffect } from "react";
import { apiReserva } from "../../helpers/reserva";
import ConfirmModal from "../modales/ConfirmModal";

function ReservaAdmin() {
  const [reservas, setReservas] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

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
    }
  };

  return (
    <>
      <h1 className="display-4 text-center neon-text mb-5 fw-bold">
        Gestión de Reservas
      </h1>

      <div className="row fw-bold border-bottom pb-2 mb-2 neon-text px-3 text-center d-none d-md-flex header-grid">
        <div className="col-md-2">Usuario</div>
        <div className="col-md-3">Cancha</div>
        <div className="col-md-2">Seña</div>
        <div className="col-md-3">Fecha/Hora</div>
        <div className="col-md-2">Acciones</div>
      </div>

      {reservas.map((res) => (
        <div
          key={res._id}
          className="row itemRow-adminScreen py-3 align-items-center mx-0 px-2 text-center text-md-start"
        >
          <div className="col-12 col-md-2 mb-3 mb-md-0 text-center fw-bold">
            {res.usuario?.username || "N/A"}
          </div>
          <div className="col-12 col-md-3 mb-2 mb-md-0 text-center">
            {res.cancha?.nombre || "Eliminada"}
          </div>
          <div className="col-6 col-md-2 mb-3 mb-md-0 text-md-center neon-text fw-bold">
            ${res.senia}
          </div>
          <div className="col-6 col-md-3 mb-3 mb-md-0 text-md-center small opacity-75">
            {new Date(res.fecha).toLocaleString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="col-12 col-md-2 mt-2 mt-md-0 text-center text-md-end">
            <button
              className="btn btn-outline-danger py-2 py-md-1 d-flex w-100 w-md-auto justify-content-center"
              onClick={() => setDeleteModal({ show: true, id: res._id })}
            >
              <i className="bi bi-trash3 me-2 me-md-0"></i>
              <span className="d-inline">Borrar</span>
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
