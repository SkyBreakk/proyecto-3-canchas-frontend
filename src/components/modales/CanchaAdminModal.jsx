import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const CanchaAdminModal = ({ isOpen, onClose, onSubmit, cancha }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    values: {
      nombre: cancha?.nombre || "",
      descripcion: cancha?.descripcion || "",
      precio: cancha?.precio || "",
      img: cancha?.img || "",
    },
  });

  const watchImg = watch("img");
  const [displayImg, setDisplayImg] = useState(cancha?.img || "");
  const placeholderImg =
    "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691835.png";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayImg(watchImg);
    }, 400);
    return () => clearTimeout(timer);
  }, [watchImg]);

  if (!isOpen) return null;

  return (
    <div className="modal-custom-overlay" onClick={onClose}>
      <div
        className="modal-content-zona5 rounded shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header p-4">
          <h2 className="modal-title neon-text fs-3">
            {cancha ? "Editar Cancha" : "Nueva Cancha"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body row p-4">
            <div className="col-md-5 text-center mb-3 mb-md-0">
              <div
                className="position-relative rounded border border-secondary overflow-hidden bg-dark d-flex align-items-center justify-content-center"
                style={{ height: "200px" }}
              >
                <img
                  src={displayImg || placeholderImg}
                  className="modal-img-admin"
                  alt="Preview cancha"
                  onError={(event) => {
                    if (event.target.src !== placeholderImg) {
                      event.target.src = placeholderImg;
                    }
                  }}
                />
              </div>
              <small className="text-muted d-block mt-2">
                Vista previa de la sede
              </small>
            </div>

            <div className="col-md-7">
              <div className="mb-3">
                <label className="form-label text-light opacity-75 small">
                  NOMBRE
                </label>
                <input
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                    minLength: { value: 5, message: "Mínimo 5 caracteres" },
                    maxLength: { value: 15, message: "Máximo 15 caracteres" },
                  })}
                  className={`form-control form-control-dark ${errors.nombre ? "is-invalid" : ""}`}
                />
                {errors.nombre && (
                  <small className="text-danger d-block">
                    {errors.nombre.message}
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label text-light opacity-75 small">
                  PRECIO POR HORA
                </label>
                <input
                  type="number"
                  {...register("precio", {
                    required: "El precio es obligatorio",
                    min: { value: 1, message: "Mínimo $1" },
                    max: { value: 3000000, message: "Máximo $3M" },
                  })}
                  className={`form-control form-control-dark ${errors.precio ? "is-invalid" : ""}`}
                />
                {errors.precio && (
                  <small className="text-danger d-block">
                    {errors.precio.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-12">
              <label className="form-label text-light opacity-75 small">
                URL IMAGEN
              </label>
              <input
                {...register("img")}
                className="form-control form-control-dark mb-3"
                placeholder="https://..."
              />

              <label className="form-label text-light opacity-75 small">
                DESCRIPCIÓN
              </label>
              <textarea
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                  maxLength: { value: 30, message: "Máximo 30 caracteres" },
                })}
                className={`form-control form-control-dark ${errors.descripcion ? "is-invalid" : ""}`}
                rows="2"
              />
              {errors.descripcion && (
                <small className="text-danger d-block">
                  {errors.descripcion.message}
                </small>
              )}
            </div>
          </div>

          <div className="modal-footer mb-3 mx-3 gap-1">
            <button
              type="button"
              className="btn text-light border-0"
              onClick={onClose}
            >
              CANCELAR
            </button>
            <button type="submit" className="btn btn-neon px-4">
              {cancha ? "ACTUALIZAR" : "CREAR CANCHA"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CanchaAdminModal;
