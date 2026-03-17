import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { checkDisponibilidad, apiReserva } from "../../helpers/reserva";

const CanchaModal = ({ cancha }) => {
  const [disponible, setDisponible] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [reservaExitosa, setReservaExitosa] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
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

  const onSubmit = async (data) => {
    if (!disponible) return alert("El horario no está disponible");

    setCargando(true);
    const fechaFormateada = `${data.fechaStr}T${data.horaStr}:00`;

    const reservaFinal = {
      cancha: cancha._id,
      fecha: fechaFormateada,
      horas: parseInt(data.horas),
      senia: 0,
    };

    try {
      const respuesta = await apiReserva.post(reservaFinal);

      if (respuesta.ok) {
        console.log("¡Reserva guardada en BD!", respuesta);
        setReservaExitosa(true);
        reset();
      } else {
        console.error("Error del backend:", respuesta);
        alert(
          respuesta.msg ||
            "Hubo un error al guardar la reserva en el servidor.",
        );
      }
    } catch (error) {
      console.error("Error al hacer la petición:", error);
      alert(
        "Hubo un error de conexión al procesar tu reserva. Intentá de nuevo.",
      );
    } finally {
      setCargando(false);
    }
  };

  const cerrarModal = () => {
    setTimeout(() => setReservaExitosa(false), 500);
  };

  return (
    <div
      className="modal fade"
      id="modalCancha"
      tabIndex="-1"
      aria-labelledby="modalCanchaLabel"
      onHiddenBsModal={cerrarModal}
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
          ) : reservaExitosa ? (
            <div className="modal-body text-center p-5">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "5rem" }}
              ></i>
              <h2 className="fw-bold text-success mt-3">
                ¡Reserva Confirmada!
              </h2>
              <p className="fs-5 text-light mt-3">
                Tu turno para la <strong>{cancha.nombre}</strong> el día{" "}
                <strong>{fechaStr.split("-").reverse().join("/")}</strong> a las{" "}
                <strong>{horaStr}</strong> fue guardado con éxito.
              </p>
              <div className="bg-dark p-3 rounded-3 mt-4 border border-secondary text-secondary-custom">
                <i className="bi bi-info-circle me-2"></i>
                Recordá que podés abonar en el local o pagar por adelantado
                desde tu perfil.
              </div>
              <button
                type="button"
                className="btn btn-outline-success btn-lg w-100 mt-4 rounded-pill"
                data-bs-dismiss="modal"
                onClick={cerrarModal}
              >
                Entendido, cerrar
              </button>
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
                          : "Pista Dura"}
                    </span>
                    <p className="text-secondary-custom small lh-sm">
                      {cancha.descripcion?.includes("Futbol 5")
                        ? "Césped sintético de última generación con drenaje rápido, ideal para partidos."
                        : "Superficie profesional para la mejor experiencia deportiva."}
                    </p>

                    <div className="d-flex align-items-baseline gap-2 my-3">
                      <span className="text-secondary-custom">
                        Precio a pagar en el local:
                      </span>
                      <h3 className="fw-bold text-success mb-0">
                        ${cancha.precio * horas || "10.000"}
                      </h3>
                    </div>

                    <div className="mb-3">
                      {cargando && !reservaExitosa ? (
                        <span className="badge bg-info">Procesando...</span>
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
                          <label className="small mb-1 d-block opacity-75">
                            FECHA
                          </label>
                          <input
                            type="date"
                            min={hoyStr}
                            {...register("fechaStr", {
                              required: "La fecha es obligatoria",
                            })}
                            className="form-control form-control-dark"
                          />
                        </div>
                        <div className="col-md-4 col-6">
                          <label className="small mb-1 d-block opacity-75">
                            HORA
                          </label>
                          <input
                            type="time"
                            {...register("horaStr")}
                            className="form-control form-control-dark"
                          />
                        </div>
                        <div className="col-md-4 col-12">
                          <label className="small mb-1 d-block opacity-75">
                            DURACIÓN
                          </label>
                          <select
                            {...register("horas")}
                            className="form-select form-control-dark"
                          >
                            <option value="1">1 Hora</option>
                            <option value="2">2 Horas</option>
                            <option value="3">3 Horas</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          disabled={!disponible || cargando}
                          className={`btn w-100 py-3 shadow ${disponible ? "btn-alquilar text-white" : "btn-secondary"}`}
                        >
                          {cargando
                            ? "Guardando..."
                            : disponible
                              ? "Confirmar Reserva"
                              : "Horario No Disponible"}
                        </button>
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

export default CanchaModal;
