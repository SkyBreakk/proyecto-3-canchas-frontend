import { useForm } from "react-hook-form";

function ProductoAdminModal({
  show,
  close,
  action,
  producto = null,
  categorias = [],
}) {
  // SOLUCIÓN 1: defaultValues en la configuración de useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: producto?.nombre || "",
      precio: producto?.precio || "",
      categoria: producto?.categoria?._id || producto?.categoria || "",
      descripcion: producto?.descripcion || "",
      stock: producto?.stock || "",
      img: producto?.img || "",
    },
  });

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
                      "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691833.png"
                    }
                    className="modal-img-cancha mb-3"
                    alt="preview"
                  />
                </div>
                <label
                  className="form-label small text-secondary-custom d-block text-start"
                  htmlFor="product-img"
                >
                  URL de Imagen
                </label>
                <input
                  className="form-control form-control-dark"
                  {...register("img")}
                  placeholder="https://..."
                  id="product-img"
                  defaultValue={producto?.img || ""}
                />
              </div>

              <div className="col-md-7">
                <div className="mb-3">
                  <label
                    className="form-label small text-secondary-custom"
                    htmlFor="product-name"
                  >
                    Nombre
                  </label>
                  <input
                    className={`form-control form-control-dark ${errors.nombre ? "is-invalid" : ""}`}
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 5,
                        message:
                          "El nombre debe de tener por lo menos 5 carácteres",
                      },
                    })}
                    id="product-name"
                    defaultValue={producto?.nombre || ""}
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback small">
                      {errors.nombre.message}
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label
                      className="form-label small text-secondary-custom"
                      htmlFor="product-price"
                    >
                      Precio
                    </label>
                    <input
                      type="number"
                      className={`form-control form-control-dark ${errors.precio ? "is-invalid" : ""}`}
                      {...register("precio", {
                        required: "El precio es obligatorio",
                        min: {
                          value: 0,
                          message: "El precio no puede ser menor a 0",
                        },
                      })}
                      id="product-price"
                      defaultValue={producto?.precio || ""}
                    />
                    {errors.precio && (
                      <div className="invalid-feedback small">
                        {errors.precio.message}
                      </div>
                    )}
                  </div>

                  <div className="col-6 mb-3">
                    <label
                      className="form-label small text-secondary-custom"
                      htmlFor="product-stock"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      className={`form-control form-control-dark ${errors.stock ? "is-invalid" : ""}`}
                      {...register("stock", {
                        required: "El stock es obligatorio",
                        min: {
                          value: 0,
                          message: "No puede ser menor a 0",
                        },
                      })}
                      id="product-stock"
                      defaultValue={producto?.stock || ""}
                    />
                    {errors.stock && (
                      <div className="invalid-feedback small">
                        {errors.stock.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    className="form-label small text-secondary-custom"
                    htmlFor="product-category"
                  >
                    Categoría
                  </label>
                  <select
                    className={`form-select form-control-dark ${errors.categoria ? "is-invalid" : ""}`}
                    {...register("categoria", {
                      required: "Selecciona una categoría",
                    })}
                    id="product-category"
                    defaultValue={
                      producto?.categoria?._id || producto?.categoria || ""
                    }
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
                  <label
                    className="form-label small text-secondary-custom"
                    htmlFor="product-desc"
                  >
                    Descripción
                  </label>
                  <textarea
                    className="form-control form-control-dark"
                    rows="3"
                    {...register("descripcion")}
                    id="product-desc"
                    defaultValue={producto?.descripcion || ""}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button type="button" className="btn text-light" onClick={close}>
                CANCELAR
              </button>
              <button type="submit" className="btn btn-neon px-5">
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
