import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { contactoReserva } from "../../helpers/reserva"; // Importamos el helper
import { UserContext } from "../../context/UserContext";

const ReservaModal = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setValue("nombre", user.username || "");
      setValue("contacto", user.email || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await contactoReserva(data);
      reset();
      handleClose();
    } catch (error) {
      console.error(`Hubo un problema: ${error.message}`);
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
                <label className="form-label small text-secondary-custom">
                  Nombre
                </label>
                <input
                  type="text"
                  className={`form-control form-control-dark ${errors.nombre ? "is-invalid" : ""}`}
                  placeholder="Ej: Lionel Messi"
                  {...register("nombre", {
                    required: "El nombre es necesario",
                  })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small text-secondary-custom">
                  Email de contacto
                </label>
                <input
                  type="email"
                  className={`form-control form-control-dark ${errors.contacto ? "is-invalid" : ""}`}
                  placeholder="correo@ejemplo.com"
                  {...register("contacto", {
                    required: "El correo es obligatorio",
                    pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
                  })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small text-secondary-custom">
                  Mensaje
                </label>
                <textarea
                  className="form-control form-control-dark"
                  rows="3"
                  {...register("descripcion", {
                    required: "Dinos qué necesitas",
                    minLength: 10,
                  })}
                ></textarea>
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
