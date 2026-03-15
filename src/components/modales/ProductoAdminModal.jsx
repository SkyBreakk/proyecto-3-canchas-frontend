import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ProductoAdminModal({
  show,
  close,
  action,
  producto = null,
  categorias = [],
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (show) {
      const categoriaId = producto?.categoria?._id || producto?.categoria || "";

      reset(
        producto
          ? { ...producto, categoria: categoriaId }
          : {
              nombre: "",
              precio: "",
              categoria: "",
              descripcion: "",
              stock: "",
              img: "",
            },
      );
    }
  }, [show, producto, reset]);

  if (!show) return null;

  return (
    <div className="modal-custom-overlay" onClick={close}>
      <div
        className="modal-dialog modal-lg w-100 modal-animacion"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content modal-cancha-custom p-2">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold neon-text">
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
              <div className="col-md-5 text-center">
                <div className="position-relative">
                  <img
                    src={
                      producto?.img ||
                      "https://via.placeholder.com/300x200?text=Sin+Imagen"
                    }
                    className="modal-img-cancha mb-3"
                    alt="preview"
                  />
                </div>
                <label className="form-label small text-secondary-custom d-block text-start">
                  URL de Imagen
                </label>
                <input
                  className="form-control form-control-dark"
                  {...register("img")}
                  placeholder="https://..."
                />
              </div>

              <div className="col-md-7">
                <div className="mb-3">
                  <label className="form-label small text-secondary-custom">
                    Nombre
                  </label>
                  <input
                    className="form-control form-control-dark"
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label small text-secondary-custom">
                      Precio
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-dark"
                      {...register("precio")}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label small text-secondary-custom">
                      Stock
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-dark"
                      {...register("stock")}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small text-secondary-custom">
                    Categoría
                  </label>
                  <select
                    className={`form-select form-control-dark ${errors.categoria ? "is-invalid" : ""}`}
                    {...register("categoria", {
                      required: "Selecciona una categoría",
                    })}
                  >
                    <option value="">Seleccione una categoría...</option>
                    {categorias.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.categoria && (
                    <div className="invalid-feedback">
                      {errors.categoria.message}
                    </div>
                  )}
                </div>

                <div className="mb-0">
                  <label className="form-label small text-secondary-custom">
                    Descripción
                  </label>
                  <textarea
                    className="form-control form-control-dark"
                    rows="3"
                    {...register("descripcion")}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button type="button" className="btn text-light" onClick={close}>
                CANCELAR
              </button>
              <button type="submit" className="btn btn-alquilar-admin px-5">
                {producto ? "ACTUALIZAR" : "GUARDAR"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductoAdminModal;
