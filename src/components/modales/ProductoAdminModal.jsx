import { useEffect, useState } from "react";
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
    watch,
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

  const watchImg = watch("img");
  const [displayImg, setDisplayImg] = useState(watchImg);
  const placeholderImg =
    "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691835.png";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayImg(watchImg);
    }, 400);

    return () => clearTimeout(timer);
  }, [watchImg]);

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
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-content modal-cancha-custom p-2">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold neon-text text-uppercase mb-2">
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
                <div className="mb-3">
                  <img
                    src={displayImg || placeholderImg}
                    className="modal-img-admin mb-3 img-fluid rounded border border-secondary"
                    alt="preview"
                    onError={(event) => {
                      if (event.target.src !== placeholderImg) {
                        event.target.src = placeholderImg;
                      }
                    }}
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
                      maxLength: { value: 30, message: "Máximo 30 caracteres" },
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
                      step="0.01"
                      className={`form-control form-control-dark ${errors.precio ? "is-invalid" : ""}`}
                      {...register("precio", {
                        required: "El precio es obligatorio",
                        min: {
                          value: 1,
                          message: "El precio debe ser mayor que 0",
                        },
                        max: {
                          value: 3000000,
                          message: "El máximo es $3.000.000",
                        },
                      })}
                      id="product-price"
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
                        min: { value: 0, message: "Mínimo 0" },
                        max: {
                          value: 100000,
                          message: "Máximo 100.000 unidades",
                        },
                      })}
                      id="product-stock"
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
                  >
                    <option value="">Seleccione...</option>
                    {categorias.map((categoria) => (
                      <option key={categoria._id} value={categoria._id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.categoria && (
                    <div className="invalid-feedback small">
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
                    {...register("descripcion", {
                      maxLength: {
                        value: 200,
                        message:
                          "La descricpión no puede superar los 200 caracteres",
                      },
                    })}
                    id="product-desc"
                  ></textarea>
                  {errors.descripcion && (
                    <div className="invalid-feedback small">
                      {errors.descripcion.message}
                    </div>
                  )}
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
