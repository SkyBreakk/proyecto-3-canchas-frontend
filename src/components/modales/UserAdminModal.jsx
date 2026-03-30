import { useForm } from "react-hook-form";

function UserAdminModal({ show, close, onSubmit, user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: user?.role || "user",
    },
  });

  if (!show) return null;

  return (
    <div className="modal-custom-overlay" onClick={close}>
      <div
        className="modal-content-zona5 w-50 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header p-4 border-0">
          <h2 className="modal-title neon-text fs-4">
            Gestionar Rol de Usuario
          </h2>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={close}
          ></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body p-4">
            <div className="mb-3">
              <p className="text-light opacity-75 mb-1">Usuario:</p>
              <p className="neon-text fw-bold">{user?.username}</p>
            </div>

            <div className="mb-3">
              <p className="text-light opacity-75 mb-1">Email:</p>
              <p className="text-light">{user?.email}</p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="role-select"
                className="form-label text-light opacity-75 small"
              >
                Nuevo Rol
              </label>
              <select
                {...register("role", { required: "Selecciona un rol" })}
                className="form-select form-control-dark"
                id="role-select"
                defaultValue={user?.role || "user"}
              >
                <option value="user">Usuario (user)</option>
                <option value="admin">Administrador (admin)</option>
              </select>
              {errors.role && (
                <small className="text-danger">{errors.role.message}</small>
              )}
            </div>

            <div className="alert alert-warning bg-warning bg-opacity-10 border-warning text-warning small">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Esta acción cambiará los permisos del usuario inmediatamente.
            </div>
          </div>

          <div className="modal-footer p-3 gap-2 border-0">
            <button type="button" className="btn text-light" onClick={close}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-neon px-4">
              Actualizar Rol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserAdminModal;
