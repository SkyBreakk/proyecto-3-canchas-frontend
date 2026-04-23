import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../helpers/auth";
import zona5 from "../assets/img/logo.png";
import VerifyEmailModal from "../components/VerifyEmailModal";
import { useToast } from "../context/ToastContext.jsx";
import "../assets/css/login.css";
import { UserContext } from "../context/UserContext.jsx";

function RegisterScreen() {
  const navigate = useNavigate();
  const { loadUserData } = useContext(UserContext);
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
    if (result?.ok) {
      setUserEmail(data.email);
      setShowVerifyModal(true);
      showToast(result.message, "success");
    } else {
      const errorMsg =
        result?.message || "Ocurrió un error al registrar tu cuenta.";
      showToast(errorMsg, "warning");
    }
  };

  const handleVerificationSuccess = async () => {
    setShowVerifyModal(false);
    await loadUserData();
    showToast("Email verificado con éxito. Bienvenido a Zona 5", "success");
    navigate("/");
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
                    message: "El nombre debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "El nombre no puede superar los 20 caracteres",
                  },
                  validate: {
                    notEmpty: (value) =>
                      value?.trim() !== "" || "El usuario no puede estar vacío",
                    validChars: (value) =>
                      /^[a-zA-Z0-9_\sáéíóúÁÉÍÓÚñÑ]+$/.test(value) ||
                      "Solo letras, números, espacios, tildes y guiones bajos (_)",
                    noMultipleSpaces: (value) =>
                      !/\s{2,}/.test(value) ||
                      "El nombre no puede tener múltiples espacios seguidos",
                    notOnlyNumbers: (value) =>
                      !/^[0-9\s]+$/.test(value) ||
                      "El usuario no puede ser solo números",
                  },
                  onChange: (event) => {
                    if (event.target.value.startsWith(" ")) {
                      event.target.value = event.target.value.trimStart();
                    }
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
                  maxLength: {
                    value: 254,
                    message: "El correo no puede superar los 254 caracteres",
                  },
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
                      message:
                        "La contraseña debe tener un mínimo de 6 caracteres",
                    },
                    maxLength: {
                      value: 128,
                      message: "La contraseña es demasiado larga (máximo 128)",
                    },
                    validate: {
                      notEmpty: (value) =>
                        value?.trim() !== "" ||
                        "La contraseña no puede estar formada solo por espacios",
                      noSpaces: (value) =>
                        !value?.includes(" ") ||
                        "La contraseña no puede contener espacios en blanco",
                      hasUpper: (value) =>
                        /[A-Z]/.test(value) ||
                        "Te falta incluir al menos una letra mayúscula",
                      hasLower: (value) =>
                        /[a-z]/.test(value) ||
                        "Te falta incluir al menos una letra minúscula",
                      hasNumber: (value) =>
                        /\d/.test(value) ||
                        "Te falta incluir al menos un número",
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
                    required: "Por favor, confirma tu contraseña",
                    validate: {
                      match: (value) =>
                        value === password ||
                        "Las contraseñas no coinciden, revísalas",
                      notEmpty: (value) =>
                        value?.trim() !== "" ||
                        "Este campo no puede quedar en blanco",
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
          onSuccess={handleVerificationSuccess}
          onClose={() => setShowVerifyModal(false)}
        />
      )}
    </div>
  );
}

export default RegisterScreen;
