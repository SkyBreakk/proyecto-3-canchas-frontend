import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logIn } from "../helpers/auth";
import { UserContext } from "../context/UserContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import BtnGoogleSigIn from "../components/BtnGoogleSigIn";
import VerifyEmailModal from "../components/VerifyEmailModal.jsx";
import zona5 from "../assets/img/logo.png";
import "../assets/css/login.css";

function LoginScreen() {
  const { loadUserData } = useContext(UserContext);
  const [response, setResponse] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [pendingVerificationEmail, setPendingVerificationEmail] =
    useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    isSubmitting,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await logIn(data.email, data.password);
    setResponse(response);

    if (response?.message?.includes("no está verificado")) {
      setPendingVerificationEmail(data.email);
      setShowVerifyModal(true);
      showToast("Verifica tu email para continuar", "warning");
      return;
    }

    if (
      response?.message?.includes("credenciales") ||
      response?.message?.includes("incorrecta")
    ) {
      showToast(
        "Email o contraseña incorrectos. Verifica tus datos.",
        "danger",
      );
      return;
    }

    if (
      response?.message?.includes("no encontrado") ||
      response?.message?.includes("no existe")
    ) {
      showToast("No existe una cuenta con este email.", "danger");
      return;
    }

    if (response?.ok) {
      showToast("¡Bienvenido! Sesión iniciada correctamente.", "success");
      await loadUserData();
      navigate("/");
    } else if (response?.message) {
      showToast(response.message, "danger");
    } else {
      showToast("Error de conexión. Intenta nuevamente.", "danger");
    }
  };

  const handleVerificationSuccess = () => {
    setShowVerifyModal(false);
    setPendingVerificationEmail(null);
    showToast("Email verificado. Ahora puedes iniciar sesión.", "success");
  };

  const handleCloseVerifyModal = () => {
    setShowVerifyModal(false);
    setPendingVerificationEmail(null);
    setResponse(null);
  };

  return (
    <div className="fondo d-flex vh-100 align-items-center justify-content-center">
      <div className="container-transparente position-relative p-4">
        <div className="form-section text-white px-3 px-lg-5">
          <h1 className="text-center mb-4">Iniciar sesión</h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  autoComplete="current-password"
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
                    className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
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
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </div>

            <div className="text-center text-white my-3">
              <small>o continuar con</small>
            </div>

            <div className="text-center">
              <BtnGoogleSigIn />
            </div>

            <p className="text-center text-white my-3">
              ¿No tienes cuenta?{" "}
              <a
                className="text-registro"
                onClick={() => navigate("/register")}
                role="button"
                tabIndex={0}
              >
                Regístrate
              </a>
            </p>
          </form>
        </div>
        <img src={zona5} alt="logo" className="logo-fondo img-fluid" />
      </div>

      {showVerifyModal && (
        <VerifyEmailModal
          email={pendingVerificationEmail}
          onSuccess={handleVerificationSuccess}
          onClose={handleCloseVerifyModal}
        />
      )}
    </div>
  );
}

export default LoginScreen;
