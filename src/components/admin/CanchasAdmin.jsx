import { useState, useEffect } from "react";
import { apiCancha } from "../../helpers/cancha";
import CanchaAdminModal from "../modales/CanchaAdminModal";
import ConfirmModal from "../modales/ConfirmModal";

function CanchaAdmin() {
  const [canchas, setCanchas] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [modalState, setModalState] = useState({ type: null, data: null });

  const cargarCanchas = () => {
    apiCancha.get(5, pagina).then((data) => {
      setCanchas(data.canchas || []);
      setTotal(data.total || 0);
    });
  };

  useEffect(cargarCanchas, [pagina]);

  const handleSave = async (formData) => {
    const res = modalState.data
      ? await apiCancha.update({ ...modalState.data, ...formData })
      : await apiCancha.create(formData);

    if (res.ok) {
      cargarCanchas();
      setModalState({ type: null, data: null });
    }
  };

  const handleConfirmDelete = async () => {
    const res = await apiCancha.delete(modalState.data?._id);
    if (res.ok) {
      cargarCanchas();
      setModalState({ type: null, data: null });
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1 className="display-4 neon-text fw-bold mb-0 text-center text-md-start">
          Gestión Canchas
        </h1>
        <button
          className="btn btn-neon px-4"
          onClick={() => setModalState({ type: "form", data: null })}
        >
          <i className="bi bi-plus-lg me-2"></i>Nueva Cancha
        </button>
      </div>

      <div className="row fw-bold border-bottom pb-2 mb-2 neon-text px-3">
        <div className="col-4 d-none d-sm-block col-md-2">Imagen</div>
        <div className="col-5">Nombre</div>
        <div className="col-2 d-none d-md-block text-center">Precio</div>
        <div className="col text-center">Acciones</div>
      </div>

      {canchas.map((cancha) => (
        <div
          key={cancha._id}
          className="row itemRow-adminScreen py-2 align-items-center mx-0 px-2"
        >
          <div className="col-4 d-none d-sm-block col-md-2">
            <img
              src={
                cancha.img ||
                "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691835.png"
              }
              alt={cancha.nombre}
              className="rounded"
              style={{ width: "60px", height: "40px", objectFit: "cover" }}
            />
          </div>
          <div className="col-5 fw-bold text-uppercase">{cancha.nombre}</div>
          <div className="col-2 d-none d-md-block text-center text-neon fw-bold">
            ${cancha.precio}
          </div>
          <div className="col text-center">
            <button
              className="btn btn-sm btn-outline-info me-2 border-0"
              onClick={() => setModalState({ type: "form", data: cancha })}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="btn btn-sm btn-delete-zona5 rounded"
              onClick={() => setModalState({ type: "delete", data: cancha })}
            >
              <i className="bi bi-trash3"></i>
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
          Mostrando {pagina + 1} - {pagina + canchas.length} de {total}
        </span>
        <button
          className="btn btn-sm btn-neon"
          onClick={() => setPagina((p) => p + 5)}
          disabled={pagina + 5 >= total}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <CanchaAdminModal
        isOpen={modalState.type === "form"}
        onClose={() => setModalState({ type: null, data: null })}
        onSubmit={handleSave}
        cancha={modalState.data}
      />
      <ConfirmModal
        show={modalState.type === "delete"}
        close={() => setModalState({ type: null, data: null })}
        onConfirm={handleConfirmDelete}
        message={`¿Deseas eliminar la cancha "${modalState.data?.nombre}"?`}
      />
    </>
  );
}

export default CanchaAdmin;
