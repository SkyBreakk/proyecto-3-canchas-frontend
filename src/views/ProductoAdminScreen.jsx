import { useState, useEffect, useCallback } from "react";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} from "../helpers/producto";
import ProductoAdminModal from "../components/modales/ProductoAdminModal";
import ConfirmModal from "../components/modales/ConfirmModal";
import ProductoEnLista from "../components/admin/ProductoEnLista";
import "../assets/css/ProductosAdmin.css";

function ProductoAdminScreen() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [modalState, setModalState] = useState({
    form: false,
    delete: false,
    selected: null,
  });

  const cargarProductos = useCallback(() => {
    obtenerProductos(5, pagina).then((data) => {
      if (data.ok) {
        setProductos(data.productos);
        setTotal(data.total);
      }
    });
  }, [pagina]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const handleAction = async (data) => {
    const res = data._id
      ? await actualizarProducto(data)
      : await crearProducto(data);
    if (res.ok) cargarProductos();
    setModalState({ ...modalState, form: false, selected: null });
  };

  const handleDelete = async () => {
    const res = await borrarProducto(modalState.selected._id);
    if (res.ok) cargarProductos();
    setModalState({ ...modalState, delete: false, selected: null });
  };

  return (
    <section className="background-productoAdminScreen p-5 text-light">
      <h1 className="text-center display-3 mb-5">Gestión Productos</h1>

      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-success"
          onClick={() => setModalState({ ...modalState, form: true })}
        >
          Agregar Producto
        </button>
      </div>

      <div className="containerTable-productoAdminScreen p-3 rounded">
        {/* Cabecera de la tabla (omitida por brevedad, igual a la tuya) */}
        {productos.map((p) => (
          <ProductoEnLista
            key={p._id}
            producto={p}
            onEdit={() =>
              setModalState({ form: true, selected: p, delete: false })
            }
            onDelete={() =>
              setModalState({ delete: true, selected: p, form: false })
            }
          />
        ))}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center gap-2 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setPagina((p) => p - 5)}
          disabled={pagina === 0}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPagina((p) => p + 5)}
          disabled={pagina + 5 >= total}
        >
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>

      <ProductoAdminModal
        show={modalState.form}
        producto={modalState.selected}
        close={() =>
          setModalState({ ...modalState, form: false, selected: null })
        }
        action={handleAction}
      />

      <ConfirmModal
        show={modalState.delete}
        message={`¿Borrar ${modalState.selected?.nombre}?`}
        onConfirm={handleDelete}
        close={() =>
          setModalState({ ...modalState, delete: false, selected: null })
        }
      />
    </section>
  );
}
export default ProductoAdminScreen;
