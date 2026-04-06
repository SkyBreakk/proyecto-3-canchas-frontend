import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../helpers/auth";
import zona5 from "../assets/img/logo.png";
import VerifyEmailModal from "../components/VerifyEmailModal";
import { useToast } from "../context/ToastContext.jsx";
import "../assets/css/login.css";

function RegisterScreen() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [response, setResponse] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      showToast("Las contraseñas no coinciden", "danger");
      return;
    }

    const result = await registerUser(data);
    setResponse(result);

    if (
      result?.message?.includes("ya existe") ||
      result?.message?.includes("ya está registrado")
    ) {
      const field = result.message.includes("usuario")
        ? "nombre de usuario"
        : "correo electrónico";
      showToast(`Este ${field} ya está en uso. Prueba con otro.`, "warning");
      return;
    }

    if (
      result?.message?.includes("usuario") &&
      result?.message?.includes("existe")
    ) {
      showToast(
        "Este nombre de usuario no está disponible. Prueba con otro.",
        "danger",
      );
      return;
    }

    if (result?.message && !result.ok) {
      showToast(result.message, "danger");
      return;
    }

    if (result?.ok) {
      setUserEmail(data.email);
      setShowVerifyModal(true);
      showToast("¡Cuenta creada! Revisa tu email para verificarla.", "success");
    } else {
      showToast(
        "Ocurrió un error al registrar tu cuenta. Intenta nuevamente.",
        "danger",
      );
    }
  };

  return (
    <div className="fondo d-flex vh-100 align-items-center justify-content-center">
      <div className="container-transparente position-relative p-4">
        <div className="form-section text-white px-3 px-lg-5">
          <h1 className="text-center mb-4">Crear cuenta</h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control username-icon input text-white ${errors.username ? "is-invalid" : ""}`}
                placeholder="Nombre de usuario"
                autoComplete="username"
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
              />
              {errors.username && (
                <p className="texto-error fw-bold small mt-1">
                  <i className="bi bi-exclamation-circle me-1"></i>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                className={`form-control correo-icon input text-white ${errors.email ? "is-invalid" : ""}`}
                placeholder="Correo electrónico"
                autoComplete="email"
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:
                      "Ingresa un correo válido (ej: usuario@dominio.com)",
                  },
                  validate: {
                    notEmpty: (value) =>
                      value?.trim() !== "" || "El correo no puede estar vacío",
                    noTypos: (value) => {
                      const commonTypos = [
                        "gmial.com",
                        "gmai.com",
                        "hotmial.com",
                        "yahooo.com",
                      ];
                      const domain = value?.split("@")?.[1]?.toLowerCase();
                      return (
                        !commonTypos.includes(domain) ||
                        "¿Quisiste decir gmail.com / hotmail.com?"
                      );
                    },
                  },
                })}
              />
              {errors.email && (
                <p className="texto-error fw-bold small mt-1">
                  <i className="bi bi-exclamation-circle me-1"></i>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control password-icon input text-white ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Contraseña"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Debe incluir mayúscula, minúscula y número",
                    },
                    validate: {
                      notEmpty: (value) =>
                        value?.trim() !== "" ||
                        "La contraseña no puede estar vacía",
                      noSpaces: (value) =>
                        !value?.includes(" ") || "No puede contener espacios",
                    },
                  })}
                />
                <button
                  type="button"
                  className="btn-ver-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  tabIndex={-1}
                >
                  <i
                    className={`fa show-pass ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="texto-error fw-bold small mt-1">
                  <i className="bi bi-exclamation-circle me-1"></i>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <div className=" position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control password-icon input text-white ${errors.confirmPassword ? "is-invalid" : ""}`}
                  placeholder="Confirmar contraseña"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Confirma tu contraseña",
                    validate: {
                      match: (value) =>
                        value === password || "Las contraseñas no coinciden",
                      notEmpty: (value) =>
                        value?.trim() !== "" ||
                        "Este campo no puede estar vacío",
                    },
                  })}
                />
                <button
                  type="button"
                  className="btn-ver-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                  tabIndex={-1}
                >
                  <i
                    className={`fa show-pass ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="texto-error fw-bold small mt-1">
                  <i className="bi bi-exclamation-circle me-1"></i>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="mb-3 d-grid">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn boton-iniciar"
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Creando cuenta...
                  </>
                ) : (
                  "Registrarse"
                )}
              </button>
            </div>

            <p className="text-center text-white mt-3">
              ¿Ya tienes cuenta?{" "}
              <a
                className="text-registro"
                onClick={() => navigate("/login")}
                role="button"
                tabIndex={0}
              >
                Inicia sesión
              </a>
            </p>
          </form>
        </div>
        <img src={zona5} alt="logo" className="logo-fondo img-fluid" />
      </div>
      {showVerifyModal && (
        <VerifyEmailModal
          email={userEmail}
          onSuccess={() => {
            setShowVerifyModal(false);
            navigate("/login");
          }}
          onClose={() => setShowVerifyModal(false)}
        />
      )}
    </div>
  );
}

export default RegisterScreen;
