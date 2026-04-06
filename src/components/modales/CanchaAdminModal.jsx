import { useForm } from "react-hook-form";

const CanchaAdminModal = ({ isOpen, onClose, onSubmit, cancha }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: cancha?.nombre || "",
      descripcion: cancha?.descripcion || "",
      precio: cancha?.precio || "",
      img: cancha?.img || "",
    },
  });

  if (!isOpen) return null;

  return (
    <div className="modal-custom-overlay">
      <div className="modal-content-zona5 rounded shadow-lg">
        <div className="modal-header p-4">
          <h2 className="modal-title neon-text fs-3">
            {cancha ? "Editar Cancha" : "Crear Nueva Cancha"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body p-4">
            <div className="row">
              <div className="col-12 mb-3">
                <label
                  htmlFor="cancha-name"
                  className="form-label text-light opacity-75 small uppercase"
                >
                  Nombre de la Cancha
                </label>
                <input
                  {...register("nombre", {
                    required: "Este campo es obligatorio",
                  })}
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Ej: Cancha 5 - Sintético"
                  id="cancha-name"
                  defaultValue={cancha?.nombre || ""}
                />
                {errors.nombre && (
                  <small className="text-danger fw-bold">
                    {errors.nombre.message}
                  </small>
                )}
              </div>
              <div className="col-12 mb-3">
                <label
                  htmlFor="cancha-desc"
                  className="form-label text-light opacity-75 small"
                >
                  Descripción
                </label>
                <textarea
                  {...register("descripcion")}
                  className="form-control bg-dark text-light border-secondary"
                  rows="2"
                  placeholder="Detalles de la cancha..."
                  id="cancha-desc"
                  defaultValue={cancha?.descripcion || ""}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="cancha-price"
                  className="form-label text-light opacity-75 small"
                >
                  Precio por Hora
                </label>
                <input
                  type="text"
                  {...register("precio", {
                    pattern: {
                      value: /^[0-9]*[.,]?[0-9]+$/,
                      message: "Solo números",
                    },
                  })}
                  className="form-control bg-dark text-light border-secondary"
                  id="cancha-price"
                  defaultValue={cancha?.precio || ""}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="cancha-img"
                  className="form-label text-light opacity-75 small"
                >
                  URL Imagen
                </label>
                <input
                  {...register("img")}
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="https://..."
                  id="cancha-img"
                  defaultValue={cancha?.img || ""}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer p-3 gap-2">
            <button
              type="button"
              className="btn text-light border-0"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-neon px-4">
              Guardar Cancha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CanchaAdminModal;
