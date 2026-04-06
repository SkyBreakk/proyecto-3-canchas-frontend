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

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-custom-overlay" onClick={close}>
      <div
        className="modal-dialog modal-lg w-100 modal-animacion"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content modal-cancha-custom p-2">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold neon-text text-uppercase">
              {producto ? "Editar Producto" : "Nuevo Producto"}
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
            <div className="modal-body row g-3 mx-0">
              <div className="col-md-5 text-center">
                <div className="position-relative">
                  <img
                    src={
                      producto?.img ||
                      "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691833.png"
                    }
                    className="modal-img-cancha mb-3 img-fluid rounded border border-secondary"
                    alt="preview"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
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
                      minLength: { value: 5, message: "Mínimo 5 caracteres" },
                    })}
                    id="product-name"
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback small">
                      {errors.nombre.message}
                    </div>
                  )}
                </div>

                <div className="row g-2">
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
                        required: "Obligatorio",
                        min: { value: 0, message: "Mínimo 0" },
                      })}
                      id="product-price"
                    />
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
                        required: "Obligatorio",
                        min: { value: 0, message: "Mínimo 0" },
                      })}
                      id="product-stock"
                    />
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
                  >
                    <option value="">Seleccione...</option>
                    {categorias.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
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
