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
  const [paginado, setPaginado] = useState(0);
  const [modalState, setModalState] = useState({
    form: false,
    delete: false,
    selected: null,
  });
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const cargarProductos = useCallback(() => {
    setLoading(true);
    obtenerProductos(5, paginado)
      .then((data) => {
        if (data.ok) {
          setProductos(data.productos);
          setTotal(data.total);
        } else {
          showToast(data.message, "danger");
        }
      })
      .catch((error) => {
        console.error(error);
        showToast(error.message, "danger");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paginado]);

  useEffect(() => {
    traerCategoriasPaginado(100, 0).then((response) => {
      setListaCategorias(response.categorias);
    });
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const handleAction = async (data) => {
    const response = data._id
      ? await actualizarProducto(data)
      : await crearProducto(data);
    if (response.ok) {
      cargarProductos();
      setModalState({ ...modalState, form: false, selected: null });
      showToast("El producto se guardó correctamente.", "success");
    } else {
      showToast(response.message || "Se produjo un error.", "danger");
    }
  };

  const handleDelete = async () => {
    const response = await borrarProducto(modalState.selected._id);
    if (response.ok) {
      cargarProductos();
      setModalState({ ...modalState, delete: false, selected: null });
      showToast("El producto se eliminó correctamente.", "success");
    } else {
      showToast(response.message || "Se produjo un error.", "danger");
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

      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 my-4">
        <div className="btn-group gap-3">
          <button
            className="btn btn-neon btn-sm"
            onClick={() => setPaginado((pagina) => Math.max(0, pagina - 5))}
            disabled={paginado === 0}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <span className="text-secondary small align-self-center">
            Mostrando {paginado + 1} - {paginado + productos.length} de {total}
          </span>
          <button
            className="btn btn-neon btn-sm"
            onClick={() => setPaginado((pagina) => pagina + 5)}
            disabled={paginado + 5 >= total}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="row fw-bold border-bottom pb-2 mb-2 neon-text px-3 text-center d-none d-md-flex header-grid">
        <div className="col-md-2">Img</div>
        <div className="col-md-3 text-start">Producto</div>
        <div className="col-md-2">Precio</div>
        <div className="col-md-3">Stock</div>
        <div className="col-md-2">Acciones</div>
      </div>

      {loading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="spinner-border mb-3 admin-loader" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h3 className="neon-text opacity-75">Cargando productos...</h3>
        </div>
      ) : (
        <>
          {productos.map((producto) => (
            <div
              key={producto._id}
              className="row itemRow-adminScreen py-3 align-items-center mx-0 px-2 text-center text-md-start"
            >
              <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-center">
                <img
                  src={
                    producto.img ||
                    "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691835.png"
                  }
                  alt={producto.nombre}
                  className="rounded text-truncate border border-secondary"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    backgroundColor: "white",
                  }}
                />
              </div>

              <div className="col-12 col-md-3 mb-2 text-truncate mb-md-0">
                <span className="fw-bold d-block text-uppercase text-truncate fs-5 fs-md-6">
                  {producto.nombre}
                </span>
                <small className="text-secondary text-truncate">
                  {producto.categoria?.nombre || "General"}
                </small>
              </div>

              <div className="col-6 col-md-2 mb-3 mb-md-0 text-truncate text-md-center">
                <small className="d-block d-md-none text-muted">Precio</small>
                <span className="neon-text fw-bold admin-price-amount fs-5">
                  ${producto.precio.toLocaleString("es-AR")}
                </span>
              </div>

              <div className="col-6 col-md-3 mb-3 mb-md-0 text-md-center">
                <small className="d-block d-md-none text-muted mb-1">
                  Disponibilidad
                </small>
                <span
                  className={`badge ${producto.stock > 0 ? "bg-dark text-truncate admin-price-amount border border-success text-success" : "bg-danger text-white"} px-3`}
                >
                  {producto.stock.toLocaleString()} unidades
                </span>
              </div>

              <div className="col-12 col-md-2 mt-2 mt-md-0 text-center text-md-end">
                <div className="btn-group w-100 w-md-auto">
                  <button
                    className="btn btn-outline-info py-2 py-md-1"
                    onClick={() =>
                      setModalState({ form: true, selected: producto })
                    }
                  >
                    <i className="bi bi-pencil-square me-2 me-md-0"></i>
                    <span className="d-inline d-md-none">Editar</span>
                  </button>
                  <button
                    className="btn btn-outline-danger py-2 py-md-1"
                    onClick={() =>
                      setModalState({ delete: true, selected: producto })
                    }
                  >
                    <i className="bi bi-trash3 me-2 me-md-0"></i>
                    <span className="d-inline d-md-none">Borrar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

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
