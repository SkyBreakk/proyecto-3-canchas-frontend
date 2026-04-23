import { useState, useEffect } from "react";
import * as api from "../../helpers/categoria";
import CategoriaAdminModal from "../modales/CategoriaAdminModal";
import ConfirmModal from "../modales/ConfirmModal";
import { useToast } from "../../context/ToastContext";

function CategoriaAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [total, setTotal] = useState(0);
  const [paginado, setPaginadoagina] = useState(0);
  const [modalForm, setModalForm] = useState({ show: false, data: null });
  const [modalDelete, setModalDelete] = useState({
    show: false,
    id: null,
    nombre: "",
  });
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const cargarCategorias = async () => {
    setLoading(true);
    api
      .traerCategoriasPaginado(5, paginado)
      .then((data) => {
        setCategorias(data.categorias);
        setTotal(data.total);
      })
      .catch((error) => {
        console.error(error);
        showToast("Error de conexión", "danger");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarCategorias();
  }, [paginado]);

  const handleSave = async (formValues) => {
    const isEdit = !!modalForm.data;
    const payload = isEdit ? { ...modalForm.data, ...formValues } : formValues;
    const response = isEdit
      ? await api.actualizarCategoria(payload)
      : await api.crearCategoria(payload);

    if (response.ok) {
      cargarCategorias();
      setModalForm({ show: false, data: null });
      showToast("La categoría se guardó correctamente.", "success");
    } else {
      showToast(response.message || "Se produjo un error.", "danger");
    }
  };

  const handleDelete = async () => {
    const response = await api.eliminarCategoria(modalDelete.id);
    if (response.ok) {
      cargarCategorias();
      setModalDelete({ show: false, id: null });
      showToast("La categoría se borró correctamente.", "success");
    } else {
      showToast(response.message || "Se produjo un error.", "danger");
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1 className="display-4 neon-text fw-bold mb-0 text-center text-md-start">
          Gestión Categorías
        </h1>
        <button
          className="btn btn-neon"
          onClick={() => setModalForm({ show: true, data: null })}
        >
          + Agregar Categoría
        </button>
      </div>
      <div className="d-flex justify-content-center gap-3 my-4">
        <button
          className="btn btn-neon btn-sm"
          onClick={() => setPaginado((pagina) => Math.max(0, pagina - 5))}
          disabled={paginado === 0}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <span className="text-secondary align-self-center small">
          Mostrando {paginado + 1} - {paginado + categorias.length} de {total}
        </span>
        <button
          className="btn btn-neon btn-sm"
          onClick={() => setPaginado((pagina) => pagina + 5)}
          disabled={paginado + 5 >= total}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="row fw-bold border-bottom pb-2 mb-2 neon-text">
        <div className="col-6">Nombre</div>
        <div className="col-6 text-center">Acciones</div>
      </div>
      {loading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="spinner-border mb-3 admin-loader" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h3 className="neon-text opacity-75">Cargando categorias...</h3>
        </div>
      ) : (
        <>
          {categorias.map((categoria) => (
            <div
              key={categoria._id}
              className="row itemRow-adminScreen py-3 align-items-center"
            >
              <div className="col-6 text-uppercase text-truncate">
                {categoria.nombre}
              </div>
              <div className="col-6 text-center d-flex justify-content-center">
                <button
                  className="btn btn-sm btn-outline-info me-2"
                  onClick={() => setModalForm({ show: true, data: categoria })}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-sm btn-delete-zona5"
                  onClick={() =>
                    setModalDelete({
                      show: true,
                      id: categoria._id,
                      nombre: categoria.nombre,
                    })
                  }
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      <CategoriaAdminModal
        key={modalForm.data?._id || "new"}
        show={modalForm.show}
        categoria={modalForm.data}
        close={() => setModalForm({ show: false, data: null })}
        onSave={handleSave}
      />
      <ConfirmModal
        show={modalDelete.show}
        message={`¿Estás seguro de eliminar "${modalDelete.nombre}"?`}
        onConfirm={handleDelete}
        close={() => setModalDelete({ show: false, id: null })}
      />
    </>
  );
}

export default CategoriaAdmin;
