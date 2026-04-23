import { useState, useEffect } from "react";
import { apiCancha } from "../../helpers/cancha";
import CanchaAdminModal from "../modales/CanchaAdminModal";
import ConfirmModal from "../modales/ConfirmModal";
import { useToast } from "../../context/ToastContext";

function CanchaAdmin() {
  const [canchas, setCanchas] = useState([]);
  const [total, setTotal] = useState(0);
  const [paginado, setPaginado] = useState(0);
  const [modalState, setModalState] = useState({ type: null, data: null });
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const cargarCanchas = () => {
    setLoading(true);
    apiCancha
      .get(5, paginado)
      .then((data) => {
        setCanchas(data.canchas || []);
        setTotal(data.total || 0);
      })
      .catch((error) => {
        console.error(error);
        showToast("Error de conexión", "danger");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(cargarCanchas, [paginado]);

  const handleSave = async (formData) => {
    const response = modalState.data
      ? await apiCancha.update({ ...modalState.data, ...formData })
      : await apiCancha.create(formData);

    if (response.ok) {
      cargarCanchas();
      setModalState({ type: null, data: null });
      showToast("La cancha se guardó correctamente.", "success");
    } else {
      showToast(response.message || "Se produjo un error.", "danger");
    }
  };

  const handleConfirmDelete = async () => {
    const response = await apiCancha.delete(modalState.data?._id);
    if (response.ok) {
      cargarCanchas();
      setModalState({ type: null, data: null });
      showToast("La cancha se eliminó correctamente.", "success");
    } else {
      showToast(response.message || "Se produjo un error.", "danger");
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

      <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <button
          className="btn btn-sm btn-neon"
          onClick={() => setPaginado((pagina) => Math.max(0, pagina - 5))}
          disabled={paginado === 0}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <span className="text-secondary align-self-center small">
          Mostrando {paginado + 1} - {paginado + canchas.length} de {total}
        </span>
        <button
          className="btn btn-sm btn-neon"
          onClick={() => setPaginado((pagina) => pagina + 5)}
          disabled={paginado + 5 >= total}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="row fw-bold border-bottom pb-2 mb-2 neon-text px-3">
        <div className="col-4 d-none d-sm-block col-md-2">Imagen</div>
        <div className="col-5">Nombre</div>
        <div className="col-2 d-none d-md-block text-center">Precio</div>
        <div className="col text-center">Acciones</div>
      </div>

      {loading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="spinner-border mb-3 admin-loader" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h3 className="neon-text opacity-75">Cargando canchas...</h3>
        </div>
      ) : (
        <>
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
              <div className="col-5 fw-bold text-uppercase text-truncate">
                {cancha.nombre}
              </div>
              <div className="col-2 d-none d-md-block text-center text-truncate text-neon fw-bold">
                ${cancha.precio.toLocaleString("es-AR")}
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
                  onClick={() =>
                    setModalState({ type: "delete", data: cancha })
                  }
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      <CanchaAdminModal
        key={modalState.data?._id || "new"}
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
