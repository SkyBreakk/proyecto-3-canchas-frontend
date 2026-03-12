import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/home.css";

const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="home-container py-5">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="home-bg text-center rounded-4 p-4 shadow">
              <img
                src="../src/assets/img/zona5pasto.png"
                alt="Zona5 Logo"
                className="img-fluid rounded mb-4 pointer"
                onClick={() => navigate("/reserva")}
              />
              <button
                className="btn btn-success btn-lg w-100 fw-bold fs-4"
                onClick={() => navigate("/reserva")}
              >
                Reservar Cancha
              </button>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-12 col-lg-10 ">
            <div className="home-bg text-white rounded-4 shadow border-0">
              <div className="card-body p-5 text-center">
                <h2 className="card-title mb-4 fw-bold">Sobre Zona5</h2>
                <p className="card-text fs-5 text-light opacity-75 lh-base">
                  Tu nueva sede para el fútbol de todas las semanas. En Zona5 te
                  ofrecemos canchas de nivel profesional acompañadas de todos
                  los servicios que necesitás para una experiencia completa:{" "}
                  <br /> 🚗 Estacionamiento propio. <br /> 🚿 Vestuarios amplios
                  y modernos. <br /> 🍻 Sector de Tercer Tiempo para relajar
                  después del partido.
                  <br /> Reservá tu turno online de forma rápida, segura y sin
                  vueltas
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center pb-5">
          <div className="col-12 col-lg-10">
            <div className="home-bg text-white rounded-4 shadow border-0">
              <div className="card-body p-5 text-center">
                <h2 className="card-title mb-4 fw-bold">Membresías</h2>
                <p className="card-text fs-5 text-light opacity-75 mb-4">
                  ¿Juegas todas las semanas? Conoce nuestros planes y asegura tu
                  horario fijo.
                </p>

                <ul className="list-unstyled fs-5 text-start d-inline-block mx-auto">
                  <li className="mb-2">
                    ⚽{" "}
                    <span className="ms-2">10% de descuento en la Tienda</span>
                  </li>
                  <li className="mb-2">
                    ⚽{" "}
                    <span className="ms-2">
                      Prioridad de reserva en horarios pico
                    </span>
                  </li>
                  <li className="mb-2">
                    ⚽{" "}
                    <span className="ms-2">
                      Camisetas de color para diferenciar equipos
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center pb-5">
          <div className="col-12 col-lg-10">
            <div className="home-bg text-white rounded-4 shadow border border-success border-opacity-25">
              <div className="card-body p-5 text-center">
                <h2 className="card-title mb-4 fw-bold">
                  🏆 Torneos y Eventos
                </h2>
                <p className="card-text fs-5 text-light opacity-75 mb-4">
                  ¿Querés organizar un campeonato, un cumpleaños o un evento
                  corporativo? En Zona5 te damos el espacio y la logística para
                  que sea un éxito.
                </p>

                <div className="row justify-content-center text-start mt-4">
                  <div className="col-md-8">
                    <ul className="list-unstyled fs-5">
                      <li className="mb-3">
                        ✅{" "}
                        <span className="ms-2 fw-bold text-success">
                          Precios especiales:
                        </span>{" "}
                        Alquiler por bloque de horas para múltiples canchas.
                      </li>
                      <li className="mb-3">
                        ✅{" "}
                        <span className="ms-2 fw-bold text-success">
                          Tercer tiempo exclusivo:
                        </span>{" "}
                        Opciones de catering y sector reservado en nuestro bar.
                      </li>
                      <li className="mb-3">
                        ✅{" "}
                        <span className="ms-2 fw-bold text-success">
                          Organización:
                        </span>{" "}
                        Te ayudamos con planillas, pecheras y pelotas para todo
                        el evento.
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  className="btn btn-success btn-lg w-75 fw-bold fs-4"
                  onClick={() => navigate("/contacto")}
                >
                  Consultar Fechas Disponibles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeView;
