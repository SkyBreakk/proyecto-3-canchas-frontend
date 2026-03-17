import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../helpers/auth";
import zona5 from "../assets/img/logo.png";
import "../css/login.css";
import AlertApp from "../components/AlertApp";
import VerifyEmailModal from "../components/VerifyEmailModal";

function RegisterScreen() {
  const navigate = useNavigate();

  const [response, setResponse] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await registerUser(data);

    setResponse(result);

    if (result.ok) {
      setUserEmail(data.email);
      setShowVerifyModal(true);
    }
  };

  const password = watch("password");

  return (
    <div className="fondo d-flex vh-100 align-items-center justify-content-center">
      <div className="container-transparente position-relative p-4">
        <div className="form-section text-white px-3 px-lg-5">
          <h1 className="text-center mb-4">Crear cuenta</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control username-icon input text-white"
                placeholder="Nombre de usuario"
                autoComplete="username"
                {...register("username", {
                  required: "El nombre de usuario es obligatorio",
                })}
              />

              {errors.username && (
                <p className="texto-error fw-bold">{errors.username.message}</p>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control correo-icon input text-white"
                placeholder="Correo electrónico"
                autoComplete="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo no válido",
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
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
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
                {isSubmitting ? "Creando cuenta..." : "Registrarse"}
              </button>
            </div>

            {!response?.ok && response && (
              <AlertApp message={response?.message} />
            )}

            <p className="text-center text-white mt-3">
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="text-registro">
                Inicia sesión
              </a>
            </p>
          </form>

          {showVerifyModal && (
            <VerifyEmailModal
              email={userEmail}
              onSuccess={() => navigate("/login")}
            />
          )}
        </div>

        <img src={zona5} alt="logo" className="logo-fondo img-fluid" />
      </div>
    </div>
  );
}

export default RegisterScreen;
