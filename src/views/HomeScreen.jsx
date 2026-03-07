import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/home.css'; 


const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="home-container py-5">
      <div className="container">
        
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="bg-dark text-center rounded-4 p-4 shadow">
              <img 
                src="../src/assets/img/zona5pasto.png" 
                alt="Zona5 Logo" 
                className="img-fluid rounded mb-4" 
              />
              <button 
                className="btn btn-success btn-lg w-100 fw-bold fs-4"
                onClick={() => navigate('/canchas')}
              >
                Reservar Cancha
              </button>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-12 col-lg-10">
            <div className="card bg-dark text-white rounded-4 shadow border-0">
              <div className="card-body p-5 text-center">
                <h2 className="card-title mb-4 fw-bold">Sobre Zona5</h2>
                <p className="card-text fs-5 text-light opacity-75">
                  Posible zona de información de costes, políticas y beneficios.
                  Aquí puedes explicar que cuentan con estacionamiento, vestuarios y 
                  tercer tiempo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center pb-5">
          <div className="col-12 col-lg-10">
            <div className="card bg-dark text-white rounded-4 shadow border-0">
              <div className="card-body p-5 text-center">
                <h2 className="card-title mb-4 fw-bold">Membresías</h2>
                <p className="card-text fs-5 text-light opacity-75 mb-4">
                  ¿Juegas todas las semanas? Conoce nuestros planes y asegura tu horario fijo.
                </p>
                
                <ul className="list-unstyled fs-5 text-start d-inline-block mx-auto">
                  <li className="mb-2">⚽ <span className="ms-2">10% de descuento en la Tienda</span></li>
                  <li className="mb-2">⚽ <span className="ms-2">Prioridad de reserva en horarios pico</span></li>
                  <li className="mb-2">⚽ <span className="ms-2">Pelota premium en todos tus partidos</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default HomeView;