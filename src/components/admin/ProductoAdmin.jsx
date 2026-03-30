import { useState, useEffect, useCallback } from "react";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} from "../../helpers/producto";
import { traerCategoriasPaginado } from "../../helpers/categoria";
import ProductoAdminModal from "../modales/ProductoAdminModal";
import ConfirmModal from "../modales/ConfirmModal";
import { useToast } from "../../context/ToastContext";

function ProductoAdmin() {
  const [productos, setProductos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [modalState, setModalState] = useState({
    form: false,
    delete: false,
    selected: null,
  });
  const { showToast } = useToast();

  const cargarProductos = useCallback(() => {
    obtenerProductos(5, pagina).then((data) => {
      if (data.ok) {
        setProductos(data.productos);
        setTotal(data.total);
      }
    });
  }, [pagina]);

  useEffect(() => {
    traerCategoriasPaginado(100, 0).then((res) => {
      setListaCategorias(res.categorias);
    });
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const handleAction = async (data) => {
    const res = data._id
      ? await actualizarProducto(data)
      : await crearProducto(data);
    if (res.ok) {
      cargarProductos();
      setModalState({ ...modalState, form: false, selected: null });
      showToast("El producto se guardó correctamente.", "success");
    } else {
      showToast("Se produjo un error.", "danger");
    }
  };

  const handleDelete = async () => {
    const res = await borrarProducto(modalState.selected._id);
    if (res.ok) {
      cargarProductos();
      setModalState({ ...modalState, delete: false, selected: null });
      showToast("El producto se eliminó correctamente.", "success");
    } else {
      showToast("Se produjo un error.", "danger");
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1 className="display-4 neon-text fw-bold mb-0 text-center text-md-start">
          Gestión Productos
        </h1>
        <button
          className="btn btn-neon px-4"
          onClick={() =>
            setModalState({ form: true, delete: false, selected: null })
          }
        >
          <i className="bi bi-plus-lg me-2"></i>Agregar Producto
        </button>
      </div>

      <div className="row fw-bold border-bottom pb-2 mb-2 neon-text px-3 text-center d-none d-md-flex header-grid">
        <div className="col-md-2">Img</div>
        <div className="col-md-3 text-start">Producto</div>
        <div className="col-md-2">Precio</div>
        <div className="col-md-3">Stock</div>
        <div className="col-md-2">Acciones</div>
      </div>

      {productos.map((p) => (
        <div
          key={p._id}
          className="row itemRow-adminScreen py-3 align-items-center mx-0 px-2 text-center text-md-start"
        >
          <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-center">
            <img
              src={
                p.img ||
                "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691835.png"
              }
              alt={p.nombre}
              className="rounded border border-secondary"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                backgroundColor: "white",
              }}
            />
          </div>

          <div className="col-12 col-md-3 mb-2 mb-md-0">
            <span className="fw-bold d-block text-uppercase fs-5 fs-md-6">
              {p.nombre}
            </span>
            <small className="text-secondary">
              {p.categoria?.nombre || "General"}
            </small>
          </div>

          <div className="col-6 col-md-2 mb-3 mb-md-0 text-md-center">
            <small className="d-block d-md-none text-muted">Precio</small>
            <span className="neon-text fw-bold fs-5">
              ${p.precio.toLocaleString("es-AR")}
            </span>
          </div>

          <div className="col-6 col-md-3 mb-3 mb-md-0 text-md-center">
            <small className="d-block d-md-none text-muted mb-1">
              Disponibilidad
            </small>
            <span
              className={`badge ${p.stock > 0 ? "bg-dark border border-success text-success" : "bg-danger text-white"} px-3`}
            >
              {p.stock} unidades
            </span>
          </div>

          <div className="col-12 col-md-2 mt-2 mt-md-0 text-center text-md-end">
            <div className="btn-group w-100 w-md-auto">
              <button
                className="btn btn-outline-info py-2 py-md-1"
                onClick={() => setModalState({ form: true, selected: p })}
              >
                <i className="bi bi-pencil-square me-2 me-md-0"></i>
                <span className="d-inline d-md-none">Editar</span>
              </button>
              <button
                className="btn btn-outline-danger py-2 py-md-1"
                onClick={() => setModalState({ delete: true, selected: p })}
              >
                <i className="bi bi-trash3 me-2 me-md-0"></i>
                <span className="d-inline d-md-none">Borrar</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
        <div className="btn-group gap-3">
          <button
            className="btn btn-neon"
            onClick={() => setPagina((p) => Math.max(0, p - 5))}
            disabled={pagina === 0}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <span className="text-secondary small">
            Mostrando {pagina + 1} - {pagina + productos.length} de {total}
          </span>
          <button
            className="btn btn-neon"
            onClick={() => setPagina((p) => p + 5)}
            disabled={pagina + 5 >= total}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <ProductoAdminModal
        key={modalState.selected?._id || "new"}
        show={modalState.form}
        producto={modalState.selected}
        close={() =>
          setModalState({ ...modalState, form: false, selected: null })
        }
        action={handleAction}
        categorias={listaCategorias}
      />
      <ConfirmModal
        show={modalState.delete}
        message={`¿Estás seguro de que deseas eliminar "${modalState.selected?.nombre}"?`}
        onConfirm={handleDelete}
        close={() =>
          setModalState({ ...modalState, delete: false, selected: null })
        }
      />
    </>
  );
}
export default ProductoAdmin;
