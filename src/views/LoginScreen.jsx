import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logIn } from "../helpers/auth";
import { UserContext } from "../context/UserContext.jsx";
import zona5 from "../assets/img/logo.png";
import "../assets/css/login.css";
import AlertApp from "../components/AlertApp";
import BtnGoogleSigIn from "../components/BtnGoogleSigIn";
import { useToast } from "../context/ToastContext.jsx";

function LoginScreen() {
  const { loadUserData } = useContext(UserContext);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    isSubmitting,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await logIn(data.email, data.password);
    setResponse(response);
    if (response.ok) {
      showToast("Iniciado Sesión Exitosamente.", "success");
      await loadUserData();
      navigate("/");
    } else {
      showToast("Hubo un error al iniciar sesión", "danger");
    }
  };

  return (
    <div className="fondo d-flex vh-100 align-items-center justify-content-center">
      <div className="container-transparente position-relative p-4">
        <div className="form-section text-white px-3 px-lg-5">
          <h1 className="text-center mb-4">Iniciar sesión</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control correo-icon input text-white"
                placeholder="Correo electrónico"
                autoComplete="email"
                {...register("email", {
                  required: "El correo el obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "No es un correo válido",
                  },
                })}
              />
              {errors.email && (
                <p className="texto-error fw-bold">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control password-icon input text-white"
                placeholder="Contraseña"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
              />
              {errors.password && (
                <p className="texto-error fw-bold">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-3 d-grid">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn boton-iniciar"
              >
                {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </div>
            {!response?.ok && response && (
              <AlertApp message={response?.message} />
            )}

            <div className="text-center text-white my-3">
              <small>o continuar con</small>
            </div>
            <div className="text-center">
              <BtnGoogleSigIn />
            </div>

            <p className="text-center text-white my-3">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-registro">
                Regístrate
              </a>
            </p>
          </form>
        </div>
        <img src={zona5} alt="logo" className="logo-fondo img-fluid" />
      </div>
    </div>
  );
}

export default LoginScreen;
