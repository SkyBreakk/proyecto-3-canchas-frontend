import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { checkDisponibilidad } from "../../helpers/reserva";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ReservaModal = ({ cancha }) => {
  const [disponible, setDisponible] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      horas: 1,
      fechaStr: new Date().toISOString().split("T")[0],
      horaStr: "19:00",
    },
  });

  const [fechaStr, horaStr, horas] = watch(["fechaStr", "horaStr", "horas"]);
  const hoy = new Date();
  const hoyStr = hoy.toISOString().split("T")[0];

  useEffect(() => {
    const verificar = async () => {
      if (!cancha?._id) return;

      const [hora, minutos] = horaStr.split(":").map(Number);
      if (hora >= 1 && hora < 11) {
        setDisponible(false);
        return;
      }

      const fechaSeleccionada = new Date(`${fechaStr}T${horaStr}:00`);
      const ahora = new Date();
      if (fechaSeleccionada < ahora) {
        setDisponible(false);
        return;
      }

      setCargando(true);
      const res = await checkDisponibilidad(
        {
          fecha: `${fechaStr}T${horaStr}:00`,
          horas: Number(horas),
        },
        cancha._id,
      );

      setDisponible(res.ok && res.disponible);
      setCargando(false);
    };

    const timeout = setTimeout(verificar, 500);
    return () => clearTimeout(timeout);
  }, [fechaStr, horaStr, horas, cancha?._id]);

  const onSubmit = (data) => {
    if (!disponible) return alert("El horario no está disponible");

    const fechaFormateada = `${data.fechaStr}T${data.horaStr}:00`;
    const precioNumerico = Number(cancha?.precio) || 8000;
    const seniaCalculada = precioNumerico / 2;

    const reservaFinal = {
      cancha: cancha._id,
      senia: seniaCalculada,
      fecha: fechaFormateada,
      horas: parseInt(data.horas),
    };

    console.log("Datos para enviar al backend:", reservaFinal);
  };

  return (
    <div
      className="modal fade"
      id="modalCancha"
      tabIndex="-1"
      aria-labelledby="modalCanchaLabel"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div
          className="modal-content modal-cancha-custom text-white"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          {!cancha ? (
            <div className="modal-body text-center p-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <>
              <div className="modal-header border-0 pb-0">
                <h2 className="modal-title w-100 text-center fw-bold mt-2">
                  {cancha.nombre?.toUpperCase()}
                </h2>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row">
                  <div className="col-lg-5 mb-4 mb-lg-0">
                    <img
                      src={cancha.img}
                      className="modal-img-cancha shadow-lg"
                      alt={cancha.nombre}
                    />
                  </div>

                  <div className="col-lg-7">
                    <span className="badge bg-success mb-2">
                      {cancha.descripcion?.includes("Futbol 5")
                        ? "Cesped Sintético"
                        : cancha.descripcion?.includes("Futbol 11")
                          ? "Cesped Premium"
                          : "Cesped Deluxe"}
                    </span>
                    <p className="text-secondary-custom small lh-sm">
                      {cancha.descripcion?.includes("Futbol 5")
                        ? "Césped sintético de última generación con drenaje rápido, ideal para partidos de Futbol de alta intensidad."
                        : cancha.descripcion?.includes("Futbol 11")
                          ? "Césped natural nivel profesional con iluminación LED simétrica para partidos nocturnos."
                          : "Césped natural nivel profesional con iluminación LED simétrica para partidos nocturnos."}
                    </p>

                    <div className="d-flex align-items-baseline gap-2 my-3">
                      <span className="text-secondary-custom">
                        Precio Total:
                      </span>
                      <h3 className="fw-bold text-success mb-0">
                        ${(cancha.precio * horas).toLocaleString("es-AR")}
                      </h3>
                    </div>

                    <div className="mb-3">
                      {cargando ? (
                        <span className="badge bg-info">Verificando...</span>
                      ) : disponible === true ? (
                        <span className="badge bg-success">
                          ✓ Horario Disponible
                        </span>
                      ) : disponible === false ? (
                        <span className="badge bg-danger">
                          ✗ Horario Ocupado
                        </span>
                      ) : null}
                    </div>

                    <form id="reserva-form" onSubmit={handleSubmit(onSubmit)}>
                      <div
                        className="row g-3 pb-3 rounded-4"
                        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      >
                        <div className="col-md-4 col-6">
                          <label
                            className="small mb-1 d-block opacity-75"
                            htmlFor="date-input"
                          >
                            FECHA
                          </label>
                          <input
                            type="date"
                            min={hoyStr}
                            {...register("fechaStr", {
                              required: "La fecha es obligatoria",
                              validate: (val) =>
                                val >= hoyStr ||
                                "No puedes reservar en el pasado",
                            })}
                            className={`form-control form-control-dark ${errors.fechaStr ? "is-invalid" : ""}`}
                            id="date-input"
                          />
                          {errors.fechaStr && (
                            <span className="text-danger tiny-text">
                              {errors.fechaStr.message}
                            </span>
                          )}
                        </div>
                        <div className="col-md-4 col-6">
                          <label
                            className="small mb-1 d-block opacity-75"
                            htmlFor="hour-input"
                          >
                            HORA
                          </label>
                          <input
                            type="time"
                            {...register("horaStr")}
                            className="form-control form-control-dark"
                            id="hour-input"
                          />
                        </div>
                        <div className="col-md-4 col-12">
                          <label
                            className="small mb-1 d-block opacity-75"
                            htmlFor="duration-input"
                          >
                            DURACIÓN
                          </label>
                          <select
                            {...register("horas")}
                            className="form-select form-control-dark"
                            id="duration-input"
                          >
                            <option value="1">1 Hora</option>
                            <option value="2">2 Horas</option>
                            <option value="3">3 Horas</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        {user ? (
                          <button
                            type="submit"
                            disabled={!disponible || cargando}
                            className={`btn w-100 py-3 shadow ${
                              disponible
                                ? "btn-alquilar text-white"
                                : "btn-secondary"
                            }`}
                          >
                            {disponible
                              ? "Confirmar Reserva"
                              : "Horario No Disponible"}
                          </button>
                        ) : (
                          <div className="p-3 rounded-4 border border-warning bg-warning bg-opacity-10 text-center">
                            <p className="text-warning small mb-2">
                              <i className="bi bi-info-circle me-2"></i>
                              Inicia sesión para poder reservar esta cancha
                            </p>
                            <button
                              type="button"
                              className="btn btn-outline-warning btn-sm w-100 shadow-sm"
                              style={{ borderRadius: "8px" }}
                              data-bs-dismiss="modal"
                              onClick={() => navigate("/login")}
                            >
                              Ir a login
                            </button>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservaModal;
