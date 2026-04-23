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
    if (response?.requiereVerificacion) {
      setPendingVerificationEmail(data.email);
      setShowVerifyModal(true);
      showToast(response.message, "warning");
      return;
    }
    if (response?.ok) {
      showToast(response.message, "success");
      await loadUserData();
      navigate("/");
      return;
    }

    const errorMsg =
      response?.message || "Error de conexión. Intenta nuevamente.";
    showToast(errorMsg, "danger");
  };

  const handleVerificationSuccess = async () => {
    setShowVerifyModal(false);
    setPendingVerificationEmail(null);

    await loadUserData();
    showToast("Email verificado con éxito. Bienvenido a Zona 5", "success");
    navigate("/");
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
                  validate: {
                    notEmpty: (value) =>
                      value?.trim() !== "" ||
                      "El correo no puede estar formado solo por espacios",
                    hasAtSymbol: (value) =>
                      value?.includes("@") ||
                      "Al correo le falta el símbolo '@'",
                    hasDomain: (value) =>
                      /@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Escribe un dominio válido (ej: @gmail.com)",
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
                        `Revisa el dominio. ¿Quisiste decir ${domain.replace("ia", "ai").replace("o", "")}?`
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
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Ingresa tu contraseña para continuar",
                    validate: {
                      notEmpty: (value) =>
                        value?.trim() !== "" ||
                        "La contraseña no puede estar vacía",
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
