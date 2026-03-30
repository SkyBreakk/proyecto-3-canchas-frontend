import { useForm } from "react-hook-form";

function CategoriaAdminModal({ show, close, onSave, categoria }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: categoria?.nombre || "",
    },
  });

  if (!show) return null;

  return (
    <div className="modal-custom-overlay">
      <div className="modal-content-zona5 rounded p-4 w-50">
        <h2 className="neon-text text-center mb-4">
          {categoria ? "Editar Categoría" : "Nueva Categoría"}
        </h2>
        <form onSubmit={handleSubmit(onSave)}>
          <div className="mb-3">
            <label className="form-label" htmlFor="category-name">
              Nombre de Categoría
            </label>
            <input
              type="text"
              className={`form-control bg-dark text-light border-${
                errors.nombre ? "danger" : "secondary"
              }`}
              {...register("nombre", { required: "El nombre es obligatorio" })}
              id="category-name"
              // Aseguramos que el valor inicial del DOM coincida con RHF
              defaultValue={categoria?.nombre || ""}
            />
            {errors.nombre && (
              <small className="text-danger">{errors.nombre.message}</small>
            )}
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={close}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-neon">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoriaAdminModal;
