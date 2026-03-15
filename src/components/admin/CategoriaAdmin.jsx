import { useState, useEffect } from "react";
import * as api from "../../helpers/categoria";
import CategoriaAdminModal from "../modales/CategoriaAdminModal";
import ConfirmModal from "../modales/ConfirmModal";

function CategoriaAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [modalForm, setModalForm] = useState({ show: false, data: null });
  const [modalDelete, setModalDelete] = useState({
    show: false,
    id: null,
    nombre: "",
  });

  const cargarCategorias = async () => {
    const res = await api.traerCategoriasPaginado(5, pagina);
    if (res.ok) {
      setCategorias(res.categorias);
      setTotal(res.total);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, [pagina]);

  const handleSave = async (formValues) => {
    const isEdit = !!modalForm.data;
    const res = isEdit
      ? await api.actualizarCategoria({ ...modalForm.data, ...formValues })
      : await api.crearCategoria(formValues);

    if (res.ok) {
      cargarCategorias();
      setModalForm({ show: false, data: null });
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async () => {
    const res = await api.eliminarCategoria(modalDelete.id);
    if (res.ok) {
      cargarCategorias();
      setModalDelete({ show: false, id: null });
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

      <div className="row fw-bold border-bottom pb-2 mb-2 neon-text">
        <div className="col-6">Nombre</div>
        <div className="col-6 text-center">Acciones</div>
      </div>

      {categorias.map((cat) => (
        <div
          key={cat._id}
          className="row itemRow-adminScreen py-3 align-items-center"
        >
          <div className="col-6 text-uppercase">{cat.nombre}</div>
          <div className="col-6 text-center d-flex justify-content-center">
            <button
              className="btn btn-sm btn-outline-info me-2"
              onClick={() => setModalForm({ show: true, data: cat })}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="btn btn-sm btn-delete-zona5"
              onClick={() =>
                setModalDelete({
                  show: true,
                  id: cat._id,
                  nombre: cat.nombre,
                })
              }
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-neon btn-sm"
          onClick={() => setPagina((p) => Math.max(0, p - 5))}
          disabled={pagina === 0}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <span className="align-self-center">Página {pagina / 5 + 1}</span>
        <button
          className="btn btn-neon btn-sm"
          onClick={() => setPagina((p) => p + 5)}
          disabled={pagina + 5 >= total}
        >
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
      <CategoriaAdminModal
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
