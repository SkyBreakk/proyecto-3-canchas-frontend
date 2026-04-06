import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { apiUser } from "../../helpers/user";
import { useForm } from "react-hook-form";
import { useToast } from "../../context/ToastContext";

const MisDatos = () => {
  const { user, loadUserData } = useContext(UserContext);
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    const sinCambiosEnUsername = data.username === user.username;
    const sinCambiosEnPassword = !data.password || data.password.trim() === "";

    if (sinCambiosEnUsername && sinCambiosEnPassword) {
      showToast("No has realizado ningún cambio para guardar.", "warning");
      return;
    }

    const datosAEnviar = { username: data.username };
    if (!sinCambiosEnPassword) {
      datosAEnviar.password = data.password;
    }

    try {
      const res = await apiUser.updateProfile(datosAEnviar);

      if (res.ok) {
        showToast("¡Perfil actualizado con éxito!", "success");
        await loadUserData();

        setValue("username", user.username || "");
        setValue("password", "");
        setValue("confirmPassword", "");
      } else {
        showToast(res.message || "Error al actualizar el perfil", "danger");
      }
    } catch (error) {
      showToast("Error de conexión con el servidor", "warning");
    }
  };

  return (
    <div className="p-3">
      <h4 className="text-white border-bottom border-secondary pb-2 mb-4 neon-text">
        Mi Información Personal
      </h4>

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
                value: 5,
                message: "Mínimo 5 caracteres",
              },
              maxLength: {
                value: 20,
                message: "Máximo 20 caracteres",
              },
              pattern: {
                value: /^(?![0-9]+$)[a-zA-Z0-9_]+$/,
                message:
                  "Solo letras, números y guiones bajos. No puede ser solo números",
              },
              validate: {
                notEmpty: (value) =>
                  value?.trim() !== "" || "El usuario no puede estar vacío",
                noSpaces: (value) =>
                  !value?.includes(" ") || "No puede contener espacios",
              },
            })}
            id="profile-username"
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

            <div className="row g-3">
              <div className="col-md-6">
                <label
                  className="form-label text-secondary-custom small"
                  htmlFor="profile-password"
                >
                  NUEVA CONTRASEÑA
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control bg-dark text-white border-secondary ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Vacio para mantener actual"
                    {...register("password", {
                      minLength: {
                        value: 6,
                        message: "Mínimo 6 caracteres",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Debe incluir mayúscula, minúscula y número",
                      },
                      validate: {
                        noSpaces: (value) =>
                          !value?.includes(" ") || "No puede contener espacios",
                      },
                    })}
                    id="profile-password"
                  />
                  <button
                    type="button"
                    className="btn border-0 position-absolute end-0 top-50 translate-middle-y text-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                    ></i>
                  </button>
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block fw-bold">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label
                  className="form-label text-secondary-custom small"
                  htmlFor="confirm-password"
                >
                  CONFIRMAR CONTRASEÑA
                </label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control bg-dark text-white border-secondary ${errors.confirmPassword ? "is-invalid" : ""}`}
                    {...register("confirmPassword", {
                      validate: (val) =>
                        !password ||
                        val === password ||
                        "Las contraseñas no coinciden",
                    })}
                    id="confirm-password"
                  />
                  <button
                    type="button"
                    className="btn border-0 position-absolute end-0 top-50 translate-middle-y text-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
                    ></i>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block fw-bold">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-4 text-end">
          <button
            type="submit"
            className="btn btn-neon px-5 py-2 fw-bold shadow-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : (
              "GUARDAR CAMBIOS"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MisDatos;
