import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ProductoFormModal({ show, close, action, producto = null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (show)
      reset(
        producto || {
          nombre: "",
          precio: "",
          categoria: "",
          descripcion: "",
          stock: "",
          img: "",
        },
      );
  }, [show, producto, reset]);

  if (!show) return null;

  return (
    <div className="modal-custom-overlay">
      <div className="modal-dialog modal-lg w-100">
        <div className="modal-content modal-content-zona5">
          <div className="modal-header">
            <h5 className="modal-title neon-text">
              {producto ? "EDITAR PRODUCTO" : "NUEVO PRODUCTO"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={close}
            ></button>
          </div>
          <form
            onSubmit={handleSubmit((data) => {
              action(producto ? { ...producto, ...data } : data);
              close();
            })}
          >
            <div className="modal-body row g-3">
              <div className="col-md-6 text-center">
                {producto?.img && (
                  <img
                    src={producto.img}
                    className="img-fluid rounded mb-2 border border-secondary"
                    alt="preview"
                    style={{ maxHeight: "200px" }}
                  />
                )}
                <label className="form-label d-block text-start">
                  URL de Imagen
                </label>
                <input
                  className="form-control bg-dark text-light border-secondary"
                  {...register("img")}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                  className="form-control bg-dark text-light border-secondary"
                  {...register("nombre", { required: true })}
                />
                <label className="form-label mt-2">Precio</label>
                <input
                  className="form-control bg-dark text-light border-secondary"
                  {...register("precio")}
                />
                <label className="form-label mt-2">Stock</label>
                <input
                  className="form-control bg-dark text-light border-secondary"
                  {...register("stock")}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control bg-dark text-light border-secondary"
                  rows="2"
                  {...register("descripcion")}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={close}
              >
                Cerrar
              </button>
              <button type="submit" className="btn btn-neon px-4">
                GUARDAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ProductoFormModal;
