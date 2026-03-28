import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getHorariosDisponibles, apiReserva } from "../../helpers/reserva";
import { UserContext } from "../../context/UserContext";
import ReservaExitosaModal from "./ReservaExitosaModal";

const ReservaModal = ({ cancha }) => {
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [cargandoReserva, setCargandoReserva] = useState(false);
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [datosReservaExitosa, setDatosReservaExitosa] = useState(null);
  const [errorDuracion, setErrorDuracion] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      horas: 1,
      fechaStr: new Date().toISOString().split("T")[0],
      horaStr: "",
    },
  });

  const [fechaStr, horaStr, horas] = watch(["fechaStr", "horaStr", "horas"]);
  const hoy = new Date();
  const hoyStr = hoy.toISOString().split("T")[0];

  useEffect(() => {
    const fetchHorarios = async () => {
      if (!cancha?._id || !fechaStr) return;

      const fechaSeleccionada = new Date(fechaStr);
      const hoyInicio = new Date(hoyStr);
      if (fechaSeleccionada < hoyInicio) {
        setHorariosDisponibles([]);
        setValue("horaStr", "");
        return;
      }

      setCargandoHorarios(true);
      const res = await getHorariosDisponibles(fechaStr, cancha._id);

      if (res.ok) {
        setHorariosDisponibles(res.horarios);
        if (horaStr && !res.horarios.includes(horaStr)) {
          setValue("horaStr", "");
        }
      } else {
        setHorariosDisponibles([]);
        setValue("horaStr", "");
      }
      setCargandoHorarios(false);
    };

    const timeout = setTimeout(fetchHorarios, 300);
    return () => clearTimeout(timeout);
  }, [fechaStr, cancha?._id, hoyStr, datosReservaExitosa]);

  useEffect(() => {
    if (horaStr && horas > 1) {
      setErrorDuracion(null);
    }
  }, [horaStr, horas]);

  const handleHoraSelect = (hora) => {
    setValue("horaStr", hora);
    setErrorDuracion(null);
  };

  const onSubmit = async (data) => {
    if (!horaStr) {
      alert("Seleccioná un horario disponible");
      return;
    }

    setCargandoReserva(true);
    setErrorDuracion(null);

    const fechaFormateada = `${data.fechaStr}T${data.horaStr}:00`;
    const porcentajeSenia = 0.3;
    const totalReserva = cancha.precio * parseInt(data.horas);

    const reservaFinal = {
      cancha: cancha._id,
      fecha: fechaFormateada,
      horas: parseInt(data.horas),
      senia: totalReserva * porcentajeSenia,
    };

    try {
      const respuesta = await apiReserva.post(reservaFinal);

      if (respuesta.ok) {
        setDatosReservaExitosa({
          fecha: data.fechaStr.split("-").reverse().join("/"),
          hora: data.horaStr,
          canchaNombre: cancha.nombre,
          horas: data.horas,
          total: totalReserva,
          senia: reservaFinal.senia,
        });
        setReservaExitosa(true);
        reset();
      } else {
        if (
          respuesta.message?.includes("duración") ||
          respuesta.message?.includes("ocupado")
        ) {
          setErrorDuracion(
            `No hay disponibilidad para ${data.horas} horas en este horario. Probá con menos.`,
          );
        } else {
          alert(respuesta.message || "Hubo un error al guardar la reserva.");
        }
      }
    } catch (error) {
      console.error("Error al hacer la petición:", error);
      alert("Hubo un error de conexión. Intentá de nuevo.");
    } finally {
      setCargandoReserva(false);
    }
  };

  const cerrarModal = () => {
    setTimeout(() => {
      setReservaExitosa(false);
      setDatosReservaExitosa(null);
      setHorariosDisponibles([]);
      setValue("horaStr", "");
      setErrorDuracion(null);
    }, 500);
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
          ) : reservaExitosa && datosReservaExitosa ? (
            <ReservaExitosaModal
              datos={datosReservaExitosa}
              cerrarModal={cerrarModal}
            />
          ) : (
            /* 📝 RESERVATION FORM */
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
                    <span className="badge bg-success my-2">
                      {cancha.descripcion?.includes("Futbol 5")
                        ? "Cesped Sintético"
                        : cancha.descripcion?.includes("Futbol 11")
                          ? "Cesped Premium"
                          : "Cesped Deluxe"}
                    </span>
                    <p className="text-secondary-custom small lh-sm ms-2">
                      {cancha.descripcion?.includes("Futbol 5")
                        ? "Césped sintético de última generación con drenaje rápido."
                        : "Césped natural nivel profesional con iluminación LED."}
                    </p>
                    <div
                      className="d-flex flex-column my-3 p-3 rounded-3"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    >
                      <div className="d-flex justify-content-between align-items-baseline">
                        <span className="text-secondary-custom">
                          Precio por hora:
                        </span>
                        <span className="text-white fw-bold">
                          ${cancha.precio.toLocaleString("es-AR")}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-baseline mt-2">
                        <span className="text-secondary-custom">Total:</span>
                        <h4 className="fw-bold text-white mb-0">
                          ${(cancha.precio * horas).toLocaleString("es-AR")}
                        </h4>
                      </div>
                      <div className="d-flex justify-content-between align-items-baseline mt-2">
                        <span className="text-secondary-custom">
                          Seña (30%):
                        </span>
                        <h3 className="fw-bold text-success mb-0">
                          $
                          {(cancha.precio * horas * 0.3).toLocaleString(
                            "es-AR",
                          )}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <form id="reserva-form" onSubmit={handleSubmit(onSubmit)}>
                      <div
                        className="row g-3 pb-3 rounded-4"
                        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      >
                        <div className="col-md-6 col-12">
                          <label
                            className="small mb-1 d-block opacity-75"
                            htmlFor="reserva-date"
                          >
                            FECHA
                          </label>
                          <input
                            type="date"
                            min={hoyStr}
                            {...register("fechaStr", {
                              required: "La fecha es obligatoria",
                            })}
                            className={`form-control form-control-dark ${errors.fechaStr ? "is-invalid" : ""}`}
                            id="reserva-date"
                          />
                        </div>
                        <div className="col-md-6 col-12">
                          <label
                            className="small mb-1 d-block opacity-75"
                            htmlFor="reserva-hours"
                          >
                            DURACIÓN
                          </label>
                          <select
                            {...register("horas")}
                            className="form-select form-control-dark"
                            id="reserva-hours"
                          >
                            <option value="1">1 Hora</option>
                            <option value="2">2 Horas</option>
                            <option value="3">3 Horas</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="small d-block opacity-75 mb-0">
                            HORARIOS DISPONIBLES (13:00 - 23:00)
                          </span>
                          {cargandoHorarios && (
                            <span className="badge bg-info">
                              <span className="spinner-border spinner-border-sm me-1"></span>
                              Cargando...
                            </span>
                          )}
                        </div>

                        {!horariosDisponibles ||
                        horariosDisponibles.length === 0 ? (
                          !cargandoHorarios && (
                            <div className="text-center py-4 bg-warning bg-opacity-10 rounded-3 border border-warning w-100">
                              <i className="bi bi-exclamation-circle text-warning me-2"></i>
                              <span className="text-warning small">
                                {fechaStr === hoyStr
                                  ? "No hay horarios disponibles para hoy"
                                  : "No hay horarios disponibles para esta fecha"}
                              </span>
                            </div>
                          )
                        ) : (
                          <div className="horarios-grid" id="reserva-available">
                            {horariosDisponibles.map((hora, index) => {
                              const horaValue =
                                typeof hora === "string"
                                  ? hora
                                  : hora?.hora || hora?.horaStr || `${index}`;
                              return (
                                <button
                                  key={`${horaValue}-${index}`}
                                  type="button"
                                  className={`btn-horario ${horaStr === horaValue ? "activo" : ""}`}
                                  onClick={() => handleHoraSelect(horaValue)}
                                >
                                  {horaValue}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {horaStr && (
                          <div className="mt-3 text-center">
                            <span className="badge bg-success">
                              <i className="bi bi-check-circle me-1"></i>
                              {horaStr} seleccionado
                            </span>
                          </div>
                        )}

                        {errorDuracion && (
                          <div className="mt-2 text-center text-wrap">
                            <span className="badge bg-danger">
                              <i className="bi bi-exclamation-circle me-1"></i>
                              {errorDuracion}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        {user ? (
                          <button
                            type="submit"
                            disabled={!horaStr || cargandoReserva}
                            className={`btn w-100 mt-2 shadow ${
                              horaStr && !cargandoReserva
                                ? "btn-alquilar text-white"
                                : "btn-secondary"
                            }`}
                          >
                            {cargandoReserva ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Procesando...
                              </>
                            ) : horaStr ? (
                              "Confirmar Reserva"
                            ) : (
                              "Seleccioná un horario"
                            )}
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
