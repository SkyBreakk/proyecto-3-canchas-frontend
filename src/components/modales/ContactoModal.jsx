import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { contactoReserva } from "../../helpers/reserva";
import { UserContext } from "../../context/UserContext";
import { useToast } from "../../context/ToastContext";

const ReservaModal = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const { user } = useContext(UserContext);
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await contactoReserva(data);
      reset();
      handleClose();
      showToast("Se mandó el mensaje correctamente", "success");
    } catch (error) {
      console.error(`Hubo un problema: ${error.message}`);
      showToast(error.message || "Hubo un error al contactar", "danger");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-cancha-custom text-white border-0">
          <div className="modal-header border-bottom border-secondary">
            <h5 className="modal-title fw-bold text-success">
              SOLICITAR RESERVA
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
              disabled={loading}
            ></button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  className="form-label small text-secondary-custom"
                  htmlFor="contact-name"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  className={`form-control form-control-dark ${errors.nombre ? "is-invalid" : ""}`}
                  placeholder="Ej: Lionel Messi"
                  defaultValue={user?.username || ""}
                  {...register("nombre", {
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
                        value?.trim() !== "" ||
                        "El usuario no puede estar vacío",
                      noSpaces: (value) =>
                        !value?.includes(" ") || "No puede contener espacios",
                    },
                  })}
                  id="contact-name"
                />
                {errors.nombre && (
                  <p className="texto-error fw-bold">{errors.nombre.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label
                  className="form-label small text-secondary-custom"
                  htmlFor="contact-email"
                >
                  Email de contacto
                </label>
                <input
                  type="email"
                  className={`form-control form-control-dark ${errors.contacto ? "is-invalid" : ""}`}
                  placeholder="correo@ejemplo.com"
                  defaultValue={user?.email || ""}
                  {...register("contacto", {
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message:
                        "Ingresa un correo válido (ej: usuario@dominio.com)",
                    },
                    validate: {
                      notEmpty: (value) =>
                        value?.trim() !== "" ||
                        "El correo no puede estar vacío",
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
                  id="contact-email"
                />
                {errors.contacto && (
                  <p className="texto-error fw-bold">
                    {errors.contacto.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label
                  className="form-label small text-secondary-custom"
                  htmlFor="contact-desc"
                >
                  Mensaje
                </label>
                <textarea
                  className={`form-control form-control-dark ${errors.descripcion ? "is-invalid" : ""}`}
                  rows="3"
                  {...register("descripcion", {
                    required: "Dinos qué necesitas",
                    minLength: {
                      value: 20,
                      message: "El mensaje debe tener al menos 20 caracteres",
                    },
                  })}
                  id="contact-desc"
                ></textarea>
                {errors.descripcion && (
                  <p className="texto-error fw-bold">
                    {errors.descripcion.message}
                  </p>
                )}
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                type="submit"
                className="btn btn-alquilar w-100"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservaModal;
