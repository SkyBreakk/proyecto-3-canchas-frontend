import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { apiUser } from "../../helpers/user";
import { useForm } from "react-hook-form";

const MisDatos = () => {
  const { user, loadUserData } = useContext(UserContext);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("username", user.username || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setMensaje({ tipo: "", texto: "" });
    const datosAEnviar = {
      username: data.username,
      // email: data.email,
    };
    if (data.password && data.password.trim() !== "") {
      datosAEnviar.password = data.password;
    }
    try {
      const res = await apiUser.updateProfile(datosAEnviar);

      if (res.ok) {
        setMensaje({
          tipo: "success",
          texto: "¡Perfil actualizado con éxito!",
        });
        await loadUserData();
        setValue("password", "");
      } else {
        setMensaje({
          tipo: "danger",
          texto: res.message || "Error al actualizar",
        });
      }
    } catch (error) {
      setMensaje({
        tipo: "danger",
        texto: "Error de conexión con el servidor",
      });
    }
  };

  return (
    <div className="p-3">
      <h4 className="text-white border-bottom border-secondary pb-2 mb-4">
        Mi Información Personal
      </h4>

      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo} fade show`} role="alert">
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label
            className="form-label text-secondary-custom small"
            htmlFor="profile-username"
          >
            NOMBRE DE USUARIO
          </label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.username ? "is-invalid" : ""}`}
            {...register("username", {
              required: "El nombre de usuario es obligatorio",
              minLength: {
                value: 3,
                message: "Debe tener al menos 3 caracteres",
              },
            })}
            id="profile-username"
            autoComplete="username"
          />
          {errors.username && (
            <div className="invalid-feedback fw-bold">
              {errors.username.message}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label
            className="form-label text-secondary-custom small"
            htmlFor="profile-email"
          >
            EMAIL
          </label>
          <input
            type="email"
            className="form-control bg-dark text-white border-secondary"
            {...register("email")}
            disabled
            style={{ cursor: "not-allowed", opacity: "0.7" }}
            id="profile-email"
            autoComplete="email"
          />
          <small className="text-secondary mt-1 d-block">
            <i className="bi bi-info-circle me-1"></i>
            Por razones de seguridad, el cambio de email está deshabilitado.
          </small>
        </div>

        <div className="col-12 mt-4">
          <div
            className="p-3 rounded-3 border border-secondary"
            style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            <h5 className="text-success mb-3">
              <i className="bi bi-shield-lock me-2"></i>Seguridad
            </h5>
            <p className="text-secondary small mb-3">
              Si no deseas cambiar tu contraseña, deja este campo vacío.
            </p>

            <div className="col-md-6">
              <label
                className="form-label text-secondary-custom small"
                htmlFor="profile-password"
              >
                NUEVA CONTRASEÑA
              </label>
              <input
                type="password"
                className={`form-control bg-dark text-white border-secondary ${errors.password ? "is-invalid" : ""}`}
                placeholder="Mínimo 6 caracteres"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                })}
                id="profile-password"
              />
              {errors.password && (
                <div className="invalid-feedback fw-bold">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 mt-4 text-end">
          <button
            type="submit"
            className="btn btn-neon px-5 py-2 fw-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : null}
            GUARDAR CAMBIOS
          </button>
        </div>
      </form>
    </div>
  );
};

export default MisDatos;
